import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Lessons and insights <br />
            <span className="text-primary">from 8 years</span>
          </h1>
          <p className="text-gray-600 mb-8 max-w-lg">
            Where to grow your business as a photographer: site or social media?
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 h-auto">Register</Button>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/hero-illustration.svg"
            alt="Hero Illustration"
            width={500}
            height={400}
            className="w-full max-w-lg"
          />
        </div>
      </div>

      <div className="flex justify-center mt-12 gap-2">
        <div className="h-2 w-2 rounded-full bg-primary"></div>
        <div className="h-2 w-2 rounded-full bg-gray-300"></div>
        <div className="h-2 w-2 rounded-full bg-gray-300"></div>
      </div>
    </section>
  )
}

