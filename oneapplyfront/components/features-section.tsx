import Image from "next/image"

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      icon: "/membership-icon.svg",
      title: "Membership Organisations",
      description: "Our membership management software provides full automation of membership renewals and payments",
    },
    {
      id: 2,
      icon: "/national-icon.svg",
      title: "National Associations",
      description: "Our membership management software provides full automation of membership renewals and payments",
    },
    {
      id: 3,
      icon: "/clubs-icon.svg",
      title: "Clubs And Groups",
      description: "Our membership management software provides full automation of membership renewals and payments",
    },
  ]

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Manage your entire community
            <br />
            in a single system
          </h2>
          <p className="text-gray-600">Who is Nexcent suitable for?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center text-center">
              <div className="mb-6">
                <Image
                  src={feature.icon || "/placeholder.svg"}
                  alt={feature.title}
                  width={80}
                  height={80}
                  className="w-20 h-20"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 max-w-xs">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

