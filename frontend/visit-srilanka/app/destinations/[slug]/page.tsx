import { Metadata } from 'next';
import { getDestination } from '@/lib/api';
import { DEMO_DESTINATIONS, PLACEHOLDER_IMAGES } from '@/lib/types';
import DestinationDetailClient from './DestinationDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { destination } = await getDestination(slug);
  return {
    title: `${destination.title} — Visit Sri Lanka`,
    description: destination.summary || `Discover ${destination.title} in Sri Lanka.`,
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const { destination, related } = await getDestination(slug);

  return <DestinationDetailClient destination={destination} related={related} />;
}
