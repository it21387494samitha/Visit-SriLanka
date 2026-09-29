import Link from 'next/link';

export default function ClosingBand() {
  return (
    <section className="bg-band">
      <div className="mx-auto max-w-page px-5 py-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <p className="t-label text-band-ink-soft">The whole catalogue</p>
            <h2 className="t-h1 mt-5 text-band-ink">
              Nothing here is more than
              <br />
              <span className="text-laterite">a day’s drive</span> from
              <br />
              anything else.
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            <p className="t-lede measure text-band-ink-soft">
              The island is 432 kilometres end to end. You can stand on an
              eighth-century rock fortress in the morning and be in the sea by
              evening — which is the argument for going at all.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/destinations"
                className="t-label bg-laterite px-6 py-3.5 text-paper transition-colors hover:bg-laterite-deep"
              >
                Open the catalogue →
              </Link>
              <Link
                href="/about"
                className="t-label border border-band-ink-soft px-6 py-3.5 text-band-ink transition-colors hover:border-laterite hover:text-laterite"
              >
                About the island
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
