import Image from 'next/image';
import Link from 'next/link';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import { categoryImage } from '@/lib/images';
import type { Category, Destination } from '@/lib/types';

interface CategoryIndexProps {
  categories: Category[];
  /** Used to pull a representative plate and a few example names per category. */
  destinations: Destination[];
}

export default function CategoryIndex({ categories, destinations }: CategoryIndexProps) {
  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-page px-5 py-20 sm:px-8">
      <SectionHead
        label="Filed under"
        title="Six ways through the island"
      >
        The same twenty-five districts, cut a different way. Each heading below
        collects entries of one kind, wherever on the island they fall.
      </SectionHead>

      <ul className="border-t-2 border-rule-strong">
        {categories.map((category, i) => {
          const image = categoryImage(category.slug, destinations);
          const examples = destinations
            .filter((d) => d.category?.slug === category.slug)
            .slice(0, 3)
            .map((d) => d.title);
          const count = category.destinations_count ?? examples.length;

          return (
            <Reveal as="li" key={category.id} delay={0.04 * i}>
              <Link
                href={`/categories/${category.slug}`}
                className="group flex items-center gap-5 border-b border-rule py-5 sm:gap-8"
              >
                <div className="plate relative hidden h-20 w-28 shrink-0 sm:block">
                  {image ? (
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="112px"
                      className="plate-img"
                    />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[1.75rem] uppercase leading-none tracking-tight text-ink transition-colors group-hover:text-laterite sm:text-[2.25rem]">
                    {category.name}
                  </h3>
                  {examples.length > 0 ? (
                    <p className="t-data mt-1.5 truncate text-ink-faint">
                      {examples.join(' · ')}
                      {count > examples.length ? ' · …' : ''}
                    </p>
                  ) : null}
                </div>

                <div className="shrink-0 text-right">
                  <span className="font-display text-2xl leading-none text-ink-soft tabular">
                    {String(count).padStart(2, '0')}
                  </span>
                  <span className="t-label mt-1 block text-ink-faint">
                    {count === 1 ? 'Entry' : 'Entries'}
                  </span>
                </div>

                <span
                  aria-hidden
                  className="t-data shrink-0 text-ink-faint transition-all group-hover:translate-x-1 group-hover:text-laterite"
                >
                  →
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
