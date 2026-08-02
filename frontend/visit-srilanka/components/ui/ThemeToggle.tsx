'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import {
  getServerSnapshot,
  getSnapshot,
  setTheme,
  subscribe,
} from '@/lib/theme';

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const label =
    theme === null
      ? 'Switch theme'
      : theme === 'dark'
        ? 'Switch to light theme'
        : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={label}
      title={label}
      className="grid h-9 w-9 place-items-center border border-rule text-ink-soft transition-colors hover:border-laterite hover:text-laterite"
    >
      {/* The frame renders on the server so the header doesn't reflow; the icon
          waits until we know which theme is actually in force. */}
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" aria-hidden />
      ) : theme === 'light' ? (
        <Moon className="h-4 w-4" aria-hidden />
      ) : (
        <span className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}
