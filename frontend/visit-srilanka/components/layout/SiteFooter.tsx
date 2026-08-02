import Link from 'next/link';

const EXPLORE = [
  { label: 'All destinations', href: '/destinations' },
  { label: 'Browse by category', href: '/categories' },
  { label: 'About the island', href: '/about' },
];

const CATEGORIES = [
  { label: 'Ancient Ruins', href: '/categories/ancient-ruins' },
  { label: 'Hill Country', href: '/categories/hill-country' },
  { label: 'Beaches', href: '/categories/beaches' },
  { label: 'Wildlife', href: '/categories/wildlife' },
  { label: 'Temples', href: '/categories/temples' },
  { label: 'Waterfalls', href: '/categories/waterfalls' },
];

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t-2 border-rule-strong bg-paper-deep">
      <div className="mx-auto max-w-page px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Imprint */}
          <div className="lg:col-span-5">
            <p className="font-display text-3xl font-bold uppercase leading-[0.85] tracking-[-0.02em] text-ink">
              Visit Sri Lanka
            </p>
            <p className="t-label mt-2 text-ink-faint">A Field Catalogue of the Island</p>
            <p className="t-body measure-tight mt-5 text-[0.95rem]">
              Twenty-five districts, from the Jaffna lagoon to the southern reef.
              Each entry carries its coordinates, its season, and the district it
              belongs to.
            </p>
          </div>

          <nav className="lg:col-span-3" aria-labelledby="footer-explore">
            <h2 id="footer-explore" className="t-label mb-4 text-ink">
              Explore
            </h2>
            <ul className="space-y-2.5">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-[0.95rem] text-ink-soft">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-labelledby="footer-categories">
            <h2 id="footer-categories" className="t-label mb-4 text-ink">
              Categories
            </h2>
            <ul className="space-y-2.5">
              {CATEGORIES.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-[0.95rem] text-ink-soft">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="t-label mb-4 text-ink">Contact</h2>
            <ul className="t-data space-y-2.5 text-ink-soft">
              <li>Colombo, Sri Lanka</li>
              <li>
                <a href="mailto:hello@visitsrilanka.com" className="link-underline">
                  hello@visitsrilanka.com
                </a>
              </li>
              <li>+94 11 234 5678</li>
            </ul>
          </div>
        </div>

        {/* Provenance — the boundary data and the photographs both carry terms. */}
        <div className="mt-14 border-t border-rule pt-6">
          <h2 className="t-label mb-3 text-ink-faint">Sources</h2>
          <div className="t-data grid gap-2 text-ink-faint sm:grid-cols-2">
            <p>
              District boundaries:{' '}
              <a
                href="https://www.geoboundaries.org/"
                className="link-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                geoBoundaries
              </a>{' '}
              (ADM2), derived from{' '}
              <a
                href="https://www.openstreetmap.org/copyright"
                className="link-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                OpenStreetMap
              </a>
              , ODbL 1.0. Simplified for display — not for navigation.
            </p>
            <p>
              Sample photographs:{' '}
              <a
                href="https://commons.wikimedia.org/"
                className="link-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikimedia Commons
              </a>
              . Each plate credits its photographer and licence where it appears.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-data text-ink-faint">
            © {new Date().getFullYear()} Visit Sri Lanka
          </p>
          <p className="t-label text-ink-faint">Ceylon · 5°55′N to 9°51′N</p>
        </div>
      </div>
    </footer>
  );
}
