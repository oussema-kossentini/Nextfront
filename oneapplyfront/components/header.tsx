import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="w-full py-4 px-4 md:px-8 lg:px-16 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Nexcent Logo" width={32} height={32} className="h-8 w-auto" />
          <span className="text-primary font-bold text-2xl">Nexcent</span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <Link href="/" className="text-gray-700 hover:text-primary font-medium">
          Home
        </Link>
        <Link href="/features" className="text-gray-700 hover:text-primary font-medium">
          Features
        </Link>
        <Link href="/community" className="text-gray-700 hover:text-primary font-medium">
          Community
        </Link>
        <Link href="/blog" className="text-gray-700 hover:text-primary font-medium">
          Blog
        </Link>
        <Link href="/pricing" className="text-gray-700 hover:text-primary font-medium">
          Pricing
        </Link>
      </nav>

      <div>
        <Button className="bg-primary hover:bg-primary/90 text-white">Register Now →</Button>
      </div>
    </header>
  )
}

