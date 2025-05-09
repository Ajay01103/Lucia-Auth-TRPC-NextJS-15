import { cookies } from "next/headers"
import { generateId } from "lucia"
import { OAuth2RequestError } from "arctic"
import { eq } from "drizzle-orm"
import { discord, lucia } from "@/lib/auth"
import { db } from "@/db"
import { Users } from "@/db/schema"

interface DiscordUser {
  id: string
  username: string
  avatar: string | null
  banner: string | null
  global_name: string | null
  banner_color: string | null
  mfa_enabled: boolean
  locale: string
  email: string | null
  verified: boolean
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const storedState = (await cookies()).get("discord_oauth_state")?.value ?? null
  const storedCodeVerifier =
    (await cookies()).get("discord_oauth_code_verifier")?.value ?? null

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
      headers: { Location: "/login" },
    })
  }

  try {
    // Manually validate the authorization code
    const clientId = process.env.DISCORD_CLIENT_ID!
    const clientSecret = process.env.DISCORD_CLIENT_SECRET!
    const redirectUri = "http://localhost:3000/login/discord/callback"

    // Exchange the code for an access token
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json()
      console.error("Token exchange error:", errorData)
      return new Response(
        JSON.stringify({ message: "Failed to exchange code for token" }),
        {
          status: 400,
        }
      )
    }

    const tokens = await tokenResponse.json()

    const discordUserRes = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    if (!discordUserRes.ok) {
      const errorData = await discordUserRes.json()
      console.error("User info fetch error:", errorData)
      return new Response(
        JSON.stringify({ message: "Failed to fetch user information" }),
        {
          status: 400,
        }
      )
    }

    const discordUser = (await discordUserRes.json()) as DiscordUser

    if (!discordUser.email || !discordUser.verified) {
      return new Response(
        JSON.stringify({
          error: "Your Discord account must have a verified email address.",
        }),
        { status: 400, headers: { Location: "/login" } }
      )
    }
    const existingUser = await db.query.Users.findFirst({
      where: (table, { eq, or }) =>
        or(eq(table.discordId, discordUser.id), eq(table.email, discordUser.email!)),
    })

    const avatar = discordUser.avatar
      ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.webp`
      : null

    if (!existingUser) {
      const userId = generateId(21)
      await db.insert(Users).values({
        id: userId,
        email: discordUser.email,
        emailVerified: true,
        discordId: discordUser.id,
        avatar,
      })
      const session = await lucia.createSession(userId, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      ;(await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
      return new Response(null, {
        status: 302,
        headers: { Location: "/dashboard" },
      })
    }

    if (existingUser.discordId !== discordUser.id || existingUser.avatar !== avatar) {
      await db
        .update(Users)
        .set({
          discordId: discordUser.id,
          emailVerified: true,
          avatar,
        })
        .where(eq(Users.id, existingUser.id))
    }
    const session = await lucia.createSession(existingUser.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    const Cookie = await cookies()
    Cookie.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return new Response(null, {
      status: 302,
      headers: { Location: "/dashboard" },
    })
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(JSON.stringify({ message: "Invalid code" }), {
        status: 400,
      })
    }
    console.error(e)

    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    })
  }
}
