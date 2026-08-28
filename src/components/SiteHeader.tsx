"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Wordmark } from "@/components/ui/Wordmark";

const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Cases", href: "/cases" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" aria-label="FRAYM — home" className="shrink-0">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "mono-label rounded-sm px-3 py-2 text-ink-soft transition-colors hover:text-ink",
                  active && "bg-paper-2 text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="mono-label group inline-flex items-center gap-2 bg-signal px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-signal-deep"
          >
            Open a Case
            <svg
              aria-hidden
              className="size-3 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M1 6h9M7 2.5L10.5 6 7 9.5"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex size-10 items-center justify-center border border-ink/15 text-ink lg:hidden"
          >
            <div className="relative h-3.5 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-5 bg-ink transition-all",
                  open && "top-1.5 rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-0.5 w-5 bg-ink transition-all",
                  open && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-3 h-0.5 w-5 bg-ink transition-all",
                  open && "top-1.5 -rotate-45"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-paper lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between border-b border-ink/5 py-3 font-display text-2xl font-medium text-ink",
                  i === nav.length - 1 && "border-b-0"
                )}
              >
                {item.label}
                <span className="mono-label text-ink-faint">
                  0{i + 1}
                </span>
              </Link>
            ))}
            <p className="mono-label mt-4 text-ink-soft">
              A Perception Studio — we observe, we direct, we frame.
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
