import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import Reveal from '@/components/ui/Reveal';
import IslandMap from '@/components/map/IslandMap';
import { getDistricts } from '@/lib/api';
import { getPlate } from '@/lib/data/plates';

export const metadata: Metadata = {
  title: 'The island',
  description:
    'Sri Lanka in outline: 65,610 km² between 5°55′N and 9°51′N, two opposing monsoons, twenty-five centuries of capitals, and eight World Heritage Sites.',
};

const FIGURES = [
  { value: '65,610', unit: 'km²', label: 'Land area' },
  { value: '432', unit: 'km', label: 'North to south' },
  { value: '224', unit: 'km', label: 'East to west' },
  { value: '2,524', unit: 'm', label: 'Pidurutalagala' },
  { value: '1,340', unit: 'km', label: 'Coastline' },
  { value: '8', unit: '', label: 'World Heritage Sites' },
];

const HERITAGE = [
  ['Sacred City of Anuradhapura', 'Cultural', '1982'],
  ['Ancient City of Polonnaruwa', 'Cultural', '1982'],
  ['Ancient City of Sigiriya', 'Cultural', '1982'],
  ['Sacred City of Kandy', 'Cultural', '1988'],
  ['Old Town of Galle and its Fortifications', 'Cultural', '1988'],
  ['Rangiri Dambulla Cave Temple', 'Cultural', '1991'],
  ['Sinharaja Forest Reserve', 'Natural', '1988'],
  ['Central Highlands of Sri Lanka', 'Natural', '2010'],
];

function Plate({ slug, caption }: { slug: string; caption: string }) {
  const plate = getPlate(slug);
  if (!plate) return null;
  return (
    <figure className="m-0">
      <div className="plate relative aspect-[4/3] w-full">
        <Image
          src={plate.src}
          alt={caption}
          fill
          sizes="(min-width: 1024px) 30vw, 92vw"
          className="plate-img"
        />
      </div>
      <figcaption className="t-data mt-2.5 text-ink-faint">
        {caption} · {plate.artist}, {plate.license}
      </figcaption>
    </figure>
  );
}

