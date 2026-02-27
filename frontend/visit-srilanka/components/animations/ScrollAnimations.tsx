'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────────────────────────────────
   TextScrubReveal – words fade/unblur as you scroll
   (like the big Shopify Editions taglines)
   ─────────────────────────────────────────────────────── */
export function TextScrubReveal({
  text,
  className = '',
  as: Tag = 'h2',
}: {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll('.scrub-word');
    if (!words.length) return;

    gsap.set(words, { opacity: 0.1, filter: 'blur(4px)', y: 8 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 75%',
        end: 'bottom 35%',
        scrub: 0.8,
      },
    });

    tl.to(words, {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      stagger: 0.04,
      ease: 'power2.out',
    });

    return () => {
      tl.kill();
    };
  }, [text]);

  const words = text.split(' ');

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="scrub-word inline-block mr-[0.3em] will-change-[opacity,filter,transform]"
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}

/* ───────────────────────────────────────────────────────
   PinnedSection – pins the section while inner content
   plays through scroll-driven animations
   ─────────────────────────────────────────────────────── */
export function PinnedSection({
  children,
  className = '',
  height = '200vh',
}: {
  children: ReactNode;
  className?: string;
  height?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const inner = el.querySelector('.pin-inner') as HTMLElement;
    if (!inner) return;

    ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: `+=${height}`,
      pin: inner,
      scrub: true,
      anticipatePin: 1,
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [height]);

  return (
    <div ref={outerRef} className={className}>
      <div className="pin-inner">{children}</div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────
   HorizontalScrollSection – vertical scroll → horizontal
   movement (like Shopify's feature showcases)
   ─────────────────────────────────────────────────────── */
export function HorizontalScrollSection({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const calculateWidth = () => {
      return track.scrollWidth - window.innerWidth;
    };

    const tween = gsap.to(track, {
      x: () => -calculateWidth(),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${calculateWidth()}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex gap-8 will-change-transform">
        {children}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────
   ScaleRevealImage – image scales from small to full
   as you scroll (cinematic reveal)
   ─────────────────────────────────────────────────────── */
export function ScaleRevealImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const img = el.querySelector('.scale-img') as HTMLElement;
    if (!img) return;

    gsap.fromTo(
      el,
      { clipPath: 'inset(20% 20% 20% 20% round 24px)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 0px)',
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 10%',
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      img,
      { scale: 1.3 },
      {
        scale: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 10%',
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <div
        className="scale-img w-full h-full bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={alt}
      />
    </div>
  );
}

/* ───────────────────────────────────────────────────────
   StackedCards – cards that stack and unstack on scroll
   ─────────────────────────────────────────────────────── */
export function StackedCards({
  children,
  className = '',
}: {
  children: ReactNode[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.stack-card');
    if (!cards.length) return;

    cards.forEach((card, i) => {
      if (i === 0) return; // First card stays

      gsap.fromTo(
        card,
        {
          y: 100 + i * 30,
          scale: 1 - i * 0.03,
          opacity: 0,
          rotateX: -5,
        },
        {
          y: i * 8,
          scale: 1 - i * 0.02,
          opacity: 1,
          rotateX: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: `top ${85 + i * 5}%`,
            end: 'top 30%',
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        const trigger = st.trigger;
        if (trigger && container.contains(trigger)) st.kill();
      });
    };
  }, [children]);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ perspective: '1200px' }}>
      {Array.isArray(children) &&
        children.map((child, i) => (
          <div key={i} className="stack-card will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
            {child}
          </div>
        ))}
    </div>
  );
}

/* ───────────────────────────────────────────────────────
   ClipPathReveal – section revealed through expanding
   circle or shape
   ─────────────────────────────────────────────────────── */
export function ClipPathReveal({
  children,
  className = '',
  shape = 'circle',
}: {
  children: ReactNode;
  className?: string;
  shape?: 'circle' | 'inset';
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from =
      shape === 'circle'
        ? 'circle(0% at 50% 50%)'
        : 'inset(40% 40% 40% 40% round 48px)';
    const to =
      shape === 'circle'
        ? 'circle(100% at 50% 50%)'
        : 'inset(0% 0% 0% 0% round 0px)';

    gsap.fromTo(
      el,
      { clipPath: from },
      {
        clipPath: to,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [shape]);

  return (
    <div ref={ref} className={`will-change-[clip-path] ${className}`}>
      {children}
    </div>
  );
}

/* ───────────────────────────────────────────────────────
   ColorMorphBg – background gradient that morphs colors
   as you scroll through
   ─────────────────────────────────────────────────────── */
export function ColorMorphBg({
  children,
  className = '',
  colors = [
    'radial-gradient(ellipse at 30% 50%, rgba(16,185,129,0.15) 0%, transparent 70%)',
    'radial-gradient(ellipse at 70% 50%, rgba(20,184,166,0.2) 0%, transparent 70%)',
    'radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.15) 0%, transparent 70%)',
  ],
}: {
  children: ReactNode;
  className?: string;
  colors?: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const bg = bgRef.current;
    if (!el || !bg) return;

    const layers = bg.querySelectorAll('.color-layer');

    layers.forEach((layer, i) => {
      gsap.fromTo(
        layer,
        { opacity: i === 0 ? 1 : 0 },
        {
          opacity: i === layers.length - 1 ? 1 : 0,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [colors]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div ref={bgRef} className="absolute inset-0 overflow-hidden">
        {colors.map((bg, i) => (
          <div
            key={i}
            className="color-layer absolute inset-0"
            style={{ background: bg }}
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────
   ParallaxLayer – simple GSAP parallax container
   ─────────────────────────────────────────────────────── */
export function ParallaxLayer({
  children,
  speed = -0.2,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      y: () => speed * window.innerHeight * 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/* ───────────────────────────────────────────────────────
   SplitLineReveal – lines slide up one by one with
   clip-path mask, very Shopify-like
   ─────────────────────────────────────────────────────── */
export function SplitLineReveal({
  lines,
  className = '',
}: {
  lines: string[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const lineEls = el.querySelectorAll('.split-line');

    gsap.fromTo(
      lineEls,
      { y: '110%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [lines]);

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <div className="split-line will-change-transform">{line}</div>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────────────────────────────────────
   MaskRevealSection – content revealed via a mask
   that wipes from one edge
   ─────────────────────────────────────────────────────── */
export function MaskRevealSection({
  children,
  className = '',
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromClip =
      direction === 'up'
        ? 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
        : direction === 'left'
        ? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
        : 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)';

    const toClip = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

    gsap.fromTo(
      el,
      { clipPath: fromClip },
      {
        clipPath: toClip,
        ease: 'power3.inOut',
        duration: 1.2,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [direction]);

  return (
    <div ref={ref} className={`will-change-[clip-path] ${className}`}>
      {children}
    </div>
  );
}
