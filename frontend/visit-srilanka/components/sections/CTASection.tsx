'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowRight, Plane } from 'lucide-react';
import { SplitLineReveal } from '@/components/animations/ScrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const bg = section.querySelector('.cta-bg') as HTMLElement;
      const orbs = section.querySelectorAll('.cta-orb');
      const buttons = section.querySelector('.cta-buttons') as HTMLElement;

      // Background expands from circle
      gsap.fromTo(
        bg,
        { clipPath: 'circle(0% at 50% 50%)' },
        {
          clipPath: 'circle(100% at 50% 50%)',
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );

      // Orbs float with parallax
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          y: (i % 2 === 0 ? -1 : 1) * 80,
          x: (i % 2 === 0 ? 1 : -1) * 40,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Buttons slide up
      if (buttons) {
        gsap.fromTo(
          buttons,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: buttons,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-40 md:py-52 overflow-hidden">
      {/* Animated background — clip-path circle expand */}
      <div className="cta-bg absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-cyan-600/20" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating orbs */}
      <div className="cta-orb absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]" />
      <div className="cta-orb absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500/20 rounded-full blur-[80px]" />
      <div className="cta-orb absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-500/15 rounded-full blur-[60px]" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
          <Plane className="w-4 h-4 text-emerald-300" />
          <span className="text-white/70 text-sm">Start Your Journey</span>
        </div>

        <SplitLineReveal
          lines={['Ready to Discover', 'Your Paradise?']}
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 [&_.split-line:last-child]:bg-gradient-to-r [&_.split-line:last-child]:from-emerald-400 [&_.split-line:last-child]:via-teal-300 [&_.split-line:last-child]:to-cyan-400 [&_.split-line:last-child]:bg-clip-text [&_.split-line:last-child]:text-transparent"
        />

        <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Let Sri Lanka surprise you with its ancient wonders, breathtaking
          landscapes, and warm hospitality. Your adventure of a lifetime awaits.
        </p>

        <div className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 hover:-translate-y-1"
          >
            Browse All Destinations
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/categories"
            className="inline-flex items-center gap-3 px-10 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            Explore by Category
          </Link>
        </div>
      </div>
    </section>
  );
}
