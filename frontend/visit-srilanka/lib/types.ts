export interface Category {
  id: number;
  name: string;
  slug: string;
  destinations_count?: number;
  created_at: string;
  updated_at: string;
}

export interface District {
  id: number;
  name: string;
  slug: string;
  destinations_count?: number;
  created_at: string;
  updated_at: string;
}

export interface DestinationImage {
  id: number;
  destination_id: number;
  image_path: string;
  is_cover: boolean;
  created_at: string;
  updated_at: string;
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
  created_at: string;
  updated_at: string;
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

// Demo data for when API is not available
export const DEMO_CATEGORIES: Category[] = [
  { id: 1, name: 'Ancient Ruins', slug: 'ancient-ruins', destinations_count: 12, created_at: '', updated_at: '' },
  { id: 2, name: 'Beaches', slug: 'beaches', destinations_count: 18, created_at: '', updated_at: '' },
  { id: 3, name: 'Wildlife', slug: 'wildlife', destinations_count: 8, created_at: '', updated_at: '' },
  { id: 4, name: 'Hill Country', slug: 'hill-country', destinations_count: 15, created_at: '', updated_at: '' },
  { id: 5, name: 'Temples', slug: 'temples', destinations_count: 20, created_at: '', updated_at: '' },
  { id: 6, name: 'Waterfalls', slug: 'waterfalls', destinations_count: 10, created_at: '', updated_at: '' },
];

export const DEMO_DESTINATIONS: Destination[] = [
  {
    id: 1, category_id: 1, district_id: 1, title: 'Sigiriya Rock Fortress',
    slug: 'sigiriya-rock-fortress',
    summary: 'An ancient rock fortress rising 200 meters above the surrounding jungle, adorned with frescoes and landscaped gardens.',
    description: 'Sigiriya or Sinhagiri is an ancient rock fortress located in the northern Matale District near the town of Dambulla. The name refers to a site of historical and archaeological significance that is dominated by a massive column of rock.',
    latitude: 7.957, longitude: 80.7603, best_months: 'Jan-Apr', is_featured: true, is_published: true,
    created_at: '', updated_at: '',
    category: { id: 1, name: 'Ancient Ruins', slug: 'ancient-ruins', created_at: '', updated_at: '' },
    district: { id: 1, name: 'Matale', slug: 'matale', created_at: '', updated_at: '' },
  },
  {
    id: 2, category_id: 2, district_id: 2, title: 'Unawatuna Beach',
    slug: 'unawatuna-beach',
    summary: 'A stunning crescent-shaped beach with golden sand, crystal clear waters, and vibrant coral reefs.',
    description: 'Unawatuna is a coastal town in Galle District. It is one of the most popular beaches in Sri Lanka, known for its beauty and safe swimming conditions.',
    latitude: 6.0117, longitude: 80.2498, best_months: 'Nov-Apr', is_featured: true, is_published: true,
    created_at: '', updated_at: '',
    category: { id: 2, name: 'Beaches', slug: 'beaches', created_at: '', updated_at: '' },
    district: { id: 2, name: 'Galle', slug: 'galle', created_at: '', updated_at: '' },
  },
  {
    id: 3, category_id: 4, district_id: 3, title: 'Ella Rock',
    slug: 'ella-rock',
    summary: 'A breathtaking hike through tea plantations to panoramic views of Sri Lanka\'s misty hill country.',
    description: 'Ella Rock is a mountain in the Badulla District. The hike to the top offers some of the most spectacular views in Sri Lanka, passing through tea estates and lush forests.',
    latitude: 6.8667, longitude: 81.0467, best_months: 'Jan-Mar', is_featured: true, is_published: true,
    created_at: '', updated_at: '',
    category: { id: 4, name: 'Hill Country', slug: 'hill-country', created_at: '', updated_at: '' },
    district: { id: 3, name: 'Badulla', slug: 'badulla', created_at: '', updated_at: '' },
  },
  {
    id: 4, category_id: 5, district_id: 4, title: 'Temple of the Tooth',
    slug: 'temple-of-the-tooth',
    summary: 'A sacred Buddhist temple housing the relic of the tooth of Buddha, a UNESCO World Heritage Site.',
    description: 'Sri Dalada Maligawa or the Temple of the Sacred Tooth Relic is a Buddhist temple in Kandy. It is located in the royal palace complex of the former Kingdom of Kandy.',
    latitude: 7.2936, longitude: 80.6413, best_months: 'Year-round', is_featured: true, is_published: true,
    created_at: '', updated_at: '',
    category: { id: 5, name: 'Temples', slug: 'temples', created_at: '', updated_at: '' },
    district: { id: 4, name: 'Kandy', slug: 'kandy', created_at: '', updated_at: '' },
  },
  {
    id: 5, category_id: 3, district_id: 5, title: 'Yala National Park',
    slug: 'yala-national-park',
    summary: 'Sri Lanka\'s most famous national park, home to the highest density of leopards in the world.',
    description: 'Yala National Park is the most visited and second largest national park in Sri Lanka. It is home to 44 varieties of mammals and 215 bird species.',
    latitude: 6.3798, longitude: 81.5189, best_months: 'Feb-Jul', is_featured: true, is_published: true,
    created_at: '', updated_at: '',
    category: { id: 3, name: 'Wildlife', slug: 'wildlife', created_at: '', updated_at: '' },
    district: { id: 5, name: 'Hambantota', slug: 'hambantota', created_at: '', updated_at: '' },
  },
  {
    id: 6, category_id: 6, district_id: 3, title: 'Ravana Falls',
    slug: 'ravana-falls',
    summary: 'A majestic 25-meter waterfall cascading down rocky cliffs, steeped in legend and myth.',
    description: 'Ravana Falls is a popular attraction in Ella. The falls rank as one of the widest falls in the country and is part of the Ravana Ella Wildlife Sanctuary.',
    latitude: 6.8382, longitude: 81.0517, best_months: 'Oct-Mar', is_featured: true, is_published: true,
    created_at: '', updated_at: '',
    category: { id: 6, name: 'Waterfalls', slug: 'waterfalls', created_at: '', updated_at: '' },
    district: { id: 3, name: 'Badulla', slug: 'badulla', created_at: '', updated_at: '' },
  },
];

export const DEMO_STATS: Stats = {
  destinations: 83,
  categories: 6,
  districts: 25,
  featured: 12,
};

// Placeholder image URLs for demo
export const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1586613835341-48e6796da4da?w=800&q=80', // Sigiriya
  'https://images.unsplash.com/photo-1578005343310-fce498a85988?w=800&q=80', // Sri Lanka Beach
  'https://images.unsplash.com/photo-1588428895857-5f533e83abda?w=800&q=80', // Tea plantations
  'https://images.unsplash.com/photo-1580910527691-1643e58ced65?w=800&q=80', // Temple
  'https://images.unsplash.com/photo-1607685725083-cba1b167dc64?w=800&q=80', // Wildlife
  'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800&q=80', // Waterfall
];
