"use client"

import { useEffect } from "react"
import { redirect, useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { VerifyCode } from "./verify-code"
import { useAuthStore } from "@/lib/store/auth-store"

const VerifyEmailPage = () => {
  const email = useAuthStore((state) => state.email)
  const clearEmail = useAuthStore((state) => state.clearEmail)
  const router = useRouter()

  useEffect(() => {
    // If no email is stored, redirect to signup
    if (!email) {
      router.replace("/signup")
    }
  }, [email, router])

  // Clear email when component unmounts
  useEffect(() => {
    return () => {
      // Only clear if we're not going to the dashboard
      // This prevents clearing when verification is successful
      if (
        document.visibilityState === "hidden" ||
        !document.body.contains(document.activeElement)
      ) {
        clearEmail()
      }
    }
  }, [clearEmail])

  // If no email is stored, don't render anything
  if (!email) return null

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verify Email</CardTitle>
        <CardDescription>
          Verification code was sent to <span className="font-medium">{email}</span>.
          Check your spam folder if you can't find the email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VerifyCode />
      </CardContent>
    </Card>
  )
}

export default VerifyEmailPage
