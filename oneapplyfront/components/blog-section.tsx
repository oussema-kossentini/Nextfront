import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      image: "/blog1.svg",
      title: "The unseen of spending three years at Pixelgrade",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      image: "/blog2.svg",
      title: "How to design your site footer like we did",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blogPosts.map((post) => (
            <div key={post.id} className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white">
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

