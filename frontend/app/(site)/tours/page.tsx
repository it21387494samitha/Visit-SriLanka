import type { Metadata } from 'next'
import { fetchTours } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Tours',
  description:
    'Book guided tours across Sri Lanka – wildlife safaris, cultural trails, tea country and coastal escapes.',
  alternates: { canonical: '/tours' },
}

export default async function ToursPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const { data: tours } = await fetchTours({ ...searchParams, per_page: 12 })

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-heading text-4xl font-bold mb-8">Tours & Experiences</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours?.map((tour: any) => (
          <a
            key={tour.id}
            href={`/tours/${tour.slug}`}
            className="group rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <div className="bg-ocean-100 h-48 flex items-center justify-center text-ocean-600 font-semibold">
              {tour.duration_days} Days
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg group-hover:text-brand-600">{tour.name}</h2>
              <p className="text-sm text-gray-500 capitalize">{tour.difficulty}</p>
              <p className="mt-1 font-bold text-ocean-600">USD {tour.price}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
