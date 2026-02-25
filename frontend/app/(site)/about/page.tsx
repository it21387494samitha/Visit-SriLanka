import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Visit Sri Lanka and our mission to promote tourism on the island.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-heading text-4xl font-bold mb-6">About Visit Sri Lanka</h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        Visit Sri Lanka is your official guide to exploring the pearl of the Indian Ocean. We
        curate the best destinations, hotels, and tours to help you experience everything this
        beautiful island has to offer.
      </p>
      <p className="text-lg text-gray-600 leading-relaxed">
        From ancient cities and lush tea estates to pristine beaches and wildlife sanctuaries,
        Sri Lanka has something for every traveller.
      </p>
    </div>
  )
}
