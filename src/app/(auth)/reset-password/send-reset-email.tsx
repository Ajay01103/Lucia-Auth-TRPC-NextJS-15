"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ForgotPasswordInput } from "@/lib/validators/auth"
import { trpc } from "@/trpc/client"
import Link from "next/link"
import React from "react"
import { toast } from "sonner"

export const SendResetEmail = () => {
  const { mutate, isPending } = trpc.user.resetPasswordEmail.useMutation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const values: ForgotPasswordInput = {
      email: formData.get("email") as string,
    }

    mutate(
      { email: values.email },
      {
        onSuccess: () => {
          toast.success("Password Reset Link sent!", {
            description: "Check your email inbox or spam folder",
          })
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
    <form
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <Label>Your Email</Label>
        <Input
          required
          placeholder="email@example.com"
          autoComplete="email"
          name="email"
          type="email"
        />
      </div>

      <div className="flex flex-wrap justify-between">
        <Link href={"/"}>
          <Button
            variant={"link"}
            size={"sm"}
            className="p-0"
          >
            Not signed up? Sign up now
          </Button>
        </Link>
      </div>

      <Button
        disabled={isPending}
        type="submit"
        className="w-full"
      >
        Reset Password
      </Button>
      <Button
        disabled={isPending}
        variant="outline"
        className="w-full"
        asChild
      >
        <Link href="/">Cancel</Link>
      </Button>
    </form>
  )
}
