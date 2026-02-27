'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Stats } from '@/lib/types';
import { TextScrubReveal } from '@/components/animations/ScrollAnimations';

gsap.registerPlugin(ScrollTrigger);

interface StatsSectionProps {
  stats: Stats;
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── Pinned section with scale-reveal ── */
      const inner = section.querySelector('.stats-inner') as HTMLElement;
      const bgImage = section.querySelector('.stats-bg') as HTMLElement;
      const statItems = section.querySelectorAll('.stat-item');
      const featureCards = section.querySelectorAll('.feat-card');

      // Pin the section while we animate
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // background image reveal via clip-path
      tl.fromTo(
        bgImage,
        { clipPath: 'inset(40% 40% 40% 40% round 24px)', opacity: 0.3 },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', opacity: 0.25, duration: 1 },
        0
      );

      // Stat items stagger in
      tl.fromTo(
        statItems,
        { y: 60, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
        },
        0.3
      );

      // Count up numbers
      statItems.forEach((item) => {
        const numEl = item.querySelector('.stat-num') as HTMLElement;
        if (!numEl) return;
        const endVal = parseFloat(numEl.dataset.end || '0');
        const obj = { val: 0 };
        tl.to(
          obj,
          {
            val: endVal,
            duration: 0.8,
            ease: 'power2.out',
            onUpdate: () => {
              numEl.textContent = Math.round(obj.val).toLocaleString() + (numEl.dataset.suffix || '');
            },
          },
          '<'
        );
      });

      // Feature cards slide up
      tl.fromTo(
        featureCards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
        },
        '-=0.4'
      );
    }, section);

    return () => ctx.revert();
  }, [stats]);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Background image with clip-path reveal */}
      <div
        className="stats-bg absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1586613835341-48e6796da4da?w=1920&q=80)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/80 to-black" />

      <div className="stats-inner relative h-full flex flex-col items-center justify-center px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <TextScrubReveal
            text="Sri Lanka by the Numbers"
            as="h2"
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          />
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            A land of incredible diversity packed into a beautiful island
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full mb-16">
          <div className="stat-item p-6 md:p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm text-center">
            <div
              className="stat-num text-4xl md:text-5xl font-bold text-emerald-400"
              data-end={stats.destinations || 83}
              data-suffix="+"
            >
              0
            </div>
            <div className="text-white/40 text-sm mt-2 uppercase tracking-wider">Destinations</div>
          </div>
          <div className="stat-item p-6 md:p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm text-center">
            <div
              className="stat-num text-4xl md:text-5xl font-bold text-teal-400"
              data-end={stats.districts || 25}
            >
              0
            </div>
            <div className="text-white/40 text-sm mt-2 uppercase tracking-wider">Districts</div>
          </div>
          <div className="stat-item p-6 md:p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm text-center">
            <div
              className="stat-num text-4xl md:text-5xl font-bold text-cyan-400"
              data-end={8}
            >
              0
            </div>
            <div className="text-white/40 text-sm mt-2 uppercase tracking-wider">UNESCO Sites</div>
          </div>
          <div className="stat-item p-6 md:p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm text-center">
            <div
              className="stat-num text-4xl md:text-5xl font-bold text-amber-400"
              data-end={stats.featured || 12}
              data-suffix="+"
            >
              0
            </div>
            <div className="text-white/40 text-sm mt-2 uppercase tracking-wider">Featured</div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {[
            {
              emoji: '🌏',
              title: 'Rich Heritage',
              desc: 'Over 2,500 years of documented history with ancient kingdoms, sacred sites, and colonial architecture.',
            },
            {
              emoji: '🌿',
              title: 'Biodiversity Hotspot',
              desc: 'Home to 3,000+ plant species, 400+ bird species, and some of the highest wildlife densities on Earth.',
            },
            {
              emoji: '🏖️',
              title: 'Perfect Coastline',
              desc: '1,340 km of golden beaches, world-class surf breaks, and pristine coral reefs.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="feat-card p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500"
            >
              <span className="text-3xl mb-3 block">{item.emoji}</span>
              <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
