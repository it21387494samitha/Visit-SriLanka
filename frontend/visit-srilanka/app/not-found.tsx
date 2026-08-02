import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-page px-5 py-28 sm:px-8">
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-rule-strong pb-2.5">
        <span className="t-label text-laterite">Not in the catalogue</span>
        <span className="t-label text-ink-faint">404</span>
      </div>

      <h1 className="t-h1 mt-8 max-w-[14ch] text-ink">No entry under that name</h1>

      <p className="t-lede measure mt-6">
        The page you asked for isn&rsquo;t filed here. It may have been renamed, or
        the link may be wrong.
      </p>

      <div className="mt-9 flex flex-wrap gap-3">
        <Link
          href="/destinations"
          className="t-label bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-laterite"
        >
          Open the catalogue →
        </Link>
        <Link
          href="/"
          className="t-label border border-rule-strong px-6 py-3.5 text-ink transition-colors hover:border-laterite hover:text-laterite"
        >
          Back to the front
        </Link>
      </div>
    </div>
  );
}
