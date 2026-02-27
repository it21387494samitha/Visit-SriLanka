'use client';

import { motion } from 'framer-motion';
import { Grid3X3 } from 'lucide-react';
import { Category } from '@/lib/types';
import CategoryCard from '@/components/ui/CategoryCard';
import dynamic from 'next/dynamic';

const ParticleField = dynamic(() => import('@/components/three/ParticleField'), {
  ssr: false,
});

interface Props {
  categories: Category[];
}

export default function CategoriesPageClient({ categories }: Props) {
  return (
    <div className="relative min-h-screen">
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[380px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-black/50 to-black" />
        <ParticleField />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Grid3X3 className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium">
                {categories.length} Categories
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Explore by{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Category
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl">
              Whether you seek ancient history, beach bliss, or wild
              adventures — find your perfect Sri Lankan experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <CategoryCard category={category} index={i} />
            </motion.div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📂</div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              No categories yet
            </h3>
            <p className="text-white/40">Categories will appear here once added in the admin panel.</p>
          </div>
        )}
      </section>
    </div>
  );
}
