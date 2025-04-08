"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {} from "@/components/icon"
import Link from "next/link"
import { useAuthStore } from "@/lib/store/auth-store"

import React, { useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { trpc } from "@/trpc/client"
import { SignUpInput } from "@/lib/validators/auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const SignUp = () => {
  const router = useRouter()
  const email = useAuthStore((state) => state.email)

  // Redirect to verify-email page if email exists in global state
  useEffect(() => {
    if (email) {
      router.replace("/verify-email")
    }
  }, [email, router])

  const { mutate, isPending: signUpPending } = trpc.user.register.useMutation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const values: SignUpInput = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    mutate(
      { email: values.email, password: values.password },
      {
        onSuccess: () => {
          // Store the email in the global state
          useAuthStore.getState().setEmail(values.email)

          toast.success("User Registered successfully", {
            description: "A verification code is sent to your email",
          })
          router.replace("/verify-email") // Changed to router.replace for faster navigation
        },
        onError: (error) => {
          toast.error("Something went wrong", {
            description: error.message,
          })
        },
      }
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>ACME Sign Up</CardTitle>
        <CardDescription>Sign up to start using the app</CardDescription>
      </CardHeader>

      <CardContent>
        <Button
          variant="outline"
          className="w-full"
          asChild
          disabled={signUpPending}
        >
          <Link
            href="/login/discord"
            prefetch={false}
          >
            <img
              src="/discord.svg"
              className="mr-2 h-5 w-5"
            />
            Sign up with Discord
          </Link>
        </Button>

        <div className="my-2 flex items-center">
          <div className="flex-grow border-t border-muted" />
          <div className="mx-2 text-muted-foreground">or</div>
          <div className="flex-grow border-t border-muted" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          // aria-disabled={signUpPending}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              required
              placeholder="email@example.com"
              autoComplete="email"
              name="email"
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="********"
            />
          </div>

          <div>
            <Link href={"/login"}>
              <span className="p-0 text-xs font-medium underline-offset-4 hover:underline">
                Already signed up? Login instead.
              </span>
            </Link>
          </div>

          <Button
            className="w-full"
            aria-label="submit-btn"
            disabled={signUpPending}
          >
            Sign Up
          </Button>
          <Button
            variant="outline"
            className="w-full"
            asChild
          >
            <Link href="/">Cancel</Link>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
