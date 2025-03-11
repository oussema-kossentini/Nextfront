"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ForgotPassword() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send a request to your API
    // For this demo, we'll just simulate success
    if (email.includes("@")) {
      setIsSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        {isSubmitted ? (
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Check Your Email</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and click the link
                to reset your password.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                For demo purposes, you can{" "}
                <Link href="/reset-password/demo-token" className="font-medium underline">
                  click here
                </Link>{" "}
                to simulate clicking the reset link from your email.
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Didn't receive the email?{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="font-medium text-primary dark:text-[#64B5F6] hover:text-primary/90 dark:hover:text-[#64B5F6]/90"
                >
                  Try again
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Forgot your password?</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form
              className="space-y-6 bg-gray-50 border border-gray-200 dark:bg-[#1a2337] p-6 rounded-lg shadow-sm dark:shadow-none dark:border dark:border-[#292929]"
              onSubmit={handleSubmit}
            >
              <div className="rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email address
                  </label>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-primary dark:bg-[#1E88E5] hover:bg-primary/90 dark:hover:bg-[#1565C0] text-white dark:text-[#E0E0E0]"
                >
                  Send reset link
                </Button>
              </div>
            </form>

            <div className="text-center">
              <Link
                href="/sign-in"
                className="font-medium text-primary dark:text-[#64B5F6] hover:text-primary/90 dark:hover:text-[#64B5F6]/90"
              >
                Back to sign in
              </Link>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}

