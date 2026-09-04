"use client";

import { useRef } from "react";
import { MotionConfig } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Draggable } from "@/components/ui/Draggable";
import { Polaroid } from "@/components/ui/Polaroid";
import { SignalReveal } from "@/components/ui/SignalReveal";
import { CircleHighlight } from "@/components/ui/FramedHighlight";

const boardImages: {
  src: string;
  caption: string;
  top: string;
  left: string;
  rotate: number;
  rotation: number;
}[] = [
  { src: "/board-1.png", caption: "coastal light study — raw capture.", top: "8%", left: "6%", rotate: -6, rotation: -6 },
  { src: "/board-2.png", caption: "frame decision — the room before reading.", top: "12%", left: "42%", rotate: 4, rotation: 4 },
  { src: "/board-3.png", caption: "exposure map — motion vectors detected.", top: "58%", left: "10%", rotate: 3, rotation: 3 },
  { src: "/board-4.png", caption: "deliberate light — after the frame.", top: "65%", left: "65%", rotate: -4, rotation: -4 },
  { src: "/board-5.png", caption: "scene context — pinned evidence.", top: "22%", left: "70%", rotate: 5, rotation: 5 },
  { src: "/board-6.png", caption: "planning board — coastal shoot layout.", top: "42%", left: "25%", rotate: -2, rotation: -2 },
];

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
          className="texture-paper-2 relative mt-12 h-[660px] overflow-hidden border-2 border-ink/15 shadow-window"
        >
          <div
            className="grid-lines-sm pointer-events-none absolute inset-0 opacity-20"
            aria-hidden
          />
          <Threads />

          <MotionConfig reducedMotion="user">
            {boardImages.map((img) => (
              <Draggable
                key={img.src}
                constraints={boardRef}
                rotate={img.rotate}
                dragElastic={0.1}
                className="z-10 cursor-grab active:cursor-grabbing"
                style={{ position: "absolute", top: img.top, left: img.left }}
                whileHover={{ scale: 1.08, rotate: 0, zIndex: 50, boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }}
              >
                <Polaroid rotation={img.rotation} pin caption={img.caption}>
                  <img
                    src={img.src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </Polaroid>
              </Draggable>
            ))}
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
