"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/contexts/language-context"
import { authService } from "@/services/auth-service"
import { GoogleAuthService } from "@/services/google-auth-service"

export function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await authService.signIn(email, password)
      if (result.success) {
        // Rediriger vers la page de profil appropriée
        if (result.user.role === "company") {
          router.push("/profile/company")
        } else {
          router.push("/profile/intern")
        }
      } else {
        setError(result.error || "Une erreur s'est produite lors de la connexion")
      }
    } catch (error) {
      setError("Une erreur s'est produite lors de la connexion")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    GoogleAuthService.login()
  }

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{t("auth.signIn")}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {t("auth.dontHaveAccount")}{" "}
          <Link href="/register" className="text-primary hover:underline">
            {t("auth.createAccount")}
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">{t("auth.email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t("auth.password")}</Label>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              {t("auth.forgotPassword")}
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} />
          <Label htmlFor="remember" className="text-sm font-normal">
            {t("auth.rememberMe")}
          </Label>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "..." : t("auth.signInButton")}
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
            {t("auth.orContinueWith")}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <Button variant="outline" type="button" onClick={handleGoogleSignIn} className="w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
          {t("auth.google")}
        </Button>
      </div>
    </div>
  )
}

