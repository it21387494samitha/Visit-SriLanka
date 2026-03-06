import { Metadata } from 'next';
import { getCategory } from '@/lib/api';
import CategoryDetailClient from './CategoryDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { category } = await getCategory(slug);
  return {
    title: `${category.name} — Visit Sri Lanka`,
    description: `Explore ${category.name} destinations in Sri Lanka.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const { category, destinations } = await getCategory(slug);
  return <CategoryDetailClient category={category} destinations={destinations.data} />;
}
