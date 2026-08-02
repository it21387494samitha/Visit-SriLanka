'use client';

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from 'react';

/* Runs before paint on the client, falls back to useEffect during SSR so React
   doesn't warn. Arming has to happen pre-paint or the content flashes. */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface RevealProps {
  children: ReactNode;
  /** Stagger, in seconds. */
  delay?: number;
  as?: ElementType;
  className?: string;
}

/**
 * Fades content up as it enters the viewport.
 *
 * Content is rendered *visible* — the server HTML has no hidden state at all.
 * Only once JS has confirmed motion is wanted does it arm the element. If JS
 * never runs, or the reader prefers reduced motion, everything is simply there.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;

    el.dataset.revealArmed = 'true';

    const show = () => {
      el.style.transitionDelay = delay ? `${delay}s` : '';
      el.dataset.revealShown = 'true';
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show();
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} data-reveal="" className={className}>
      {children}
    </Tag>
  );
}
