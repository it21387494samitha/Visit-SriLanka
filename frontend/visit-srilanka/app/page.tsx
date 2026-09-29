import Masthead from '@/components/home/Masthead';
import SelectedEntries from '@/components/home/SelectedEntries';
import CategoryIndex from '@/components/home/CategoryIndex';
import SeasonChart from '@/components/home/SeasonChart';
import ClosingBand from '@/components/home/ClosingBand';
import SampleNotice from '@/components/ui/SampleNotice';
import {
  getCategories,
  getDestinations,
  getDistricts,
  getFeaturedDestinations,
  getStats,
} from '@/lib/api';

export default async function HomePage() {
  const [featured, categories, districts, stats, all] = await Promise.all([
    getFeaturedDestinations(),
    getCategories(),
    getDistricts(),
    getStats(),
    getDestinations(),
  ]);

  const live = featured.live && categories.live && districts.live && stats.live;

  return (
    <>
      {live ? null : <SampleNotice />}
      <Masthead districts={districts.data} stats={stats.data} />
      <SelectedEntries destinations={featured.data} />
      <CategoryIndex categories={categories.data} destinations={all.data.data} />
      <SeasonChart />
      <ClosingBand />
    </>
  );
}
