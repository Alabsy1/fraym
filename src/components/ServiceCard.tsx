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
              : `explore ${service.short.toLowerCase()}`}
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
      <img
        src="/frame.png"
        alt="Frame System"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute right-2 top-2 -rotate-6 border-[2px] border-frame-deep px-1.5 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-frame-deep opacity-80">
        Crafted
      </span>
    </PreviewShell>
  );
}

function DirectPreview({ color }: { color: Service["color"] }) {
  return (
    <PreviewShell color={color}>
      <img
        src="/direct.png"
        alt="Direct System"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute right-2 top-2 rotate-6 border-[2px] border-tape px-1.5 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-tape opacity-80">
        Directed
      </span>
    </PreviewShell>
  );
}

function SignalPreview({ color }: { color: Service["color"] }) {
  return (
    <PreviewShell color={color}>
      <img
        src="/signal.png"
        alt="Signal System"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute right-2 top-2 rotate-6 border-[2px] border-signal px-1.5 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-signal opacity-80">
        Observed
      </span>
    </PreviewShell>
  );
}

function FullFramePreview({ color }: { color: Service["color"] }) {
  return (
    <PreviewShell color={color}>
      <img
        src="/full-frame.png"
        alt="Full Frame System"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute bottom-2 right-2 -rotate-6 border-[2.5px] border-moss px-2 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-moss opacity-80">
        Signed off
      </span>
    </PreviewShell>
  );
}
