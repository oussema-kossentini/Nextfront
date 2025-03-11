"use client"

import { Button } from "@/components/ui/button"
import { authService } from "@/services/auth-service"
import { useLanguage } from "@/contexts/language-context"

export function GoogleLogin() {
  const { t } = useLanguage()

  const handleGoogleLogin = () => {
    authService.initiateGoogleLogin()
  }

  return (
    <Button
      variant="outline"
      onClick={handleGoogleLogin}
      className="w-full dark:border-[#292929] dark:text-gray-300 dark:hover:bg-[#232d45]"
    >
      <svg className="mr-2 h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.033c0-3.332,2.701-6.033,6.033-6.033c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
      </svg>
      {t("auth.google")}
    </Button>
  )
}

