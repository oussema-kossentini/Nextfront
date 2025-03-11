"use client"

import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "next-themes"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const { theme } = useTheme()

  return (
    <div
      className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-300 ${
        theme === "dark" ? "bg-[#1E1E1E] border border-[#292929]" : "bg-gray-100"
      }`}
    >
      <button
        onClick={() => setLanguage("en")}
        className={`text-xs sm:text-sm font-medium transition-colors duration-300 px-1 ${
          language === "en"
            ? theme === "dark"
              ? "text-[#64B5F6] font-semibold"
              : "text-primary font-semibold"
            : theme === "dark"
              ? "text-[#B0B0B0] hover:text-[#E0E0E0]"
              : "text-gray-600 hover:text-gray-900"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className={theme === "dark" ? "text-[#292929]" : "text-gray-400"}>|</span>
      <button
        onClick={() => setLanguage("fr")}
        className={`text-xs sm:text-sm font-medium transition-colors duration-300 px-1 ${
          language === "fr"
            ? theme === "dark"
              ? "text-[#64B5F6] font-semibold"
              : "text-primary font-semibold"
            : theme === "dark"
              ? "text-[#B0B0B0] hover:text-[#E0E0E0]"
              : "text-gray-600 hover:text-gray-900"
        }`}
        aria-label="Switch to French"
      >
        FR
      </button>
      <span className={theme === "dark" ? "text-[#292929]" : "text-gray-400"}>|</span>
      <button
        onClick={() => setLanguage("ar")}
        className={`text-xs sm:text-sm font-medium transition-colors duration-300 px-1 ${
          language === "ar"
            ? theme === "dark"
              ? "text-[#64B5F6] font-semibold"
              : "text-primary font-semibold"
            : theme === "dark"
              ? "text-[#B0B0B0] hover:text-[#E0E0E0]"
              : "text-gray-600 hover:text-gray-900"
        }`}
        aria-label="Switch to Arabic"
      >
        AR
      </button>
    </div>
  )
}

