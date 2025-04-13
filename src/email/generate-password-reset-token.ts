import { db } from "@/db"
import { passwordResetTokens } from "@/db/schema"
import { eq } from "drizzle-orm"
import { generateId } from "lucia"
import { createDate, TimeSpan } from "oslo"

export async function generatePasswordResetToken(userId: string): Promise<string> {
  await db.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, userId))
  const tokenId = generateId(40)
  await db.insert(passwordResetTokens).values({
    id: tokenId,
    userId,
    expiresAt: createDate(new TimeSpan(2, "h")),
  })
  return tokenId
}
