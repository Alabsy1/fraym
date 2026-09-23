import type { CSSProperties, ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { serviceBySlug } from "@/lib/data";
import { solid, textOn, softBorder, textColor } from "@/lib/color";
import { cn } from "@/lib/cn";
import { Tape } from "@/components/ui/Tape";
import { Stamp } from "@/components/ui/Stamp";
import { StickyNote } from "@/components/ui/StickyNote";
import { ServiceHeroVisual } from "@/components/ServiceHeroVisual";
import type { TabId } from "@/components/HeroCaseFile";

const slugByTab: Record<TabId, string> = {
  frame: "frame",
  direct: "direct",
  signal: "signal",
  full: "full-frame",
};

const noteLine: Record<TabId, string> = {
  frame: "the frame is a decision. make it deliberate.",
  direct: "directed on paper. rehearsed on set.",
  signal: "keep the story moving.",
  full: "one file. one voice. one standard.",
};

const stampToneFor = (c: string) =>
  c === "frame" || c === "tape" || c === "signal" || c === "moss" ? c : "ink";

const ORDER: TabId[] = ["frame", "direct", "signal", "full"];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE } },
};

const leafLeft = {
  hidden: { opacity: 0, rotateY: 16 },
  show: { opacity: 1, rotateY: 0, transition: { duration: 0.35, ease: EASE } },
};

const leafRight = {
  hidden: { opacity: 0, rotateY: -16 },
  show: { opacity: 1, rotateY: 0, transition: { duration: 0.35, ease: EASE } },
};

const stampPop = {
  hidden: { opacity: 0, scale: 1.6, rotate: -5 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 380, damping: 20 },
  },
};

const tagPunch = {
  hidden: { opacity: 0, scale: 1.4, rotate: -6 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 380, damping: 20 },
  },
};

const noteDrop = {
  hidden: { opacity: 0, scale: 1.25, y: -10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 500, damping: 20 },
  },
};

const stepReveal = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE } },
};

const stepStagger = (active: TabId) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: active === "direct" ? 0.08 : 0,
    },
  },
});

