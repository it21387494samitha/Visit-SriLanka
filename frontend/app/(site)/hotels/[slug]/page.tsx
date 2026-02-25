import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { fetchHotel } from '@/lib/api'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hotel = await fetchHotel(params.slug)
  if (!hotel) return {}
  return {
    title: hotel.meta_title ?? hotel.name,
    description: hotel.meta_description ?? hotel.short_description,
    alternates: { canonical: `/hotels/${hotel.slug}` },
  }
}

export default async function HotelPage({ params }: Props) {
  const hotel = await fetchHotel(params.slug)
  if (!hotel) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: hotel.name,
    description: hotel.short_description,
    address: hotel.address,
    starRating: { '@type': 'Rating', ratingValue: hotel.star_rating },
    priceRange: `LKR ${hotel.price_per_night}/night`,
    telephone: hotel.contact_phone,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/hotels/${hotel.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-heading text-4xl font-bold mb-2">{hotel.name}</h1>
        <p className="text-brand-600 font-semibold mb-4">
          {'★'.repeat(hotel.star_rating)} · LKR {hotel.price_per_night}/night
        </p>
        <p className="text-gray-600 text-lg mb-8">{hotel.short_description}</p>
        <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: hotel.description }} />
      </article>
    </>
  )
}
