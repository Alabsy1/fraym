import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { Tape } from "@/components/ui/Tape";

export function HeroEvidenceBoard() {
  return (
    <div className="relative isolate w-full pb-16 pt-4">
      {/* ── photo stack ── */}
      <div className="relative">
        {/* backing sheet */}
        <div
          className="absolute -inset-2 translate-x-2 translate-y-2 rotate-1 border border-ink/10 bg-paper-3 shadow-window"
          aria-hidden
        />

        {/* main framed photo */}
        <div
          className="relative rotate-[1.5deg] border-[9px] p-0.5 shadow-window"
          style={{
            borderColor: "#6d4a2a",
            background:
              "linear-gradient(135deg, #cdab6f 0%, #8a6234 55%, #6d4a2a 100%)",
          }}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-[#e6d8b8]">
            <img
              src="/1.png"
              alt="Gallery interior"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* glass / varnish */}
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(109,74,42,0.28)_100%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.38),transparent_34%,transparent_72%,rgba(255,255,255,0.12))]"
              aria-hidden
            />
          </div>
        </div>

        {/* top metallic paperclip */}
        <Paperclip className="absolute -top-5 left-1/2 z-20 -ml-3.5 animate-sheet-pop" />

        {/* top tape */}
        <Tape
          color="var(--color-tape)"
          rotation={-3}
          height="h-5"
          width="w-24"
          className="absolute -top-3 right-3 z-10 animate-tape"
        />
      </div>

      {/* evidence tag — locked to the base of the photo stack */}
      <div className="absolute bottom-0 left-1/2 z-10 w-[88%] -translate-x-1/2 -rotate-1">
        <EvidenceTag />
      </div>
    </div>
  );
}


/* ── realistic metallic paperclip ───────────────────────────── */
function Paperclip({ className }: { className?: string }) {
  const d =
    "M23 6 h10 a6 6 0 0 1 0 12 h-30 a12 12 0 0 0 0 24 h32 a15 15 0 0 1 0 30 h-24 a8 8 0 0 1 0 -16 h18";
  return (
    <svg
      aria-hidden
      viewBox="0 0 44 84"
      className={cn("h-20 w-9", className)}
      fill="none"
    >
      <defs>
        <linearGradient id="eb-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7f7f7" />
          <stop offset="45%" stopColor="#cdd1d6" />
          <stop offset="65%" stopColor="#9aa1aa" />
          <stop offset="100%" stopColor="#6b717a" />
        </linearGradient>
      </defs>
      {/* drop shadow */}
      <path
        d={d}
        stroke="#1f1c16"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.18"
        transform="translate(2 3)"
      />
      {/* body */}
      <path
        d={d}
        stroke="url(#eb-metal)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* specular highlight */}
      <path
        d={d}
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.5"
        transform="translate(-1.8 -1.6)"
      />
    </svg>
  );
}

/* ── yellow evidence tag with barcode ───────────────────────── */
function EvidenceTag() {
  return (
    <div className="border-2 border-frame-deep/60 bg-frame/25 px-3.5 py-2.5 shadow-window">
      <div className="flex items-center justify-between gap-3">
        <p className="mono-label text-[0.6rem] font-bold text-ink">
          EVIDENCE 01
        </p>
        <span className="size-2 rounded-full bg-frame-deep" />
      </div>
      <div className="mt-1.5 flex items-end justify-between gap-3">
        <Barcode />
        <p className="mono-label text-[0.5rem] leading-none text-ink-soft">
          FR-001-0825
        </p>
      </div>
    </div>
  );
}

function Barcode() {
  const bars = [2, 1, 3, 1, 1, 4, 2, 1, 3, 2, 1, 1, 2, 3, 1, 4, 1, 2, 1, 1, 3, 2, 2, 1];
  const heights = [14, 20, 10, 22, 16, 20];
  return (
    <div className="flex h-8 items-end gap-[2px]" aria-hidden>
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
