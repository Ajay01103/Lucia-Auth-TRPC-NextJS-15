import { Lucia, TimeSpan } from "lucia"
import { Discord } from "arctic"
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"
import { db } from "@/db"
import { sessions, Users, type User as DbUser } from "@/db/schema"
import { absoluteUrl } from "../utils"

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, Users)

export const lucia = new Lucia(adapter, {
  getSessionAttributes: (attributes) => {
    return {}
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      emailVerified: attributes.emailVerified,
      avatar: attributes.avatar,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
    }
  },
  sessionExpiresIn: new TimeSpan(30, "d"),
  sessionCookie: {
    name: "Lucia Session",
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
})

export const discord = new Discord(
  process.env.DISCORD_CLIENT_ID!,
  process.env.DISCORD_CLIENT_SECRET!,
  absoluteUrl("/login/discord/callback")
)

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseSessionAttributes: DatabaseSessionAttributes
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseSessionAttributes {}
interface DatabaseUserAttributes extends Omit<DbUser, "hashedPassword"> {}
