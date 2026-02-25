import type { Metadata } from 'next'
import { fetchDestinations } from '@/lib/api'
import DestinationCard from '@/components/ui/DestinationCard'

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Welcome to Visit Sri Lanka – your ultimate guide to the Pearl of the Indian Ocean.',
}

export default async function HomePage() {
  const { data: featured } = await fetchDestinations({ featured: true, per_page: 6 })

  return (
    <>
      {/* Hero */}
      <section className="relative h-[85vh] flex items-center justify-center text-center bg-gradient-to-br from-ocean-600 to-forest-600">
        <div className="relative z-10 px-4">
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
            Discover Sri Lanka
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Pristine beaches, ancient ruins, lush highlands – it all awaits you.
          </p>
          <a
            href="/destinations"
            className="mt-8 inline-block bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-3 rounded-full transition"
          >
            Explore Destinations
          </a>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="font-heading text-3xl font-bold text-center mb-10">
          Featured Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured?.map((dest: any) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>
    </>
  )
}
