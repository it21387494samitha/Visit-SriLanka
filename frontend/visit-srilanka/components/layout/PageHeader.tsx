import Link from 'next/link';
import type { ReactNode } from 'react';

interface Figure {
  value: ReactNode;
  label: string;
}

interface PageHeaderProps {
  /** Stencilled eyebrow. */
  label: string;
  title: string;
  lede?: string;
  figures?: Figure[];
  /** Back link, for pages one level down. */
  back?: { href: string; label: string };
  children?: ReactNode;
}

/** The masthead used by every page below the home page. */
export default function PageHeader({
  label,
  title,
  lede,
  figures,
  back,
  children,
}: PageHeaderProps) {
  return (
    <header className="mx-auto max-w-page px-5 pb-10 pt-10 sm:px-8 sm:pt-14">
      {back ? (
        <Link href={back.href} className="t-label link-underline mb-6 inline-block text-ink-soft">
          ← {back.label}
        </Link>
      ) : null}

      <div className="flex items-baseline justify-between gap-4 border-b-2 border-rule-strong pb-2.5">
        <span className="t-label text-laterite">{label}</span>
        <span className="t-label text-ink-faint">Visit Sri Lanka</span>
      </div>

      <div className="grid gap-8 pt-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <h1 className="t-h1 text-ink">{title}</h1>
          {children}
        </div>
        <div className="flex flex-col justify-end gap-6">
          {lede ? <p className="t-lede measure">{lede}</p> : null}
          {figures && figures.length > 0 ? (
            <dl className="flex flex-wrap gap-x-10 gap-y-4 border-t border-rule pt-5">
              {figures.map((f) => (
                <div key={f.label} className="flex flex-col-reverse">
                  <dt className="t-label mt-1 text-ink-faint">{f.label}</dt>
                  <dd className="font-display text-3xl font-bold leading-none tracking-tight text-ink tabular">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </header>
  );
}
