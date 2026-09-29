'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  DISTRICT_SHAPES,
  MAP_VIEWBOX,
  type DistrictShape,
} from '@/lib/data/districtShapes';
import type { District } from '@/lib/types';
import { entryCount } from '@/lib/format';

interface IslandMapProps {
  /** Districts from the API, carrying destinations_count where available. */
  districts: District[];
  /** Where a district leads. Defaults to the filtered destinations list. */
  hrefFor?: (shape: DistrictShape) => string;
}

/** Boundary slugs and API slugs can drift ("monaragala" / "moneragala"). */
const normalise = (s: string) =>
  s
    .toLowerCase()
    .replace(/\s*district$/, '')
    .replace(/[^a-z]/g, '');

export default function IslandMap({ districts, hrefFor }: IslandMapProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const counts = useMemo(() => {
    const byKey = new Map<string, number>();
    for (const d of districts) {
      const n = d.destinations_count ?? 0;
      byKey.set(normalise(d.slug), n);
      byKey.set(normalise(d.name), n);
    }
    return byKey;
  }, [districts]);

  const countFor = (shape: DistrictShape) =>
    counts.get(normalise(shape.slug)) ?? counts.get(normalise(shape.name)) ?? 0;

  const linkFor =
    hrefFor ?? ((shape: DistrictShape) => `/destinations?district=${shape.slug}`);

  const withEntries = DISTRICT_SHAPES.filter((s) => countFor(s) > 0);
  const total = withEntries.reduce((n, s) => n + countFor(s), 0);

  const active = activeSlug
    ? (DISTRICT_SHAPES.find((s) => s.slug === activeSlug) ?? null)
    : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
      {/* ---- Map ---- */}
      <figure className="m-0">
        <svg
          viewBox={MAP_VIEWBOX}
          role="img"
          aria-label={`Map of Sri Lanka's ${DISTRICT_SHAPES.length} districts. ${withEntries.length} have catalogue entries.`}
          className="mx-auto block h-auto max-h-[68vh] w-full max-w-[26rem]"
          onMouseLeave={() => setActiveSlug(null)}
        >
          {DISTRICT_SHAPES.map((shape) => {
            const n = countFor(shape);
            const isActive = activeSlug === shape.slug;

            if (n === 0) {
              return (
                <path
                  key={shape.slug}
                  d={shape.d}
                  className="district"
                  data-empty="true"
                  aria-hidden="true"
                />
              );
            }

            return (
              <Link
                key={shape.slug}
                href={linkFor(shape)}
                aria-label={`${shape.name} District — ${entryCount(n)}`}
                onMouseEnter={() => setActiveSlug(shape.slug)}
                onFocus={() => setActiveSlug(shape.slug)}
                onBlur={() => setActiveSlug(null)}
              >
                <path d={shape.d} className="district" data-active={isActive} />
              </Link>
            );
          })}

          {/* Tick at each district that has entries. The halo keeps it legible
              whether it sits on land, on the accent, or over a boundary. */}
          {withEntries.map((shape) => (
            <rect
              key={`tick-${shape.slug}`}
              x={shape.cx - 3.5}
              y={shape.cy - 3.5}
              width={7}
              height={7}
              fill={activeSlug === shape.slug ? 'var(--c-paper)' : 'var(--c-ink)'}
              stroke="var(--c-paper)"
              strokeWidth={1.5}
              pointerEvents="none"
            />
          ))}

          {/* Name of the district under the cursor, drawn last so it sits on top. */}
          {active ? (
            <g pointerEvents="none">
              <text
                x={active.cx}
                y={active.cy - 12}
                textAnchor="middle"
                className="fill-ink font-mono"
                style={{ fontSize: 19, letterSpacing: '0.06em' }}
                stroke="var(--c-paper)"
                strokeWidth={5}
                paintOrder="stroke"
              >
                {active.name.toUpperCase()}
              </text>
            </g>
          ) : null}
        </svg>
        <figcaption className="t-label mt-4 text-center text-ink-faint">
          {DISTRICT_SHAPES.length} districts · {withEntries.length} catalogued
        </figcaption>
      </figure>

      {/* ---- Readout ---- */}
      <aside className="lg:pt-2">
        <div className="rule-head mb-4">
          <span className="t-label shrink-0 text-laterite">Index</span>
        </div>

        {active ? (
          <div>
            <h3 className="font-display text-[2.1rem] uppercase leading-[0.9] tracking-tight text-ink">
              {active.name}
            </h3>
            <dl className="mt-4 space-y-2">
              <div className="flex justify-between gap-4 border-b border-rule pb-2">
                <dt className="t-label text-ink-faint">Code</dt>
                <dd className="t-data text-ink">{active.iso || '—'}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-rule pb-2">
                <dt className="t-label text-ink-faint">Entries</dt>
                <dd className="t-data text-ink">
                  {String(countFor(active)).padStart(2, '0')}
                </dd>
              </div>
            </dl>
            <Link
              href={linkFor(active)}
              className="t-label mt-5 inline-block bg-laterite px-4 py-2.5 text-paper transition-colors hover:bg-laterite-deep"
            >
              Open {active.name} →
            </Link>
          </div>
        ) : (
          <div>
            <p className="t-body text-[0.95rem] leading-relaxed">
              The catalogue is filed by district. Hover a shaded district — or tab
              through them — to see what it holds, then open it.
            </p>
            <dl className="mt-6 space-y-2">
              <div className="flex justify-between gap-4 border-b border-rule pb-2">
                <dt className="t-label text-ink-faint">Districts</dt>
                <dd className="t-data tabular text-ink">
                  {DISTRICT_SHAPES.length}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-rule pb-2">
                <dt className="t-label text-ink-faint">Catalogued</dt>
                <dd className="t-data tabular text-ink">{withEntries.length}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-rule pb-2">
                <dt className="t-label text-ink-faint">Entries</dt>
                <dd className="t-data tabular text-ink">{total}</dd>
              </div>
            </dl>
          </div>
        )}

        {/* Text index — the map's accessible equivalent, and genuinely useful. */}
        <div className="mt-8">
          <div className="rule-head mb-3">
            <span className="t-label shrink-0 text-ink-faint">All catalogued</span>
          </div>
          <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
            {withEntries.map((shape) => (
              <li key={shape.slug}>
                <Link
                  href={linkFor(shape)}
                  onMouseEnter={() => setActiveSlug(shape.slug)}
                  onMouseLeave={() => setActiveSlug(null)}
                  onFocus={() => setActiveSlug(shape.slug)}
                  onBlur={() => setActiveSlug(null)}
                  className={`t-data transition-colors hover:text-laterite ${
                    activeSlug === shape.slug ? 'text-laterite' : 'text-ink-soft'
                  }`}
                >
                  {shape.name}
                  <span className="text-ink-faint"> {countFor(shape)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
