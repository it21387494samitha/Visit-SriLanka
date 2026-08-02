import {
  DISTRICT_SHAPES,
  MAP_VIEWBOX,
  projectPoint,
} from '@/lib/data/districtShapes';

interface LocatorMapProps {
  /** Slug or name of the district to pick out. */
  district?: string;
  latitude?: number | null;
  longitude?: number | null;
  label: string;
}

const normalise = (s: string) =>
  s.toLowerCase().replace(/\s*district$/, '').replace(/[^a-z]/g, '');

/**
 * A small static index map: the island in outline, the containing district
 * filled, and a cross at the entry's real coordinates.
 */
export default function LocatorMap({
  district,
  latitude,
  longitude,
  label,
}: LocatorMapProps) {
  const key = district ? normalise(district) : null;
  const home = key
    ? DISTRICT_SHAPES.find(
        (s) => normalise(s.slug) === key || normalise(s.name) === key
      )
    : undefined;

  const hasPoint =
    latitude != null &&
    longitude != null &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude);
  const point = hasPoint ? projectPoint(latitude, longitude) : null;

  const description = home
    ? `${label} lies in ${home.name} District, shaded on this map of Sri Lanka.`
    : `Map of Sri Lanka showing the location of ${label}.`;

  return (
    <figure className="m-0">
      <svg
        viewBox={MAP_VIEWBOX}
        role="img"
        aria-label={description}
        className="mx-auto block h-auto w-full max-w-[11rem]"
      >
        {DISTRICT_SHAPES.map((shape) => (
          <path
            key={shape.slug}
            d={shape.d}
            fill={shape === home ? 'var(--c-laterite)' : 'var(--c-map-empty)'}
            stroke="var(--c-map-line)"
            strokeWidth={1.1}
            strokeLinejoin="round"
          />
        ))}

        {point ? (
          <g stroke="var(--c-ink)" strokeWidth={5}>
            <line x1={point.x - 26} y1={point.y} x2={point.x + 26} y2={point.y} />
            <line x1={point.x} y1={point.y - 26} x2={point.x} y2={point.y + 26} />
            <circle
              cx={point.x}
              cy={point.y}
              r={13}
              fill="none"
              strokeWidth={5}
            />
          </g>
        ) : null}
      </svg>
      {home ? (
        <figcaption className="t-label mt-3 text-center text-ink-faint">
          {home.name} · {home.iso}
        </figcaption>
      ) : null}
    </figure>
  );
}
