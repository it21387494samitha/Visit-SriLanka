import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Visit Sri Lanka team.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="font-heading text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        Have a question or want to list your business? Reach out to us.
      </p>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="How can we help?"
          />
        </div>
        <button
          type="submit"
          className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-3 rounded-full transition"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}
