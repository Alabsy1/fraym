"use client";

import { useCallback, useRef, useState } from "react";

export function BeforeAfter({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, next)));
  }, []);

  return (
    <div className={className}>
      <div
        ref={containerRef}
        onPointerDown={(e) => {
          setDragging(true);
          updateFromClientX(e.clientX);
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (dragging) updateFromClientX(e.clientX);
        }}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
        className="relative aspect-[4/3] w-full cursor-ew-resize touch-none select-none overflow-hidden border border-ink/15 bg-ink shadow-window sm:aspect-[16/9]"
        role="slider"
        aria-label="Drag to compare the same room before and after the frame"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPosition((p) => Math.max(4, p - 4));
          if (e.key === "ArrowRight") setPosition((p) => Math.min(96, p + 4));
        }}
      >
        {/* ── FRAMED — the gallery, lit & decided ── */}
        <MuseumLit />

        {/* ── RAW — the same room, unlit & undecided (clipped) ── */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <RawRoom />
        </div>

        {/* ── Handle ── */}
        <div
          className="absolute inset-y-0 z-10"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute inset-y-0 -left-px w-0.5 bg-ink/70" />
          <div
            className={`absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-paper shadow-window transition-transform ${dragging ? "scale-110" : ""}`}
            style={{ width: 44, height: 44 }}
          >
            <svg className="size-5 text-ink" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── The after image (right side) ── */
function MuseumLit() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src="/right.png"
        alt="After framing"
        className="h-full w-full object-cover"
      />
      {/* caption chip */}
      <div className="absolute bottom-3 left-3 bg-[#191009]/90 px-2.5 py-1.5">
        <p className="mono-label text-[0.6rem] text-[#f2e2bd]">
          AFTER THE FRAME — gallery light
        </p>
      </div>
    </div>
  );
}

/* ── The before image (left side, clipped) ── */
function RawRoom() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src="/left-new.png"
        alt="Before framing"
        className="h-full w-full object-cover"
      />
      {/* caption chip */}
      <div className="absolute bottom-3 left-3 bg-[#4a463c]/90 px-2.5 py-1.5">
        <p className="mono-label text-[0.6rem] text-[#efe9d8]">
          BEFORE THE FRAME — unlit, undecided
        </p>
      </div>
    </div>
  );
}
