'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { Destination, PLACEHOLDER_IMAGES } from '@/lib/types';

interface DestinationCardProps {
  destination: Destination;
  index?: number;
  variant?: 'default' | 'featured' | 'compact';
}

export default function DestinationCard({
  destination,
  index = 0,
  variant = 'default',
}: DestinationCardProps) {
  const imageUrl =
    destination.cover_image?.image_path
      ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/storage/${destination.cover_image.image_path}`
      : PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length];

  if (variant === 'featured') {
    return (
      <Link href={`/destinations/${destination.slug}`} className="block group">
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[500px] rounded-3xl overflow-hidden"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            {destination.category && (
              <span className="inline-block px-3 py-1 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 text-xs font-medium rounded-full border border-emerald-500/30 mb-4">
                {destination.category.name}
              </span>
            )}
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
              {destination.title}
            </h3>
            {destination.district && (
              <div className="flex items-center gap-1.5 text-white/50 text-sm mb-4">
                <MapPin className="w-3.5 h-3.5" />
                {destination.district.name} District
              </div>
            )}
            <p className="text-white/60 text-sm line-clamp-2 mb-4">
              {destination.summary}
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium group-hover:gap-3 transition-all">
              Explore
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Hover border glow */}
          <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-emerald-500/30 transition-colors duration-500" />
        </motion.div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/destinations/${destination.slug}`} className="block group">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="flex gap-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/10"
        >
          <div
            className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-medium text-sm truncate group-hover:text-emerald-300 transition-colors">
              {destination.title}
            </h4>
            {destination.district && (
              <p className="text-white/40 text-xs mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {destination.district.name}
              </p>
            )}
            {destination.category && (
              <span className="inline-block px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] rounded-full mt-2">
                {destination.category.name}
              </span>
            )}
          </div>
        </motion.div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/destinations/${destination.slug}`} className="block group">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/5 hover:border-emerald-500/20 transition-all duration-500"
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          {destination.is_featured && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500/90 text-white text-xs font-medium rounded-full">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {destination.category && (
            <span className="text-emerald-400 text-xs font-medium uppercase tracking-wider">
              {destination.category.name}
            </span>
          )}
          <h3 className="text-white font-semibold text-lg mt-1 group-hover:text-emerald-300 transition-colors">
            {destination.title}
          </h3>
          {destination.district && (
            <div className="flex items-center gap-1.5 text-white/40 text-xs mt-2">
              <MapPin className="w-3 h-3" />
              {destination.district.name} District
            </div>
          )}
          <p className="text-white/50 text-sm mt-3 line-clamp-2">
            {destination.summary}
          </p>
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mt-4 group-hover:gap-3 transition-all">
            Discover
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
