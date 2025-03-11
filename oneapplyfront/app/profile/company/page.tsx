"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe, Mail, Phone, MapPin, Building, Users, Edit, ExternalLink, Calendar } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useLanguage } from "@/contexts/language-context"
import { authService } from "@/services/auth-service"
import { useRouter } from "next/navigation"

export default function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const { t } = useLanguage()
  const router = useRouter()

  // Vérifier l'authentification au chargement
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push("/sign-in")
    }
  }, [router])

  // Ajouter cet effet pour réagir aux changements de langue
  useEffect(() => {
    const handleLanguageChange = () => {
      // Forcer une mise à jour du composant lorsque la langue change
      setIsEditing(isEditing)
    }

    window.addEventListener("languageChange", handleLanguageChange)

    return () => {
      window.removeEventListener("languageChange", handleLanguageChange)
    }
  }, [isEditing])

  // Données de profil mockées (dans une application réelle, ces données viendraient d'une API)
  const mockCompanyProfile = {
    name: "Tech Innovations Inc.",
    industry: "Technology & Software Development",
    location: "San Francisco, CA",
    logo: "/placeholder.svg?height=200&width=200",
    email: "careers@techinnovations.com",
    phone: "(415) 555-0123",
    website: "https://techinnovations.com",
    founded: "2015",
    size: "50-200 employees",
    about:
      "Tech Innovations Inc. is a leading software development company specializing in AI-powered solutions for businesses. We're committed to creating innovative products that transform how companies operate.",
    openPositions: [
      {
        title: "Senior Software Engineer",
        type: "Full-time",
        location: "San Francisco, CA",
        department: "Engineering",
        posted: "2 days ago",
      },
      {
        title: "UX/UI Designer",
        type: "Full-time",
        location: "Remote",
        department: "Design",
        posted: "1 week ago",
      },
      {
        title: "Marketing Manager",
        type: "Full-time",
        location: "San Francisco, CA",
        department: "Marketing",
        posted: "3 days ago",
      },
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Flexible work hours and remote options",
      "Professional development budget",
      "Regular team events and activities",
    ],
    social: {
      linkedin: "tech-innovations",
      twitter: "@techinnovations",
      facebook: "techinnovationsinc",
    },
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <SiteHeader />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Company Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Logo */}
                <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                  <Image
                    src={mockCompanyProfile.logo || "/placeholder.svg"}
                    alt={mockCompanyProfile.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Basic Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {mockCompanyProfile.name}
                  </h1>
                  <p className="text-primary font-medium mb-2">{mockCompanyProfile.industry}</p>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-400 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>{mockCompanyProfile.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Button variant="outline" className="gap-2">
                      <Mail className="h-4 w-4" />
                      {t("profile.contact")}
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Globe className="h-4 w-4" />
                      {t("profile.visitWebsite")}
                    </Button>
                    {!isEditing && (
                      <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
                        <Edit className="h-4 w-4" />
                        {t("profile.editProfile")}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Company Details */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">{t("profile.companyDetails")}</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Building className="h-4 w-4" />
                      <span>
                        {t("profile.foundedIn")} {mockCompanyProfile.founded}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>{mockCompanyProfile.size}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Mail className="h-4 w-4" />
                      <span>{mockCompanyProfile.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Phone className="h-4 w-4" />
                      <span>{mockCompanyProfile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Globe className="h-4 w-4" />
                      <Link href={mockCompanyProfile.website} className="hover:text-primary">
                        {mockCompanyProfile.website}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">{t("profile.benefitsAndPerks")}</h2>
                  <ul className="space-y-2">
                    {mockCompanyProfile.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social Links */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">{t("profile.connectWithUs")}</h2>
                  <div className="space-y-3">
                    <Link
                      href={`https://linkedin.com/company/${mockCompanyProfile.social.linkedin}`}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>LinkedIn</span>
                    </Link>
                    <Link
                      href={`https://twitter.com/${mockCompanyProfile.social.twitter}`}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Twitter</span>
                    </Link>
                    <Link
                      href={`https://facebook.com/${mockCompanyProfile.social.facebook}`}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Facebook</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="md:col-span-2 space-y-6">
                {/* About */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">{t("profile.aboutUs")}</h2>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{mockCompanyProfile.about}</p>
                </div>

                {/* Open Positions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-6">{t("profile.openPositions")}</h2>
                  <div className="space-y-4">
                    {mockCompanyProfile.openPositions.map((position, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">{position.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {position.department} • {position.type} • {position.location}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            {t("profile.applyNow")}
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {t("profile.posted")} {position.posted}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Company Culture */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">{t("profile.companyCulture")}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt={t("profile.officeCulture")}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt={t("profile.teamBuilding")}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

