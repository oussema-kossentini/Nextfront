"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Shield, Lock, FileText, UserCheck, Bell, HelpCircle, ChevronDown, ChevronUp } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function PrivacyPolicyPage() {
  const { t, language } = useLanguage()
  const currentDate = new Date().toLocaleDateString(language === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const [openSections, setOpenSections] = useState({
    introduction: true,
    collection: false,
    usage: false,
    protection: false,
    sharing: false,
    rights: false,
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
      title: "Privacy Policy",
      effectiveDate: "Effective Date",
      introduction: {
        title: "Introduction",
        content: [
          "At ONE APPLY, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and disclose your personal information when you use our platform.",
          "By accessing or using ONE APPLY, you agree to the terms outlined in this policy.",
        ],
      },
      collection: {
        title: "Information We Collect",
        content: [
          "We collect different types of information, including:",
          "Personal Information: Name, email, phone number, date of birth, CV, skills, certifications, and job preferences.",
          "Usage Data: IP address, browser type, pages visited, and interaction data.",
          "Cookies and Tracking Data: To improve user experience and site performance.",
        ],
      },
      usage: {
        title: "How We Use Your Information",
        content: [
          "We use your information for:",
          "Matching job candidates with suitable job offers based on AI-powered scoring.",
          "Enabling recruiters to view and contact top-ranked candidates.",
          "Improving our services, security, and user experience.",
          "Complying with legal requirements.",
        ],
      },
      protection: {
        title: "How We Protect Your Data",
        content: [
          "We implement security measures to protect your personal data, including:",
          "Encryption of sensitive information.",
          "Secure access controls.",
          "Regular system monitoring and updates.",
        ],
      },
      sharing: {
        title: "Sharing Your Data",
        content: [
          "We do not sell or rent your personal data. However, we may share it with:",
          "Recruiters and employers when you apply for job opportunities.",
          "Service providers (such as cloud hosting and analytics tools).",
          "Authorities if required by law.",
        ],
      },
      rights: {
        title: "Your Rights",
        content: [
          "As a user, you have the right to:",
          "Access, modify, or delete your personal data.",
          "Withdraw consent for data processing.",
          "Request a copy of the information we store about you.",
          "To exercise these rights, contact us at privacy@oneapply.com.",
        ],
      },
      updates: {
        title: "Changes to This Privacy Policy",
        content: [
          "We may update this policy from time to time. We will notify you of significant changes via email or platform notifications.",
        ],
      },
      lastUpdated: "Last Updated",
      contact: "For any questions, contact us at",
      contactEmail: "privacy@oneapply.com",
    },
    fr: {
      title: "Politique de Confidentialité",
      effectiveDate: "Date d'entrée en vigueur",
      introduction: {
        title: "Introduction",
        content: [
          "Chez ONE APPLY, nous nous engageons à protéger votre vie privée. Cette Politique de Confidentialité explique comment nous collectons, utilisons, stockons et divulguons vos informations personnelles lorsque vous utilisez notre plateforme.",
          "En accédant ou en utilisant ONE APPLY, vous acceptez les termes décrits dans cette politique.",
        ],
      },
      collection: {
        title: "Informations que nous collectons",
        content: [
          "Nous collectons différents types d'informations, notamment :",
          "Informations personnelles : Nom, email, numéro de téléphone, date de naissance, CV, compétences, certifications et préférences d'emploi.",
          "Données d'utilisation : Adresse IP, type de navigateur, pages visitées et données d'interaction.",
          "Cookies et données de suivi : Pour améliorer l'expérience utilisateur et les performances du site.",
        ],
      },
      usage: {
        title: "Comment nous utilisons vos informations",
        content: [
          "Nous utilisons vos informations pour :",
          "Mettre en relation les candidats avec des offres d'emploi adaptées grâce à un scoring basé sur l'IA.",
          "Permettre aux recruteurs de consulter et de contacter les candidats les mieux classés.",
          "Améliorer nos services, la sécurité et l'expérience utilisateur.",
          "Se conformer aux exigences légales.",
        ],
      },
      protection: {
        title: "Comment nous protégeons vos données",
        content: [
          "Nous mettons en œuvre des mesures de sécurité pour protéger vos données personnelles, notamment :",
          "Chiffrement des informations sensibles.",
          "Contrôles d'accès sécurisés.",
          "Surveillance et mises à jour régulières du système.",
        ],
      },
      sharing: {
        title: "Partage de vos données",
        content: [
          "Nous ne vendons ni ne louons vos données personnelles. Cependant, nous pouvons les partager avec :",
          "Les recruteurs et employeurs lorsque vous postulez à des offres d'emploi.",
          "Des prestataires de services (comme l'hébergement cloud et les outils d'analyse).",
          "Les autorités si la loi l'exige.",
        ],
      },
      rights: {
        title: "Vos droits",
        content: [
          "En tant qu'utilisateur, vous avez le droit de :",
          "Accéder, modifier ou supprimer vos données personnelles.",
          "Retirer votre consentement au traitement des données.",
          "Demander une copie des informations que nous conservons à votre sujet.",
          "Pour exercer ces droits, contactez-nous à privacy@oneapply.com.",
        ],
      },
      updates: {
        title: "Modifications de cette politique de confidentialité",
        content: [
          "Nous pouvons mettre à jour cette politique de temps à autre. Nous vous informerons des changements importants par email ou par des notifications sur la plateforme.",
        ],
      },
      lastUpdated: "Dernière mise à jour",
      contact: "Pour toute question, contactez-nous à",
      contactEmail: "privacy@oneapply.com",
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
                <Shield className="h-8 w-8 text-white" />
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

            {/* Collection Section */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("collection")}
                className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{content.collection.title}</h2>
                </div>
                {openSections.collection ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {openSections.collection && (
                <div className="mt-4 bg-white p-6 rounded-lg shadow-sm">
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {content.collection.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Usage Section */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("usage")}
                className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{content.usage.title}</h2>
                </div>
                {openSections.usage ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {openSections.usage && (
                <div className="mt-4 bg-white p-6 rounded-lg shadow-sm">
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {content.usage.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Protection Section */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("protection")}
                className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{content.protection.title}</h2>
                </div>
                {openSections.protection ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {openSections.protection && (
                <div className="mt-4 bg-white p-6 rounded-lg shadow-sm">
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {content.protection.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sharing Section */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("sharing")}
                className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <HelpCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{content.sharing.title}</h2>
                </div>
                {openSections.sharing ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {openSections.sharing && (
                <div className="mt-4 bg-white p-6 rounded-lg shadow-sm">
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {content.sharing.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Rights Section */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("rights")}
                className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{content.rights.title}</h2>
                </div>
                {openSections.rights ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {openSections.rights && (
                <div className="mt-4 bg-white p-6 rounded-lg shadow-sm">
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {content.rights.content.map((item, index) => (
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
                    <Bell className="h-5 w-5 text-primary" />
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
                <a href="mailto:privacy@oneapply.com" className="text-primary hover:underline">
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

