'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const Globe = dynamic(() => import('@/components/three/Globe'), { ssr: false });
const ParticleField = dynamic(() => import('@/components/three/ParticleField'), {
  ssr: false,
});

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const globeWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const section = sectionRef.current;
    const content = contentRef.current;
    const title = titleRef.current;
    const globeWrap = globeWrapRef.current;
    const overlay = overlayRef.current;
    if (!section || !content || !title || !globeWrap || !overlay) return;

    const ctx = gsap.context(() => {
      /* ── Entrance Animations ── */
      const tl = gsap.timeline({ delay: 0.3 });

      // Badge
      tl.fromTo(
        '.hero-badge',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      // Title words stagger
      const words = title.querySelectorAll('.word');
      tl.fromTo(
        words,
        { y: 80, opacity: 0, rotateX: -40 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.08,
          ease: 'power4.out',
        },
        '-=0.4'
      );

      // Subtitle slide up
      tl.fromTo(
        '.hero-subtitle',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );

      // CTA buttons
      tl.fromTo(
        '.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      );

      // Stats counter
      tl.fromTo(
        '.hero-stats',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );

      // Globe scale in
      tl.fromTo(
        globeWrap,
        { scale: 0.7, opacity: 0, rotateY: -30 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 1.4, ease: 'power3.out' },
        '-=1.2'
      );

      /* ── Scroll-driven exit: pin hero while it fades & scales ── */
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=60%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Content parallax up + fade
      exitTl.to(content, {
        y: -120,
        opacity: 0,
        scale: 0.95,
        ease: 'none',
      });

      // Globe scales up and fades slightly
      exitTl.to(
        globeWrap,
        {
          scale: 1.3,
          opacity: 0.3,
          y: -80,
          ease: 'none',
        },
        0
      );

      // Dark overlay closes in
      exitTl.to(
        overlay,
        {
          opacity: 1,
          ease: 'none',
        },
        0
      );

      /* ── Scroll indicator bounce ── */
      gsap.to('.scroll-indicator', {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'power1.inOut',
      });
    }, section);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/20 to-black" />

      {/* Particle field background */}
      {mounted && <ParticleField />}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial gradient spotlights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[128px]" />

      {/* Dark overlay for scroll exit */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black opacity-0 z-20 pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div ref={contentRef} className="pt-24 lg:pt-0" style={{ perspective: '1000px' }}>
            {/* Badge */}
            <div className="hero-badge opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium">
                Discover Paradise Island
              </span>
            </div>

            {/* Title — each word is a transform target */}
            <h1
              ref={titleRef}
              className="mb-6"
              style={{ perspective: '800px' }}
            >
              <span className="block text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                <span className="word inline-block opacity-0 will-change-transform origin-bottom">Explore</span>{' '}
                <span className="word inline-block opacity-0 will-change-transform origin-bottom">the</span>
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mt-1">
                <span className="word inline-block opacity-0 will-change-transform origin-bottom bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Wonder
                </span>{' '}
                <span className="word inline-block opacity-0 will-change-transform origin-bottom bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  of
                </span>
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mt-1">
                <span className="word inline-block opacity-0 will-change-transform origin-bottom">Sri</span>{' '}
                <span className="word inline-block opacity-0 will-change-transform origin-bottom">Lanka</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle opacity-0 text-white/50 text-lg md:text-xl max-w-lg leading-relaxed mb-10">
              From ancient kingdoms to pristine beaches, misty mountains to
              wild safaris — your extraordinary journey begins here.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta opacity-0 flex flex-wrap gap-4">
              <Link
                href="/destinations"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  Explore Destinations
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>

            {/* Quick stats */}
            <div className="hero-stats opacity-0 flex gap-8 mt-14">
              {[
                { value: '500+', label: 'Destinations' },
                { value: '25', label: 'Districts' },
                { value: '8', label: 'UNESCO Sites' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-white/30 text-xs uppercase tracking-wider mt-1">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - 3D Globe */}
          <div
            ref={globeWrapRef}
            className="relative h-[500px] lg:h-[600px] hidden lg:block will-change-transform"
          >
            {mounted && <Globe />}

            {/* Globe label */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-white/50 text-xs">Sri Lanka</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-white/20 text-xs uppercase tracking-[0.3em]">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-white/20" />
      </div>
    </section>
  );
}
