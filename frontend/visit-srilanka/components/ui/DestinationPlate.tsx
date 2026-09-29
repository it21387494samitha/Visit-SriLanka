import Image from 'next/image';
import Link from 'next/link';
import type { Destination } from '@/lib/types';
import { coverImage } from '@/lib/images';
import { formatCoords, catalogueNumber } from '@/lib/format';

interface DestinationPlateProps {
  destination: Destination;
  /** 'index' is the grid unit; 'lead' is the larger opening plate. */
  variant?: 'index' | 'lead' | 'row';
  /** Passed to next/image so the browser fetches a sensibly sized file. */
  sizes?: string;
  priority?: boolean;
}

export default function DestinationPlate({
  destination,
  variant = 'index',
  sizes = '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw',
  priority = false,
}: DestinationPlateProps) {
  const image = coverImage(destination);
  const href = `/destinations/${destination.slug}`;
  const cat = catalogueNumber(destination.id);
  const coords = formatCoords(destination.latitude, destination.longitude);

  /* Compact horizontal form, used in sidebars and related lists. */
  if (variant === 'row') {
    return (
      <Link href={href} className="group flex gap-4 border-b border-rule py-4 last:border-0">
        <div className="plate relative h-20 w-24 shrink-0">
          {image ? (
            <Image
              src={image.src}
              alt=""
              fill
              sizes="96px"
              className="plate-img"
              title={image.credit ? `${image.credit.artist} · ${image.credit.license}` : undefined}
            />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="t-data text-ink-faint">{cat}</p>
          <h3 className="font-display text-lg uppercase leading-[1.02] tracking-tight text-ink transition-colors group-hover:text-laterite">
            {destination.title}
          </h3>
          {destination.district ? (
            <p className="t-data mt-1 text-ink-soft">{destination.district.name}</p>
          ) : null}
        </div>
      </Link>
    );
  }

  const isLead = variant === 'lead';

  return (
    <article className="group h-full">
      <Link href={href} className="flex h-full flex-col">
        <div
          className={`plate relative w-full ${isLead ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}
        >
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              priority={priority}
              className="plate-img"
              title={image.credit ? `${image.credit.artist} · ${image.credit.license}` : undefined}
            />
          ) : (
            <div className="grid h-full place-items-center">
              <span className="t-label text-ink-faint">Plate to follow</span>
            </div>
          )}

          {destination.is_featured ? (
            <span className="t-label absolute left-0 top-0 bg-laterite px-2.5 py-1.5 text-[0.5625rem] text-paper">
              Featured
            </span>
          ) : null}
        </div>

        {/* Catalogue line: number left, category right, on a hairline. */}
        <div className="mt-4 flex items-baseline gap-3 border-t border-rule pt-2.5">
          <span className="t-data shrink-0 text-laterite">{cat}</span>
          <span className="h-px flex-1 bg-rule" aria-hidden />
          {destination.category ? (
            <span className="t-label shrink-0 text-ink-faint">{destination.category.name}</span>
          ) : null}
        </div>

        <h3
          className={`mt-2.5 font-display uppercase leading-[0.95] tracking-[-0.015em] text-ink transition-colors group-hover:text-laterite ${
            isLead ? 'text-[2rem] sm:text-[2.6rem]' : 'text-[1.5rem]'
          }`}
        >
          {destination.title}
        </h3>

        <p className="t-data mt-2 text-ink-soft">
          {destination.district ? destination.district.name : null}
          {destination.district && coords ? ' · ' : null}
          {coords}
        </p>

        {destination.summary ? (
          <p
            className={`t-body mt-3 leading-relaxed ${
              isLead ? 'measure text-[1.0625rem]' : 'text-[0.95rem]'
            }`}
          >
            {destination.summary}
          </p>
        ) : null}

        {destination.best_months ? (
          <p className="t-label mt-auto pt-4 text-ink-faint">
            Best {destination.best_months}
          </p>
        ) : null}
      </Link>
    </article>
  );
}