export function DossierSpread({
  active,
  dir,
  onClose,
  onPrev,
  onNext,
}: {
  active: TabId;
  dir: 1 | -1;
  open: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const service = serviceBySlug(slugByTab[active]);
  const reduced = useReducedMotion();
  if (!service) return null;
  const c = service.color;

  const prevId = ORDER[(ORDER.indexOf(active) - 1 + ORDER.length) % ORDER.length];
  const nextId = ORDER[(ORDER.indexOf(active) + 1) % ORDER.length];
  const prevShort = serviceBySlug(slugByTab[prevId])?.short ?? prevId;
  const nextShort = serviceBySlug(slugByTab[nextId])?.short ?? nextId;

  const stagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : 0.045,
        delayChildren: reduced ? 0 : 0.02,
      },
    },
  };

  return (
    <div className="relative pb-2">
      {/* ── The open archival spread ── */}
      <motion.div
        className="texture-paper-2 relative overflow-hidden border-y-2 border-ink/15 px-4 py-8 shadow-window sm:px-8 lg:px-12"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <div
          className="grid-lines-sm pointer-events-none absolute inset-0 opacity-25"
          aria-hidden
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
        >
          <motion.div
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            initial={{ x: "-140%" }}
            animate={{ x: "460%" }}
            transition={{ duration: reduced ? 0 : 0.9, ease: "easeInOut" }}
          />
        </div>
        <Tape
          color={`var(--color-${c})`}
          rotation={-2}
          className="absolute -top-3 left-10 z-10"
        />

        {/* top band */}
        <motion.div
          variants={rise}
          className="relative mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-4"
        >
          <div className="flex flex-wrap items-center gap-3">
            <motion.span
              variants={tagPunch}
              className={`${solid(c)} ${textOn(
                c
              )} flex size-9 items-center justify-center font-mono text-xs font-bold`}
            >
              Nº {service.number}
            </motion.span>
            <span className="mono-label text-ink-soft">{service.system}</span>
            <span className="hand text-lg text-ink-soft">
              archival spread — open
            </span>
            <motion.span
              variants={tagPunch}
              className="mono-label flex items-center gap-2 font-bold text-ink"
            >
              <span className="size-2 animate-pulse-dot rounded-full bg-signal" />
              OPEN
            </motion.span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <motion.span
              variants={stampPop}
              className="hidden sm:inline-block"
            >
              <Stamp text="Dossier" tone={stampToneFor(c)} rotation={-3} />
            </motion.span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onPrev}
                aria-label={`Previous system: ${prevShort}`}
                className="mono-label group inline-flex cursor-pointer items-center gap-1.5 border border-ink/20 bg-paper px-2.5 py-1.5 font-bold text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5"
                >
                  ←
                </span>
                {prevShort}
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label={`Next system: ${nextShort}`}
                className="mono-label group inline-flex cursor-pointer items-center gap-1.5 border border-ink/20 bg-paper px-2.5 py-1.5 font-bold text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                {nextShort}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </button>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close the dossier"
              className="mono-label group inline-flex cursor-pointer items-center gap-2 border border-ink/20 bg-paper px-3 py-1.5 font-bold text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <span
                aria-hidden
                className="inline-block text-sm transition-transform duration-200 group-hover:rotate-90"
              >
                ×
              </span>
              close the dossier
            </button>
          </div>
        </motion.div>

        {/* ── two leaves + spine ── */}
        <div className="relative [perspective:1800px]">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_2.5rem_1fr] lg:items-stretch">
            {/* LEFT LEAF — analog visual + field note */}
            <motion.div
              variants={leafLeft}
              style={{ transformOrigin: "100% 50%" }}
            >
              <div className="h-full">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ x: dir * 24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: dir * -24, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}
                    className="h-full"
                  >
                    <div className="case-sheet case-holes relative flex h-full flex-col p-5 sm:p-6">
                      <Holes side="right" />
                      <Tape
                        color={`var(--color-${c})`}
                        rotation={-2}
                        className="absolute -top-3 left-6"
                      />
                      <ServiceHeroVisual service={service} />
                      <div className="mt-4 flex-1" aria-hidden />
                      <motion.div
                        variants={noteDrop}
                        initial="hidden"
                        animate="show"
                      >
                        <StickyNote tone="bone" rotation={-1.5}>
                          <p className="hand text-lg leading-snug text-ink">
                            {noteLine[active]}
                          </p>
                        </StickyNote>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* SPINE (desktop) */}
            <motion.div
              variants={rise}
              className="relative hidden lg:block"
              aria-hidden
            >
              <div className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-ink/15" />
              <div
                className={cn(
                  "absolute inset-y-5 left-1/2 w-1.5 -translate-x-1/2",
                  solid(c)
                )}
              />
            </motion.div>

            {/* RIGHT LEAF — position + client metrics */}
            <motion.div
              variants={leafRight}
              style={{ transformOrigin: "0% 50%" }}
            >
              <div className="h-full">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ x: dir * 24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: dir * -24, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}
                    className="h-full"
                  >
                    <div className="case-sheet case-holes relative flex h-full flex-col p-5 sm:p-6">
                      <Holes side="left" />
                      <Tape
                        color={`var(--color-${c})`}
                        rotation={3}
                        className="absolute -top-3 right-6"
                      />
                      <Label>The Position</Label>
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                        {service.position}
                      </p>

                      <Label className="mt-7">Scope</Label>
                      <div className="mt-3 grid flex-1 grid-cols-3 gap-3">
                        {service.deliverables.slice(0, 3).map((d, i) => (
                          <div
                            key={d}
                            className={cn(
                              "flex flex-col justify-between gap-2 border bg-paper p-3",
                              softBorder(c)
                            )}
                          >
                            <p className="font-display text-xl font-semibold leading-none text-ink sm:text-2xl">
                              {String(i + 1).padStart(2, "0")}
                            </p>
                            <p className="mono-label text-[0.55rem] leading-snug text-ink-soft">
                              {d}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── deliverables + process (full width) ── */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <motion.div
            variants={rise}
            className="case-sheet relative p-5 sm:p-6"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ x: dir * 24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: dir * -24, opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}
              >
                <Label>Deliverables</Label>
                <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {service.deliverables.map((d, i) => (
                    <li
                      key={d}
                      className="flex items-start gap-2.5 text-[0.82rem] leading-snug text-ink-soft"
                    >
                      <span className="hand -mt-1 text-lg leading-none text-moss">
                        ✓
                      </span>
                      <span>
                        <span className="font-bold text-ink">
                          {String(i + 1).padStart(2, "0")}.
                        </span>{" "}
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            variants={rise}
            className="case-sheet relative p-5 sm:p-6"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ x: dir * 24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: dir * -24, opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}
              >
                <Label>Process — how {service.short.toLowerCase()} runs</Label>
                <motion.ol
                  variants={stepStagger(active)}
                  initial="hidden"
                  animate="show"
                  className="mt-4 space-y-4"
                >
                  {service.process.map((step, i) => (
                    <motion.li key={step.step} variants={stepReveal} className="flex gap-4">
                      <span className="flex flex-col items-center">
                        <span
                          className={`${solid(c)} ${textOn(
                            c
                          )} flex size-7 shrink-0 items-center justify-center font-mono text-xs font-bold`}
                        >
                          {i + 1}
                        </span>
                        {i < service.process.length - 1 && (
                          <span className="mt-1 w-px flex-1 bg-ink/15" />
                        )}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {step.step}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">
                          {step.detail}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ol>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* bottom strip */}
        <motion.div
          variants={rise}
          className="relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-4"
        >
          <div className="flex flex-wrap items-center gap-4">
            <span className={`hand text-xl ${textColor(c)}`}>
              {service.verb}
            </span>
            <p className="mono-label text-[0.6rem] text-ink-faint">
              FRAYM · PERCEPTION ARCHIVE · SPREAD {service.number}/04
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mono-label cursor-pointer text-[0.7rem] font-bold text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            ← collapse the dossier
          </button>
        </motion.div>
      </motion.div>
    </div>
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
    <p
      className={cn(
        "mono-label flex items-center gap-2 text-ink-soft",
        className
      )}
    >
      <span className="inline-block h-px w-8 bg-ink/30" />
      {children}
    </p>
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
