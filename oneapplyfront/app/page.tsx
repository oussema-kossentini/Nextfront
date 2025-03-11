"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BriefcaseIcon, Sparkles, BarChart, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PartnersSection } from "@/components/partners-section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("hero.title")}</h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">{t("hero.subtitle")}</p>
              <div className="max-w-2xl mx-auto">
                <div className="flex justify-center">
                  <Link href="/register/intern">
                    <Button className="bg-white text-primary hover:bg-gray-100">{t("cta.intern")}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <PartnersSection />

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("features.title")}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">{t("features.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t("features.ai.title")}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t("features.ai.description")}</p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BriefcaseIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t("features.oneClick.title")}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t("features.oneClick.description")}</p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t("features.analytics.title")}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t("features.analytics.description")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-gray-600 dark:text-gray-400">{t("stats.activeJobs")}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">5K+</div>
                <div className="text-gray-600 dark:text-gray-400">{t("stats.companies")}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <div className="text-gray-600 dark:text-gray-400">{t("stats.jobSeekers")}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">90%</div>
                <div className="text-gray-600 dark:text-gray-400">{t("stats.successRate")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("how.title")}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">{t("how.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="bg-primary/10 p-8 rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-4">1</div>
                  <h3 className="text-xl font-bold mb-2">{t("how.step1.title")}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{t("how.step1.description")}</p>
                </div>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-primary/10 p-8 rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-4">2</div>
                  <h3 className="text-xl font-bold mb-2">{t("how.step2.title")}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{t("how.step2.description")}</p>
                </div>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-primary/10 p-8 rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-4">3</div>
                  <h3 className="text-xl font-bold mb-2">{t("how.step3.title")}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{t("how.step3.description")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Add the TestimonialsSection here */}
        <TestimonialsSection />

        {/* CTA Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("cta.title")}</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">{t("cta.subtitle")}</p>
            <div className="flex justify-center">
              <Link href="/register/intern">
                <Button className="bg-white text-primary hover:bg-gray-100">{t("cta.intern")}</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

