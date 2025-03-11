"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="w-9 h-9 opacity-0" />
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`w-9 h-9 rounded-full transition-all duration-300 ${
        theme === "dark"
          ? "bg-[#1a2337] border-[#292929] hover:bg-[#232d45]"
          : "bg-gray-100 border-gray-200 hover:bg-gray-200"
      }`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-[#64B5F6] transition-transform duration-300 transform hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-300 transform hover:rotate-12" />
      )}
    </Button>
  )
}

