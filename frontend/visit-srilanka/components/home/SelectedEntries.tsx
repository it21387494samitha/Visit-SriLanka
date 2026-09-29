import Link from 'next/link';
import DestinationPlate from '@/components/ui/DestinationPlate';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import type { Destination } from '@/lib/types';

interface SelectedEntriesProps {
  destinations: Destination[];
}

export default function SelectedEntries({ destinations }: SelectedEntriesProps) {
  if (destinations.length === 0) return null;

  const [lead, ...rest] = destinations;
  const secondary = rest.slice(0, 6);

  return (
    <section className="mx-auto max-w-page px-5 py-20 sm:px-8">
      <SectionHead
        label="Selected entries"
        title="Start with these"
        aside={
          <Link href="/destinations" className="t-label link-underline text-laterite">
            All entries →
          </Link>
        }
      />

      <div className="grid gap-x-10 gap-y-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <Reveal>
          <DestinationPlate
            destination={lead}
            variant="lead"
            sizes="(min-width: 1024px) 55vw, 92vw"
            priority
          />
        </Reveal>

        {/* The next two run alongside the lead plate. */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
          {secondary.slice(0, 2).map((d, i) => (
            <Reveal key={d.id} delay={0.06 * (i + 1)}>
              <DestinationPlate
                destination={d}
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 92vw"
              />
            </Reveal>
          ))}
        </div>
      </div>

      {secondary.length > 2 ? (
        <div className="mt-12 grid gap-x-10 gap-y-12 border-t border-rule pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {secondary.slice(2).map((d, i) => (
            <Reveal key={d.id} delay={0.05 * i}>
              <DestinationPlate
                destination={d}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
              />
            </Reveal>
          ))}
        </div>
      ) : null}
    </section>
  );
}
