import { cookies } from "next/headers"
import { generateState, generateCodeVerifier } from "arctic"

export async function GET(): Promise<Response> {
  const state = generateState()
  const codeVerifier = generateCodeVerifier()

  // Store state and code verifier in cookies
  const cookieStore = await cookies()
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

  // Construct the Discord OAuth URL
  const clientId = process.env.DISCORD_CLIENT_ID
  const redirectUri = encodeURIComponent("http://localhost:3000/login/discord/callback")

  // Use a 302 redirect to Discord's OAuth endpoint
  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://discord.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=identify%20email`,
    },
  })
}
