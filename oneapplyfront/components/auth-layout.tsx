"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "next-themes"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()
  const { theme } = useTheme()

  return (
    <div
      className={`min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ${language === "ar" ? "rtl" : "ltr"}`}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col items-center gap-4">
          <Link href="/" className="flex flex-col items-center gap-2">
            <Image
              src={theme === "dark" ? "/one-apply-logo-dark.svg" : "/one-apply-logo.svg"}
              alt="ONE APPLY"
              width={200}
              height={80}
              className="h-20 w-auto"
              priority
            />
          </Link>
          <LanguageSelector />
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">{children}</div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} ONE APPLY. All rights reserved.</p>
      </div>
    </div>
  )
}

