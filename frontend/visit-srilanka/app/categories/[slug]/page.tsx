import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategory } from '@/lib/api';
import { entryCount } from '@/lib/format';
import DestinationPlate from '@/components/ui/DestinationPlate';
import PageHeader from '@/components/layout/PageHeader';
import SampleNotice from '@/components/ui/SampleNotice';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await getCategory(slug);
  if (!data) return { title: 'Not found' };

  return {
    title: data.category.name,
    description: `${entryCount(data.destinations.total)} filed under ${data.category.name} in Sri Lanka, with coordinates and seasons.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const { data, live } = await getCategory(slug);
  if (!data) notFound();

  const { category, destinations } = data;
  const entries = destinations.data;

  /* Which districts this heading actually reaches — a real fact about the
     category rather than a decorative stat. */
  const districts = Array.from(
    new Set(entries.map((d) => d.district?.name).filter(Boolean))
  ).sort() as string[];

  return (
    <>
      {live ? null : <SampleNotice />}

      <PageHeader
        label="Heading"
        title={category.name}
        back={{ href: '/categories', label: 'All headings' }}
        lede={
          districts.length > 0
            ? `Spread across ${districts.length} district${districts.length === 1 ? '' : 's'}: ${districts.join(', ')}.`
            : undefined
        }
        figures={[
          { value: entries.length, label: 'Entries' },
          { value: districts.length, label: 'Districts' },
        ]}
      />

      <div className="mx-auto max-w-page px-5 pb-8 sm:px-8">
        {entries.length > 0 ? (
          <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((d, i) => (
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
            <p className="t-h3 text-ink">Nothing filed here yet</p>
            <p className="t-body measure mx-auto mt-3">
              Entries added under {category.name} will appear here.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
