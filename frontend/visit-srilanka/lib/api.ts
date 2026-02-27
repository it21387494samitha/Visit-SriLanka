import {
  Destination,
  Category,
  District,
  Stats,
  PaginatedResponse,
  DEMO_DESTINATIONS,
  DEMO_CATEGORIES,
  DEMO_STATS,
} from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  } catch {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
}

// Destinations
export async function getDestinations(params?: {
  category?: string;
  district?: string;
  search?: string;
  page?: number;
}): Promise<PaginatedResponse<Destination>> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.district) searchParams.set('district', params.district);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.page) searchParams.set('page', params.page.toString());
    const query = searchParams.toString();
    return await fetchApi<PaginatedResponse<Destination>>(
      `/destinations${query ? `?${query}` : ''}`
    );
  } catch {
    // Return demo data as fallback
    return {
      data: DEMO_DESTINATIONS,
      current_page: 1,
      last_page: 1,
      per_page: 12,
      total: DEMO_DESTINATIONS.length,
    };
  }
}

export async function getFeaturedDestinations(): Promise<Destination[]> {
  try {
    return await fetchApi<Destination[]>('/destinations/featured');
  } catch {
    return DEMO_DESTINATIONS.filter((d) => d.is_featured);
  }
}

export async function getDestination(
  slug: string
): Promise<{ destination: Destination; related: Destination[] }> {
  try {
    return await fetchApi(`/destinations/${slug}`);
  } catch {
    const destination = DEMO_DESTINATIONS.find((d) => d.slug === slug) || DEMO_DESTINATIONS[0];
    const related = DEMO_DESTINATIONS.filter((d) => d.id !== destination.id).slice(0, 4);
    return { destination, related };
  }
}

// Categories
export async function getCategories(): Promise<Category[]> {
  try {
    return await fetchApi<Category[]>('/categories');
  } catch {
    return DEMO_CATEGORIES;
  }
}

export async function getCategory(
  slug: string
): Promise<{ category: Category; destinations: PaginatedResponse<Destination> }> {
  try {
    return await fetchApi(`/categories/${slug}`);
  } catch {
    const category = DEMO_CATEGORIES.find((c) => c.slug === slug) || DEMO_CATEGORIES[0];
    const destinations = DEMO_DESTINATIONS.filter((d) => d.category?.slug === slug);
    return {
      category,
      destinations: {
        data: destinations,
        current_page: 1,
        last_page: 1,
        per_page: 12,
        total: destinations.length,
      },
    };
  }
}

// Districts
export async function getDistricts(): Promise<District[]> {
  try {
    return await fetchApi<District[]>('/districts');
  } catch {
    return [];
  }
}

// Stats
export async function getStats(): Promise<Stats> {
  try {
    return await fetchApi<Stats>('/stats');
  } catch {
    return DEMO_STATS;
  }
}
