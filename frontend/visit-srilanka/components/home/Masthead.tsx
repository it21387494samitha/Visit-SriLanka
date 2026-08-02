import Link from 'next/link';
import IslandMap from '@/components/map/IslandMap';
import type { District, Stats } from '@/lib/types';
import { toRoman } from '@/lib/format';

interface MastheadProps {
  districts: District[];
  stats: Stats;
}

export default function Masthead({ districts, stats }: MastheadProps) {
  const year = new Date().getFullYear();

  const figures = [
    { value: stats.districts, label: 'Districts' },
    { value: stats.destinations, label: 'Entries' },
    { value: stats.categories, label: 'Categories' },
    { value: 8, label: 'UNESCO Sites' },
  ];

  return (
    <section className="mx-auto max-w-page px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
      {/* Colophon line */}
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-rule-strong pb-2.5">
        <span className="t-label whitespace-nowrap text-ink">
          Ceylon
          {/* The latitude range is detail, not identity — drop it when narrow. */}
          <span className="hidden sm:inline"> · 5°55′N to 9°51′N</span>
        </span>
        <span className="t-label whitespace-nowrap text-ink-faint">
          Edition {toRoman(year)}
        </span>
      </div>

      <div className="grid gap-12 pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
        {/* Thesis */}
        <div className="flex flex-col">
          <h1 className="t-display text-ink">
            Twenty-five
            <br />
            districts.
            <br />
            <span className="text-laterite">One island.</span>
          </h1>

          <p className="t-lede measure mt-8">
            Ancient capitals in the dry zone. Cloud forest at two thousand metres.
            A reef coast that changes side with the monsoon. Every entry is filed
            by district, with its coordinates and the months it is worth the
            journey.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/destinations"
              className="t-label bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-laterite"
            >
              Open the catalogue →
            </Link>
            <Link
              href="/categories"
              className="t-label border border-rule-strong px-6 py-3.5 text-ink transition-colors hover:border-laterite hover:text-laterite"
            >
              Browse by category
            </Link>
          </div>

          {/* Figures */}
          <dl className="mt-auto grid grid-cols-2 gap-x-6 gap-y-5 border-t border-rule pt-8 sm:grid-cols-4 lg:mt-14">
            {figures.map((f) => (
              /* column-reverse so the figure reads above its label while <dt>
                 still precedes <dd> in the DOM */
              <div key={f.label} className="flex flex-col-reverse">
                <dt className="t-label mt-1 text-ink-faint">{f.label}</dt>
                <dd className="font-display text-4xl font-bold leading-none tracking-tight text-ink tabular">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The index, as a map */}
        <div className="lg:border-l lg:border-rule lg:pl-12">
          <IslandMap districts={districts} />
        </div>
      </div>
    </section>
  );
}
