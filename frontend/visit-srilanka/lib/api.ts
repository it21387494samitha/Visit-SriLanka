import type {
  Category,
  Destination,
  District,
  Feed,
  PaginatedResponse,
  Stats,
} from './types';
import {
  SAMPLE_CATEGORIES_WITH_COUNTS,
  SAMPLE_DESTINATIONS,
  SAMPLE_DISTRICTS_WITH_COUNTS,
  SAMPLE_STATS,
} from './data/catalogue';

/**
 * NEXT_PUBLIC_API_URL is the Laravel origin (e.g. http://localhost:8000).
 * Routes live under /api/v1 (see backend/routes/api.php) and uploads under
 * /storage. Accept either form so setting the var to the origin *or* to the
 * full API root both work.
 */
const ORIGIN = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000')
  .trim()
  .replace(/\/+$/, '')
  .replace(/\/api(\/v1)?$/, '');

export const API_ROOT = `${ORIGIN}/api/v1`;
export const STORAGE_ROOT = `${ORIGIN}/storage`;

/** Seconds before a cached API response is considered stale. */
const REVALIDATE = 60;

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_ROOT}${endpoint}`, {
    next: { revalidate: REVALIDATE },
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

/**
 * Runs a live read, falling back to the bundled sample catalogue if the API is
 * unreachable. The reason is logged server-side — a silent fallback makes a
 * misconfigured API_URL look like an empty database.
 */
async function withFallback<T>(
  endpoint: string,
  read: () => Promise<T>,
  sample: () => T
): Promise<Feed<T>> {
  try {
    return { data: await read(), live: true };
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.warn(
      `[api] ${endpoint} unavailable (${reason}) at ${API_ROOT} — serving sample catalogue`
    );
    return { data: sample(), live: false };
  }
}

const paginate = <T>(data: T[]): PaginatedResponse<T> => ({
  data,
  current_page: 1,
  last_page: 1,
  per_page: data.length,
  total: data.length,
});

/* ---------------------------------------------------------------- destinations */

export async function getDestinations(params?: {
  category?: string;
  district?: string;
  search?: string;
  page?: number;
}): Promise<Feed<PaginatedResponse<Destination>>> {
  const query = new URLSearchParams();
  if (params?.category) query.set('category', params.category);
  if (params?.district) query.set('district', params.district);
  if (params?.search) query.set('search', params.search);
  if (params?.page) query.set('page', String(params.page));
  const qs = query.toString();
  const endpoint = `/destinations${qs ? `?${qs}` : ''}`;

  return withFallback(
    endpoint,
    () => fetchApi<PaginatedResponse<Destination>>(endpoint),
    () => paginate(SAMPLE_DESTINATIONS)
  );
}

export async function getFeaturedDestinations(): Promise<Feed<Destination[]>> {
  return withFallback(
    '/destinations/featured',
    () => fetchApi<Destination[]>('/destinations/featured'),
    () => SAMPLE_DESTINATIONS.filter((d) => d.is_featured)
  );
}

export async function getDestination(
  slug: string
): Promise<Feed<{ destination: Destination; related: Destination[] } | null>> {
  return withFallback(
    `/destinations/${slug}`,
    () => fetchApi<{ destination: Destination; related: Destination[] }>(`/destinations/${slug}`),
    () => {
      const destination = SAMPLE_DESTINATIONS.find((d) => d.slug === slug);
      if (!destination) return null;
      const related = SAMPLE_DESTINATIONS.filter(
        (d) => d.id !== destination.id && d.category_id === destination.category_id
      ).slice(0, 4);
      return { destination, related };
    }
  );
}

/* ------------------------------------------------------------------ categories */

export async function getCategories(): Promise<Feed<Category[]>> {
  return withFallback(
    '/categories',
    () => fetchApi<Category[]>('/categories'),
    () => SAMPLE_CATEGORIES_WITH_COUNTS
  );
}

export async function getCategory(
  slug: string
): Promise<Feed<{ category: Category; destinations: PaginatedResponse<Destination> } | null>> {
  return withFallback(
    `/categories/${slug}`,
    () =>
      fetchApi<{ category: Category; destinations: PaginatedResponse<Destination> }>(
        `/categories/${slug}`
      ),
    () => {
      const category = SAMPLE_CATEGORIES_WITH_COUNTS.find((c) => c.slug === slug);
      if (!category) return null;
      return {
        category,
        destinations: paginate(
          SAMPLE_DESTINATIONS.filter((d) => d.category?.slug === slug)
        ),
      };
    }
  );
}

/* ------------------------------------------------------------------- districts */

export async function getDistricts(): Promise<Feed<District[]>> {
  return withFallback(
    '/districts',
    () => fetchApi<District[]>('/districts'),
    () => SAMPLE_DISTRICTS_WITH_COUNTS
  );
}

/* ----------------------------------------------------------------------- stats */

export async function getStats(): Promise<Feed<Stats>> {
  return withFallback('/stats', () => fetchApi<Stats>('/stats'), () => SAMPLE_STATS);
}
