"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { services, type Service } from "@/lib/data";
import { solid, textOn, textColor } from "@/lib/color";
import { cn } from "@/lib/cn";
import { ServiceCard } from "./ServiceCard";
import { Tape } from "./ui/Tape";
import { Stamp } from "./ui/Stamp";
import { ServiceOpenLink } from "./transition/ServiceOpenLink";
import { StickyNote } from "./ui/StickyNote";

type StampTone = "signal" | "tape" | "ink" | "moss" | "frame";

const stampTone = (c: Service["color"]): StampTone => {
  switch (c) {
    case "frame":
      return "frame";
    case "tape":
      return "tape";
    case "signal":
      return "signal";
    case "moss":
      return "moss";
    default:
      return "ink";
  }
};

const stampText = (slug: Service["slug"]): string => {
  switch (slug) {
    case "frame":
      return "FRAME COPY";
    case "direct":
      return "DIRECTED";
    case "signal":
      return "OBSERVED";
    case "full-frame":
      return "SIGNED OFF";
    default:
      return "SYSTEM";
  }
};

const noteLine = (slug: Service["slug"]): string => {
  switch (slug) {
    case "frame":
      return "the frame is a decision. make it deliberate.";
    case "direct":
      return "directed on paper. rehearsed on set.";
    case "signal":
      return "keep the story moving.";
    case "full-frame":
      return "one file. one voice. one standard.";
    default:
      return "";
  }
};

