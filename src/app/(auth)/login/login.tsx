"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { LoginInput } from "@/lib/validators/auth"
import { trpc } from "@/trpc/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuthStore } from "@/lib/store/auth-store"
import { useEffect } from "react"

export const Login = () => {
  const router = useRouter()
  const email = useAuthStore((state) => state.email)
  const { mutate: Login, isPending } = trpc.user.login.useMutation()

  // Redirect to verify-email page if email exists in global state
  useEffect(() => {
    if (email) {
      router.replace("/verify-email")
    }
  }, [email, router])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const values: LoginInput = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    Login(
      { email: values.email, password: values.password },
      {
        onSuccess: () => {
          toast.success("Logged in successfully")
          router.push("/dashboard")
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
        <CardTitle>ACME Log In</CardTitle>
        <CardDescription>Log in to your account to access your dashboard</CardDescription>
      </CardHeader>

      <CardContent>
        <Button
          variant="outline"
          className="w-full"
          asChild
        >
          <Link
            href="/login/discord"
            prefetch={false}
          >
            <img
              src="/discord.svg"
              className="mr-2 h-5 w-5"
            />
            Log in with Discord
          </Link>
        </Button>
        <div className="my-2 flex items-center">
          <div className="flex-grow border-t border-muted" />
          <div className="mx-2 text-muted-foreground">or</div>
          <div className="flex-grow border-t border-muted" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid gap-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              required
              id="email"
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

          <div className="flex flex-wrap justify-between">
            <Button
              variant={"link"}
              size={"sm"}
              className="p-0"
              asChild
            >
              <Link href={"/signup"}>Not signed up? Sign up now.</Link>
            </Button>
            <Button
              variant={"link"}
              size={"sm"}
              className="p-0"
              asChild
            >
              <Link href={"/reset-password"}>Forgot password?</Link>
            </Button>
          </div>

          <Button
            className="w-full"
            aria-label="submit-btn"
            disabled={isPending}
          >
            Log In
          </Button>
          <Button
            variant="outline"
            className="w-full"
            asChild
            disabled={isPending}
          >
            <Link href="/">Cancel</Link>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
