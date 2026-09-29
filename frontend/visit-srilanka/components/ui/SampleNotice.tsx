/**
 * Shown when the Laravel API could not be reached and the page is rendering the
 * bundled sample catalogue. Better to say so than to present sample records as
 * if they were the live database.
 */
export default function SampleNotice() {
  return (
    <div className="border-y border-rule bg-paper-deep">
      <p className="t-data mx-auto max-w-page px-5 py-2.5 text-ink-soft sm:px-8">
        <span className="t-label mr-2 text-laterite">Sample catalogue</span>
        The API at{' '}
        <code className="font-mono">
          {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}
        </code>{' '}
        did not respond, so these are the bundled sample entries. Start the
        Laravel backend to see live records.
      </p>
    </div>
  );
}
