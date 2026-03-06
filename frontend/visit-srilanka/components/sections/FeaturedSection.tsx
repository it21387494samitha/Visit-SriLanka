'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Destination, PLACEHOLDER_IMAGES } from '@/lib/types';
import { TextScrubReveal } from '@/components/animations/ScrollAnimations';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedSectionProps {
  destinations: Destination[];
}

function getImage(dest: Destination, index: number) {
  if (dest.cover_image?.image_path) return dest.cover_image.image_path;
  return PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length];
}

export default function FeaturedSection({ destinations }: FeaturedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const track = trackRef.current;
    if (!section || !header || !track) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        header,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Horizontal scroll
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Each card entrance within horizontal scroll
      const cards = track.querySelectorAll('.h-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, rotateY: -8 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getById('hscroll') as gsap.core.Animation | undefined,
              start: 'left 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [destinations]);

  if (!destinations.length) return null;

  return (
    <section ref={sectionRef} className="relative">
      {/* Sticky header before the horizontal scroll */}
      <div className="relative py-24 bg-black">
        <div ref={headerRef} className="max-w-7xl mx-auto px-6 lg:px-8 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-sm font-medium">
              Handpicked for You
            </span>
          </div>
          <TextScrubReveal
            text="Featured Destinations That Will Take Your Breath Away"
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl"
          />
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div className="overflow-hidden bg-black">
        <div
          ref={trackRef}
          className="flex items-stretch gap-8 pl-8 pr-[40vw] will-change-transform"
          style={{ perspective: '1200px' }}
        >
          {destinations.slice(0, 6).map((dest, i) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              className="h-card group flex-shrink-0 relative w-[80vw] md:w-[50vw] lg:w-[35vw] h-[70vh] rounded-3xl overflow-hidden will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${getImage(dest, i)})` }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                {dest.category && (
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-full mb-3">
                    {dest.category.name}
                  </span>
                )}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {dest.title}
                </h3>
                <p className="text-white/50 text-sm line-clamp-2 mb-4 max-w-md">
                  {dest.summary}
                </p>
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Index number */}
              <div className="absolute top-6 right-6 text-white/10 text-8xl font-bold leading-none">
                {String(i + 1).padStart(2, '0')}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
