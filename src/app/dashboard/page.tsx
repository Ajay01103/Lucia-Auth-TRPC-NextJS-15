import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { logout } from "@/lib/auth/actions"
import { validateRequest } from "@/lib/auth/validate-request"
import { redirect } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const DashboardPage = async () => {
  const { user, session } = await validateRequest()

  if (!user) redirect("/login")

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button
            variant="destructive"
            onClick={logout}
          >
            Sign Out
          </Button>
        </div>

        {/* User Profile Card */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar ?? ""} />
              <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-2xl">{user.email}</CardTitle>
              <div className="flex flex-col gap-2">
                <Label>{user.emailVerified ? "Verified" : "Unverified"}</Label>
                <Label>{!user.avatar && <Label>Discord not connected</Label>}</Label>
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-4">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1 rounded-lg bg-muted p-4">
                <dt className="text-sm text-muted-foreground">Account ID</dt>
                <dd className="font-mono text-sm font-medium">{user.id}</dd>
              </div>
              <div className="space-y-1 rounded-lg bg-muted p-4">
                <dt className="text-sm text-muted-foreground">Joined</dt>
                <dd className="font-medium">
                  {new Date(session.expiresAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Activity Section */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              Your recent account activity will appear here.
            </p>
            <p>{session.id}</p>
            <p>Session Expires at: {session.expiresAt.toString()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
