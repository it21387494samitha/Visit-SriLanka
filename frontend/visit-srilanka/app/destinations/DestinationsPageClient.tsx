'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, MapPin, SlidersHorizontal } from 'lucide-react';
import { Destination, Category, District } from '@/lib/types';
import DestinationCard from '@/components/ui/DestinationCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedText from '@/components/ui/AnimatedText';
import dynamic from 'next/dynamic';

const ParticleField = dynamic(() => import('@/components/three/ParticleField'), {
  ssr: false,
});

interface Props {
  initialDestinations: Destination[];
  categories: Category[];
  districts: District[];
  totalPages: number;
}

export default function DestinationsPageClient({
  initialDestinations,
  categories,
  districts,
}: Props) {
  const [destinations, setDestinations] = useState(initialDestinations);
  const [filtered, setFiltered] = useState(initialDestinations);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let result = destinations;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.summary?.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) {
      result = result.filter((d) => d.category?.slug === selectedCategory);
    }
    if (selectedDistrict) {
      result = result.filter((d) => d.district?.slug === selectedDistrict);
    }
    setFiltered(result);
  }, [search, selectedCategory, selectedDistrict, destinations]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory(null);
    setSelectedDistrict(null);
  };

  const hasActiveFilters = search || selectedCategory || selectedDistrict;

  return (
    <div className="relative min-h-screen">
      {/* Hero section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-black/50 to-black" />
        <ParticleField />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium">
                {filtered.length} Destinations
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              All{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Destinations
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl">
              Explore every corner of Sri Lanka&apos;s paradise. Filter by category,
              district, or search for your dream destination.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="relative -mt-8 z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search destinations..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>

            {/* Filter toggle (mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>

            {/* Desktop filters */}
            <div className="hidden md:flex gap-3">
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none cursor-pointer min-w-[160px]"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug} className="bg-black">
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedDistrict || ''}
                onChange={(e) => setSelectedDistrict(e.target.value || null)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none cursor-pointer min-w-[160px]"
              >
                <option value="">All Districts</option>
                {districts.map((dist) => (
                  <option key={dist.id} value={dist.slug} className="bg-black">
                    {dist.name}
                  </option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Mobile filters dropdown */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-white/10">
                  <select
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug} className="bg-black">
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedDistrict || ''}
                    onChange={(e) => setSelectedDistrict(e.target.value || null)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="">All Districts</option>
                    {districts.map((dist) => (
                      <option key={dist.id} value={dist.slug} className="bg-black">
                        {dist.name}
                      </option>
                    ))}
                  </select>

                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
                    >
                      <X className="w-4 h-4" />
                      Clear All Filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <DestinationCard destination={dest} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              No destinations found
            </h3>
            <p className="text-white/40 mb-6">
              Try adjusting your filters or search terms.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </section>
    </div>
  );
}
