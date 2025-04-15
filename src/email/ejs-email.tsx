import "server-only"

import { createTransport, type TransportOptions } from "nodemailer"
// Sending Email using ejs (faster with nodemailer but less customizable)
// If you want to use React Email with nodemailer use email/react-email.tsx as email/index.tsx
// and rename previous index.tsx as other name
import ejs from "ejs"
import path from "path"
import { readFile } from "fs/promises"

export enum EmailTemplate {
  EmailVerification = "EmailVerification",
  PasswordReset = "PasswordReset",
}

export type EmailVerificationProps = {
  code: string
}

export type ResetPasswordProps = {
  link: string
}

export type PropsMap = {
  [EmailTemplate.EmailVerification]: EmailVerificationProps
  [EmailTemplate.PasswordReset]: ResetPasswordProps
}

// Helper function to get the template file path
const getTemplatePath = (template: EmailTemplate): string => {
  const templateMap = {
    [EmailTemplate.EmailVerification]: "email-verification.ejs",
    [EmailTemplate.PasswordReset]: "reset-password.ejs",
  }

  return path.join(process.cwd(), "src", "email", "ejs-templates", templateMap[template])
}

// Helper function to get the email subject
const getEmailSubject = (template: EmailTemplate): string => {
  const subjectMap = {
    [EmailTemplate.EmailVerification]: "Verify your email address",
    [EmailTemplate.PasswordReset]: "Reset your password",
  }

  return subjectMap[template]
}

// Render the EJS template with the provided data
const renderTemplate = async <T extends EmailTemplate>(
  template: T,
  props: PropsMap[T]
): Promise<string> => {
  const templatePath = getTemplatePath(template)
  const templateContent = await readFile(templatePath, "utf-8")

  return ejs.render(templateContent, props)
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
  props: PropsMap[T]
) => {
  try {
    const subject = getEmailSubject(template)
    const html = await renderTemplate(template, props)

    return transporter.sendMail({
      from: '"Acme" <noreply@acme.com>',
      to,
      subject,
      html,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    throw new Error(
      `Failed to send email: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}
