import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <p className="font-heading text-xl font-bold text-white mb-2">Visit Sri Lanka</p>
          <p className="text-sm">
            Your official guide to the Pearl of the Indian Ocean.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/destinations" className="hover:text-white transition">Destinations</Link></li>
            <li><Link href="/hotels" className="hover:text-white transition">Hotels</Link></li>
            <li><Link href="/tours" className="hover:text-white transition">Tours</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Learn</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/blog" className="hover:text-white transition">Travel Blog</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Terms of Use</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {year} Visit Sri Lanka. All rights reserved. · Powered by{' '}
        <span className="text-orange-400">Cloudflare</span>
      </div>
    </footer>
  )
}
