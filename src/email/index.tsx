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
        html: await render(
          <EmailVerificationTemplate
            {...(props as PropsMap[EmailTemplate.EmailVerification])}
          />
        ),
      }
    case EmailTemplate.PasswordReset:
      return {
        subject: "Reset your password",
        html: await render(
          <ResetPasswordTemplate {...(props as PropsMap[EmailTemplate.PasswordReset])} />
        ),
      }
    default:
      throw new Error("Invalid email template")
  }
}

// Configure Resend SMTP settings
const resendSmtpConfig = {
  host: "smtp.resend.com",
  port: 587, // or 465 for SSL
  secure: false, // true for 465, false for 587
  auth: {
    user: "resend", // Resend SMTP username is always "resend"
    pass: process.env.RESEND_API_KEY, // Use your Resend API key as the password
  },
}

// Create nodemailer transporter with Resend SMTP
const transporter = createTransport(resendSmtpConfig as TransportOptions)

export const sendMail = async <T extends EmailTemplate>(
  to: string,
  template: T,
  props: PropsMap[NoInfer<T>]
) => {
  const { subject, html } = await getEmailTemplate(template, props)
  const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@ajaysinghdev.me"

  // Send email using nodemailer with Resend SMTP
  return transporter.sendMail({
    from: `Acme <${fromEmail}>`,
    to,
    subject,
    html,
  })
}
