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

/* ── The same room, professionally framed: a lit gallery wall ── */
function MuseumLit() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* gallery wall */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,#4d3622 0%,#3a2718 62%,#2b1d11 100%)",
        }}
      />
      {/* plaster grain */}
      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,238,206,0.6) 1px, transparent 1px)",
          backgroundSize: "5px 5px",
        }}
      />
      {/* light track */}
      <div className="absolute inset-x-0 top-0 h-2 bg-[#191009]" />
      <div className="absolute inset-x-0 top-2 h-[3px] bg-[#7c5f3e]" />

      {/* museum spotlight cones */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 400 225"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="fraym-cone-warm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe9bd" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffe9bd" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="176,5 146,168 206,168" fill="url(#fraym-cone-warm)" opacity="0.4" />
        <polygon points="226,5 196,168 256,168" fill="url(#fraym-cone-warm)" opacity="0.3" />
      </svg>

      {/* the artwork — properly framed, straight */}
      <div className="absolute left-1/2 top-[10%] w-[54%] -translate-x-1/2 sm:w-[46%]">
        <div
          className="border-[8px] border-[#8a5a2b] p-[3px] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.75)]"
          style={{
            background:
              "linear-gradient(135deg,#d3ab68 0%,#8a5a2b 60%,#6d441d 100%)",
          }}
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-[#dcc9a2]">
            {/* dusk landscape painting */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#eccb93] via-[#c98f5a] to-[#7a5a44]" />
            <div className="absolute left-[30%] top-[36%] size-8 rounded-full bg-frame shadow-[0_0_26px_10px_rgba(242,182,22,0.45)]" />
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 200 150"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path d="M0 92 Q 40 60 90 78 T 200 66 V 150 H 0 Z" fill="#7a4a2e" opacity="0.92" />
              <path d="M0 110 Q 70 84 130 100 T 200 92 V 150 H 0 Z" fill="#5a3a26" opacity="0.92" />
              <path d="M0 122 Q 60 106 140 114 T 200 108 V 150 H 0 Z" fill="#3c2a1c" opacity="0.95" />
              <path d="M150 52 q -5 -14 0 -26 q 5 12 0 26 Z" fill="#3c2a1c" />
              <rect x="149" y="50" width="2.4" height="12" fill="#2c2015" />
            </svg>
            {/* inner frame shadow */}
            <div className="absolute inset-0 shadow-[inset_0_0_18px_rgba(60,42,28,0.5)]" />
          </div>
        </div>
        {/* gallery label plaque */}
        <div className="mx-auto mt-1.5 w-max bg-[#f4ecd9] px-2 py-0.5 shadow-stack">
          <p className="mono-label text-[0.5rem] text-[#3c3225]">
            FRAYM · STUDY OF A ROOM, 2026 · OIL ON CANVAS
          </p>
        </div>
      </div>

      {/* floor — polished timber */}
      <div className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-b from-[#6d4f2c] to-[#372512]" />
      <div
        className="absolute inset-x-0 bottom-0 h-[24%]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 42px, rgba(20,12,5,0.45) 42px 44px)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[24%] bg-[linear-gradient(180deg,rgba(255,233,189,0.16),transparent_45%)]" />

      {/* viewing bench */}
      <div className="absolute bottom-[3%] right-[6%] w-[24%]">
        <div className="h-2 bg-[#3a2510]" />
        <div className="flex justify-between px-[8%]">
          <span className="h-3 w-[6%] bg-[#3a2510]" />
          <span className="h-3 w-[6%] bg-[#3a2510]" />
        </div>
      </div>

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(12,8,4,0.55)_100%)]" />

      {/* caption chip */}
      <div className="absolute bottom-3 left-3 bg-[#191009]/90 px-2.5 py-1.5">
        <p className="mono-label text-[0.6rem] text-[#f2e2bd]">
          AFTER THE FRAME — gallery light
        </p>
      </div>
    </div>
  );
}

/* ── The same room before framing: unlit, unpolished, undecided ── */
function RawRoom() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* raw plaster wall */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#c6c0b0] to-[#9d9686]" />
      {/* construction grid */}
      <div className="grid-lines absolute inset-0 opacity-50" />
      {/* stud markings */}
      <div className="absolute left-[12%] top-[20%] size-3 rounded-full border border-[#7a7364]" />
      <div className="absolute right-[14%] top-[32%] h-2 w-8 bg-[#b5ae9e]" />

      {/* the canvas — crooked, unframed, sketched */}
      <div
        className="absolute left-1/2 top-[10%] w-[56%] sm:w-[48%]"
        style={{ transform: "translateX(-50%) rotate(-4deg)" }}
      >
        <div className="border-[3px] border-[#6a6455] bg-[#ece6d3] p-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#d8d2be]">
            {/* pencil sketch */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 200 150"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path d="M10 120 L 190 54" stroke="#5b564a" strokeWidth="1" strokeDasharray="6 4" />
              <path d="M40 98 C 80 60, 130 86, 180 40" stroke="#5b564a" strokeWidth="1" fill="none" strokeDasharray="3 3" />
              <path d="M122 30 L 122 76 M106 53 L 138 53" stroke="#5b564a" strokeWidth="1" />
              <path d="M28 42 l 4 8 l 8 4 l -8 4 l -4 8 l -4 -8 l -8 -4 l 8 -4 Z" stroke="#5b564a" strokeWidth="0.8" fill="none" />
            </svg>
          </div>
        </div>
      </div>

      {/* pencil cross on wall */}
      <span className="hand absolute left-[56%] top-[6%] text-2xl text-[#5b564a]">×</span>

      {/* ladder */}
      <svg
        className="absolute bottom-[4%] left-[6%] h-[34%] w-[15%] text-[#8a8271]"
        viewBox="0 0 40 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        aria-hidden
      >
        <path d="M6 4 L 2 96 M 34 4 L 38 96" />
        <path d="M5 22 H 35 M 6 40 H 36 M 7 58 H 37 M 8 76 H 38" />
      </svg>

      {/* paint can */}
      <div className="absolute bottom-[6%] left-[27%]">
        <div className="h-8 w-7 rounded-sm border border-[#6a6455] bg-[#a8a08e]" />
        <div className="mx-auto -mt-1 h-1.5 w-5 bg-[#4a463c]" />
        <p className="mono-label mt-1 text-[0.45rem] text-[#6a6455]">#221</p>
      </div>

      {/* drop cloth */}
      <div
        className="absolute bottom-0 right-[4%] h-[12%] w-[38%] bg-[#d9d3c2] opacity-80"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(122,114,97,0.5) 0 2px, transparent 2px 9px)",
        }}
      />

      {/* bare bulb, unlit */}
      <div className="absolute left-[40%] top-0">
        <div className="mx-auto h-3 w-px bg-[#4a463c]" />
        <div className="size-4 rounded-full border border-[#7a7364] bg-[#d8d2be]" />
        <div className="mx-auto -mt-2 size-6 rounded-full bg-[#f7e9c4] opacity-30 blur-[3px]" />
      </div>

      {/* dim, unlit wash */}
      <div className="absolute inset-0 bg-[#2c2821] opacity-[0.3] mix-blend-multiply" />

      {/* caption chip */}
      <div className="absolute bottom-3 left-3 bg-[#4a463c]/90 px-2.5 py-1.5">
        <p className="mono-label text-[0.6rem] text-[#efe9d8]">
          BEFORE THE FRAME — unlit, undecided
        </p>
      </div>
    </div>
  );
}
