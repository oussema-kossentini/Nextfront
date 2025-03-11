"use client"
import { Button } from "@/components/ui/button"
import { Globe, Brain, FileText, Search, Shield, BookOpen } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 flex items-center justify-center gap-2">
              About Us <Globe className="h-8 w-8 md:h-12 md:w-12" />
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Revolutionizing job applications through AI-driven automation and intelligent matching
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold">Our Story</h2>
                </div>
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <p>
                    At oneApply, we started with a simple but powerful idea: to revolutionize the way job applications
                    are processed using AI-driven automation. We noticed that both students and recruiters were
                    struggling with inefficiencies—students applying for positions they weren't qualified for, and
                    recruiters drowning in a sea of irrelevant resumes.
                  </p>
                  <p>
                    That's why we created oneApply—a smart, AI-powered job matching platform that automates the
                    application process, scores candidates based on qualifications, and connects them effortlessly with
                    recruiters.
                  </p>
                  <p>
                    From a small team passionate about technology, recruitment, and automation, we've grown into a
                    dynamic company shaping the future of hiring.
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-77synPR2jH68ajhfZqZHetuz6FF9uz.png"
                  alt="AI-powered job matching illustration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our mission is to streamline and enhance the job application experience for both candidates and
                recruiters.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
                <h3 className="text-xl font-bold mb-4">For candidates:</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We simplify the application process by automatically matching their profiles with the best
                  opportunities.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
                <h3 className="text-xl font-bold mb-4">For recruiters:</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We provide a smart ranking system, ensuring they see only the most relevant candidates, saving time
                  and improving hiring accuracy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-gray-600 dark:text-gray-400">
                We envision a world where job searching and recruiting are effortless, accurate, and AI-driven. No more
                wasted time, no more manual filtering—just instant, intelligent, and fair job matching for everyone.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                We aim to become the leading AI-powered job application platform, trusted by students, professionals,
                and recruiters worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose Us?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI-Driven Matching</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We use cutting-edge AI technology to analyze profiles and job descriptions, ensuring the best fit.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Automated Applications</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Candidates don't have to manually apply—our system does it for them based on their profile.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Efficient Screening</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Recruiters only receive top-ranked candidates, reducing hiring time.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Fair & Transparent</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our AI-driven process ensures objective and unbiased recruitment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us!</h2>
            <p className="text-xl mb-8">
              Are you a student looking for the perfect job opportunity? Or a recruiter searching for the best talent?
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Sign up today and let us simplify work for you!
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

