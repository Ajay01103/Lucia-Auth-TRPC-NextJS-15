"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { trpc } from "@/trpc/client"
import { AlertTriangle } from "lucide-react"
import { redirect, useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { toast } from "sonner"
import { useAuthStore } from "@/lib/store/auth-store"

export const VerifyCode = () => {
  const codeFormRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const email = useAuthStore((state) => state.email)
  const clearEmail = useAuthStore((state) => state.clearEmail)
  const [isResending, setIsResending] = useState(false)

  const { mutate } = trpc.user.verifyEmail.useMutation()
  const { mutate: resendCode } = trpc.user.resendVerificationCode.useMutation()

  const handleEmailCorrection = () => {
    clearEmail()
    redirect("/signup")
  }

  const handleVerifyEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const code = formData.get("code") as string

    if (!code) return

    mutate(
      { code },
      {
        onSuccess: () => {
          // Handle successful verification
          toast.success("Email verified Successfully")
          // Clear the email from the store
          clearEmail()
          router.replace("/dashboard")
        },
        onError: (error) => {
          // Handle error
          toast.error("Something went wrong", {
            description: error.message,
          })
        },
      }
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <form
        ref={codeFormRef}
        onSubmit={handleVerifyEmail}
      >
        <Label htmlFor="code">Verification Code</Label>
        <Input
          className="mt-2"
          type="text"
          id="code"
          name="code"
          required
        />

        <Button
          className="mt-4 w-full"
          aria-label="submit-btn"
        >
          Verify
        </Button>
      </form>

      <Button
        className="mt-2 w-full"
        variant="outline"
        disabled={isResending || !email}
        onClick={() => {
          if (!email) return

          setIsResending(true)
          resendCode(
            { email },
            {
              onSuccess: () => {
                toast.success("Verification code resent", {
                  description: "Please check your email for the new code",
                })
                setIsResending(false)
              },
              onError: (error) => {
                toast.error("Failed to resend code", {
                  description: error.message,
                })
                setIsResending(false)
              },
            }
          )
        }}
      >
        {isResending ? "Sending..." : "Resend Code"}
      </Button>

      <Button
        variant="link"
        className="mt-2"
        onClick={handleEmailCorrection}
      >
        Entered wrong email? click here
      </Button>
    </div>
  )
}
