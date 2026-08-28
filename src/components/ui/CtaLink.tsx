import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function CtaLink({
  href,
  children,
  tone = "signal",
  variant = "solid",
  size = "md",
  className,
  external = false,
  onClick,
}: {
  href: string;
  children: ReactNode;
  tone?: "signal" | "tape" | "ink" | "moss";
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const tones: Record<string, string> = {
    signal: "bg-signal text-white hover:bg-signal-deep",
    tape: "bg-tape text-white hover:bg-tape-deep",
    ink: "bg-ink text-paper hover:bg-ink/90",
    moss: "bg-moss text-white hover:bg-moss-deep",
  };
  const outlines: Record<string, string> = {
    signal: "border-signal text-signal hover:bg-signal hover:text-white",
    tape: "border-tape text-tape hover:bg-tape hover:text-white",
    ink: "border-ink text-ink hover:bg-ink hover:text-paper",
    moss: "border-moss text-moss hover:bg-moss hover:text-white",
  };
  const sizes: Record<string, string> = {
    sm: "px-4 py-2 text-[0.7rem]",
    md: "px-5 py-3 text-xs",
    lg: "px-7 py-4 text-sm",
  };

  const base = cn(
    "mono-label group inline-flex items-center gap-2 font-semibold transition-colors duration-200 border border-transparent",
    sizes[size],
    variant === "solid" && tones[tone],
    variant === "outline" && outlines[tone],
    variant === "ghost" && "text-ink hover:text-ink-soft",
    className
  );

  const arrow = (
    <svg
      aria-hidden
      className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path d="M1 6h9M7 2.5L10.5 6 7 9.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={base} onClick={onClick}>
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <Link href={href} className={base} onClick={onClick}>
      {children}
      {arrow}
    </Link>
  );
}
