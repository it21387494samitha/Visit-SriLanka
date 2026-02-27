import HeroSection from '@/components/sections/HeroSection';
import FeaturedSection from '@/components/sections/FeaturedSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import StatsSection from '@/components/sections/StatsSection';
import ExperiencesSection from '@/components/sections/ExperiencesSection';
import CTASection from '@/components/sections/CTASection';
import { getFeaturedDestinations, getCategories, getStats } from '@/lib/api';

export default async function Home() {
  const [destinations, categories, stats] = await Promise.all([
    getFeaturedDestinations(),
    getCategories(),
    getStats(),
  ]);

  return (
    <>
      <HeroSection />
      <FeaturedSection destinations={destinations} />
      <CategoriesSection categories={categories} />
      <StatsSection stats={stats} />
      <ExperiencesSection />
      <CTASection />
    </>
  );
}
