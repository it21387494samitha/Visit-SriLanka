'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import DestinationPlate from '@/components/ui/DestinationPlate';
import type { Category, Destination, District } from '@/lib/types';
import { entryCount } from '@/lib/format';

interface Props {
  destinations: Destination[];
  categories: Category[];
  districts: District[];
}

export default function DestinationsPageClient({
  destinations,
  categories,
  districts,
}: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const category = params.get('category') ?? '';
  const district = params.get('district') ?? '';
  const [search, setSearch] = useState(params.get('q') ?? '');

  /* Filters live in the URL so a filtered view can be linked to — the map on
     the home page depends on this. Search stays local; it changes per keystroke
     and doesn't belong in history. */
  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      const qs = next.toString();
      router.replace(qs ? `/destinations?${qs}` : '/destinations', { scroll: false });
    },
    [params, router]
  );

  const clearAll = () => {
    setSearch('');
    router.replace('/destinations', { scroll: false });
  };

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    return destinations.filter((d) => {
      if (category && d.category?.slug !== category) return false;
      if (district && d.district?.slug !== district) return false;
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) ||
        (d.summary ?? '').toLowerCase().includes(q) ||
        (d.district?.name ?? '').toLowerCase().includes(q) ||
        (d.category?.name ?? '').toLowerCase().includes(q)
      );
    });
  }, [destinations, category, district, search]);

  const activeCount = [category, district, search.trim()].filter(Boolean).length;

  const districtName = districts.find((d) => d.slug === district)?.name;
  const categoryName = categories.find((c) => c.slug === category)?.name;

  const selectClass =
    'w-full appearance-none border border-rule bg-paper px-3 py-2.5 pr-8 font-mono text-[0.8125rem] text-ink transition-colors hover:border-laterite focus:border-laterite focus:outline-none';

  return (
    <>
      {/* Filter ledger */}
      <div className="border-b border-rule bg-paper-deep">
        <div className="mx-auto max-w-page px-5 py-5 sm:px-8">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-center">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
                aria-hidden
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search entries, districts, categories…"
                aria-label="Search the catalogue"
                className="w-full border border-rule bg-paper py-2.5 pl-10 pr-3 font-mono text-[0.8125rem] text-ink placeholder:text-ink-faint focus:border-laterite focus:outline-none"
              />
            </div>

            <div className="relative">
              <label htmlFor="filter-category" className="sr-only">
                Filter by category
              </label>
              <select
                id="filter-category"
                value={category}
                onChange={(e) => setParam('category', e.target.value)}
                className={selectClass}
              >
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
              <span
                aria-hidden
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint"
              >
                ▾
              </span>
            </div>

            <div className="relative">
              <label htmlFor="filter-district" className="sr-only">
                Filter by district
              </label>
              <select
                id="filter-district"
                value={district}
                onChange={(e) => setParam('district', e.target.value)}
                className={selectClass}
              >
                <option value="">All districts</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.slug}>
                    {d.name}
                  </option>
                ))}
              </select>
              <span
                aria-hidden
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint"
              >
                ▾
              </span>
            </div>

            {activeCount > 0 ? (
              <button
                type="button"
                onClick={clearAll}
                className="t-label flex items-center justify-center gap-1.5 border border-rule px-4 py-2.5 text-ink-soft transition-colors hover:border-laterite hover:text-laterite"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
                Clear
              </button>
            ) : (
              <span className="t-label hidden text-right text-ink-faint md:block">
                {entryCount(results.length)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-page px-5 py-12 sm:px-8">
        <div className="rule-head mb-8">
          <span className="t-label shrink-0 text-ink-soft">
            {entryCount(results.length)}
            {categoryName ? ` · ${categoryName}` : ''}
            {districtName ? ` · ${districtName} District` : ''}
          </span>
        </div>

        {results.length > 0 ? (
          <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((d, i) => (
              <DestinationPlate
                key={d.id}
                destination={d}
                priority={i < 3}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
              />
            ))}
          </div>
        ) : (
          <div className="border-t border-rule py-20 text-center">
            <p className="t-h3 text-ink">Nothing filed under that</p>
            <p className="t-body measure mx-auto mt-3">
              No entry matches the current filters. Widen the search, or clear it
              and start again.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="t-label mt-6 bg-ink px-6 py-3 text-paper transition-colors hover:bg-laterite"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
