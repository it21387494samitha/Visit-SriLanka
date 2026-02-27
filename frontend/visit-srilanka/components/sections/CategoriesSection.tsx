'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Category } from '@/lib/types';
import { TextScrubReveal, ClipPathReveal } from '@/components/animations/ScrollAnimations';
import { Grid3X3, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_VISUALS: Record<string, { emoji: string; gradient: string; image: string }> = {
  'ancient-ruins': {
    emoji: '🏛️',
    gradient: 'from-amber-600/40 to-orange-800/40',
    image: 'https://images.unsplash.com/photo-1586613835341-48e6796da4da?w=600&q=80',
  },
  beaches: {
    emoji: '🏖️',
    gradient: 'from-cyan-600/40 to-blue-800/40',
    image: 'https://images.unsplash.com/photo-1578005343310-fce498a85988?w=600&q=80',
  },
  wildlife: {
    emoji: '🐘',
    gradient: 'from-green-600/40 to-emerald-800/40',
    image: 'https://images.unsplash.com/photo-1607685725083-cba1b167dc64?w=600&q=80',
  },
  'hill-country': {
    emoji: '🏔️',
    gradient: 'from-emerald-600/40 to-teal-800/40',
    image: 'https://images.unsplash.com/photo-1588428895857-5f533e83abda?w=600&q=80',
  },
  temples: {
    emoji: '🛕',
    gradient: 'from-purple-600/40 to-violet-800/40',
    image: 'https://images.unsplash.com/photo-1580910527691-1643e58ced65?w=600&q=80',
  },
  waterfalls: {
    emoji: '💧',
    gradient: 'from-sky-600/40 to-indigo-800/40',
    image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=600&q=80',
  },
};

const defaultVisual = {
  emoji: '✨',
  gradient: 'from-emerald-600/40 to-teal-800/40',
  image: 'https://images.unsplash.com/photo-1586613835341-48e6796da4da?w=600&q=80',
};

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll('.cat-card');

      // Each card scales in with stagger
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 80,
          scale: 0.85,
          rotateX: -10,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax float on the decorative blobs
      gsap.to('.cat-blob-1', {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
      gsap.to('.cat-blob-2', {
        y: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [categories]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-emerald-950/10" />

      {/* Decorative blobs */}
      <div className="cat-blob-1 absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
      <div className="cat-blob-2 absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Grid3X3 className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium">Browse by Type</span>
            </div>
            <TextScrubReveal
              text="Choose Your Adventure"
              as="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            />
            <p className="text-white/40 text-lg max-w-lg">
              From sacred temples to wild safaris, find the experience that speaks to your soul.
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-full border border-white/10 hover:border-white/20 transition-all whitespace-nowrap self-start md:self-auto"
          >
            View All Categories
          </Link>
        </div>

        {/* Category cards grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {categories.map((category, i) => {
            const visual = CATEGORY_VISUALS[category.slug] || defaultVisual;
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="cat-card group relative h-72 rounded-3xl overflow-hidden will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${visual.image})` }}
                />

                {/* Color overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${visual.gradient}`} />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-8">
                  <div className="flex items-start justify-between">
                    <span className="text-5xl">{visual.emoji}</span>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                      {category.name}
                    </h3>
                    {category.destinations_count !== undefined && (
                      <span className="text-white/40 text-sm">
                        {category.destinations_count} destinations
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/20 transition-colors duration-500" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
