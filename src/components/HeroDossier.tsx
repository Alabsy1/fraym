"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { Reveal } from "@/components/ui/Reveal";
import { HeroCaseFile, type TabId } from "@/components/HeroCaseFile";
import { HeroEvidenceBoard } from "@/components/HeroEvidenceBoard";
import { DossierSpread } from "@/components/DossierSpread";
import { CircleHighlight } from "@/components/ui/FramedHighlight";
import { StickyNote } from "@/components/ui/StickyNote";

const ORDER: TabId[] = ["frame", "direct", "signal", "full"];
const MORPH = { type: "spring" as const, stiffness: 380, damping: 28 };

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export function HeroDossier() {
  const [active, setActive] = useState<TabId>("frame");
  const [open, setOpen] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const [flash, setFlash] = useState<{ x: number; y: number } | null>(null);
  const reduced = useReducedMotion();

  const cardRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const startRef = useRef({ sx: 1, sy: 1, origin: "50% 50%" });

  const sx = useMotionValue(1);
  const sy = useMotionValue(1);
  const op = useMotionValue(1);

  const close = useCallback(() => {
    if (reduced) {
      setOpen(false);
      return;
    }
    const { sx: ex, sy: ey } = startRef.current;
    animate(sx, ex, MORPH);
    animate(sy, ey, MORPH);
    animate(op, 0, { duration: 0.25, ease: "easeIn" }).then(() =>
      setOpen(false)
    );
  }, [reduced, sx, sy, op]);

  useLayoutEffect(() => {
    if (!open || reduced) return;
    const overlay = overlayRef.current;
    const card = cardRef.current;
    if (!overlay || !card) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const r = card.getBoundingClientRect();
    const scaleX = Math.max(0.06, r.width / vw);
    const scaleY = Math.max(0.06, r.height / vh);
    const ox = clamp(r.left / (vw * (1 - scaleX)) || 0, 0, 1);
    const oy = clamp(r.top / (vh * (1 - scaleY)) || 0, 0, 1);
    const origin = `${ox * 100}% ${oy * 100}%`;
    startRef.current = { sx: scaleX, sy: scaleY, origin };
    overlay.style.transformOrigin = origin;
    sx.set(scaleX);
    sy.set(scaleY);
    op.set(0);
    animate(sx, 1, MORPH);
    animate(sy, 1, MORPH);
    animate(op, 1, { duration: 0.25, ease: "easeOut" });
  }, [open, reduced, sx, sy, op]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const handleSelect = (id: TabId, point?: { x: number; y: number }) => {
    if (open) return;
    const rect = cardRef.current?.getBoundingClientRect();
    setFlash(
      point &&
        rect &&
        point.x >= rect.left &&
        point.x <= rect.right &&
        point.y >= rect.top &&
        point.y <= rect.bottom
        ? point
        : rect
          ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
          : null
    );
    setDir(ORDER.indexOf(id) > ORDER.indexOf(active) ? 1 : -1);
    setActive(id);
    setOpen(true);
  };

  const goPrev = () => {
    setDir(-1);
    setActive(
      ORDER[(ORDER.indexOf(active) - 1 + ORDER.length) % ORDER.length]
    );
  };
  const goNext = () => {
    setDir(1);
    setActive(ORDER[(ORDER.indexOf(active) + 1) % ORDER.length]);
  };

  return (
    <section className="relative overflow-hidden">
      <GridBackdrop />
      <div className="relative mx-auto max-w-[90rem] px-4 pb-20 pt-14 sm:px-6 lg:px-10 lg:pb-28 lg:pt-24">
        {/* ── headline + composite center/right composition ── */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.30fr)_minmax(0,0.70fr)] lg:items-start lg:gap-4">
          {/* ── LEFT: editorial headline ── */}
          <div className="min-w-0 pr-4">
            <Reveal>
              <p className="mono-label mb-6 flex items-center gap-3 text-ink-soft">
                <span className="inline-block h-px w-10 bg-ink/30" />
                CASE FILE
              </p>
            </Reveal>
            <Reveal delay={40}>
              <p className="font-mono text-sm font-bold text-signal mb-6">
                FR-009
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display font-semibold uppercase leading-[0.98] tracking-tight text-ink text-5xl sm:text-6xl xl:text-7xl">
                <span className="block">
                  WE OBSERVE.
                  <HeroUnderline color="var(--color-moss)" />
                </span>
                <span className="block">
                  WE DIRECT.
                  <HeroUnderline color="var(--color-signal)" />
                </span>
                <span className="block">
                  <span className="relative inline-block">
                    <svg
                      aria-hidden
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-3"
                      style={{ width: "6.7em", height: "2.9em" }}
                      viewBox="0 0 100 44"
                      fill="none"
                    >
                      <ellipse
                        cx="50"
                        cy="22"
                        rx="47"
                        ry="19"
                        stroke="var(--color-signal)"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                        strokeDasharray="212 13"
                      />
                    </svg>
                    <span className="relative z-10">WE FRAME.</span>
                  </span>
                  <HeroUnderline color="var(--color-tape)" />
                </span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
                Perception is shaped by what people see, feel and believe.
                We build what&apos;s{" "}
                <CircleHighlight>real.</CircleHighlight>
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-12 flex items-center gap-3 text-ink-faint">
                <svg
                  aria-hidden
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="2" x2="12" y2="6" />
                  <line x1="12" y1="18" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="6" y2="12" />
                  <line x1="18" y1="12" x2="22" y2="12" />
                </svg>
                <span className="mono-label text-xs tracking-[0.2em]">
                  SCROLL TO EXPLORE
                </span>
              </div>
            </Reveal>
          </div>

          {/* ── CENTER + RIGHT: composite composition ── */}
          <div className="relative min-w-0">
            {/* central framed visual — sets the height of the composite */}
            <Reveal delay={160} className="relative z-10 w-[55%]">
              <HeroEvidenceBoard />
            </Reveal>

            {/* case file — full natural width, overlapping photo right edge */}
            <Reveal delay={200} className="relative z-20 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-[48%]">
              <div ref={cardRef} className="h-full">
                <HeroCaseFile active={active} onSelect={handleSelect} />
              </div>
            </Reveal>

            {/* sticky note — overlapping photo bottom-right into case file */}
            <Reveal delay={200} className="pointer-events-none absolute bottom-[20%] left-[48%] z-30 hidden w-44 -rotate-2 animate-float lg:block">
              <StickyNote tone="frame" rotation={0}>
                <p className="hand text-xl leading-snug text-ink">
                  Context changes everything.
                </p>
              </StickyNote>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── true origin-driven cinematic morph ── */}
      {open && (
        <motion.div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${active} dossier`}
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ scaleX: sx, scaleY: sy, opacity: op }}
          onClick={() => close()}
        >
          {/* dim backdrop */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-ink/25 backdrop-blur-xs"
          />

          {/* dossier content */}
          <div
            className="relative z-10 flex min-h-full items-center justify-center px-4 py-10 sm:py-14 lg:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="w-full max-w-6xl"
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 380, damping: 28 }
              }
            >
              <DossierSpread
                active={active}
                dir={dir}
                open={open}
                onClose={close}
                onPrev={goPrev}
                onNext={goNext}
              />
            </motion.div>
          </div>

          {/* radial aperture flash from the click point */}
          {flash && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute z-20 rounded-full"
              style={{
                left: flash.x - 320,
                top: flash.y - 320,
                width: 640,
                height: 640,
              }}
              initial={{ opacity: 0.9, scale: 0.05 }}
              animate={{ opacity: 0, scale: 3.4 }}
              transition={{ duration: reduced ? 0 : 0.55, ease: "easeOut" }}
            >
              <div className="h-full w-full rounded-full bg-[radial-gradient(circle,#fff6dc_0%,#f2d64e_38%,rgba(242,214,78,0.32)_60%,transparent_78%)]" />
            </motion.div>
          )}

          {/* white micro-flash */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-30 bg-paper"
            initial={{ opacity: reduced ? 0 : 0.5 }}
            animate={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.22, ease: "easeOut" }}
          />

          {/* projector light sweep across the expanding container */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-40 overflow-hidden"
          >
            <motion.div
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              initial={{ x: "-140%" }}
              animate={{ x: "460%" }}
              transition={{
                duration: reduced ? 0 : 0.65,
                ease: "easeInOut",
                delay: 0.03,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

function HeroUnderline({ color }: { color: string }) {
  return (
    <svg
      aria-hidden
      className="mt-[0.12em] block h-[0.2em] w-full"
      viewBox="0 0 240 12"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M4 8 C 50 3, 90 10, 130 6 C 175 2, 210 9, 236 6"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeDasharray="34 8"
      />
    </svg>
  );
}
