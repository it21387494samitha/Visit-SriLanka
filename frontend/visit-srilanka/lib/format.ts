const ROMAN: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

/** Year as a Roman numeral, for the colophon line. */
export function toRoman(n: number): string {
  let rest = Math.max(0, Math.floor(n));
  let out = '';
  for (const [value, numeral] of ROMAN) {
    while (rest >= value) {
      out += numeral;
      rest -= value;
    }
  }
  return out;
}

/** Stable catalogue number for a record, e.g. "No. 07". */
export function catalogueNumber(id: number): string {
  return `No. ${String(id).padStart(2, '0')}`;
}

/**
 * Sri Lanka sits entirely north of the equator and east of Greenwich, so the
 * hemisphere letters are effectively constant — but derive them anyway rather
 * than hard-coding N/E.
 */
export function formatCoords(
  lat: number | null | undefined,
  lon: number | null | undefined
): string | null {
  if (lat == null || lon == null) return null;
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  const ns = lat >= 0 ? 'N' : 'S';
  const ew = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(3)}°${ns} ${Math.abs(lon).toFixed(3)}°${ew}`;
}

/** "3 entries" / "1 entry" — used under district and category headings. */
export function entryCount(n: number): string {
  return `${n} ${n === 1 ? 'entry' : 'entries'}`;
}

/** Strips API-authored HTML down to plain text for meta descriptions. */
export function toPlainText(html: string | null | undefined, max = 160): string {
  if (!html) return '';
  const text = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#0?39;|&rsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(' ', max - 1))}…`;
}
