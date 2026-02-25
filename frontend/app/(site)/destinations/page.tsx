import type { Metadata } from 'next'
import { fetchDestinations } from '@/lib/api'
import DestinationCard from '@/components/ui/DestinationCard'

export const metadata: Metadata = {
  title: 'Destinations',
  description:
    'Browse all Sri Lanka destinations – beaches, cultural sites, wildlife parks, hill country and more.',
  alternates: { canonical: '/destinations' },
}

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const { data: destinations, meta } = await fetchDestinations({
    ...searchParams,
    per_page: 12,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-heading text-4xl font-bold mb-8">All Destinations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations?.map((dest: any) => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>

      {/* Pagination */}
      {meta && meta.last_page > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((page) => (
            <a
              key={page}
              href={`/destinations?page=${page}`}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              {page}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
