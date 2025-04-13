import { db } from "@/db"
import { createTRPCRouter, publicProcedure } from "../init"
import { emailVerificationCodes, Users } from "@/db/schema"
import { generateId, Scrypt } from "lucia"
import { z } from "zod"
import { generateEmailVerificationCode } from "@/email/generate-email-verification-code"
import { EmailTemplate, sendEmail } from "@/email"
import { and, eq, lt, or } from "drizzle-orm"
import { lucia } from "@/lib/auth"
import { cookies } from "next/headers"
import { TRPCError } from "@trpc/server"
import { generatePasswordResetToken } from "@/email/generate-password-reset-token"

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      const {} = input

      // const existingUser = await db.query.Users.findFirst({
      //   where: (Users, { eq }) => eq(Users.email, input.email),
      // })

      const existingUnverifiedUser = await db.query.Users.findFirst({
        where: (table, { eq }) =>
          and(eq(table.email, input.email), eq(table.emailVerified, false)),
        columns: { email: true, id: true },
      })

      const existingVerifiedUser = await db.query.Users.findFirst({
        where: (table, { eq }) =>
          and(eq(table.email, input.email), eq(table.emailVerified, true)),
        columns: { email: true },
      })

      const newUserId = generateId(21)
      const hashedPassword = await new Scrypt().hash(input.password)

      let userId: string

      if (existingVerifiedUser) {
        // If verified user exists, prevent registration
        throw new Error("User with this email already exists")
      } else if (existingUnverifiedUser) {
        // If unverified user exists, update their password
        userId = existingUnverifiedUser.id
        await db
          .update(Users)
          .set({
            hashedPassword,
          })
          .where(eq(Users.email, input.email))
      } else {
        // Create new user
        userId = newUserId
        await db.insert(Users).values({
          id: userId,
          email: input.email,
          hashedPassword,
          emailVerified: false,
        })
      }

      // Generate and send verification code using the correct userId
      const verificationCode = await generateEmailVerificationCode(userId, input.email)

      await sendEmail(input.email, EmailTemplate.EmailVerification, {
        code: verificationCode,
      })

      return { success: true, message: "Verification code sent Successfully" }
    }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().nonempty(),
      })
    )
    .mutation(async ({ input }) => {
      const existingUser = await db.query.Users.findFirst({
        where: (table, { eq }) => eq(table.email, input.email),
      })

      if (!existingUser || !existingUser?.hashedPassword) {
        throw new Error("Account does not exist")
      }

      const validPassword = await new Scrypt().verify(
        existingUser.hashedPassword,
        input.password
      )

      if (!validPassword) {
        throw new Error("Invalid Password")
      }

      const session = await lucia.createSession(existingUser.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)

      const cookieStore = await cookies()
      cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

      return { success: true, message: "Logged in Successfully" }
    }),
  verifyEmail: publicProcedure
    .input(
      z.object({
        code: z.string().nonempty(),
      })
    )
    .mutation(async ({ input }) => {
      // Find the verification code and associated user data

      const userRecord = await db.query.emailVerificationCodes.findFirst({
        where: (table, { eq }) => eq(table.code, input.code),
        columns: {
          id: true,
          userId: true,
          expiresAt: true,
        },
        with: {
          user: {
            columns: {
              id: true,
              email: true,
            },
          },
        },
      })

      if (!userRecord) {
        throw new Error("Invalid verification code")
      }

      // Check if code is expired
      if (new Date() > userRecord.expiresAt) {
        // Delete all expired verification codes for this user
        await db.delete(emailVerificationCodes).where(
          and(
            eq(emailVerificationCodes.userId, userRecord.userId),
            // Delete codes that are expired
            or(
              eq(emailVerificationCodes.id, userRecord.id),
              lt(emailVerificationCodes.expiresAt, new Date())
            )
          )
        )

        throw new Error("Verification code has expired. Please request a new one.")
      }

      // Update user verification status
      await db
        .update(Users)
        .set({ emailVerified: true })
        .where(eq(Users.id, userRecord.userId))

      // Delete the used verification code
      await db
        .delete(emailVerificationCodes)
        .where(eq(emailVerificationCodes.id, userRecord.id))

      // Create session after successful verification
      const session = await lucia.createSession(userRecord.userId, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      const cookieStore = await cookies()
      cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

      return {
        success: true,
        message: "Email verified successfully",
        user: {
          id: userRecord.userId,
          email: userRecord.user.email,
        },
      }
    }),
  resendVerificationCode: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const { email } = input

      // Find the user by email
      const user = await db.query.Users.findFirst({
        where: (table, { eq }) => eq(table.email, email),
        columns: { id: true, email: true, emailVerified: true },
      })

      if (!user) {
        throw new Error("User not found")
      }

      if (user.emailVerified) {
        throw new Error("Email is already verified")
      }

      // Generate and send a new verification code
      const verificationCode = await generateEmailVerificationCode(user.id, email)

      await sendEmail(email, EmailTemplate.EmailVerification, {
        code: verificationCode,
      })

      return { success: true, message: "Verification code resent successfully" }
    }),
  resetPassword: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      // Get the user to reset the password
      const user = await db.query.Users.findFirst({
        where: (table, { eq }) => eq(table.email, input.email),
        // columns: {
        //   id: true,
        //   email: true,
        //   emailVerified: true,
        //   discordId: true,
        // },
      })

      // checking if the user exists or not
      if (!user || !user.emailVerified) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User does not exist try signup first",
        })
      }

      //checking if the user have already used oauth
      if (user.discordId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot reset password for Discord accounts",
        })
      }

      const verificationToken = await generatePasswordResetToken(user.id)
      const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${verificationToken}`

      await sendEmail(user.email, EmailTemplate.PasswordReset, { link: verificationLink })

      return { success: true, message: "Password reset link sent" }
    }),
})
