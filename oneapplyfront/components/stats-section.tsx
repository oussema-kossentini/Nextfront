import Image from "next/image"

export default function StatsSection() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Helping a local business reinvent itself</h3>
            <p className="text-gray-600 mb-4">
              We helped a small local business transform their online presence and increase customer engagement.
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Image src="/members-icon.svg" alt="Members" width={24} height={24} className="w-6 h-6" />
                <div>
                  <p className="text-xl font-bold text-primary">2,245,341</p>
                  <p className="text-sm text-gray-600">Members</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Image src="/events-icon.svg" alt="Events" width={24} height={24} className="w-6 h-6" />
                <div>
                  <p className="text-xl font-bold text-primary">46,328</p>
                  <p className="text-sm text-gray-600">Events</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Image src="/clubs-icon.svg" alt="Clubs" width={24} height={24} className="w-6 h-6" />
                <div>
                  <p className="text-xl font-bold text-primary">828,867</p>
                  <p className="text-sm text-gray-600">Event Bookings</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Image src="/payments-icon.svg" alt="Payments" width={24} height={24} className="w-6 h-6" />
                <div>
                  <p className="text-xl font-bold text-primary">1,926,436</p>
                  <p className="text-sm text-gray-600">Payments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

