import { cookies } from "next/headers"
import { generateState, generateCodeVerifier } from "arctic"
import { discord } from "@/lib/auth"

export async function GET(): Promise<Response> {
  const state = generateState()
  const codeVerifier = generateCodeVerifier()
  const scopes = ["identify", "email"].join(" ")

  const url = await discord.createAuthorizationURL(state, scopes, [codeVerifier])

  const cookieStore = await cookies()

  // Store both state and code verifier in cookies
  cookieStore.set("discord_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  })

  cookieStore.set("discord_oauth_code_verifier", codeVerifier, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  })

  return Response.redirect(url)
}
