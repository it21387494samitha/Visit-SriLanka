import { Metadata } from 'next';
import { getCategories } from '@/lib/api';
import CategoriesPageClient from './CategoriesPageClient';

export const metadata: Metadata = {
  title: 'Explore Categories — Visit Sri Lanka',
  description: 'Browse destinations by category. Ancient ruins, beaches, wildlife, temples, and more.',
};

export default async function CategoriesPage() {
  const categories = await getCategories();
  return <CategoriesPageClient categories={categories} />;
}
