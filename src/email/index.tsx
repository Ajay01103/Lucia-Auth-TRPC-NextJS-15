import "server-only"

import { EmailVerificationTemplate } from "./templates/email-verification"
import { render } from "@react-email/render"
import { ComponentProps } from "react"
import { ResetPasswordTemplate } from "./templates/reset-password"
import { createTransport, type TransportOptions } from "nodemailer"

export enum EmailTemplate {
  EmailVerification = "EmailVerification",
  PasswordReset = "PasswordReset",
}

export type PropsMap = {
  [EmailTemplate.EmailVerification]: ComponentProps<typeof EmailVerificationTemplate>
  [EmailTemplate.PasswordReset]: ComponentProps<typeof ResetPasswordTemplate>
}

const getEmailTemplate = async <T extends EmailTemplate>(
  template: T,
  props: PropsMap[NoInfer<T>]
) => {
  switch (template) {
    case EmailTemplate.EmailVerification:
      return {
        subject: "Verify your email address",
        body: await render(
          <EmailVerificationTemplate
            {...(props as PropsMap[EmailTemplate.EmailVerification])}
          />
        ),
      }
    case EmailTemplate.PasswordReset:
      return {
        subject: "Reset your password",
        body: await render(
          <ResetPasswordTemplate {...(props as PropsMap[EmailTemplate.PasswordReset])} />
        ),
      }
    default:
      throw new Error("Invalid email template")
  }
}

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
}

const transporter = createTransport(smtpConfig as TransportOptions)

export const sendEmail = async <T extends EmailTemplate>(
  to: string,
  template: T,
  props: PropsMap[NoInfer<T>]
) => {
  const { subject, body } = await getEmailTemplate(template, props)

  return transporter.sendMail({
    from: '"Acme" <noreply@acme.com>',
    to,
    subject,
    html: body,
  })
}
