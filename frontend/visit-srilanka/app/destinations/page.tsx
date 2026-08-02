import { Suspense } from 'react';
import type { Metadata } from 'next';
import DestinationsPageClient from './DestinationsPageClient';
import SampleNotice from '@/components/ui/SampleNotice';
import PageHeader from '@/components/layout/PageHeader';
import { getCategories, getDestinations, getDistricts } from '@/lib/api';

export const metadata: Metadata = {
  title: 'The catalogue',
  description:
    'Every catalogued destination in Sri Lanka, filterable by district and category, with coordinates and seasons.',
};

export default async function DestinationsPage() {
  const [destinations, categories, districts] = await Promise.all([
    getDestinations(),
    getCategories(),
    getDistricts(),
  ]);

  const live = destinations.live && categories.live && districts.live;

  return (
    <>
      {live ? null : <SampleNotice />}
      <PageHeader
        label="The catalogue"
        title="Every entry"
        lede="Filed by district, cross-cut by category. Filter it down, or read straight through."
        figures={[
          { value: destinations.data.total, label: 'Entries' },
          { value: districts.data.length, label: 'Districts' },
          { value: categories.data.length, label: 'Categories' },
        ]}
      />
      <Suspense fallback={null}>
        <DestinationsPageClient
          destinations={destinations.data.data}
          categories={categories.data}
          districts={districts.data}
        />
      </Suspense>
    </>
  );
}
