"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export function PartnersSection() {
  const { t } = useLanguage()

  const partners = [
    { id: 1, name: "Partner 1" },
    { id: 2, name: "Partner 2" },
    { id: 3, name: "Partner 3" },
    { id: 4, name: "Partner 4" },
    { id: 5, name: "Partner 5" },
  ]

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">{t("partners.title")}</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div key={partner.id} className="w-24 h-12 relative flex items-center justify-center">
              <Image src="/placeholder.svg" alt={partner.name} width={100} height={40} className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

