"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { PasswordStrength } from "@/components/password-strength"

interface PasswordInputProps {
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  showStrengthMeter?: boolean
  autoComplete?: string
  required?: boolean
  className?: string
}

export function PasswordInput({
  id,
  name,
  value,
  onChange,
  placeholder = "Password",
  showStrengthMeter = false,
  autoComplete = "new-password",
  required = false,
  className = "",
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="relative">
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          autoComplete={autoComplete}
          required={required}
          className={className}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={togglePasswordVisibility}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-gray-500" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4 text-gray-500" aria-hidden="true" />
          )}
          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
        </Button>
      </div>
      {showStrengthMeter && <PasswordStrength password={value} />}
    </div>
  )
}

