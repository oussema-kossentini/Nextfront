"use client"

import { useState, useEffect } from "react"

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0)
  const [message, setMessage] = useState("")

  useEffect(() => {
    calculateStrength(password)
  }, [password])

  const calculateStrength = (password: string) => {
    // Start with a base score
    let score = 0

    if (!password) {
      setStrength(0)
      setMessage("")
      return
    }

    // Length check
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1

    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1 // Has uppercase
    if (/[a-z]/.test(password)) score += 1 // Has lowercase
    if (/[0-9]/.test(password)) score += 1 // Has number
    if (/[^A-Za-z0-9]/.test(password)) score += 1 // Has special char

    // Set the final score (0-4)
    const finalScore = Math.min(4, Math.floor(score / 1.5))
    setStrength(finalScore)

    // Set appropriate message
    switch (finalScore) {
      case 0:
        setMessage("Too weak")
        break
      case 1:
        setMessage("Weak")
        break
      case 2:
        setMessage("Fair")
        break
      case 3:
        setMessage("Good")
        break
      case 4:
        setMessage("Strong")
        break
      default:
        setMessage("")
    }
  }

  const getColor = () => {
    switch (strength) {
      case 0:
        return "bg-gray-200"
      case 1:
        return "bg-red-500"
      case 2:
        return "bg-orange-500"
      case 3:
        return "bg-yellow-500"
      case 4:
        return "bg-green-500"
      default:
        return "bg-gray-200"
    }
  }

  return (
    <div className="mt-1 space-y-2">
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div className={`transition-all duration-300 ${getColor()}`} style={{ width: `${(strength / 4) * 100}%` }} />
      </div>
      {message && (
        <p
          className={`text-xs ${strength <= 1 ? "text-red-500" : strength === 2 ? "text-orange-500" : strength === 3 ? "text-yellow-600" : "text-green-600"}`}
        >
          {message}
        </p>
      )}
    </div>
  )
}

