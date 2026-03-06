'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Calendar,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Star,
  Share2,
  Navigation,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { Destination, PLACEHOLDER_IMAGES } from '@/lib/types';
import DestinationCard from '@/components/ui/DestinationCard';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface Props {
  destination: Destination;
  related: Destination[];
}

export default function DestinationDetailClient({ destination, related }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Build image list
  const images =
    destination.images && destination.images.length > 0
      ? destination.images.map(
          (img) =>
            `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/storage/${img.image_path}`
        )
      : PLACEHOLDER_IMAGES.slice(0, 4);

  const heroImage = images[0];

  return (
    <div className="relative min-h-screen">
      {/* Hero Image */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

        {/* Back button */}
        <div className="absolute top-28 left-6 lg:left-8 z-10">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 lg:px-8 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {destination.category && (
                <Link
                  href={`/categories/${destination.category.slug}`}
                  className="inline-flex items-center px-3 py-1.5 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 text-sm font-medium rounded-full border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
                >
                  {destination.category.name}
                </Link>
              )}
              {destination.is_featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-500/20 backdrop-blur-sm text-amber-300 text-sm font-medium rounded-full border border-amber-500/30">
                  <Star className="w-3.5 h-3.5" />
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {destination.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/50">
              {destination.district && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{destination.district.name} District</span>
                </div>
              )}
              {destination.best_months && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>Best: {destination.best_months}</span>
                </div>
              )}
              {destination.latitude && destination.longitude && (
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span>
                    {destination.latitude.toFixed(4)}°N,{' '}
                    {destination.longitude.toFixed(4)}°E
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Summary */}
            <ScrollReveal>
              <div className="p-8 rounded-2xl bg-white/5 border border-white/5 mb-8">
                <p className="text-white/70 text-lg leading-relaxed">
                  {destination.summary}
                </p>
              </div>
            </ScrollReveal>

            {/* Image Gallery */}
            {images.length > 1 && (
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
                <div className="grid grid-cols-2 gap-4 mb-12">
                  {images.map((img, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className={`relative rounded-2xl overflow-hidden cursor-pointer ${
                        i === 0 ? 'col-span-2 h-72' : 'h-48'
                      }`}
                      onClick={() => {
                        setLightboxIndex(i);
                        setLightboxOpen(true);
                      }}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center hover:scale-110 transition-transform duration-700"
                        style={{ backgroundImage: `url(${img})` }}
                      />
                      <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {/* Description */}
            {destination.description && (
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-white mb-6">About</h2>
                <div
                  className="prose-dark text-white/60 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: destination.description }}
                />
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ScrollReveal delay={0.2}>
              {/* Quick info card */}
              <div className="sticky top-28 space-y-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Quick Info
                  </h3>
                  <div className="space-y-4">
                    {destination.category && (
                      <div className="flex items-center justify-between">
                        <span className="text-white/40 text-sm">Category</span>
                        <span className="text-emerald-400 text-sm font-medium">
                          {destination.category.name}
                        </span>
                      </div>
                    )}
                    {destination.district && (
                      <div className="flex items-center justify-between">
                        <span className="text-white/40 text-sm">District</span>
                        <span className="text-white text-sm">
                          {destination.district.name}
                        </span>
                      </div>
                    )}
                    {destination.best_months && (
                      <div className="flex items-center justify-between">
                        <span className="text-white/40 text-sm">Best Time</span>
                        <span className="text-white text-sm">
                          {destination.best_months}
                        </span>
                      </div>
                    )}
                    {destination.latitude && destination.longitude && (
                      <div className="pt-4 border-t border-white/5">
                        <a
                          href={`https://www.google.com/maps?q=${destination.latitude},${destination.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors text-sm font-medium"
                        >
                          <Navigation className="w-4 h-4" />
                          Open in Google Maps
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Share */}
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: destination.title,
                        text: destination.summary || '',
                        url: window.location.href,
                      });
                    }
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/5 text-white/60 rounded-xl border border-white/10 hover:bg-white/10 hover:text-white transition-colors text-sm"
                >
                  <Share2 className="w-4 h-4" />
                  Share This Destination
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Related destinations */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-white mb-8">
              Related Destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((dest, i) => (
                <DestinationCard key={dest.id} destination={dest} index={i} />
              ))}
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={images[lightboxIndex]}
              alt=""
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === lightboxIndex ? 'bg-emerald-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
