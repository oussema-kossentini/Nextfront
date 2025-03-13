"use client"

import React, {useEffect} from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { PasswordInput } from "@/components/password-input"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import "@/app/phone-input.css"
import { useLanguage } from "@/contexts/language-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { authService } from "@/services/auth-service"
import type { E164Number } from "react-phone-number-input";
import {useUser} from "@/contexts/UserContext";
import {encryptData, generateKey} from "@/app/utils/crypto-utils";

export default function RegisterIntern() {
  useEffect(() => {
    localStorage.clear();
    console.log("🗑️ LocalStorage vidé !");
  }, []);

  const { t } = useLanguage()

  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
    birthDate: "",
  })
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")


    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsSubmitting(false)
      return
    }

    try {
      const formattedBirthDate = formData.birthDate ? new Date(formData.birthDate).toISOString().split("T")[0] : "";

      // Register mtaa intern
      const data = await authService.registerIntern({
        ...formData,
        phone: phoneNumber,
        role: "intern",
        birthDate: formattedBirthDate,
      })


      localStorage.setItem("emailvrf", formData.email);
      //await authService.sendOtp(formData.email);
      console.log("✅ Email stocké dans pendingEmail:", formData.email); // ✅ Vérification
      localStorage.setItem("user_roleRegister", "Intern");

      // Redirect to verify email page
      router.push("/verify-email")
    } catch (error: any) {
      console.error("Registration error:", error)
      setError(error.message || "Registration failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="w-full max-w-md mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {t("registerIntern.title")}
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t("registerIntern.subtitle")}</p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md">{error}</div>
            )}

            <form
              className="mt-8 space-y-6 bg-gray-50 border border-gray-200 dark:bg-[#1a2337] p-6 rounded-lg shadow-sm dark:shadow-none dark:border dark:border-[#292929]"
              onSubmit={handleSubmit}
            >
              <div className="space-y-4 rounded-md">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t("registerIntern.firstName")}*
                    </label>
                    <Input
                      id="first-name"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      className="mt-1"
                      placeholder={t("registerIntern.firstName")}
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t("registerIntern.lastName")}*
                    </label>
                    <Input
                      id="last-name"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      className="mt-1"
                      placeholder={t("registerIntern.lastName")}
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("registerIntern.email")}*
                  </label>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1"
                    placeholder={t("registerIntern.email")}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("registerIntern.password")}*
                  </label>
                  <PasswordInput
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    showStrengthMeter
                    className="mt-1"
                    placeholder={t("registerIntern.password")}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {t("registerIntern.passwordRequirements")}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {t("registerIntern.confirmPassword")}*
                  </label>
                  <PasswordInput
                    id="confirm-password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder={t("registerIntern.confirmPassword")}
                  />
                </div>

                <div>
                  <label htmlFor="birth-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("registerIntern.birthDate")}*
                  </label>
                  <Input
                    id="birth-date"
                    name="birthDate"
                    type="date"
                    required
                    className="mt-1"
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 16)).toISOString().split("T")[0]}
                    min={new Date(new Date().setFullYear(new Date().getFullYear() - 100)).toISOString().split("T")[0]}
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("registerIntern.phone")}
                  </label>
                  <div className="mt-1">
                    <PhoneInput
                      international
                      countryCallingCodeEditable={false}
                      defaultCountry="US"
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                      name="phone"
                      id="phone"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="profile-image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("registerIntern.profileImage")}
                  </label>
                  <Input id="profile-image" name="image" type="file" accept="image/*" className="mt-1" />
                </div>
              </div>

              <div className="flex items-center">
                <Checkbox id="terms" required />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  {t("registerIntern.terms")}{" "}
                  <Link
                    href="/terms-of-service"
                    className="font-medium text-primary dark:text-[#64B5F6] hover:text-primary/90 dark:hover:text-[#64B5F6]/90"
                  >
                    {t("registerIntern.termsLink")}
                  </Link>{" "}
                  {t("registerIntern.and")}{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-medium text-primary dark:text-[#64B5F6] hover:text-primary/90 dark:hover:text-[#64B5F6]/90"
                  >
                    {t("registerIntern.privacyLink")}
                  </Link>
                </label>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-primary dark:bg-[#1E88E5] hover:bg-primary/90 dark:hover:bg-[#1565C0] text-white dark:text-[#E0E0E0]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("registerIntern.creatingAccount") : t("registerIntern.createAccount")}
                </Button>
              </div>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("auth.alreadyHaveAccount")}{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-primary dark:text-[#64B5F6] hover:text-primary/90 dark:hover:text-[#64B5F6]/90"
                >
                  {t("auth.signIn")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

