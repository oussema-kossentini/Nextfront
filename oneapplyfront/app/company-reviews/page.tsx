"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

// Sample company data
const companies = [
  {
    id: 1,
    name: "Google",
    logo: "/placeholder.svg?height=64&width=64",
    rating: 4.5,
    reviews: 12543,
  },
  {
    id: 2,
    name: "Microsoft",
    logo: "/placeholder.svg?height=64&width=64",
    rating: 4.3,
    reviews: 8976,
  },
  {
    id: 3,
    name: "Apple",
    logo: "/placeholder.svg?height=64&width=64",
    rating: 4.4,
    reviews: 15234,
  },
  {
    id: 4,
    name: "Amazon",
    logo: "/placeholder.svg?height=64&width=64",
    rating: 3.9,
    reviews: 23456,
  },
  {
    id: 5,
    name: "Meta",
    logo: "/placeholder.svg?height=64&width=64",
    rating: 4.1,
    reviews: 7654,
  },
  {
    id: 6,
    name: "Netflix",
    logo: "/placeholder.svg?height=64&width=64",
    rating: 4.6,
    reviews: 4321,
  },
]

// Star Rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= rating
              ? "text-yellow-400 fill-yellow-400"
              : star - rating <= 0.5
                ? "text-yellow-400 fill-yellow-400/50"
                : "text-gray-300"
          }`}
        />
      ))}
    </div>
  )
}

export default function CompanyReviews() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Search Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">{t("companyReviews.title")}</h1>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder={t("companyReviews.searchPlaceholder")}
                      className="pl-10 py-6 text-lg w-full text-gray-900"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  {t("companyReviews.searchButton")}
                </Button>
              </div>

              <div className="mt-4 text-center">
                <Link href="/salaries" className="text-white hover:underline">
                  {t("companyReviews.salaryLink")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Companies Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-2xl font-bold mb-8">{t("companyReviews.mostSearched")}</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <div key={company.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <Image
                      src={company.logo || "/placeholder.svg"}
                      alt={company.name}
                      width={64}
                      height={64}
                      className="rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{company.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <StarRating rating={company.rating} />
                        <span className="text-sm text-gray-600">
                          {company.reviews} {t("companyReviews.reviews")}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <Link href={`/companies/${company.id}/salaries`} className="text-primary hover:underline">
                          {t("companyReviews.salaries")}
                        </Link>
                        <Link href={`/companies/${company.id}/questions`} className="text-primary hover:underline">
                          {t("companyReviews.questions")}
                        </Link>
                        <Link href={`/companies/${company.id}/jobs`} className="text-primary hover:underline">
                          {t("companyReviews.jobs")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}

