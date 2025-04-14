"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { trpc } from "@/trpc/client"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Props {
  token: string
}

export const ResetPassword = ({ token }: Props) => {
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const resetPasswordMutation = trpc.user.resetPassword.useMutation({
    onSuccess: () => {
      toast.success("Password reset successfully")
      router.push("/login")
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reset password")
      setIsLoading(false)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    resetPasswordMutation.mutate({
      token,
      password,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="hidden"
        name="token"
        value={token}
      />
      <div className="space-y-2">
        <Label>New Password</Label>
        <PasswordInput
          name="password"
          required
          autoComplete="new-password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <Button
        className="w-full"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  )
}
