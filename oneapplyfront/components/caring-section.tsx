import Image from "next/image"
import Link from "next/link"

export default function CaringSection() {
  const articles = [
    {
      id: 1,
      image: "/article1.jpg",
      title: "Creating Streamlined Safeguarding Processes with OneRen",
    },
    {
      id: 2,
      image: "/article2.jpg",
      title: "What are your safeguarding responsibilities and how can you manage them?",
    },
    {
      id: 3,
      image: "/article3.jpg",
      title: "Revamping the Membership Model with Triathlon Australia",
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Caring is the new marketing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The Nexcent blog is the best place to read about the latest membership insights, trends and more. See who's
            joining the community, read about how our customers are leveraging their memberships, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 relative">
                <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">{article.title}</h3>
                <Link href="/blog" className="text-primary text-sm font-medium">
                  Readmore →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

