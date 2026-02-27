import { Metadata } from 'next';
import { getDestinations, getCategories, getDistricts } from '@/lib/api';
import DestinationsPageClient from './DestinationsPageClient';

export const metadata: Metadata = {
  title: 'Destinations — Visit Sri Lanka',
  description: 'Discover all the amazing destinations Sri Lanka has to offer.',
};

export default async function DestinationsPage() {
  const [destinationsData, categories, districts] = await Promise.all([
    getDestinations(),
    getCategories(),
    getDistricts(),
  ]);

  return (
    <DestinationsPageClient
      initialDestinations={destinationsData.data}
      categories={categories}
      districts={districts}
      totalPages={destinationsData.last_page}
    />
  );
}
