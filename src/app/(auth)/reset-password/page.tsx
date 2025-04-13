import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { validateRequest } from "@/lib/auth/validate-request"
import { redirect } from "next/navigation"
import React from "react"
import { SendResetEmail } from "./send-reset-email"

const ResetPasswordPage = async () => {
  const { user } = await validateRequest()

  if (user) redirect("/dashboard")

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Forgot password?</CardTitle>
        <CardDescription>Password reset link will be sent to your email.</CardDescription>
      </CardHeader>
      <CardContent>
        <SendResetEmail />
      </CardContent>
    </Card>
  )
}

export default ResetPasswordPage
