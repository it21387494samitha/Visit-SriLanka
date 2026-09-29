/**
 * The theme is external state: it lives on the document element, in
 * localStorage, and in the OS preference. Exposing it as a proper store lets
 * components read it with useSyncExternalStore instead of syncing it into
 * React state from an effect.
 */

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'vsl-theme';
const MEDIA = '(prefers-color-scheme: dark)';

const listeners = new Set<() => void>();
const emit = () => {
  for (const listener of listeners) listener();
};

export function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);

  const media = window.matchMedia(MEDIA);
  // The OS preference and other tabs can both change the effective theme.
  media.addEventListener('change', emit);
  window.addEventListener('storage', emit);

  return () => {
    listeners.delete(onChange);
    media.removeEventListener('change', emit);
    window.removeEventListener('storage', emit);
  };
}

/** The theme actually in force right now. */
export function getSnapshot(): Theme {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === 'light' || explicit === 'dark') return explicit;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Storage unavailable — fall through to the OS preference.
  }

  return window.matchMedia(MEDIA).matches ? 'dark' : 'light';
}

/** Unknowable on the server; components render a neutral placeholder. */
export function getServerSnapshot(): null {
  return null;
}

export function setTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private browsing — the choice just won't persist.
  }
  emit();
}
