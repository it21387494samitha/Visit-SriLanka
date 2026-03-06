'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Category, Destination } from '@/lib/types';
import DestinationCard from '@/components/ui/DestinationCard';

interface Props {
  category: Category;
  destinations: Destination[];
}

export default function CategoryDetailClient({ category, destinations }: Props) {
  return (
    <div className="relative min-h-screen">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[350px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-black/60 to-black" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pb-12">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all border border-white/10 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            All Categories
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
              {category.name}
            </h1>
            <p className="text-white/50 text-lg">
              {destinations.length} destination{destinations.length !== 1 ? 's' : ''} to explore
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destinations grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {destinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <DestinationCard destination={dest} index={i} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🏝️</div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              No destinations yet
            </h3>
            <p className="text-white/40">
              Destinations in this category will appear once added.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
