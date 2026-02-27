'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for basic GSAP ScrollTrigger animation on a single element.
 */
export function useScrollTrigger<T extends HTMLElement>(
  animation: (el: T, tl: gsap.core.Timeline) => void,
  options?: ScrollTrigger.Vars
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...options,
      },
    });

    animation(el, tl);

    return () => {
      tl.kill();
    };
  }, []);

  return ref;
}

/**
 * Hook for pinned sections with scrub (Shopify Editions-style).
 * The section stays pinned while the inner timeline plays through
 * the scrub progress.
 */
export function usePinnedSection<T extends HTMLElement>(
  animation: (el: T, tl: gsap.core.Timeline) => void,
  config?: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    anticipatePin?: number;
  }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: config?.start || 'top top',
        end: config?.end || '+=200%',
        scrub: config?.scrub ?? 1,
        pin: config?.pin ?? true,
        anticipatePin: config?.anticipatePin ?? 1,
      },
    });

    animation(el, tl);

    return () => {
      tl.kill();
    };
  }, []);

  return ref;
}

/**
 * Hook for horizontal scroll driven by vertical scroll.
 */
export function useHorizontalScroll<T extends HTMLElement>(panelCount: number) {
  const containerRef = useRef<T>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const totalWidth = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [panelCount]);

  return { containerRef, trackRef };
}

/**
 * Hook for text scrub reveal — text opacity and blur animates
 * word-by-word as you scroll.
 */
export function useTextScrub<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll('.scrub-word');
    if (!words.length) return;

    gsap.set(words, { opacity: 0.15, filter: 'blur(2px)' });

    gsap.to(words, {
      opacity: 1,
      filter: 'blur(0px)',
      stagger: 0.05,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 70%',
        end: 'bottom 40%',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return ref;
}

/**
 * Use for scale-in reveal: element scales from 0.8 to 1 and fades in.
 */
export function useScaleReveal<T extends HTMLElement>(delay: number = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { scale: 0.85, opacity: 0, y: 60 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [delay]);

  return ref;
}

/**
 * Clip-path expand reveal: starts as small circle, expands to full.
 */
export function useClipReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { clipPath: 'circle(0% at 50% 50%)' },
      {
        clipPath: 'circle(100% at 50% 50%)',
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
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
  }, []);

  return ref;
}

/**
 * Parallax hook: creates simple y-axis parallax movement.
 */
export function useParallaxGSAP<T extends HTMLElement>(speed: number = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      y: () => speed * 200,
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

  return ref;
}

/**
 * Stagger-in children elements with GSAP.
 */
export function useStaggerReveal<T extends HTMLElement>(
  childSelector: string,
  config?: { stagger?: number; y?: number; duration?: number }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll(childSelector);
    if (!children.length) return;

    gsap.fromTo(
      children,
      {
        opacity: 0,
        y: config?.y ?? 60,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: config?.duration ?? 0.8,
        stagger: config?.stagger ?? 0.12,
        ease: 'power3.out',
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
  }, [childSelector]);

  return ref;
}
