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

// Use the exact redirect URI that's configured in the Discord Developer Portal
const DISCORD_REDIRECT_URI = "http://localhost:3000/login/discord/callback"

export const discord = new Discord(
  process.env.DISCORD_CLIENT_ID!,
  process.env.DISCORD_CLIENT_SECRET!,
  DISCORD_REDIRECT_URI
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
