'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Destination, PLACEHOLDER_IMAGES } from '@/lib/types';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

interface FeaturedCarouselProps {
  destinations: Destination[];
}

export default function FeaturedCarousel({ destinations }: FeaturedCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % destinations.length);
    }, 6000);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [destinations.length]);

  const navigate = (dir: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDirection(dir);
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return destinations.length - 1;
      if (next >= destinations.length) return 0;
      return next;
    });
    startAutoplay();
  };

  if (!destinations.length) return null;

  const dest = destinations[current];
  const imageUrl =
    dest.cover_image?.image_path
      ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/storage/${dest.cover_image.image_path}`
      : PLACEHOLDER_IMAGES[current % PLACEHOLDER_IMAGES.length];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] rounded-3xl overflow-hidden group">
      {/* Background images */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {dest.category && (
              <span className="inline-block px-4 py-1.5 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 text-sm font-medium rounded-full border border-emerald-500/30 mb-4">
                {dest.category.name}
              </span>
            )}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-2xl">
              {dest.title}
            </h2>
            {dest.district && (
              <div className="flex items-center gap-2 text-white/60 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{dest.district.name} District</span>
              </div>
            )}
            <p className="text-white/60 text-lg max-w-xl mb-8 line-clamp-2">
              {dest.summary}
            </p>
            <Link
              href={`/destinations/${dest.slug}`}
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore This Place
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
        <button
          onClick={() => navigate(-1)}
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigate(1)}
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 right-8 md:right-12 flex gap-2">
        {destinations.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
              if (intervalRef.current) clearInterval(intervalRef.current);
              startAutoplay();
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? 'w-8 bg-emerald-400'
                : 'w-1.5 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
