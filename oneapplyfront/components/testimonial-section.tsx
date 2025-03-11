import Image from "next/image"
import Link from "next/link"

export default function TestimonialSection() {
  const clients = [
    { id: 1, logo: "/client1.svg", alt: "Client 1" },
    { id: 2, logo: "/client2.svg", alt: "Client 2" },
    { id: 3, logo: "/client3.svg", alt: "Client 3" },
    { id: 4, logo: "/client4.svg", alt: "Client 4" },
    { id: 5, logo: "/client5.svg", alt: "Client 5" },
  ]

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/3">
            <Image src="/tesla-logo.svg" alt="Tesla" width={300} height={200} className="w-full h-auto rounded-lg" />
          </div>

          <div className="w-full md:w-2/3">
            <p className="text-gray-600 mb-4">
              Maecenas interdum lorem eleifend orci aliquam mollis. Aliquam non rhoncus magna. Suspendisse aliquet
              tincidunt enim, ut commodo elit feugiat nec. Donec at velit semper, aliquam magna facilisis, vehicula
              tellus. Suspendisse sagittis nisi sit amet erat tincidunt, non semper mi tempus. Suspendisse at euismod
              arises nec ultrices magna. Suspendisse aliquet tincidunt enim, ut commodo elit feugiat nec. Donec at velit
              semper, aliquam magna facilisis, vehicula tellus.
            </p>
            <p className="font-bold text-primary mb-1">Tim Doyle</p>
            <p className="text-sm text-gray-600 mb-6">British Dragon Boat Racing Association</p>

            <div className="flex flex-wrap items-center gap-4">
              {clients.map((client) => (
                <div key={client.id} className="w-12 h-12 flex items-center justify-center">
                  <Image
                    src={client.logo || "/placeholder.svg"}
                    alt={client.alt}
                    width={48}
                    height={48}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))}
              <Link href="/clients" className="text-primary text-sm font-medium ml-2">
                Meet all customers →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