export default async function AboutPage() {
  const districts = await getDistricts();

  return (
    <>
      <PageHeader
        label="The island"
        title="A large island, densely packed"
        lede="Sri Lanka is smaller than Ireland and holds eight World Heritage Sites, two monsoons, a 2,500-metre massif and 1,340 kilometres of coast. Nothing is far from anything else — which is the whole argument for going."
      />

      <div className="mx-auto max-w-page px-5 sm:px-8">
        {/* Figures ledger */}
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-7 border-y-2 border-rule-strong py-8 sm:grid-cols-3 lg:grid-cols-6">
            {FIGURES.map((f) => (
              <div key={f.label} className="flex flex-col-reverse">
                <dt className="t-label mt-1.5 text-ink-faint">{f.label}</dt>
                <dd className="font-display text-[2.4rem] font-bold leading-none tracking-tight text-ink tabular">
                  {f.value}
                  {f.unit ? (
                    <span className="ml-1 font-mono text-sm font-normal text-ink-soft">
                      {f.unit}
                    </span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Two monsoons */}
        <Reveal>
          <section className="grid gap-10 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
            <div>
              <div className="rule-head mb-5">
                <span className="t-label shrink-0 text-laterite">Weather</span>
              </div>
              <h2 className="t-h2 text-ink">Two monsoons,
                <br />pulling opposite ways</h2>
            </div>
            <div className="t-body space-y-5 text-[1.0625rem] leading-relaxed">
              <p>
                The Yala monsoon arrives from the south-west in May and runs to
                September, soaking Colombo, Galle and the western slopes of the
                highlands. The Maha monsoon comes off the Bay of Bengal from
                December to February and does the same to Trincomalee, Batticaloa
                and Jaffna.
              </p>
              <p>
                Because the two never coincide, the island has no closed season —
                only a wrong coast. A trip planned in July belongs on the east; the
                same trip in January belongs on the south. The{' '}
                <Link href="/#seasons" className="link-underline text-laterite">
                  season chart on the home page
                </Link>{' '}
                sets this out month by month.
              </p>
              <p>
                Altitude complicates it further. Nuwara Eliya sits at 1,868 metres
                and drops close to freezing at night while Colombo, ninety minutes
                away as the crow flies, does not fall below 22°C all year.
              </p>
            </div>
          </section>
        </Reveal>

        {/* Plates */}
        <Reveal>
          <div className="grid gap-8 pb-20 sm:grid-cols-3">
            <Plate slug="nuwara-eliya" caption="Tea country above Nuwara Eliya" />
            <Plate slug="arugam-bay" caption="Arugam Bay, on the east coast" />
            <Plate slug="horton-plains" caption="Horton Plains, at 2,100 metres" />
          </div>
        </Reveal>
      </div>

      {/* Capitals — dark band */}
      <section className="bg-band">
        <div className="mx-auto max-w-page px-5 py-20 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
            <div>
              <div className="rule-head mb-5">
                <span className="t-label shrink-0 text-laterite">History</span>
              </div>
              <h2 className="t-h2 text-band-ink">
                Twenty-five centuries
                <br />
                of capitals
              </h2>
            </div>
            <div className="space-y-5 text-[1.0625rem] leading-relaxed text-band-ink-soft">
              <p>
                Anuradhapura was the seat of power for roughly 1,400 years — longer
                than Rome held anything. Its irrigation engineers built reservoirs
                so large that some are still the primary water supply for their
                districts, and invented the <em>bisokotuwa</em>, a valve pit that
                let water be drawn from a tank under controlled pressure.
              </p>
              <p>
                When Anuradhapura fell in 1017, the capital moved to Polonnaruwa,
                then in turn to Dambadeniya, Yapahuwa, Kurunegala, Kotte and
                finally Kandy, which held out against the Portuguese and the Dutch
                and fell to the British only in 1815. Independence came on 4
                February 1948; the country was renamed Sri Lanka in 1972.
              </p>
              <p>
                What this leaves is unusual: a small island where four former
                capitals are ruins you can walk through in a week, and the fifth is
                still a working city with the relic that legitimised all of them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-page px-5 sm:px-8">
        {/* Tea */}
        <Reveal>
          <section className="grid gap-10 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
            <div>
              <div className="rule-head mb-5">
                <span className="t-label shrink-0 text-laterite">Tea</span>
              </div>
              <h2 className="t-h2 text-ink">What the tea replaced</h2>
            </div>
            <div className="t-body space-y-5 text-[1.0625rem] leading-relaxed">
              <p>
                The hill country was coffee before it was tea. In the 1870s a
                fungus — <em>Hemileia vastatrix</em>, coffee leaf rust — destroyed
                the plantations almost completely, and the estates were replanted
                with tea that James Taylor had begun experimenting with at
                Loolecondera in 1867.
              </p>
              <p>
                The word &ldquo;Ceylon&rdquo; survived on the tea chests long after
                it left the map. The terraced slopes around Nuwara Eliya, Ella and
                Haputale are the visible result: an industrial monoculture that has
                become, a century and a half later, the landscape people come to
                photograph.
              </p>
            </div>
          </section>
        </Reveal>

        {/* Heritage table */}
        <Reveal>
          <section className="pb-20">
            <div className="rule-head mb-6">
              <span className="t-label shrink-0 text-laterite">Protected</span>
            </div>
            <h2 className="t-h2 mb-8 text-ink">Eight World Heritage Sites</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-lg border-collapse">
                <thead>
                  <tr className="border-b-2 border-rule-strong">
                    <th scope="col" className="t-label pb-2.5 text-left text-ink-faint">
                      Site
                    </th>
                    <th scope="col" className="t-label pb-2.5 text-left text-ink-faint">
                      Type
                    </th>
                    <th scope="col" className="t-label pb-2.5 text-right text-ink-faint">
                      Inscribed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {HERITAGE.map(([name, type, year]) => (
                    <tr key={name} className="border-b border-rule">
                      <td className="py-3 pr-4">
                        <span className="font-display text-xl uppercase leading-none tracking-tight text-ink">
                          {name}
                        </span>
                      </td>
                      <td className="t-data py-3 pr-4 text-ink-soft">{type}</td>
                      <td className="t-data py-3 text-right text-ink-soft tabular">
                        {year}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Reveal>

        {/* The map again, as the index */}
        <Reveal>
          <section className="border-t border-rule py-20">
            <div className="rule-head mb-6">
              <span className="t-label shrink-0 text-laterite">The index</span>
            </div>
            <h2 className="t-h2 mb-10 text-ink">Twenty-five districts</h2>
            <IslandMap districts={districts.data} />
          </section>
        </Reveal>
      </div>
    </>
  );
}
