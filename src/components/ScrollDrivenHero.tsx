"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tape } from "@/components/ui/Tape";

type VideoState = "loading" | "ready" | "error";

export function ScrollDrivenHero({
  src = "/scene-video.mp4",
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
