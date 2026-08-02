'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Check, Share2, X } from 'lucide-react';
import type { ResolvedImage } from '@/lib/images';

interface GalleryProps {
  images: ResolvedImage[];
  title: string;
}

/** Lightbox for the plate gallery. Keyboard-driven; closes on Escape. */
export function Gallery({ images, title }: GalleryProps) {
  const [openAt, setOpenAt] = useState<number | null>(null);

  const close = useCallback(() => setOpenAt(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenAt((i) => (i === null ? null : (i + delta + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (openAt === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openAt, close, step]);

  if (images.length < 2) return null;

  return (
    <section className="mt-12">
      <div className="rule-head mb-5">
        <span className="t-label shrink-0 text-laterite">Plates</span>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => setOpenAt(i)}
              aria-label={`Open plate ${i + 1} of ${images.length}`}
              className="plate group relative block aspect-[4/3] w-full"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 640px) 20vw, 45vw"
                className="plate-img"
              />
            </button>
          </li>
        ))}
      </ul>

      {openAt !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — plate ${openAt + 1} of ${images.length}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-band/95 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center border border-band-ink-soft text-band-ink transition-colors hover:border-laterite hover:text-laterite"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous plate"
            className="absolute left-4 grid h-11 w-11 place-items-center border border-band-ink-soft text-band-ink transition-colors hover:border-laterite hover:text-laterite"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next plate"
            className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-band-ink-soft text-band-ink transition-colors hover:border-laterite hover:text-laterite"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>

          <figure className="m-0 max-h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[openAt].src}
              alt={images[openAt].alt}
              width={1400}
              height={950}
              sizes="90vw"
              className="max-h-[80vh] w-auto object-contain"
            />
            <figcaption className="t-data mt-3 text-center text-band-ink-soft">
              Plate {openAt + 1} of {images.length}
              {images[openAt].credit
                ? ` · ${images[openAt].credit.artist} · ${images[openAt].credit.license}`
                : ''}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  );
}

/** Share via the native sheet where available, clipboard everywhere else. */
export function ShareButton({ title, summary }: { title: string; summary: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text: summary, url });
        return;
      } catch {
        // Cancelled, or unavailable — fall through to the clipboard.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Nothing sensible left to try.
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="t-label flex w-full items-center justify-center gap-2 border border-rule px-4 py-3 text-ink-soft transition-colors hover:border-laterite hover:text-laterite"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" aria-hidden />
          Link copied
        </>
      ) : (
        <>
          <Share2 className="h-3.5 w-3.5" aria-hidden />
          Share this entry
        </>
      )}
    </button>
  );
}
