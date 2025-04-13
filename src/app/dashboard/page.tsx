import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth/actions"
import { validateRequest } from "@/lib/auth/validate-request"
import { redirect } from "next/navigation"
import React from "react"

const DashboardPage = async () => {
  const { user, session } = await validateRequest()

  if (!user) redirect("/login")
  return (
    <div>
      <Button
        variant="destructive"
        onClick={logout}
      >
        Logout
      </Button>
      {JSON.stringify(user)}
    </div>
  )
}

export default DashboardPage
