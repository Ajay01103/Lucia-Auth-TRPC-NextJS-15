import { validateRequest } from "@/lib/auth/validate-request"
import { redirect } from "next/navigation"
import React from "react"
import { Login } from "./login"

const LoginPage = async () => {
  const { user } = await validateRequest()

  if (user) redirect("/dashboard")

  return <Login />
}

export default LoginPage
