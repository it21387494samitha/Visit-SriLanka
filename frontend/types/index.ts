export interface Destination {
  id: number
  name: string
  slug: string
  short_description: string | null
  description: string | null
  category: Category | null
  province: string | null
  district: string | null
  latitude: number | null
  longitude: number | null
  best_time_to_visit: string[] | null
  climate: string | null
  entry_fee: string | null
  is_featured: boolean
  is_published: boolean
  meta_title: string | null
  meta_description: string | null
  hero?: string
}

export interface Hotel {
  id: number
  name: string
  slug: string
  short_description: string | null
  description: string | null
  address: string | null
  province: string | null
  district: string | null
  latitude: number | null
  longitude: number | null
  star_rating: number | null
  price_per_night: string | null
  amenities: string[] | null
  contact_email: string | null
  contact_phone: string | null
  website: string | null
  is_featured: boolean
  is_published: boolean
  meta_title: string | null
  meta_description: string | null
  hero?: string
}

export interface Tour {
  id: number
  name: string
  slug: string
  short_description: string | null
  description: string | null
  duration_days: number
  price: string
  max_group_size: number | null
  difficulty: 'easy' | 'moderate' | 'challenging'
  highlights: string[] | null
  includes: string[] | null
  excludes: string[] | null
  itinerary: Record<string, string> | null
  is_featured: boolean
  is_published: boolean
  meta_title: string | null
  meta_description: string | null
  hero?: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  icon: string | null
  color: string | null
  is_active: boolean
  destinations_count?: number
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string
  author: { id: number; name: string } | null
  category: Category | null
  tags: string[] | null
  is_featured: boolean
  is_published: boolean
  published_at: string | null
  meta_title: string | null
  meta_description: string | null
  og_image: string | null
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}
