import SectionHead from '@/components/ui/SectionHead';

/**
 * Sri Lanka runs two opposing monsoons, so "when to go" is meaningless without
 * "where". The Yala monsoon (May–Sep) wets the south-west; the Maha monsoon
 * (Dec–Feb) wets the north-east. The practical consequence is that some coast
 * is always in season — which is the single most useful thing to tell a reader
 * planning a trip, and the reason this replaces a generic figures block.
 */

type Rating = 'prime' | 'mixed' | 'off';

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface Region {
  name: string;
  places: string;
  /** One rating per month, January first. */
  months: Rating[];
  note: string;
}

const P: Rating = 'prime';
const M: Rating = 'mixed';
const O: Rating = 'off';

const REGIONS: Region[] = [
  {
    name: 'West & South Coast',
    places: 'Colombo · Galle · Unawatuna · Mirissa',
    months: [P, P, P, M, O, O, O, O, O, M, P, P],
    note: 'Sheltered from the Yala monsoon only in the northern winter. Whale season off Mirissa runs Nov–Apr.',
  },
  {
    name: 'East & North Coast',
    places: 'Trincomalee · Arugam Bay · Jaffna',
    months: [O, O, M, M, P, P, P, P, P, M, O, O],
    note: 'The inverse of the south. Arugam Bay’s surf season and Trincomalee’s calm water share the same window.',
  },
  {
    name: 'Hill Country',
    places: 'Kandy · Nuwara Eliya · Ella · Horton Plains',
    months: [P, P, P, M, O, O, O, M, M, O, O, M],
    note: 'Clear mornings in the northern winter. World’s End is cloud-filled by 9 a.m. for most of the year.',
  },
  {
    name: 'Cultural Triangle',
    places: 'Anuradhapura · Polonnaruwa · Sigiriya · Dambulla',
    months: [M, P, P, P, M, M, M, M, M, O, O, O],
    note: 'Dry-zone heat is the limit rather than rain. Climb Sigiriya at first light from March onward.',
  },
];

const LEGEND: { rating: Rating; label: string; description: string }[] = [
  { rating: 'prime', label: 'Prime', description: 'Dry and settled' },
  { rating: 'mixed', label: 'Mixed', description: 'Shoulder — showers likely' },
  { rating: 'off', label: 'Off', description: 'Monsoon or peak heat' },
];

/* Rating is encoded in fill *and* in form, so the chart survives being read in
   greyscale or by someone who can't separate the hues. */
function Cell({ rating, label }: { rating: Rating; label: string }) {
  const base = 'relative h-7 border border-rule';
  if (rating === 'prime') {
    return <td className="p-0.5"><div className={`${base} bg-ink`} title={label} /></td>;
  }
  if (rating === 'mixed') {
    return (
      <td className="p-0.5">
        <div
          className={base}
          title={label}
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, var(--c-ink) 0 1.5px, transparent 1.5px 5px)',
          }}
        />
      </td>
    );
  }
  return <td className="p-0.5"><div className={base} title={label} /></td>;
}

export default function SeasonChart() {
  const currentMonth = new Date().getMonth();

  return (
    <section id="seasons" className="scroll-mt-24 border-t border-rule bg-paper-deep">
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8">
        <SectionHead
          label="When to go"
          title="Some coast is always in season"
          aside={
            <p className="t-label text-ink-faint">
              Now: {MONTH_NAMES[currentMonth]}
            </p>
          }
        >
          Two monsoons run against each other here. The Yala rains soak the
          south-west from May to September; the Maha rains cross the north-east
          from December to February. Pick the region to match the month, not the
          other way round.
        </SectionHead>

        <div className="overflow-x-auto">
          <table className="w-full min-w-2xl border-collapse">
            <caption className="sr-only">
              Best months to visit each region of Sri Lanka. Each region is rated
              prime, mixed or off for every month of the year.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="t-label w-60 pb-3 text-left text-ink-faint">
                  Region
                </th>
                {MONTHS.map((m, i) => (
                  <th
                    key={`${m}-${i}`}
                    scope="col"
                    className={`t-label pb-3 text-center ${
                      i === currentMonth ? 'text-laterite' : 'text-ink-faint'
                    }`}
                  >
                    <span aria-hidden>{m}</span>
                    <span className="sr-only">{MONTH_NAMES[i]}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REGIONS.map((region) => (
                <tr key={region.name} className="border-t border-rule align-middle">
                  <th scope="row" className="py-2.5 pr-6 text-left">
                    <span className="block font-display text-xl uppercase leading-none tracking-tight text-ink">
                      {region.name}
                    </span>
                    <span className="t-data mt-1 block text-ink-faint">
                      {region.places}
                    </span>
                  </th>
                  {region.months.map((rating, i) => (
                    <Cell
                      key={i}
                      rating={rating}
                      label={`${region.name}, ${MONTH_NAMES[i]}: ${rating}`}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-rule pt-5">
          {LEGEND.map((item) => (
            <div key={item.rating} className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="h-4 w-6 border border-rule"
                style={
                  item.rating === 'prime'
                    ? { backgroundColor: 'var(--c-ink)' }
                    : item.rating === 'mixed'
                      ? {
                          backgroundImage:
                            'repeating-linear-gradient(45deg, var(--c-ink) 0 1.5px, transparent 1.5px 5px)',
                        }
                      : undefined
                }
              />
              <span className="t-label text-ink">{item.label}</span>
              <span className="t-data text-ink-faint">{item.description}</span>
            </div>
          ))}
        </div>

        {/* Per-region notes */}
        <div className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {REGIONS.map((region) => (
            <div key={region.name} className="border-t border-rule pt-4">
              <h3 className="t-label text-laterite">{region.name}</h3>
              <p className="t-body mt-2 text-[0.95rem] leading-relaxed">{region.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
