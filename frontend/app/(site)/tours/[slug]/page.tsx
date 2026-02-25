import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchTour } from '@/lib/api'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tour = await fetchTour(params.slug)
  if (!tour) return {}
  return {
    title: tour.meta_title ?? tour.name,
    description: tour.meta_description ?? tour.short_description,
    alternates: { canonical: `/tours/${tour.slug}` },
  }
}

export default async function TourPage({ params }: Props) {
  const tour = await fetchTour(params.slug)
  if (!tour) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.name,
    description: tour.short_description,
    offers: {
      '@type': 'Offer',
      price: tour.price,
      priceCurrency: 'USD',
    },
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tours/${tour.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-heading text-4xl font-bold mb-2">{tour.name}</h1>
        <div className="flex gap-4 text-sm mb-6">
          <span className="bg-ocean-100 text-ocean-700 px-3 py-1 rounded-full">
            {tour.duration_days} days
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full capitalize">
            {tour.difficulty}
          </span>
          <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full font-semibold">
            USD {tour.price}
          </span>
        </div>
        <p className="text-gray-600 text-lg mb-8">{tour.short_description}</p>
        <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: tour.description }} />

        {/* Itinerary */}
        {tour.itinerary && Object.keys(tour.itinerary).length > 0 && (
          <section className="mt-12">
            <h2 className="font-heading text-2xl font-bold mb-4">Itinerary</h2>
            <ol className="space-y-4">
              {Object.entries(tour.itinerary).map(([day, activities]: [string, any]) => (
                <li key={day} className="flex gap-4">
                  <span className="flex-shrink-0 w-16 font-semibold text-ocean-600">{day}</span>
                  <span className="text-gray-700">{activities}</span>
                </li>
              ))}
            </ol>
          </section>
        )}
      </article>
    </>
  )
}
