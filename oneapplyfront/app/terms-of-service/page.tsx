"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { FileText, Users, Briefcase, XCircle, AlertTriangle, RefreshCw, ChevronDown, ChevronUp } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function TermsOfServicePage() {
  const { t, language } = useLanguage()
  const currentDate = new Date().toLocaleDateString(language === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const [openSections, setOpenSections] = useState({
    introduction: true,
    eligibility: false,
    responsibilities: false,
    services: false,
    termination: false,
    liability: false,
    updates: false,
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const translations = {
    en: {
      title: "Terms of Service",
      effectiveDate: "Effective Date",
      introduction: {
        title: "Introduction",
        content: [
          'Welcome to ONE APPLY. These Terms of Service ("Terms") govern your use of our platform. By signing up or using our services, you agree to be bound by these Terms.',
          "If you do not agree with any part of these Terms, please do not use our platform.",
        ],
      },
      eligibility: {
        title: "Eligibility",
        content: [
          "You must be at least 18 years old or have parental consent to use our platform. By creating an account, you confirm that you meet these requirements.",
        ],
      },
      responsibilities: {
        title: "User Responsibilities",
        content: [
          "When using ONE APPLY, you agree to:",
          "Provide accurate and truthful information (CV, skills, certifications, etc.).",
          "Keep your login credentials confidential.",
          "Use the platform only for legitimate job application and hiring purposes.",
          "Not engage in fraudulent or misleading activities.",
          "Prohibited actions include:",
          "Impersonating another person.",
          "Posting fake job offers.",
          "Attempting to hack or disrupt platform operations.",
        ],
      },
      services: {
        title: "Our Services",
        content: [
          "ONE APPLY acts as an AI-powered job-matching platform, helping candidates find suitable job offers and assisting recruiters in selecting the best candidates.",
          "We do not guarantee job placement and are not responsible for employer decisions.",
        ],
      },
      termination: {
        title: "Account Termination",
        content: [
          "We reserve the right to suspend or terminate your account if you:",
          "Violate these Terms.",
          "Engage in fraudulent or abusive behavior.",
          "Attempt to manipulate the AI scoring system.",
          "If your account is suspended, you may appeal by contacting us at support@oneapply.com.",
        ],
      },
      liability: {
        title: "Liability Disclaimer",
        content: [
          "We strive to provide accurate and efficient job-matching services. However:",
          "We do not guarantee employment.",
          "We are not responsible for interactions between recruiters and candidates.",
          "We are not liable for third-party job postings or hiring decisions.",
          "You use ONE APPLY at your own risk.",
        ],
      },
      updates: {
        title: "Changes to These Terms",
        content: [
          "We may update these Terms periodically. By continuing to use our platform, you agree to the new terms.",
        ],
      },
      lastUpdated: "Last Updated",
      contact: "For questions or support, contact us at",
      contactEmail: "support@oneapply.com",
    },
    fr: {
      title: "Conditions d'Utilisation",
      effectiveDate: "Date d'entrée en vigueur",
      introduction: {
        title: "Introduction",
        content: [
          "Bienvenue sur ONE APPLY. Ces Conditions d'Utilisation (\"Conditions\") régissent votre utilisation de notre plateforme. En vous inscrivant ou en utilisant nos services, vous acceptez d'être lié par ces Conditions.",
          "Si vous n'êtes pas d'accord avec une partie de ces Conditions, veuillez ne pas utiliser notre plateforme.",
        ],
      },
      eligibility: {
        title: "Éligibilité",
        content: [
          "Vous devez avoir au moins 18 ans ou avoir le consentement parental pour utiliser notre plateforme. En créant un compte, vous confirmez que vous remplissez ces conditions.",
        ],
      },
      responsibilities: {
        title: "Responsabilités de l'utilisateur",
        content: [
          "En utilisant ONE APPLY, vous acceptez de :",
          "Fournir des informations exactes et véridiques (CV, compétences, certifications, etc.).",
          "Garder vos identifiants de connexion confidentiels.",
          "Utiliser la plateforme uniquement à des fins légitimes de candidature et de recrutement.",
          "Ne pas vous engager dans des activités frauduleuses ou trompeuses.",
          "Les actions interdites comprennent :",
          "Usurper l'identité d'une autre personne.",
          "Publier de fausses offres d'emploi.",
          "Tenter de pirater ou de perturber les opérations de la plateforme.",
        ],
      },
      services: {
        title: "Nos services",
        content: [
          "ONE APPLY agit comme une plateforme de mise en relation d'emploi alimentée par l'IA, aidant les candidats à trouver des offres d'emploi adaptées et assistant les recruteurs dans la sélection des meilleurs candidats.",
          "Nous ne garantissons pas le placement en emploi et ne sommes pas responsables des décisions des employeurs.",
        ],
      },
      termination: {
        title: "Résiliation du compte",
        content: [
          "Nous nous réservons le droit de suspendre ou de résilier votre compte si vous :",
          "Violez ces Conditions.",
          "Vous engagez dans un comportement frauduleux ou abusif.",
          "Tentez de manipuler le système de scoring IA.",
          "Si votre compte est suspendu, vous pouvez faire appel en nous contactant à support@oneapply.com.",
        ],
      },
      liability: {
        title: "Clause de non-responsabilité",
        content: [
          "Nous nous efforçons de fournir des services de mise en relation d'emploi précis et efficaces. Cependant :",
          "Nous ne garantissons pas l'emploi.",
          "Nous ne sommes pas responsables des interactions entre recruteurs et candidats.",
          "Nous ne sommes pas responsables des offres d'emploi tierces ou des décisions d'embauche.",
          "Vous utilisez ONE APPLY à vos propres risques.",
        ],
      },
      updates: {
        title: "Modifications de ces conditions",
        content: [
          "Nous pouvons mettre à jour ces Conditions périodiquement. En continuant à utiliser notre plateforme, vous acceptez les nouvelles conditions.",
        ],
      },
      lastUpdated: "Dernière mise à jour",
      contact: "Pour toute question ou assistance, contactez-nous à",
      contactEmail: "support@oneapply.com",
    },
  }

  const content = language === "fr" ? translations.fr : translations.en

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <SiteHeader />

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-8">
          {/* Hero Section */}
          <div className="bg-primary text-white rounded-lg p-8 mb-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              {content.effectiveDate}: {currentDate}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Introduction Section */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("introduction")}
                className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{content.introduction.title}</h2>
                </div>
                {openSections.introduction ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {openSections.introduction && (
                <div className="mt-4 bg-white p-6 rounded-lg shadow-sm">
                  {content.introduction.content.map((paragraph, index) => (
                    <p key={index} className="text-gray-700 mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Eligibility Section */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("eligibility")}
                className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{content.eligibility.title}</h2>
                </div>
                {openSections.eligibility ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {openSections.eligibility && (
                <div className="mt-4 bg-white p-6 rounded-lg shadow-sm">
                  {content.eligibility.content.map((paragraph, index) => (
                    <p key={index} className="text-gray-700 mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Responsibilities Section */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("responsibilities")}
                className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{content.responsibilities.title}</h2>
                </div>
                {openSections.responsibilities ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {openSections.responsibilities && (
                <div className="mt-4 bg-white p-6 rounded-lg shadow-sm">
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {content.responsibilities.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Services Section */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("services")}
                className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{content.services.title}</h2>
                </div>
                {openSections.services ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {openSections.services && (
                <div className="mt-4 bg-white p-6 rounded-lg shadow-sm">
                  {content.services.content.map((paragraph, index) => (
                    <p key={index} className="text-gray-700 mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Termination Section */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("termination")}
                className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{content.termination.title}</h2>
                </div>
                {openSections.termination ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {openSections.termination && (
                <div className="mt-4 bg-white p-6 rounded-lg shadow-sm">
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {content.termination.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Liability Section */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("liability")}
                className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{content.liability.title}</h2>
                </div>
                {openSections.liability ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {openSections.liability && (
                <div className="mt-4 bg-white p-6 rounded-lg shadow-sm">
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {content.liability.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Updates Section */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("updates")}
                className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <RefreshCw className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{content.updates.title}</h2>
                </div>
                {openSections.updates ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {openSections.updates && (
                <div className="mt-4 bg-white p-6 rounded-lg shadow-sm">
                  {content.updates.content.map((paragraph, index) => (
                    <p key={index} className="text-gray-700 mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="mt-10 bg-gray-50 p-6 rounded-lg shadow-sm text-center">
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">{content.lastUpdated}:</span> {currentDate}
              </p>
              <p className="text-gray-700">
                {content.contact}:{" "}
                <a href="mailto:support@oneapply.com" className="text-primary hover:underline">
                  {content.contactEmail}
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}

