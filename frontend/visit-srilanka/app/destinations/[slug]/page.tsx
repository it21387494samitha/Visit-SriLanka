import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getDestination } from '@/lib/api';
import { coverImage, galleryImages } from '@/lib/images';
import { catalogueNumber, formatCoords, toPlainText } from '@/lib/format';
import DestinationPlate from '@/components/ui/DestinationPlate';
import LocatorMap from '@/components/map/LocatorMap';
import SampleNotice from '@/components/ui/SampleNotice';
import { Gallery, ShareButton } from './DestinationDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await getDestination(slug);
  if (!data) return { title: 'Not found' };

  const { destination } = data;
  const description =
    destination.summary ?? toPlainText(destination.description) ?? undefined;
  const image = coverImage(destination);

  return {
    title: destination.title,
    description,
    openGraph: {
      title: destination.title,
      description,
      type: 'article',
      images: image ? [{ url: image.src }] : undefined,
    },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const { data, live } = await getDestination(slug);
  if (!data) notFound();

  const { destination, related } = data;
  const hero = coverImage(destination);
  const gallery = galleryImages(destination);
  const coords = formatCoords(destination.latitude, destination.longitude);

  const facts = [
    destination.district && {
      label: 'District',
      value: destination.district.name,
      href: `/destinations?district=${destination.district.slug}`,
    },
    destination.category && {
      label: 'Category',
      value: destination.category.name,
      href: `/categories/${destination.category.slug}`,
    },
    coords && { label: 'Coordinates', value: coords },
    destination.best_months && { label: 'Best months', value: destination.best_months },
    { label: 'Catalogue', value: catalogueNumber(destination.id) },
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <>
      {live ? null : <SampleNotice />}

      <article className="mx-auto max-w-page px-5 pt-10 sm:px-8 sm:pt-14">
        <Link
          href="/destinations"
          className="t-label link-underline mb-6 inline-block text-ink-soft"
        >
          ← The catalogue
        </Link>

        {/* Masthead */}
        <div className="flex items-baseline justify-between gap-4 border-b-2 border-rule-strong pb-2.5">
          <span className="t-label text-laterite">
            {destination.category?.name ?? 'Entry'}
          </span>
          <span className="t-label text-ink-faint">
            {catalogueNumber(destination.id)}
          </span>
        </div>

        <h1 className="t-h1 mt-7 max-w-[16ch] text-ink">{destination.title}</h1>

        <p className="t-data mt-4 text-ink-soft">
          {destination.district ? `${destination.district.name} District` : null}
          {destination.district && coords ? ' · ' : null}
          {coords}
        </p>

        {/* Hero plate */}
        {hero ? (
          <figure className="mt-8">
            <div className="plate relative aspect-[16/9] w-full">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                sizes="(min-width: 1400px) 86rem, 100vw"
                priority
                className="plate-img"
              />
            </div>
            {hero.credit ? (
              <figcaption className="t-data mt-2.5 text-ink-faint">
                Photograph: {hero.credit.artist} ·{' '}
                <a
                  href={hero.credit.source}
                  className="link-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {hero.credit.license}
                </a>
              </figcaption>
            ) : null}
          </figure>
        ) : null}

        {/* Body */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            {destination.summary ? (
              <p className="t-lede measure border-l-2 border-laterite pl-5 text-ink">
                {destination.summary}
              </p>
            ) : null}

            {destination.description ? (
              <div className="mt-10">
                <div className="rule-head mb-5">
                  <span className="t-label shrink-0 text-laterite">The entry</span>
                </div>
                <div
                  className="prose-archive measure"
                  dangerouslySetInnerHTML={{ __html: destination.description }}
                />
              </div>
            ) : null}

            <Gallery images={gallery} title={destination.title} />
          </div>

          {/* Record */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rule-head mb-4">
              <span className="t-label shrink-0 text-laterite">Record</span>
            </div>

            <dl className="mb-8">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5"
                >
                  <dt className="t-label shrink-0 text-ink-faint">{f.label}</dt>
                  <dd className="t-data text-right text-ink">
                    {f.href ? (
                      <Link href={f.href} className="link-underline text-laterite">
                        {f.value}
                      </Link>
                    ) : (
                      f.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <LocatorMap
              district={destination.district?.slug ?? destination.district?.name}
              latitude={destination.latitude}
              longitude={destination.longitude}
              label={destination.title}
            />

            <div className="mt-8 space-y-2.5">
              {destination.latitude != null && destination.longitude != null ? (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${destination.latitude},${destination.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-label block bg-ink px-4 py-3 text-center text-paper transition-colors hover:bg-laterite"
                >
                  Open in Google Maps ↗
                </a>
              ) : null}
              <ShareButton
                title={destination.title}
                summary={destination.summary ?? ''}
              />
            </div>
          </aside>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 ? (
        <section className="mx-auto max-w-page px-5 py-20 sm:px-8">
          <div className="rule-head mb-8">
            <span className="t-label shrink-0 text-laterite">
              Also filed under {destination.category?.name ?? 'this heading'}
            </span>
          </div>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((d) => (
              <DestinationPlate
                key={d.id}
                destination={d}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
              />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
