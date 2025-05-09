"use client"

import * as React from "react"
import { EyeClosed, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input, type InputProps } from "@/components/ui/input"

import { cn } from "@/lib/utils"

const PasswordInputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          autoComplete="new-password"
          data-1p-ignore
          data-lpignore="true"
          data-form-type="other"
          spellCheck="false"
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={props.value === "" || props.disabled}
        >
          {showPassword ? (
            <Eye
              className="h-4 w-4"
              aria-hidden="true"
            />
          ) : (
            <EyeClosed
              className="h-4 w-4"
              aria-hidden="true"
            />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    )
  }
)
PasswordInputComponent.displayName = "PasswordInput"

export const PasswordInput = PasswordInputComponent
