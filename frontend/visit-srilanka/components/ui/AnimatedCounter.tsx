'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function AnimatedCounter({
  end,
  suffix = '',
  label,
  duration = 2000,
}: CounterProps) {
  const { ref, isVisible } = useScrollAnimation(0.3);
  const valueRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated && valueRef.current) {
      const obj = { value: 0 };
      anime({
        targets: obj,
        value: end,
        round: 1,
        duration,
        easing: 'easeOutExpo',
        update: () => {
          if (valueRef.current) {
            valueRef.current.textContent = obj.value.toString();
          }
        },
      });
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        <span ref={valueRef}>0</span>
        <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          {suffix}
        </span>
      </div>
      <p className="text-white/40 text-sm uppercase tracking-wider">{label}</p>
    </div>
  );
}
