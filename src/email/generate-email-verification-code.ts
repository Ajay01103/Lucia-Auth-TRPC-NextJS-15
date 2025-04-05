import { db } from "@/db"
import { emailVerificationCodes } from "@/db/schema"
import { eq } from "drizzle-orm"
import { createDate, TimeSpan } from "oslo"
import { alphabet, generateRandomString } from "oslo/crypto"

export const generateEmailVerificationCode = async (
  userId: string,
  email: string
): Promise<string> => {
  await db.delete(emailVerificationCodes).where(eq(emailVerificationCodes.userId, userId))

  const code = generateRandomString(8, alphabet("0-9")) // 8 digit code
  await db.insert(emailVerificationCodes).values({
    userId,
    email,
    code,
    expiresAt: createDate(new TimeSpan(2, "h")),
  })

  return code
}
