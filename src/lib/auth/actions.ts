"use server"

import { z } from "zod"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { generateId, Scrypt } from "lucia"
import { isWithinExpirationDate, TimeSpan, createDate } from "oslo"
import { generateRandomString, alphabet } from "oslo/crypto"
import { eq } from "drizzle-orm"
import { lucia } from "@/lib/auth"
import { db } from "@/db"
import {
  loginSchema,
  signupSchema,
  type SignUpInput,
  type LoginInput,
  resetPasswordSchema,
} from "@/lib/validators/auth"
import { Users } from "@/db/schema"
// import { sendMail, EmailTemplate } from "@/lib/email";
import { validateRequest } from "@/lib/auth/validate-request"

export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>
  formError?: string
}

export async function logout(): Promise<{ error: string } | void> {
  const { session } = await validateRequest()
  if (!session) {
    return {
      error: "No session found",
    }
  }
  await lucia.invalidateSession(session.id)
  const sessionCookie = lucia.createBlankSessionCookie()
  const Cookie = await cookies()
  Cookie.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return redirect("/")
}
