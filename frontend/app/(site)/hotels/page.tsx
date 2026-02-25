import type { Metadata } from 'next'
import { fetchHotels } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Hotels',
  description:
    'Find the best hotels in Sri Lanka – from luxury beach resorts to cosy hill-country retreats.',
  alternates: { canonical: '/hotels' },
}

export default async function HotelsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const { data: hotels } = await fetchHotels({ ...searchParams, per_page: 12 })

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-heading text-4xl font-bold mb-8">Hotels & Accommodation</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels?.map((hotel: any) => (
          <a
            key={hotel.id}
            href={`/hotels/${hotel.slug}`}
            className="group rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <div className="bg-gray-100 h-48 flex items-center justify-center text-gray-400">
              {hotel.name}
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg group-hover:text-brand-600">{hotel.name}</h2>
              <p className="text-sm text-gray-500">{hotel.province}</p>
              <p className="mt-1 font-bold">
                {hotel.star_rating}★ · LKR {hotel.price_per_night}/night
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
