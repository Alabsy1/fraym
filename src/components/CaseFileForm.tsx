"use client";

import { useState } from "react";
import { services } from "@/lib/data";
import { cn } from "@/lib/cn";
import { Stamp } from "./ui/Stamp";
import { AnimatedStamp } from "./ui/AnimatedStamp";
import { Tape } from "./ui/Tape";

const SERVICE_TOGGLES = [
  { id: "brand-strategy", label: "Brand Strategy Development" },
  { id: "visual-identity", label: "Visual Brand Identity Creation" },
  { id: "social-media", label: "Social Media Marketing" },
  { id: "simplified-messaging", label: "Confusing Jargon (Simplified messaging)" },
  { id: "agency-simplified", label: "Agency Methods Simplified" },
] as const;

export function CaseFileForm({ compact = false }: { compact?: boolean }) {
  const [caseNumber] = useState(
    () => `FRM-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`
  );
  const [sent, setSent] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());

  const toggleService = (id: string) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

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

          {/* ── Service Toggle Matrix ── */}
          <fieldset className="border border-ink/10 bg-paper-2 p-4">
            <legend className="mono-label px-2 text-ink-soft">
              Services of Interest
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {SERVICE_TOGGLES.map((svc) => {
                const active = selectedServices.has(svc.id);
                return (
                  <button
                    key={svc.id}
                    type="button"
                    role="switch"
                    aria-checked={active}
                    onClick={() => toggleService(svc.id)}
                    className={cn(
                      "group flex items-center gap-3 border px-3.5 py-2.5 text-left transition-all duration-200",
                      active
                        ? "border-moss/40 bg-moss/10"
                        : "border-ink/10 bg-paper hover:border-ink/20"
                    )}
                  >
                    {/* Number indicator */}
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center border font-mono text-[0.6rem] font-bold transition-colors",
                        active
                          ? "border-moss bg-moss text-white"
                          : "border-ink/20 bg-paper-2 text-ink-faint"
                      )}
                    >
                      {String(SERVICE_TOGGLES.indexOf(svc) + 1).padStart(2, "0")}
                    </span>

                    {/* Track + label */}
                    <span className="flex flex-1 items-center gap-2.5 min-w-0">
                      <span className="mono-label flex-1 truncate text-[0.6rem] font-semibold text-ink">
                        {svc.label}
                      </span>
                      {/* Toggle track */}
                      <span
                        className={cn(
                          "relative inline-flex h-4.5 w-8 shrink-0 items-center rounded-full border transition-colors duration-200",
                          active
                            ? "border-moss-deep bg-moss"
                            : "border-ink/25 bg-ink/10"
                        )}
                      >
                        <span
                          className={cn(
                            "pointer-events-none inline-block size-3 rounded-full bg-white shadow-sm transition-transform duration-200",
                            active ? "translate-x-4" : "translate-x-0.5"
                          )}
                        />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            {selectedServices.size > 0 && (
              <p className="mono-label mt-3 text-[0.55rem] text-moss">
                {selectedServices.size} service{selectedServices.size !== 1 ? "s" : ""} selected
              </p>
            )}
          </fieldset>

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
            <input
              type="hidden"
              name="services"
              value={JSON.stringify([...selectedServices])}
            />
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
