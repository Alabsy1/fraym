"use client";

import { useRef } from "react";
import { MotionConfig } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StickyNote } from "@/components/ui/StickyNote";
import { Draggable } from "@/components/ui/Draggable";
import { Polaroid } from "@/components/ui/Polaroid";
import { SystemConsole } from "@/components/ui/SystemConsole";
import { SignalReveal } from "@/components/ui/SignalReveal";
import { CircleHighlight } from "@/components/ui/FramedHighlight";

export function EvidenceBoard() {
  const boardRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionTitle
          eyebrow="The Evidence Board"
          title={
            <>
              Pin it. Move it.{" "}
              <span className="text-ink-soft">
                <CircleHighlight>Read the room.</CircleHighlight>
              </span>
            </>
          }
          description="Every case starts as pinned scraps and pulled threads. Nothing is locked — drag the notes, the polaroids, the system readout. The method is physical before it is digital."
        />

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <SignalReveal
            message="THE SIGNAL IS BURIED — DRAG TO DECODE"
            className="text-xs tracking-[0.25em] text-signal"
          />
          <span className="mono-label text-ink-faint">
            read the room before you frame it.
          </span>
        </div>

        <div
          ref={boardRef}
          className="texture-paper-2 relative mt-12 min-h-[600px] overflow-hidden border-2 border-ink/15 shadow-window sm:min-h-[640px] lg:min-h-[660px]"
        >
          <div
            className="grid-lines-sm pointer-events-none absolute inset-0 opacity-20"
            aria-hidden
          />
          <Threads />

          <MotionConfig reducedMotion="user">
            <Draggable
              constraints={boardRef}
              rotate={-2}
              className="absolute left-[4%] top-[8%] cursor-grab active:cursor-grabbing"
            >
              <Polaroid rotation={0} pin caption="the room, unread — every pixel a rumor.">
                <ScoutSketch />
              </Polaroid>
            </Draggable>

            <Draggable
              constraints={boardRef}
              rotate={2}
              className="absolute right-[4%] top-[6%] cursor-grab active:cursor-grabbing"
            >
              <StickyNote tone="frame" rotation={0} className="w-56">
                <p className="mono-label text-[0.55rem] font-bold text-ink-soft">
                  OBSERVATION Nº 01
                </p>
                <p className="hand mt-1.5 text-xl leading-snug text-ink">
                  the frame is a decision. most brands never make it.
                </p>
              </StickyNote>
            </Draggable>

            <SystemConsole
              constraints={boardRef}
              rotation={-1}
              className="absolute left-[30%] top-[38%] cursor-grab"
              title="PERCEPTION READOUT"
              tag="CONSOLE /01"
              lines={[
                { label: "on-brand noise", value: "61%" },
                { label: "off-brand noise", value: "39%" },
                { label: "perceived intent", value: "weak" },
                { label: "recommended system", value: "FRAME" },
              ]}
            />

            <Draggable
              constraints={boardRef}
              rotate={1}
              className="absolute left-[6%] top-[56%] cursor-grab active:cursor-grabbing"
            >
              <Polaroid rotation={0} pin caption="after the frame — deliberate light.">
                <FramedWall />
              </Polaroid>
            </Draggable>

            <Draggable
              constraints={boardRef}
              rotate={-2}
              className="absolute bottom-[6%] right-[5%] cursor-grab active:cursor-grabbing"
            >
              <StickyNote tone="signal" rotation={0} className="w-56">
                <p className="mono-label text-[0.55rem] font-bold text-signal-deep">
                  SIGNAL FOUND
                </p>
                <p className="hand mt-1.5 text-xl leading-snug text-ink">
                  the brief contradicts the brand. flag it, frame it, fix it.
                </p>
              </StickyNote>
            </Draggable>
          </MotionConfig>
        </div>
      </div>
    </section>
  );
}

/* ── red thread network pinned across the board ────────────── */
function Threads() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 800 640"
      preserveAspectRatio="none"
    >
      <g fill="none" stroke="#e25c4f" strokeWidth="1.6" opacity="0.5">
        <path d="M120 170 C 220 190, 300 160, 410 240" strokeDasharray="5 4" />
        <path d="M410 240 C 500 310, 560 250, 660 200" strokeDasharray="5 4" />
        <path d="M660 200 C 640 320, 560 420, 470 420" strokeDasharray="5 4" />
        <path d="M120 170 C 110 320, 200 420, 300 460" strokeDasharray="5 4" />
        <path d="M660 200 C 700 380, 640 480, 580 500" strokeDasharray="5 4" />
      </g>
      <g fill="#e25c4f">
        <circle cx="120" cy="170" r="3.5" />
        <circle cx="410" cy="240" r="3.5" />
        <circle cx="660" cy="200" r="3.5" />
        <circle cx="470" cy="420" r="3.5" />
        <circle cx="300" cy="460" r="3.5" />
        <circle cx="580" cy="500" r="3.5" />
      </g>
    </svg>
  );
}

/* ── polaroid art: the room before reading ─────────────────── */
function ScoutSketch() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 200 150"
      preserveAspectRatio="none"
      aria-hidden
    >
      <rect width="200" height="150" fill="#e9e3d1" />
      <path d="M0 112 L 200 66" stroke="#7a7364" strokeWidth="1.4" strokeDasharray="6 4" />
      <path d="M36 96 C 78 58, 130 88, 178 46" stroke="#7a7364" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
      <rect x="96" y="78" width="22" height="18" fill="none" stroke="#7a7364" strokeWidth="1" strokeDasharray="4 3" />
      <path d="M30 34 l 3 7 l 7 3 l -7 3 l -3 7 l -3 -7 l -7 -3 l 7 -3 Z" stroke="#7a7364" strokeWidth="0.9" fill="none" />
      <path d="M158 110 h 30 M168 104 v 12" stroke="#7a7364" strokeWidth="1" />
      <circle cx="152" cy="40" r="3" fill="none" stroke="#7a7364" strokeWidth="1" />
      <path d="M120 128 Q 140 118 160 126" stroke="#7a7364" strokeWidth="1" fill="none" />
    </svg>
  );
}

/* ── polaroid art: the same room, lit & framed ─────────────── */
function FramedWall() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 200 150"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="fraym-board-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe9bd" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffe9bd" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#4d3622" />
      <polygon points="86,4 66,120 108,120" fill="url(#fraym-board-cone)" opacity="0.4" />
      <polygon points="122,4 102,120 144,120" fill="url(#fraym-board-cone)" opacity="0.3" />
      <rect x="70" y="30" width="60" height="48" fill="#8a5a2b" />
      <rect x="75" y="35" width="50" height="38" fill="#d3ab68" />
      <rect x="79" y="39" width="42" height="30" fill="#eccb93" />
      <path d="M79 66 Q 92 52 100 60 T 121 48 V 69 H 79 Z" fill="#7a4a2e" opacity="0.92" />
      <circle cx="94" cy="50" r="3.5" fill="#f2d64e" />
      <rect x="50" y="118" width="100" height="14" fill="#372512" />
      <path d="M60 106 h 20 v 12 h -20 Z" fill="#3a2510" />
    </svg>
  );
}
