'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextScrubReveal } from '@/components/animations/ScrollAnimations';
import { Camera, Mountain, Palmtree, Waves, Sun, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    icon: Mountain,
    title: 'Mountain Trails',
    description: 'Trek through misty peaks and lush tea plantations in the central highlands.',
    color: 'emerald',
    image: 'https://images.unsplash.com/photo-1588428895857-5f533e83abda?w=400&q=80',
  },
  {
    icon: Waves,
    title: 'Ocean Adventures',
    description: 'Surf world-class waves, dive coral reefs, and spot blue whales.',
    color: 'cyan',
    image: 'https://images.unsplash.com/photo-1578005343310-fce498a85988?w=400&q=80',
  },
  {
    icon: Palmtree,
    title: 'Tropical Paradise',
    description: 'Relax on golden beaches fringed by swaying palm trees.',
    color: 'amber',
    image: 'https://images.unsplash.com/photo-1578005343310-fce498a85988?w=400&q=80',
  },
  {
    icon: Camera,
    title: 'Cultural Heritage',
    description: 'Explore 2,500 years of history through temples, ruins, and festivals.',
    color: 'purple',
    image: 'https://images.unsplash.com/photo-1580910527691-1643e58ced65?w=400&q=80',
  },
  {
    icon: Sun,
    title: 'Year-round Sun',
    description: 'Enjoy tropical warmth with diverse microclimates across the island.',
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1586613835341-48e6796da4da?w=400&q=80',
  },
  {
    icon: Heart,
    title: 'Warm Hospitality',
    description: 'Experience the genuine warmth and friendliness of Sri Lankan people.',
    color: 'rose',
    image: 'https://images.unsplash.com/photo-1607685725083-cba1b167dc64?w=400&q=80',
  },
];

const colorMap: Record<string, string> = {
  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
};

export default function ExperiencesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.exp-card');

      // Cards: mask-reveal wipe from bottom
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            y: 30,
          },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.08,
          }
        );

        // Inner image parallax
        const img = card.querySelector('.exp-bg') as HTMLElement;
        if (img) {
          gsap.to(img, {
            y: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/10 via-black to-black" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <TextScrubReveal
            text="Unforgettable Experiences Await You"
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white justify-center mb-4"
          />
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Sri Lanka is a compact island brimming with extraordinary experiences.
            Every corner reveals a new adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, i) => {
            const colors = colorMap[exp.color] || colorMap.emerald;
            const [textColor, bgColor, borderColor] = colors.split(' ');

            return (
              <div
                key={i}
                className="exp-card group relative h-80 rounded-3xl overflow-hidden cursor-default will-change-[clip-path,transform]"
              >
                {/* Background image */}
                <div
                  className="exp-bg absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 will-change-transform"
                  style={{
                    backgroundImage: `url(${exp.image})`,
                    top: '-15%',
                    height: '130%',
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-8">
                  <div
                    className={`w-14 h-14 rounded-2xl ${bgColor} border ${borderColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <exp.icon className={`w-6 h-6 ${textColor}`} />
                  </div>
                  <h3 className="text-white font-semibold text-xl mb-2 group-hover:text-emerald-300 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-white/40 leading-relaxed text-sm">{exp.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
