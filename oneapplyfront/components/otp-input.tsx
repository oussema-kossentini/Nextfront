"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface OTPInputProps {
  length?: number
  onComplete?: (otp: string) => void
  className?: string
}

export function OTPInput({ length = 6, onComplete, className }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus the first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value

    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    // Update the OTP array
    const newOtp = [...otp]

    // Take only the last character if multiple characters are pasted
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    // If a digit was entered and we're not at the last input, focus the next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Check if OTP is complete
    const otpValue = newOtp.join("")
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // If backspace is pressed and the current input is empty, focus the previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // If left arrow is pressed, focus the previous input
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // If right arrow is pressed, focus the next input
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Only allow numbers
    if (!/^\d*$/.test(pastedData)) return

    // Fill the OTP array with the pasted digits
    const newOtp = [...otp]
    for (let i = 0; i < Math.min(length, pastedData.length); i++) {
      newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)

    // Focus the next empty input or the last input if all are filled
    const nextEmptyIndex = newOtp.findIndex((val) => !val)
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex
    inputRefs.current[focusIndex]?.focus()

    // Check if OTP is complete
    const otpValue = newOtp.join("")
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue)
    }
  }

  return (
    <div className={cn("flex justify-center gap-2", className)}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputRefs.current[index] = el)}
          className="w-12 h-14 text-center text-xl font-semibold border rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          aria-label={`Digit ${index + 1} of verification code`}
        />
      ))}
    </div>
  )
}

