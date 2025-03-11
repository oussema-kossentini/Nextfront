"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/password-input"
import { useLanguage } from "@/contexts/language-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ResetPasswordConfirm({ params }: { params: { token: string } }) {
  const { t } = useLanguage()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would validate the token and update the password
    // For this demo, we'll just simulate success
    if (password === confirmPassword && password.length >= 8) {
      setIsSuccess(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        {isSuccess ? (
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Password Reset Successful
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Your password has been successfully reset. You can now sign in with your new password.
              </p>
            </div>

            <div className="flex justify-center">
              <Link href="/sign-in">
                <Button className="bg-primary dark:bg-[#1E88E5] hover:bg-primary/90 dark:hover:bg-[#1565C0] text-white dark:text-[#E0E0E0]">
                  Go to Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Reset Your Password</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Please enter your new password below.</p>
            </div>

            <form
              className="space-y-6 bg-gray-50 border border-gray-200 dark:bg-[#1a2337] p-6 rounded-lg shadow-sm dark:shadow-none dark:border dark:border-[#292929]"
              onSubmit={handleSubmit}
            >
              <div className="space-y-4 rounded-md shadow-sm">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    New Password*
                  </label>
                  <PasswordInput
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    showStrengthMeter
                    className="mt-1"
                    placeholder="New password"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Password must be at least 8 characters and include uppercase, lowercase, numbers, and special
                    characters.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Confirm New Password*
                  </label>
                  <PasswordInput
                    id="confirm-password"
                    name="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="mt-1"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-primary dark:bg-[#1E88E5] hover:bg-primary/90 dark:hover:bg-[#1565C0] text-white dark:text-[#E0E0E0]"
                >
                  Reset Password
                </Button>
              </div>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Remember your password?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-primary dark:text-[#64B5F6] hover:text-primary/90 dark:hover:text-[#64B5F6]/90"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}

