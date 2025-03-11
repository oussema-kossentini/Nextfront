"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export function TestimonialsSection() {
  const { t } = useLanguage()

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Intern",
      company: "TechCorp",
      text: "ONE APPLY made finding my internship so easy! The AI matching was spot-on with my skills and interests.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineering Intern",
      company: "InnovateTech",
      text: "I applied to 5 companies with just one application and received 3 offers! This platform is revolutionary.",
    },
    {
      id: 3,
      name: "Jessica Williams",
      role: "HR Manager",
      company: "Global Solutions",
      text: "As a hiring manager, ONE APPLY has simplified our recruitment process. We're finding better-matched candidates in less time.",
    },
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t("testimonials.title")}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t("testimonials.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 relative mr-4 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg"
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

