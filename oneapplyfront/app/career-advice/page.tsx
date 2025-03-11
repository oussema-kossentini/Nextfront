"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { AdviceCard } from "@/components/advice-card"
import { motion } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function CareerAdvicePage() {
  const { t } = useLanguage()
  const [selectedCard, setSelectedCard] = useState<number | null>(null)

  const adviceCards = [
    {
      id: 1,
      icon: "📄",
      title: t("careerAdvice.cv.title"),
      shortDescription: t("careerAdvice.cv.shortDescription"),
      fullDescription: t("careerAdvice.cv.fullDescription"),
    },
    {
      id: 2,
      icon: "💡",
      title: t("careerAdvice.profile.title"),
      shortDescription: t("careerAdvice.profile.shortDescription"),
      fullDescription: t("careerAdvice.profile.fullDescription"),
    },
    {
      id: 3,
      icon: "🧠",
      title: t("careerAdvice.interview.title"),
      shortDescription: t("careerAdvice.interview.shortDescription"),
      fullDescription: t("careerAdvice.interview.fullDescription"),
    },
    {
      id: 4,
      icon: "📊",
      title: t("careerAdvice.trends.title"),
      shortDescription: t("careerAdvice.trends.shortDescription"),
      fullDescription: t("careerAdvice.trends.fullDescription"),
    },
    {
      id: 5,
      icon: "📝",
      title: t("careerAdvice.experts.title"),
      shortDescription: t("careerAdvice.experts.shortDescription"),
      fullDescription: t("careerAdvice.experts.fullDescription"),
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white dark:bg-gray-800 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1E3A8A]">{t("careerAdvice.title")}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t("careerAdvice.subtitle")}</p>
          </div>
        </section>

        {/* Advice Cards Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {adviceCards.map((card) => (
                <motion.div key={card.id} variants={item}>
                  <AdviceCard
                    icon={card.icon}
                    title={card.title}
                    shortDescription={card.shortDescription}
                    fullDescription={card.fullDescription}
                    isSelected={selectedCard === card.id}
                    onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white dark:bg-gray-800 py-16">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1E3A8A]">{t("careerAdvice.cta.title")}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {t("careerAdvice.cta.description")}
            </p>
            <Link href="/upload-cv">
              <Button
                size="lg"
                className="bg-[#10B981] hover:bg-[#10B981]/90 text-white px-8 py-6 h-auto text-lg rounded-lg"
              >
                {t("careerAdvice.cta.button")}
              </Button>
            </Link>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 bg-[#1E3A8A] text-white">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("careerAdvice.newsletter.title")}</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">{t("careerAdvice.newsletter.description")}</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t("careerAdvice.newsletter.placeholder")}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
              />
              <Button className="bg-[#10B981] hover:bg-[#10B981]/90 text-white">
                {t("careerAdvice.newsletter.button")}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

