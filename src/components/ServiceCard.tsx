"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { Service } from "@/lib/data";
import { solid, textColor, textOn } from "@/lib/color";
import { cn } from "@/lib/cn";
import { InspectionView } from "@/components/ui/InspectionView";
import { usePageTransition } from "@/components/transition/PageTransitionProvider";

export function ServiceCard({
  service,
  className,
  interactive = false,
  active = false,
  onSelect,
  inspect = false,
}: {
  service: Service;
  className?: string;
  interactive?: boolean;
  active?: boolean;
  onSelect?: () => void;
  inspect?: boolean;
}) {
  const c = service.color;
  const { start } = usePageTransition();

  const cardClass = cn(
    "group relative flex flex-col border border-ink/15 bg-paper transition-all duration-300",
    interactive ? "text-left" : "overflow-hidden hover:-translate-y-1 hover:shadow-window",
    active && "border-ink/50 shadow-window",
    interactive && !active && "hover:-translate-y-0.5 hover:shadow-window",
    className
  );

  const inner = (
    <>
      {interactive && (
        <span
          aria-hidden
          className={cn(
            "absolute -top-2.5 right-5 z-10 px-2.5 py-1 font-mono text-[0.5rem] font-bold uppercase tracking-[0.18em] shadow-stack transition-opacity duration-300",
            solid(c),
            textOn(c),
            active ? "opacity-100" : "opacity-0 group-hover:opacity-90"
          )}
          style={
            {
              transform: "rotate(2deg)",
              clipPath: "polygon(0 0, 100% 12%, 94% 100%, 6% 88%)",
            } as CSSProperties
          }
        >
          pull here
        </span>
      )}

      {/* header band */}
      <div
        className={`${solid(c)} ${textOn(c)} flex items-center justify-between px-5 py-3 transition-colors`}
      >
        <span className="mono-label font-bold">{service.system}</span>
        <span className="font-mono text-sm font-bold">Nº {service.number}</span>
      </div>

      {/* analog preview */}
      <div className="relative px-5 pt-5">
        {inspect ? (
          <InspectionView>
            <ServicePreview service={service} />
          </InspectionView>
        ) : (
          <ServicePreview service={service} />
        )}
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-3xl font-semibold tracking-tight text-ink">
            {service.short}
          </h3>
          <p className={`hand mt-1 text-xl ${textColor(c)}`}>
            {service.verb}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-ink-soft">{service.tagline}</p>

        {/* pencil checklist */}
        <ul className="mt-auto space-y-1.5">
          {service.deliverables.slice(0, 3).map((d) => (
            <li key={d} className="flex items-start gap-2 text-[0.8rem] text-ink-soft">
              <span className="hand -mt-1 text-lg leading-none text-moss">✓</span>
              <span className="border-b border-dotted border-ink/25 pb-0.5">
                {d}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-2 flex items-center justify-between border-t border-ink/10 pt-3">
          <span className="mono-label text-ink-soft">
            {interactive
              ? active
                ? "close the file"
                : "pull the tab"
              : `open the ${service.short.toLowerCase()} file`}
          </span>
          {interactive ? (
            <span
              aria-hidden
              className={cn(
                "flex size-7 items-center justify-center border border-ink/20 text-ink transition-all duration-300",
                active && "rotate-45 bg-ink text-paper"
              )}
            >
              +
            </span>
          ) : (
            <span
              aria-hidden
              className="flex size-7 items-center justify-center border border-ink/20 text-ink transition-all duration-300 group-hover:translate-x-1 group-hover:bg-ink group-hover:text-paper"
            >
              →
            </span>
          )}
        </div>
      </div>
    </>
  );

  if (interactive) {
    return (
      <button
        type="button"
        onClick={onSelect}
        aria-expanded={active}
        className={cardClass}
      >
        {inner}
      </button>
    );
  }

  return (
    <Link
      href={`/services/${service.slug}`}
      className={cardClass}
      onClick={(e) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
          return;
        e.preventDefault();
        start(service, e.currentTarget.getBoundingClientRect());
      }}
    >
      {inner}
    </Link>
  );
}

/* ── Rich analog preview per system ─────────────────────── */
function ServicePreview({ service }: { service: Service }) {
  switch (service.slug) {
    case "frame":
      return <FramePreview color={service.color} />;
    case "direct":
      return <DirectPreview color={service.color} />;
    case "signal":
      return <SignalPreview color={service.color} />;
    case "full-frame":
      return <FullFramePreview color={service.color} />;
    default:
      return null;
  }
}

function PreviewShell({
  color,
  children,
}: {
  color: Service["color"];
  children: React.ReactNode;
}) {
  const tint = colorMapBg[color];
  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden ${tint}`}>
      <div className="grid-lines absolute inset-0 opacity-40" />
      <div className="texture-paper-2 absolute inset-0 opacity-40" />
      {children}
    </div>
  );
}

const colorMapBg: Record<string, string> = {
  frame: "bg-frame/15",
  tape: "bg-tape/15",
  signal: "bg-signal/15",
  moss: "bg-moss/15",
};

function FramePreview({ color }: { color: Service["color"] }) {
  return (
    <PreviewShell color={color}>
      {/* framed still polaroid */}
      <div className="absolute left-1/2 top-1/2 w-[56%] -translate-x-1/2 -translate-y-1/2 -rotate-3 bg-white p-2 pb-2.5 shadow-paper">
        <div className="relative aspect-square overflow-hidden border border-ink/10 bg-gradient-to-br from-terracotta via-paper to-plum">
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-[58%] w-[40%] rounded-t-full bg-ink/75" />
            <div className="-mt-1 h-[28%] w-[66%] rounded-full bg-ink/75" />
          </div>
          <div className="grid-lines-sm absolute inset-0 opacity-30" />
        </div>
        <p className="hand mt-1.5 text-center text-lg leading-none text-ink-soft">
          shot 04 — approved
        </p>
      </div>
      {/* light leak corner */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(242,182,22,0.35),transparent_45%)]" />
      <span className="absolute right-2 top-2 -rotate-6 border-[2px] border-frame-deep px-1.5 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-frame-deep opacity-80">
        Crafted
      </span>
    </PreviewShell>
  );
}

function DirectPreview({ color }: { color: Service["color"] }) {
  return (
    <PreviewShell color={color}>
      {/* clapperboard */}
      <div className="absolute left-1/2 top-[42%] w-[52%] -translate-x-1/2 -translate-y-1/2 rotate-[2deg] shadow-paper">
        <div className="h-2.5 w-full bg-ink" />
        <div className="flex">
          <div className="h-16 flex-1 bg-ink px-2 py-1.5 font-mono text-[0.5rem] leading-snug text-paper/80">
            <p>SCENE 04</p>
            <p>TAKE 02</p>
          </div>
          <div
            className="h-16 w-16 bg-paper"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, #1f1c16 0 4px, #f4eddf 4px 8px)",
            }}
          />
        </div>
      </div>
      {/* filmstrip */}
      <div className="absolute inset-x-3 bottom-2.5 flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex-1 border border-ink/40 bg-ink p-[2px]">
            <div className="aspect-video bg-gradient-to-br from-tape/70 to-paper" />
          </div>
        ))}
      </div>
      <span className="absolute right-2 top-2 rotate-6 border-[2px] border-tape px-1.5 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-tape opacity-80">
        Directed
      </span>
    </PreviewShell>
  );
}

function SignalPreview({ color }: { color: Service["color"] }) {
  return (
    <PreviewShell color={color}>
      {/* observation sheet */}
      <div className="absolute left-1/2 top-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2 rotate-[1.5deg] bg-[#f4eddf] p-3 shadow-paper">
        <p className="mono-label text-[0.5rem] text-ink-soft">ROOM READ — 04.12</p>
        <div className="mt-2 space-y-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-px bg-ink/10" />
          ))}
        </div>
        <svg
          className="mt-2 h-12 w-full"
          viewBox="0 0 120 48"
          preserveAspectRatio="none"
          aria-hidden
        >
          <line x1="0" y1="44" x2="120" y2="44" stroke="#1f1c16" strokeOpacity="0.3" />
          <polyline
            points="0,42 18,34 36,38 54,24 72,28 90,12 108,16 120,6"
            fill="none"
            stroke="#e25c4f"
            strokeWidth="2"
          />
          <circle cx="90" cy="12" r="2.5" fill="#e25c4f" />
        </svg>
      </div>
      <span className="absolute right-2 top-2 rotate-6 border-[2px] border-signal px-1.5 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-signal opacity-80">
        Observed
      </span>
    </PreviewShell>
  );
}

function FullFramePreview({ color }: { color: Service["color"] }) {
  return (
    <PreviewShell color={color}>
      <div className="absolute left-[16%] top-[14%] w-[40%] -rotate-6 bg-white p-1.5 pb-2 shadow-stack">
        <div className="aspect-[4/3] bg-gradient-to-br from-frame/60 to-paper" />
        <p className="hand mt-1 text-center text-sm leading-none text-ink-soft">frame</p>
      </div>
      <div className="absolute left-[34%] top-[36%] w-[40%] rotate-2 bg-white p-1.5 pb-2 shadow-stack">
        <div className="aspect-[4/3] bg-gradient-to-br from-tape/60 to-paper" />
        <p className="hand mt-1 text-center text-sm leading-none text-ink-soft">direct</p>
      </div>
      <div className="absolute left-[50%] top-[56%] w-[40%] rotate-6 bg-white p-1.5 pb-2 shadow-paper">
        <div className="aspect-[4/3] bg-gradient-to-br from-signal/50 to-paper" />
        <p className="hand mt-1 text-center text-sm leading-none text-ink-soft">signal</p>
      </div>
      <span className="absolute bottom-2 right-2 -rotate-6 border-[2.5px] border-moss px-2 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-moss opacity-80">
        Signed off
      </span>
    </PreviewShell>
  );
}
