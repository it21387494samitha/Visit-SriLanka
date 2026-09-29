import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getCategories, getDestinations } from '@/lib/api';
import { categoryImage } from '@/lib/images';
import { entryCount } from '@/lib/format';
import PageHeader from '@/components/layout/PageHeader';
import SampleNotice from '@/components/ui/SampleNotice';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Categories',
  description:
    'The catalogue cut by kind: ancient ruins, hill country, beaches, wildlife, temples and waterfalls.',
};

export default async function CategoriesPage() {
  const [categories, all] = await Promise.all([getCategories(), getDestinations()]);
  const destinations = all.data.data;

  return (
    <>
      {categories.live && all.live ? null : <SampleNotice />}

      <PageHeader
        label="Headings"
        title="Filed under"
        lede="The same island, cut a different way. Each heading gathers entries of one kind, wherever they fall."
        figures={[
          { value: categories.data.length, label: 'Headings' },
          { value: destinations.length, label: 'Entries' },
        ]}
      />

      <div className="mx-auto max-w-page px-5 pb-8 sm:px-8">
        {categories.data.length > 0 ? (
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {categories.data.map((category, i) => {
              const image = categoryImage(category.slug, destinations);
              const count =
                category.destinations_count ??
                destinations.filter((d) => d.category?.slug === category.slug).length;

              return (
                <Reveal key={category.id} delay={0.05 * i}>
                  <article className="group h-full">
                    <Link href={`/categories/${category.slug}`} className="block">
                      <div className="plate relative aspect-[4/3] w-full">
                        {image ? (
                          <Image
                            src={image.src}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                            priority={i < 3}
                            className="plate-img"
                          />
                        ) : null}
                      </div>

                      <div className="mt-4 flex items-baseline gap-3 border-t border-rule pt-2.5">
                        <span className="t-data shrink-0 text-laterite tabular">
                          {String(count).padStart(2, '0')}
                        </span>
                        <span className="h-px flex-1 bg-rule" aria-hidden />
                        <span className="t-label shrink-0 text-ink-faint">
                          {entryCount(count)}
                        </span>
                      </div>

                      <h2 className="mt-2.5 font-display text-[1.85rem] uppercase leading-[0.95] tracking-tight text-ink transition-colors group-hover:text-laterite">
                        {category.name}
                      </h2>
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="border-t border-rule py-20 text-center">
            <p className="t-h3 text-ink">No headings yet</p>
            <p className="t-body measure mx-auto mt-3">
              Categories appear here once they are added in the admin panel.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
