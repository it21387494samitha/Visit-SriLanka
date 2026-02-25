import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { fetchDestination } from '@/lib/api'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dest = await fetchDestination(params.slug)
  if (!dest) return {}

  return {
    title: dest.meta_title ?? dest.name,
    description: dest.meta_description ?? dest.short_description,
    alternates: { canonical: `/destinations/${dest.slug}` },
    openGraph: {
      title: dest.meta_title ?? dest.name,
      description: dest.meta_description ?? dest.short_description,
      images: dest.hero ? [{ url: dest.hero, width: 1200, height: 630, alt: dest.name }] : [],
    },
  }
}

export default async function DestinationPage({ params }: Props) {
  const dest = await fetchDestination(params.slug)
  if (!dest) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: dest.name,
    description: dest.short_description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/destinations/${dest.slug}`,
    geo: dest.latitude
      ? { '@type': 'GeoCoordinates', latitude: dest.latitude, longitude: dest.longitude }
      : undefined,
    image: dest.hero ?? undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {dest.hero && (
        <div className="relative h-[60vh] w-full">
          <Image src={dest.hero} alt={dest.name} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/30 flex items-end p-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">{dest.name}</h1>
          </div>
        </div>
      )}

      <article className="max-w-4xl mx-auto px-4 py-12">
        {!dest.hero && <h1 className="font-heading text-4xl font-bold mb-6">{dest.name}</h1>}

        {dest.category && (
          <span className="inline-block bg-brand-100 text-brand-700 text-sm px-3 py-1 rounded-full mb-4">
            {dest.category.name}
          </span>
        )}

        <p className="text-lg text-gray-600 mb-8">{dest.short_description}</p>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: dest.description }}
        />

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 border-t pt-8">
          {dest.province && (
            <div>
              <dt className="text-xs text-gray-500 uppercase">Province</dt>
              <dd className="font-semibold">{dest.province}</dd>
            </div>
          )}
          {dest.climate && (
            <div>
              <dt className="text-xs text-gray-500 uppercase">Climate</dt>
              <dd className="font-semibold">{dest.climate}</dd>
            </div>
          )}
          {dest.entry_fee && (
            <div>
              <dt className="text-xs text-gray-500 uppercase">Entry Fee</dt>
              <dd className="font-semibold">LKR {dest.entry_fee}</dd>
            </div>
          )}
        </div>
      </article>
    </>
  )
}
