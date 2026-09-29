import type { ReactNode } from 'react';

interface SectionHeadProps {
  /** Stencilled eyebrow — say what the section *is*. */
  label: string;
  title: string;
  /** Right-hand slot: a count, a link, a range. */
  aside?: ReactNode;
  children?: ReactNode;
}

export default function SectionHead({ label, title, aside, children }: SectionHeadProps) {
  return (
    <div className="mb-10">
      <div className="rule-head mb-5">
        <span className="t-label shrink-0 text-laterite">{label}</span>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="t-h2 max-w-[18ch]">{title}</h2>
        {aside ? <div className="shrink-0 sm:pb-1">{aside}</div> : null}
      </div>
      {children ? <div className="t-lede measure mt-5">{children}</div> : null}
    </div>
  );
}
