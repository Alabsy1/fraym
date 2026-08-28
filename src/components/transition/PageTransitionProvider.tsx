"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Service } from "@/lib/data";
import { solid, textOn, textColor, softBg } from "@/lib/color";
import { cn } from "@/lib/cn";
import { Tape } from "@/components/ui/Tape";
import { Stamp } from "@/components/ui/Stamp";

interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface PageTransitionCtx {
  start: (service: Service, rect: Rect) => void;
}

const Ctx = createContext<PageTransitionCtx>({ start: () => {} });

export const usePageTransition = () => useContext(Ctx);

const COVER_MS = 620;
const REVEAL_MS = 520;

const caseRef: Record<string, string> = {
  frame: "FR-001",
  direct: "DR-002",
  signal: "SG-003",
  "full-frame": "FF-004",
};

const stampToneFor = (c: Service["color"]) => {
  if (c === "frame" || c === "tape" || c === "signal" || c === "moss") {
    return c;
  }
  return "ink";
};

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState<{
    service: Service;
    rect: Rect;
  } | null>(null);

  const start = useCallback((service: Service, rect: Rect) => {
    setActive({ service, rect });
  }, []);

  const arrived =
    active !== null && pathname === `/services/${active.service.slug}`;
  const phase: "idle" | "cover" | "reveal" = active
    ? arrived
      ? "reveal"
      : "cover"
    : "idle";

  // Navigate once the cover animation completes.
  useEffect(() => {
    if (phase !== "cover" || !active) return;
    const t = window.setTimeout(() => {
      router.push(`/services/${active.service.slug}`);
    }, COVER_MS);
    return () => window.clearTimeout(t);
  }, [phase, active, router]);

  // Clear the overlay after the reveal animation finishes.
  useEffect(() => {
    if (phase !== "reveal") return;
    const t = window.setTimeout(() => {
      setActive(null);
    }, REVEAL_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  return (
    <Ctx.Provider value={{ start }}>
      {children}
      {active && phase !== "idle" && (
        <CaseFileOverlay
          service={active.service}
          rect={active.rect}
          phase={phase}
        />
      )}
    </Ctx.Provider>
  );
}

/* ── The pulled case file overlay ────────────────────────── */
function CaseFileOverlay({
  service,
  rect,
  phase,
}: {
  service: Service;
  rect: Rect;
  phase: "cover" | "reveal";
}) {
  const c = service.color;
  const covering = phase === "cover";

  let scaleX = 1;
  let scaleY = 1;
  if (typeof window !== "undefined") {
    scaleX = rect.width / Math.max(1, window.innerWidth);
    scaleY = rect.height / Math.max(1, window.innerHeight);
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
    >
      {/* drawer veil */}
      <div
        className={cn(
          "pointer-events-auto absolute inset-0 bg-ink/20",
          covering ? "animate-casefile-veil" : "animate-casefile-reveal"
        )}
        style={{ animationDuration: covering ? "0.35s" : "0.5s" }}
      />

      {/* case file sheet */}
      <div
        className={cn(
          "absolute inset-0",
          covering ? "animate-casefile-cover" : "animate-casefile-reveal"
        )}
        style={
          {
            "--fx": `${rect.left}px`,
            "--fy": `${rect.top}px`,
            "--fsx": scaleX,
            "--fsy": scaleY,
            transformOrigin: "0 0",
          } as CSSProperties
        }
      >
        <div className={cn("flex h-full w-full flex-col", softBg(c))}>
          {/* top color band */}
          <div
            className={cn(
              `${solid(c)} ${textOn(c)}`,
              "relative flex items-center justify-between px-6 py-4 sm:px-12"
            )}
          >
            <span className="font-mono text-sm font-bold uppercase tracking-[0.24em] sm:text-base">
              {service.system}
            </span>
            <span className="font-mono text-sm font-bold sm:text-base">
              Nº {service.number}
            </span>
          </div>

          {/* sheet body */}
          <div className="relative flex-1">
            <div
              className="grid-lines absolute inset-0 opacity-40"
              aria-hidden
            />
            <div className="texture-paper-2 absolute inset-0 opacity-50" aria-hidden />

            {/* tape + stamp */}
            <Tape
              color={`var(--color-${c})`}
              rotation={-3}
              className="absolute left-6 top-4 z-10 sm:left-12"
            />
            <Stamp
              text="Pulled"
              tone={stampToneFor(c)}
              rotation={5}
              className="absolute right-8 top-10 z-10 opacity-90"
            />

            {/* headline */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <p className="mono-label text-ink-faint">
                CASE FILE · {caseRef[service.slug] ?? service.number}
              </p>
              <h2
                className="animate-casefile-label-in mt-3 font-display text-6xl font-semibold uppercase leading-none tracking-tight text-ink sm:text-8xl"
                style={{ animationDelay: "120ms" }}
              >
                {service.short}
              </h2>
              <p
                className={cn(
                  "animate-casefile-label-in hand mt-3 text-3xl sm:text-4xl",
                  textColor(c)
                )}
                style={{ animationDelay: "210ms" }}
              >
                {service.verb}
              </p>
              <p
                className="animate-casefile-label-in mono-label mt-6 max-w-md text-ink-soft"
                style={{ animationDelay: "300ms" }}
              >
                pulled from the archive · opening the {service.short.toLowerCase()} file
              </p>
            </div>
          </div>

          {/* footer */}
          <div className="relative flex items-center justify-between border-t-2 border-ink/80 bg-paper-2 px-6 py-4 sm:px-12">
            <div className="flex items-end gap-3">
              <Barcode />
              <p className="mono-label text-[0.6rem] leading-tight text-ink-faint">
                FRAYM · PERCEPTION ARCHIVE
                <br />
                {service.slug.toUpperCase()} · SYSTEM {service.number}
              </p>
            </div>
            <p className="mono-label hidden text-[0.6rem] text-ink-soft sm:block">
              observing since 2018
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Barcode() {
  const bars = [2, 1, 3, 1, 1, 4, 2, 1, 3, 2, 1, 1, 2, 3, 1, 4, 1, 2, 1, 1, 3, 2, 2, 1];
  const heights = [14, 20, 10, 24, 16, 22];
  return (
    <div className="flex h-9 items-end gap-[2px]">
      {bars.map((w, i) => (
        <span
          key={i}
          className="bg-ink"
          style={{ width: `${w}px`, height: `${heights[i % heights.length]}px` }}
        />
      ))}
    </div>
  );
}
