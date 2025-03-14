"use client"

import React, {useEffect} from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PasswordInput } from "@/components/password-input"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import "@/app/phone-input.css"
import { useLanguage } from "@/contexts/language-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { authService } from "@/services/auth-service"
import {useUser} from "@/contexts/UserContext";
import {encryptData, generateKey} from "@/app/utils/crypto-utils";

export default function RegisterCompany() {
  useEffect(() => {
    localStorage.clear();
    console.log("🗑️ LocalStorage vidé !");
  }, []);

  const { t } = useLanguage()

  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    industryType: "",
    website: "",
  })
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [emailError, setEmailError] = useState("");
  const forbiddenDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com"];

  const isProfessionalEmail = (email: string) => {
    const domain = email.split("@")[1];
    return domain && !forbiddenDomains.includes(domain.toLowerCase());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (!isProfessionalEmail(value)) {
        setEmailError("Ce mail n'est pas un email professionnel.");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, industryType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    if (!isProfessionalEmail(formData.email)) {
      setError("Veuillez utiliser une adresse e-mail professionnelle.");
      setIsSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsSubmitting(false)
      return
    }

    try {
//const data crypt and store to local storage
      const data = await authService.registerCompany({
        ...formData,
        phone: phoneNumber,
        role: "company",

      })

      localStorage.setItem("emailvrf", formData.email);
      console.log("✅ Email stocké dans pendingEmail:", formData.email); // ✅ Vérification
      localStorage.setItem("emailvrf",formData.email)

      localStorage.setItem("user_roleRegister", "company");


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
                {t("registerCompany.title")}
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t("registerCompany.subtitle")}</p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md">{error}</div>
            )}

            <form
              className="mt-8 space-y-6 bg-gray-50 border border-gray-200 dark:bg-[#1a2337] p-6 rounded-lg shadow-sm dark:shadow-none dark:border dark:border-[#292929]"
              onSubmit={handleSubmit}
            >
              <div className="space-y-4 rounded-md">
                <div>
                  <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("registerCompany.companyName")}*
                  </label>
                  <Input
                    id="company-name"
                    name="companyName"
                    type="text"
                    required
                    className="mt-1"
                    placeholder={t("registerCompany.companyName")}
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("registerCompany.email")}*
                  </label>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`mt-1 ${emailError ? "border-red-500" : ""}`}
                    placeholder={t("registerCompany.email")}
                    value={formData.email}
                    onChange={handleChange}     />
                    {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}

                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("registerCompany.password")}*
                  </label>
                  <PasswordInput
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    showStrengthMeter
                    className="mt-1"
                    placeholder={t("registerCompany.password")}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {t("registerCompany.passwordRequirements")}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {t("registerCompany.confirmPassword")}*
                  </label>
                  <PasswordInput
                    id="confirm-password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder={t("registerCompany.confirmPassword")}
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("registerCompany.address")}*
                  </label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    required
                    className="mt-1"
                    placeholder={t("registerCompany.address")}
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="industry-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("registerCompany.industryType")}*
                  </label>
                  <Select name="industryType" required value={formData.industryType} onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder={t("registerCompany.selectIndustry")} />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#1a2337] dark:border-[#292929]">
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="media">Media & Entertainment</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("registerCompany.website")}
                  </label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    className="mt-1"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("registerCompany.phone")}
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
                  <label htmlFor="company-logo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("registerCompany.companyLogo")}
                  </label>
                  <Input id="company-logo" name="image" type="file" accept="image/*" className="mt-1" />
                </div>
              </div>

              <div className="flex items-center">
                <Checkbox id="terms" required />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  {t("registerCompany.terms")}{" "}
                  <Link
                    href="/terms-of-service"
                    className="font-medium text-primary dark:text-[#64B5F6] hover:text-primary/90 dark:hover:text-[#64B5F6]/90"
                  >
                    {t("registerCompany.termsLink")}
                  </Link>{" "}
                  {t("registerCompany.and")}{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-medium text-primary dark:text-[#64B5F6] hover:text-primary/90 dark:hover:text-[#64B5F6]/90"
                  >
                    {t("registerCompany.privacyLink")}
                  </Link>
                </label>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-primary dark:bg-[#1E88E5] hover:bg-primary/90 dark:hover:bg-[#1565C0] text-white dark:text-[#E0E0E0]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("registerCompany.creatingAccount") : t("registerCompany.createAccount")}
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