export function ServiceBook() {
  const [open, setOpen] = useState<string | null>("frame");

  return (
    <div>
      {/* ── System card grid ─────────────────────────────── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard
            key={service.slug}
            service={service}
            className="h-full"
            interactive
            active={open === service.slug}
            onSelect={() =>
              setOpen(open === service.slug ? null : service.slug)
            }
          />
        ))}
      </div>

      {/* ── In-place book spread, one per system ─────────── */}
      {services.map((service) => (
        <div
          key={service.slug}
          className={cn(
            "grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open === service.slug ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <BookSpread service={service} isOpen={open === service.slug} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── The archival case book / spread ─────────────────────── */
function BookSpread({
  service,
  isOpen,
}: {
  service: Service;
  isOpen: boolean;
}) {
  const c = service.color;

  return (
    <div className="relative mt-8 pb-2">
      {/* spread frame */}
      <div className="texture-paper-2 relative overflow-hidden border-y-2 border-ink/15 px-4 py-8 shadow-window sm:px-8 lg:px-10">
        <div
          className="grid-lines-sm pointer-events-none absolute inset-0 opacity-25"
          aria-hidden
        />

        {/* top band */}
        <div className="relative mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-ink/15 pb-4">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`${solid(c)} ${textOn(c)} flex size-9 items-center justify-center font-mono text-xs font-bold`}
            >
              Nº {service.number}
            </span>
            <span className="mono-label text-ink-soft">{service.system}</span>
            <span className="hand text-lg text-ink-soft">
              archival copy — open
            </span>
          </div>
          <Stamp text={stampText(service.slug)} tone={stampTone(c)} rotation={-3} />
        </div>

        {/* perspective book */}
        <div className="relative [perspective:1800px]">
          <div className="relative grid gap-0 lg:grid-cols-[1fr_2.5rem_1.15fr]">
            {/* LEFT LEAF — the file / position */}
            <div
              className={cn(
                "relative transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen
                  ? "opacity-100 [transform:rotateY(0deg)]"
                  : "opacity-0 [transform:rotateY(42deg)]"
              )}
              style={{ transformOrigin: "100% 50%" }}
            >
              <LeftLeaf service={service} />
            </div>

            {/* SPINE (desktop) */}
            <div className="relative hidden lg:block" aria-hidden>
              <div className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-ink/15" />
              <div
                className={cn(
                  "absolute inset-y-5 left-1/2 w-1.5 -translate-x-1/2 transition-all duration-500",
                  solid(c),
                  isOpen ? "scale-y-100 opacity-90" : "scale-y-0 opacity-0"
                )}
                style={{ transformOrigin: "50% 0%" }}
              />
            </div>

            {/* SPINE (mobile) */}
            <div className="relative my-4 block lg:hidden" aria-hidden>
              <div className="absolute inset-x-4 top-1/2 h-px bg-ink/15" />
              <div
                className={cn(
                  "absolute inset-x-5 top-1/2 h-1.5 -translate-y-1/2 transition-all duration-500",
                  solid(c),
                  isOpen ? "scale-x-100 opacity-90" : "scale-x-0 opacity-0"
                )}
                style={{ transformOrigin: "0% 50%" }}
              />
            </div>

            {/* RIGHT LEAF — deliverables + process */}
            <div
              className={cn(
                "relative transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen
                  ? "opacity-100 [transform:rotateY(0deg)]"
                  : "opacity-0 [transform:rotateY(-42deg)]"
              )}
              style={{
                transformOrigin: "0% 50%",
                transitionDelay: isOpen ? "110ms" : "0ms",
              }}
            >
              <RightLeaf service={service} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeftLeaf({ service }: { service: Service }) {
  const c = service.color;
  return (
    <div className="case-sheet relative h-full p-6 sm:p-8">
      <Holes side="right" />
      <Tape
        color={`var(--color-${c})`}
        rotation={-2}
        className="absolute -top-3 left-8"
      />

      <div className="flex items-start justify-between gap-4 border-b-2 border-ink/80 pb-4">
        <div>
          <p className="mono-label text-ink-faint">
            CASE FILE · SYSTEM {service.number}
          </p>
          <h3 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {service.short}
          </h3>
        </div>
        <span className={`hand text-2xl leading-none ${textColor(c)}`}>
          {service.verb}
        </span>
      </div>

      <Label className="mt-5">The Position</Label>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        {service.position}
      </p>

      <dl className="mt-5 space-y-1 border-y border-ink/10 py-3">
        <MetaRow label="System" value={service.system} />
        <MetaRow label="Number" value={service.number} />
        <MetaRow label="Deliverables" value={String(service.deliverables.length)} />
        <div className="flex items-center justify-between gap-4">
          <dt className="mono-label text-ink-faint">Status</dt>
          <dd className="mono-label flex items-center gap-2 font-bold text-ink">
            <span className="size-2 animate-pulse-dot rounded-full bg-signal" />
            OPEN
          </dd>
        </div>
      </dl>

      <StickyNote tone="bone" rotation={-1.5} className="mt-5">
        <p className="hand text-lg leading-snug text-ink">
          {noteLine(service.slug)}
        </p>
      </StickyNote>

      <div className="mt-6">
        <ServiceOpenLink
          service={service}
          href={`/services/${service.slug}`}
          tone="ink"
          size="sm"
        >
          Open the full {service.short.toLowerCase()} file
        </ServiceOpenLink>
      </div>
    </div>
  );
}

function RightLeaf({ service }: { service: Service }) {
  const c = service.color;
  return (
    <div className="case-sheet relative h-full p-6 sm:p-8">
      <Holes side="left" />
      <Tape
        color={`var(--color-${c})`}
        rotation={3}
        className="absolute -top-3 right-8"
      />

      <Label>Deliverables</Label>
      <ul className="mt-4 space-y-2">
        {service.deliverables.map((d, i) => (
          <li
            key={d}
            className="flex items-start gap-2.5 text-[0.82rem] leading-snug text-ink-soft"
          >
            <span
              className={`${solid(c)} ${textOn(c)} flex size-5 shrink-0 items-center justify-center font-mono text-[0.55rem] font-bold`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {d}
          </li>
        ))}
      </ul>

      <Label className="mt-7">The Process</Label>
      <ProcessDiagram service={service} />

      <div className="mt-7 flex items-center justify-between gap-4">
        <p className="mono-label text-ink-faint">
          FRAYM · OBSERVATION DEPARTMENT
        </p>
        <p className="mono-label text-ink-faint">SPREAD {service.number}/04</p>
      </div>
    </div>
  );
}

function ProcessDiagram({ service }: { service: Service }) {
  const c = service.color;
  return (
    <ol className="relative mt-5 grid grid-cols-1 gap-y-7 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-4">
      <span
        aria-hidden
        className="absolute left-2 right-2 top-4 hidden border-t-2 border-dashed border-ink/25 lg:block"
      />
      {service.process.map((step, i) => (
        <li
          key={step.step}
          className="relative flex items-start gap-3 lg:flex-col lg:gap-2"
        >
          <span
            className={`${solid(c)} ${textOn(c)} z-10 flex size-8 shrink-0 items-center justify-center border-2 font-mono text-xs font-bold shadow-stack`}
          >
            {i + 1}
          </span>
          <div>
            <p className="text-sm font-semibold leading-tight text-ink">
              {step.step}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              {step.detail}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Label({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mono-label flex items-center gap-2 text-ink-soft", className)}>
      <span className="inline-block h-px w-8 bg-ink/30" />
      {children}
    </p>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="mono-label text-ink-faint">{label}</dt>
      <dd className="mono-label font-bold text-ink">{value}</dd>
    </div>
  );
}

function Holes({ side }: { side: "left" | "right" }) {
  const tops = ["1.5rem", "3.75rem", "6rem"];
  return (
    <span aria-hidden className="pointer-events-none absolute inset-y-0 z-10">
      {tops.map((top) => (
        <span
          key={top}
          className="absolute size-2.5 rounded-full border border-ink/25 bg-paper-deep shadow-[inset_0_1px_2px_#1f1c1614]"
          style={{ top, [side]: "0.625rem" } as CSSProperties}
        />
      ))}
    </span>
  );
}
