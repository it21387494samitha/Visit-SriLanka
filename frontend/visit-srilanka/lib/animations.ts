import anime from 'animejs';

export function staggerFadeIn(targets: string, delay = 100) {
  return anime({
    targets,
    opacity: [0, 1],
    translateY: [40, 0],
    duration: 800,
    delay: anime.stagger(delay),
    easing: 'easeOutExpo',
  });
}

export function fadeInUp(targets: string, duration = 800) {
  return anime({
    targets,
    opacity: [0, 1],
    translateY: [60, 0],
    duration,
    easing: 'easeOutExpo',
  });
}

export function scaleIn(targets: string, delay = 0) {
  return anime({
    targets,
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 600,
    delay,
    easing: 'easeOutExpo',
  });
}

export function slideInLeft(targets: string, duration = 800) {
  return anime({
    targets,
    opacity: [0, 1],
    translateX: [-100, 0],
    duration,
    easing: 'easeOutExpo',
  });
}

export function slideInRight(targets: string, duration = 800) {
  return anime({
    targets,
    opacity: [0, 1],
    translateX: [100, 0],
    duration,
    easing: 'easeOutExpo',
  });
}

export function counterAnimation(
  target: HTMLElement,
  endValue: number,
  duration = 2000
) {
  const obj = { value: 0 };
  return anime({
    targets: obj,
    value: endValue,
    round: 1,
    duration,
    easing: 'easeOutExpo',
    update: () => {
      target.textContent = obj.value.toString();
    },
  });
}

export function textReveal(targets: string, delay = 0) {
  return anime({
    targets,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 1000,
    delay: anime.stagger(50, { start: delay }),
    easing: 'easeOutExpo',
  });
}

export function parallaxFloat(targets: string) {
  return anime({
    targets,
    translateY: [-10, 10],
    duration: 3000,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
  });
}

export function pulseGlow(targets: string) {
  return anime({
    targets,
    boxShadow: [
      '0 0 20px rgba(14,165,133,0.3)',
      '0 0 40px rgba(14,165,233,0.6)',
      '0 0 20px rgba(14,165,133,0.3)',
    ],
    duration: 3000,
    loop: true,
    easing: 'easeInOutSine',
  });
}

export function morphPath(targets: string, d: string[]) {
  return anime({
    targets,
    d,
    duration: 4000,
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutQuad',
  });
}
