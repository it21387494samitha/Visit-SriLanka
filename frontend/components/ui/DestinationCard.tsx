import Link from 'next/link'
import Image from 'next/image'
import type { Destination } from '@/types'

interface Props {
  destination: Destination
}

export default function DestinationCard({ destination }: Props) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group block rounded-2xl overflow-hidden shadow hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-52 bg-gray-100">
        {destination.hero ? (
          <Image
            src={destination.hero}
            alt={destination.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
        {destination.is_featured && (
          <span className="absolute top-3 left-3 bg-brand-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      <div className="p-4">
        {destination.category && (
          <span className="text-xs text-brand-600 font-semibold uppercase tracking-wide">
            {destination.category.name}
          </span>
        )}
        <h3 className="font-heading text-xl font-bold mt-1 group-hover:text-brand-600 transition-colors">
          {destination.name}
        </h3>
        {destination.province && (
          <p className="text-sm text-gray-500 mt-1">{destination.province} Province</p>
        )}
        {destination.short_description && (
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {destination.short_description}
          </p>
        )}
      </div>
    </Link>
  )
}
