"use client"

import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "next-themes"

export function SiteFooter() {
  const { t } = useLanguage()
  const { theme } = useTheme()

  return (
    <footer
      className={`py-8 md:py-12 border-t transition-all duration-300 ${
        theme === "dark" ? "bg-[#121212] border-[#292929]" : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <Image
                src={theme === "dark" ? "/one-apply-logo-dark.svg" : "/one-apply-logo.svg"}
                alt="ONE APPLY"
                width={150}
                height={40}
                className="h-10 w-auto mb-4"
                priority
              />
            </Link>
            <p className={`text-sm ${theme === "dark" ? "text-[#B0B0B0]" : "text-gray-600"}`}>{t("footer.slogan")}</p>
          </div>

          <div>
            <h3 className={`font-bold mb-3 text-base ${theme === "dark" ? "text-[#E0E0E0]" : "text-gray-900"}`}>
              {t("footer.jobSeekers")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/company-reviews"
                  className={`transition-colors duration-300 text-sm ${
                    theme === "dark" ? "text-[#B0B0B0] hover:text-[#64B5F6]" : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {t("nav.companyReviews")}
                </Link>
              </li>
              <li>
                <Link
                  href="/career-advice"
                  className={`transition-colors duration-300 text-sm ${
                    theme === "dark" ? "text-[#B0B0B0] hover:text-[#64B5F6]" : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {t("footer.careerAdvice")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`transition-colors duration-300 text-sm ${
                    theme === "dark" ? "text-[#B0B0B0] hover:text-[#64B5F6]" : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {t("footer.salaryGuide")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`font-bold mb-3 text-base ${theme === "dark" ? "text-[#E0E0E0]" : "text-gray-900"}`}>
              {t("footer.company")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className={`transition-colors duration-300 text-sm ${
                    theme === "dark" ? "text-[#B0B0B0] hover:text-[#64B5F6]" : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`transition-colors duration-300 text-sm ${
                    theme === "dark" ? "text-[#B0B0B0] hover:text-[#64B5F6]" : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className={`transition-colors duration-300 text-sm ${
                    theme === "dark" ? "text-[#B0B0B0] hover:text-[#64B5F6]" : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {t("nav.faq")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className={`font-bold mb-3 text-base ${theme === "dark" ? "text-[#E0E0E0]" : "text-gray-900"}`}>
              {t("footer.contact")}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MapPin className={`h-5 w-5 shrink-0 mt-0.5 ${theme === "dark" ? "text-[#64B5F6]" : "text-primary"}`} />
                <span className={`text-sm ${theme === "dark" ? "text-[#B0B0B0]" : "text-gray-600"}`}>
                  123 Innovation Street, San Francisco, CA 94103
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className={`h-5 w-5 shrink-0 ${theme === "dark" ? "text-[#64B5F6]" : "text-primary"}`} />
                <a
                  href="mailto:contact@oneapply.com"
                  className={`transition-colors duration-300 text-sm ${
                    theme === "dark" ? "text-[#B0B0B0] hover:text-[#64B5F6]" : "text-gray-600 hover:text-primary"
                  }`}
                >
                  contact@oneapply.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className={`h-5 w-5 shrink-0 ${theme === "dark" ? "text-[#64B5F6]" : "text-primary"}`} />
                <a
                  href="tel:+14155552671"
                  className={`transition-colors duration-300 text-sm ${
                    theme === "dark" ? "text-[#B0B0B0] hover:text-[#64B5F6]" : "text-gray-600 hover:text-primary"
                  }`}
                >
                  +1 (415) 555-2671
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`mt-8 pt-6 text-center ${
            theme === "dark" ? "border-t border-[#292929] text-[#B0B0B0]" : "border-t border-gray-200 text-gray-600"
          }`}
        >
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ONE APPLY. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}

