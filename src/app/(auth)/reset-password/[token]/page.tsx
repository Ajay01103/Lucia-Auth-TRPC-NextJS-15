import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ResetPassword } from "./reset-password"

interface Props {
  params: Promise<{ token: string }>
}

const TokenVerificationPage = async ({ params }: Props) => {
  const { token } = await params

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle>Reset password</CardTitle>
        <CardDescription>Enter new password.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPassword token={token} />
      </CardContent>
    </Card>
  )
}

export default TokenVerificationPage
