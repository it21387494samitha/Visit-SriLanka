import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Sri Lanka — Visit Sri Lanka',
  description: 'Learn about the Pearl of the Indian Ocean. History, culture, nature, and everything that makes Sri Lanka extraordinary.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
