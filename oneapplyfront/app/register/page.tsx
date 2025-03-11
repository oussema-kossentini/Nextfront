"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { User2, Building2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Register() {
  const { t } = useLanguage()
  const { theme } = useTheme()

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className={`text-4xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Choose your role
            </h1>
            <p className={`text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Select how you want to use OneApply
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/register/intern">
              <motion.div
                whileHover={{ y: -4 }}
                className={`group relative rounded-xl p-8 text-center transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-[#1a2337] hover:bg-[#232d45] border border-[#292929]"
                    : "bg-gray-50 hover:bg-gray-50 border border-gray-200 hover:border-blue-500"
                }`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div
                    className={`p-4 rounded-full transition-colors duration-300 ${
                      theme === "dark"
                        ? "bg-[#232d45] text-[#64B5F6] group-hover:bg-[#2a364f]"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    <User2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3
                      className={`text-2xl font-semibold ${
                        theme === "dark" ? "text-white group-hover:text-[#64B5F6]" : "text-gray-900"
                      }`}
                    >
                      I'm an Intern
                    </h3>
                    <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                      Looking for internship opportunities
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>

            <Link href="/register/company">
              <motion.div
                whileHover={{ y: -4 }}
                className={`group relative rounded-xl p-8 text-center transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-[#1a2337] hover:bg-[#232d45] border border-[#292929]"
                    : "bg-gray-50 hover:bg-gray-50 border border-gray-200 hover:border-blue-500"
                }`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div
                    className={`p-4 rounded-full transition-colors duration-300 ${
                      theme === "dark"
                        ? "bg-[#232d45] text-[#64B5F6] group-hover:bg-[#2a364f]"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3
                      className={`text-2xl font-semibold ${
                        theme === "dark" ? "text-white group-hover:text-[#64B5F6]" : "text-gray-900"
                      }`}
                    >
                      I'm a Company
                    </h3>
                    <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Looking to hire interns</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>

          <div className="text-center">
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className={`font-medium transition-colors duration-300 ${
                  theme === "dark" ? "text-[#64B5F6] hover:text-blue-400" : "text-blue-600 hover:text-blue-700"
                }`}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

