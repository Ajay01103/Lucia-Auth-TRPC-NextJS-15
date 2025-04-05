import React from "react"
import { SignUp } from "./signup"
import { validateRequest } from "@/lib/auth/validate-request"
import { redirect } from "next/navigation"

const SignUpPage = async () => {
  const { user } = await validateRequest()

  if (user) redirect("/dashboard")
  return <SignUp />
}

export default SignUpPage
