'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

const NAV = [
  { href: '/destinations', label: 'Destinations' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'The Island' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer whenever the route changes, including on back/forward.
  // Adjusting during render rather than in an effect avoids a second paint
  // with the drawer still open.
  const [drawerRoute, setDrawerRoute] = useState(pathname);
  if (drawerRoute !== pathname) {
    setDrawerRoute(pathname);
    setOpen(false);
  }

  // Trap the page behind the open drawer and allow Escape to dismiss it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-rule-strong bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-page items-center gap-6 px-5 py-3 sm:px-8">
        {/* Wordmark */}
        <Link href="/" className="group shrink-0 leading-none" aria-label="Visit Sri Lanka, home">
          <span className="block font-display text-[1.65rem] font-bold uppercase leading-[0.85] tracking-[-0.02em] text-ink transition-colors group-hover:text-laterite sm:text-[1.9rem]">
            Visit Sri Lanka
          </span>
          <span className="t-label mt-1 hidden text-[0.625rem] text-ink-faint sm:block">
            A Field Catalogue of the Island
          </span>
        </Link>

        <div className="flex-1" />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`t-label transition-colors hover:text-laterite ${
                isActive(item.href) ? 'text-laterite' : 'text-ink'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-9 w-9 place-items-center border border-rule text-ink transition-colors hover:border-laterite hover:text-laterite"
          >
            {open ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-rule bg-paper md:hidden"
        >
          <ul className="mx-auto max-w-page px-5 py-2 sm:px-8">
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-rule last:border-0">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`block py-4 font-display text-2xl uppercase leading-none tracking-tight ${
                    isActive(item.href) ? 'text-laterite' : 'text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
