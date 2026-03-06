'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/lib/types';

const categoryIcons: Record<string, string> = {
  'ancient-ruins': '🏛️',
  beaches: '🏖️',
  wildlife: '🐘',
  'hill-country': '⛰️',
  temples: '🛕',
  waterfalls: '💧',
  default: '🌴',
};

const categoryGradients: Record<string, string> = {
  'ancient-ruins': 'from-amber-500/20 to-orange-600/20',
  beaches: 'from-cyan-500/20 to-blue-600/20',
  wildlife: 'from-green-500/20 to-emerald-600/20',
  'hill-country': 'from-emerald-500/20 to-teal-600/20',
  temples: 'from-purple-500/20 to-indigo-600/20',
  waterfalls: 'from-blue-500/20 to-cyan-600/20',
  default: 'from-teal-500/20 to-emerald-600/20',
};

const categoryBorders: Record<string, string> = {
  'ancient-ruins': 'hover:border-amber-500/30',
  beaches: 'hover:border-cyan-500/30',
  wildlife: 'hover:border-green-500/30',
  'hill-country': 'hover:border-emerald-500/30',
  temples: 'hover:border-purple-500/30',
  waterfalls: 'hover:border-blue-500/30',
  default: 'hover:border-teal-500/30',
};

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const icon = categoryIcons[category.slug] || categoryIcons.default;
  const gradient = categoryGradients[category.slug] || categoryGradients.default;
  const border = categoryBorders[category.slug] || categoryBorders.default;

  return (
    <Link href={`/categories/${category.slug}`} className="block group">
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className={`relative p-6 rounded-2xl bg-gradient-to-br ${gradient} backdrop-blur-sm border border-white/5 ${border} transition-all duration-500 overflow-hidden`}
      >
        {/* Decorative background */}
        <div className="absolute top-0 right-0 text-8xl opacity-10 -mr-4 -mt-4 leading-none select-none">
          {icon}
        </div>

        <div className="relative z-10">
          <span className="text-4xl mb-4 block">{icon}</span>
          <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-emerald-300 transition-colors">
            {category.name}
          </h3>
          <p className="text-white/40 text-sm">
            {category.destinations_count || 0} destinations
          </p>
          <div className="flex items-center gap-2 text-white/30 group-hover:text-emerald-400 text-sm mt-4 transition-all group-hover:gap-3">
            Explore
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
