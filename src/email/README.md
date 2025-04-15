# Email Sending with Resend and React Email

This project uses [Resend](https://resend.com) as the email delivery service along with [React Email](https://react.email/) for creating beautiful, responsive email templates using React components.

## Setup

1. **Sign up for Resend**

   - Create an account at [resend.com](https://resend.com)
   - Verify your domain or use Resend's shared domain for testing
   - Generate an API key from the Resend dashboard

2. **Configure Environment Variables**

   - Add your Resend API key to the `.env` file:

   ```
   RESEND_API_KEY=re_your_api_key_here
   ```

3. **Verify Domain (Recommended for Production)**
   - Follow Resend's instructions to verify your domain
   - Update the `from` email address in `src/email/index.tsx` to use your verified domain

## How It Works

The email system is built with the following components:

1. **Email Templates** (`src/email/templates/`)

   - React components that define the structure and styling of emails
   - Uses `@react-email/components` for email-safe React components

2. **Email Service** (`src/email/index.tsx`)

   - Handles rendering and sending emails using Resend
   - Provides a type-safe API for sending different types of emails

3. **Example Usage** (`src/email/example-usage.tsx`)
   - Demonstrates how to use the email service in your application

## Sending Emails

To send an email, use the `sendMail` function:

```typescript
import { sendMail, EmailTemplate } from "@/email"

// Send a verification email
await sendMail("user@example.com", EmailTemplate.EmailVerification, { code: "123456" })

// Send a password reset email
await sendMail("user@example.com", EmailTemplate.PasswordReset, {
  link: "https://example.com/reset-password?token=example-token",
})
```

## Adding New Email Templates

1. Create a new React component in the `src/email/templates/` directory
2. Add the template to the `EmailTemplate` enum in `src/email/index.tsx`
3. Add the template props to the `PropsMap` type
4. Add a case for the new template in the `getEmailTemplate` function

Example:

```typescript
// 1. Create new template component (src/email/templates/welcome.tsx)
export interface WelcomeTemplateProps {
  name: string;
}

export const WelcomeTemplate = ({ name }: WelcomeTemplateProps) => {
  // Template JSX
};

// 2. Update EmailTemplate enum
export enum EmailTemplate {
  EmailVerification = "EmailVerification",
  PasswordReset = "PasswordReset",
  Welcome = "Welcome", // Add new template
}

// 3. Update PropsMap type
export type PropsMap = {
  [EmailTemplate.EmailVerification]: ComponentProps<typeof EmailVerificationTemplate>
  [EmailTemplate.PasswordReset]: ComponentProps<typeof ResetPasswordTemplate>
  [EmailTemplate.Welcome]: ComponentProps<typeof WelcomeTemplate> // Add new template
}

// 4. Update getEmailTemplate function
const getEmailTemplate = async <T extends EmailTemplate>(
  template: T,
  props: PropsMap[NoInfer<T>]
) => {
  switch (template) {
    // Existing cases...
    case EmailTemplate.Welcome:
      return {
        subject: "Welcome to Acme",
        react: <WelcomeTemplate {...(props as PropsMap[EmailTemplate.Welcome])} />,
        html: await render(
          <WelcomeTemplate {...(props as PropsMap[EmailTemplate.Welcome])} />
        ),
      }
    default:
      throw new Error("Invalid email template")
  }
}
```

## Testing Emails

You can use the example component at `src/email/example-usage.tsx` to test sending emails. This component provides a simple UI for sending test emails to verify your setup is working correctly.

## Advantages of Resend SMTP with React Email

- **Modern Developer Experience**: Build emails with React components
- **Type Safety**: TypeScript integration for error prevention
- **Responsive Design**: Templates work across all email clients
- **Reliable Delivery**: Resend's infrastructure ensures high deliverability
- **Analytics**: Track email opens, clicks, and other metrics through Resend's dashboard
- **Familiar API**: Uses the standard nodemailer interface that many developers are familiar with
- **Flexibility**: Can easily switch between different SMTP providers by changing the configuration
