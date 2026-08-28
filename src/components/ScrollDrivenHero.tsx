"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tape } from "@/components/ui/Tape";
import { StickyNote } from "@/components/ui/StickyNote";

type VideoState = "loading" | "ready" | "error";

export function ScrollDrivenHero({
  src = "/hero-background.mp4",
  poster,
  className,
}: {
  src?: string;
  poster?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reduced = useReducedMotion();
  const [videoState, setVideoState] = useState<VideoState>("loading");

  const showFallback = reduced || videoState !== "ready";

  return (
    <section
      className={cn(
        "relative overflow-hidden border-t border-ink/10",
        className
      )}
    >
      <div
        className="grid-lines pointer-events-none absolute inset-0 opacity-20"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionTitle
          eyebrow="Frame / Unit"
          title={
            <>
              The frame holds{" "}
              <span className="text-ink-soft">the moment.</span>
            </>
          }
          description="One room. One light. A decision in progress — held still until the edit calls it forward. The footage never plays on its own; it arrives ready to be cut."
        />

        <div className="relative mt-12">
          {/* ── the framed media panel ── */}
          <div className="case-sheet relative overflow-hidden p-2 shadow-window sm:p-3">
            <Tape
              color="var(--color-frame)"
              rotation={-3}
              className="absolute -top-3 left-8 z-10"
            />
            <Tape
              color="var(--color-signal)"
              rotation={2}
              className="absolute -top-3 right-8 z-10"
            />

            {/* media surface */}
            <div
              className={cn(
                "relative aspect-video w-full overflow-hidden border border-ink/15",
                showFallback ? "bg-paper" : "bg-ink"
              )}
            >
              {!reduced && (
                <video
                  ref={videoRef}
                  src={src}
                  poster={poster}
                  muted
                  loop
                  autoPlay
                  playsInline
                  disablePictureInPicture
                  preload="auto"
                  tabIndex={-1}
                  aria-hidden
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                    videoState === "ready" ? "opacity-100" : "opacity-0"
                  )}
                  onLoadedMetadata={() => setVideoState("ready")}
                  onError={() => setVideoState("error")}
                />
              )}

              {videoState === "loading" && poster && !reduced ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={poster}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <FilmStills />
              )}

              {!showFallback && (
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/60"
                />
              )}

              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="size-2 animate-pulse-dot rounded-full bg-signal" />
                <span
                  className={cn(
                    "mono-label text-[0.6rem]",
                    showFallback ? "text-ink-soft" : "text-paper"
                  )}
                >
                  FRAME UNIT
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <p
                  className={cn(
                    "hand text-xl sm:text-2xl",
                    showFallback ? "text-ink" : "text-paper"
                  )}
                >
                  one frame, held.
                </p>
                <span
                  className={cn(
                    "mono-label hidden text-[0.6rem] sm:block",
                    showFallback ? "text-ink-faint" : "text-paper/80"
                  )}
                >
                  src · {src}
                </span>
              </div>

              {/* corner brackets */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-2.5"
              >
                <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-frame" />
                <span className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-frame" />
                <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-frame" />
                <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-frame" />
              </div>
            </div>

            {/* footer · unit caption */}
            <div className="mt-2.5 flex items-center justify-between gap-4 border-t border-ink/10 pt-2.5">
              <span className="mono-label text-[0.6rem] text-ink-soft">
                FRAYM · PERCEPTION ARCHIVE · FRAME UNIT 01/04
              </span>
              <span className="mono-label hidden text-[0.6rem] font-bold text-ink sm:block">
                APPROVED FOR EDIT
              </span>
            </div>
          </div>

          {/* ── dossier annotations flanking the panel ── */}
          <div className="absolute -left-4 top-1/2 z-20 hidden -translate-y-1/2 lg:block xl:left-0">
            <div className="mono-label flex items-center gap-2 border border-ink/20 bg-paper px-3 py-2 font-bold text-ink shadow-window">
              <span className="size-2 animate-pulse-dot rounded-full bg-moss" />
              STEP 01 · SCENE ANALYSIS
            </div>
          </div>

          <div className="absolute -right-4 top-1/2 z-20 hidden -translate-y-1/2 lg:block xl:right-0">
            <StickyNote tone="frame" rotation={3} className="max-w-[13rem]">
              <p className="hand text-lg leading-snug text-ink">
                Evaluating exposure and motion vectors...
              </p>
            </StickyNote>
          </div>

          {/* ── APPROVED CUT stamp ── */}
          <div className="absolute -bottom-6 right-2 z-20 sm:right-6">
            <span className="inline-block animate-sheet-pop -rotate-6 border-[3px] border-signal bg-paper/95 px-3 py-1.5 font-mono text-sm font-bold uppercase tracking-[0.22em] text-signal shadow-window sm:text-base">
              APPROVED CUT
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Clean framed film stills (shown until real footage loads) ── */
function FilmStills() {
  const stills = [
    { label: "STILL 01 · LIGHT", rotate: "-2deg", scene: <SceneLight /> },
    { label: "STILL 02 · MOTION", rotate: "1.5deg", scene: <SceneMotion /> },
    { label: "STILL 03 · ROOM", rotate: "-1.5deg", scene: <SceneRoom /> },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="texture-paper-2 absolute inset-0" />
      <div className="grid-lines absolute inset-0 opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper-2 to-paper-deep" />
      <div className="absolute inset-0 flex items-center justify-center gap-4 px-6 sm:gap-7">
        {stills.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "w-[30%] max-w-[9.5rem]",
              i === 1 && "translate-y-3"
            )}
            style={{ rotate: s.rotate }}
          >
            <div className="border border-ink/15 bg-paper p-2 pb-1.5 shadow-window">
              <div className="relative aspect-[4/5] overflow-hidden">
                {s.scene}
              </div>
            </div>
            <p className="mono-label mt-1.5 text-center text-[0.55rem] text-ink-soft">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SceneLight() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#f2ead2] via-[#d9ca9c] to-[#ad9660]">
      <div className="absolute left-[22%] top-[16%] size-8 rounded-full bg-frame/80 shadow-[0_0_22px_8px_rgba(242,182,22,0.4)]" />
      <div className="absolute inset-x-[14%] bottom-0 top-[46%] bg-gradient-to-b from-[#9c8a5a]/45 to-[#6f5a33]/60" />
      <div className="absolute inset-0 shadow-[inset_0_0_26px_rgba(90,70,40,0.25)]" />
    </div>
  );
}

function SceneMotion() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#eae8de] via-[#c4cac4] to-[#8ea0a6]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 80 100"
        preserveAspectRatio="none"
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={i}
            x1={i * 16}
            y1="0"
            x2={16 + i * 14}
            y2="100"
            stroke="#4f6487"
            strokeWidth="3"
            opacity="0.5"
          />
        ))}
      </svg>
      <div className="absolute inset-0 shadow-[inset_0_0_26px_rgba(60,70,90,0.22)]" />
    </div>
  );
}

function SceneRoom() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#e6e2d4] via-[#b9bb9f] to-[#7a8064]">
      <div className="absolute inset-x-[16%] bottom-0 top-[56%] bg-gradient-to-b from-[#59644d]/60 to-[#3c4230]/75" />
      <div className="absolute left-[32%] top-[22%] h-[38%] w-[36%] border-[4px] border-ink/60 bg-[#efe6cf]" />
      <div className="absolute inset-0 shadow-[inset_0_0_26px_rgba(50,60,40,0.22)]" />
    </div>
  );
}
