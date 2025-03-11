import Image from "next/image"

export default function ClientsSection() {
  const clients = [
    { id: 1, logo: "/client1.svg", alt: "Client 1" },
    { id: 2, logo: "/client2.svg", alt: "Client 2" },
    { id: 3, logo: "/client3.svg", alt: "Client 3" },
    { id: 4, logo: "/client4.svg", alt: "Client 4" },
    { id: 5, logo: "/client5.svg", alt: "Client 5" },
    { id: 6, logo: "/client6.svg", alt: "Client 6" },
    { id: 7, logo: "/client7.svg", alt: "Client 7" },
  ]

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Clients</h2>
          <p className="text-gray-600">We have been working with some Fortune 500+ clients</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {clients.map((client) => (
            <div key={client.id} className="w-24 md:w-32 h-12 flex items-center justify-center">
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={client.alt}
                width={100}
                height={50}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

