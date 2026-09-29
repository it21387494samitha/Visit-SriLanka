export interface Category {
  id: number;
  name: string;
  slug: string;
  destinations_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface District {
  id: number;
  name: string;
  slug: string;
  destinations_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface DestinationImage {
  id: number;
  destination_id: number;
  image_path: string;
  is_cover: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Destination {
  id: number;
  category_id: number;
  district_id: number;
  title: string;
  slug: string;
  summary: string | null;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  best_months: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
  category?: Category;
  district?: District;
  cover_image?: DestinationImage | null;
  images?: DestinationImage[];
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface Stats {
  destinations: number;
  categories: number;
  districts: number;
  featured: number;
}

/**
 * Every read goes through this so callers always know whether they are
 * looking at the live catalogue or the bundled sample one.
 */
export interface Feed<T> {
  data: T;
  /** true when the Laravel API answered; false when we fell back to samples. */
  live: boolean;
}
