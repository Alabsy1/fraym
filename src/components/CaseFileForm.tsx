"use client";

import { useState } from "react";
import { services } from "@/lib/data";
import { Stamp } from "./ui/Stamp";
import { AnimatedStamp } from "./ui/AnimatedStamp";
import { Tape } from "./ui/Tape";

export function CaseFileForm({ compact = false }: { compact?: boolean }) {
  const [caseNumber] = useState(
    () => `FRM-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`
  );
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  const inputClass =
    "w-full border border-ink/20 bg-paper px-3.5 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink/20";

  return (
    <div className="case-sheet case-holes relative mx-auto max-w-3xl p-6 sm:p-10">
      <Tape color="var(--color-frame)" rotation={-4} className="absolute -top-3 left-1/2 -translate-x-1/2" />

      <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-ink/10 pb-6">
        <div>
          <p className="mono-label text-ink-soft">CASE FILE Nº</p>
          <p className="mt-1 font-mono text-2xl font-bold tracking-tight text-ink">
            {caseNumber}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Stamp text="Priority: Investigate" tone="signal" rotation={4} />
          <span className="mono-label flex items-center gap-2 text-moss">
            <span className="size-2 animate-pulse-dot rounded-full bg-signal" />
            intake open
          </span>
        </div>
      </div>

      {sent ? (
        <div className="py-10 text-center">
          <AnimatedStamp text="Received" tone="tape" rotation={-6} className="mb-6" />
          <h3 className="font-display text-3xl font-semibold text-ink">
            The case is open.
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            Thank you. File {caseNumber} has been logged and assigned to an
            observer. Expect a reply within two working days — sooner if the
            brief is strange enough.
          </p>
          <p className="hand mt-6 text-xl text-ink-soft">
            meanwhile — we observe, we direct, we frame.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className={`grid gap-5 ${compact ? "sm:grid-cols-1" : "sm:grid-cols-2"}`}>
            <label className="block">
              <span className="mono-label mb-1.5 block text-ink-soft">
                Your name
              </span>
              <input
                required
                type="text"
                name="name"
                placeholder="Ada Mercer"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mono-label mb-1.5 block text-ink-soft">
                Work email
              </span>
              <input
                required
                type="email"
                name="email"
                placeholder="you@company.com"
                className={inputClass}
              />
            </label>
          </div>

          <div className={`grid gap-5 ${compact ? "sm:grid-cols-1" : "sm:grid-cols-2"}`}>
            <label className="block">
              <span className="mono-label mb-1.5 block text-ink-soft">
                Company / brand
              </span>
              <input
                type="text"
                name="company"
                placeholder="Northlight"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mono-label mb-1.5 block text-ink-soft">
                System in mind
              </span>
              <select name="service" className={inputClass} defaultValue="">
                <option value="" disabled>
                  Choose a system
                </option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.system} — {s.short}
                  </option>
                ))}
                <option value="not-sure">Not sure yet &mdash; that&apos;s fine</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mono-label mb-1.5 block text-ink-soft">
              Tell us about the case
            </span>
            <textarea
              required
              name="brief"
              rows={5}
              placeholder="What do people see today, and what should they see instead?"
              className={inputClass}
            />
          </label>

          <div className="flex flex-col items-start justify-between gap-4 border-t border-ink/10 pt-5 sm:flex-row sm:items-center">
            <p className="hand text-lg text-ink-soft">
              observations welcome, no pitch decks required.
            </p>
            <button
              type="submit"
              className="mono-label group inline-flex items-center gap-2 bg-signal px-6 py-3.5 text-xs font-bold text-white transition-colors hover:bg-signal-deep"
            >
              Open the case
              <svg
                aria-hidden
                className="size-3 transition-transform group-hover:translate-x-1"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path d="M1 6h9M7 2.5L10.5 6 7 9.5" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
