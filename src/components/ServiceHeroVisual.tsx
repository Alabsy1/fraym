"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Service } from "@/lib/data";
import { softBg } from "@/lib/color";
import { Tape } from "@/components/ui/Tape";
import { Stamp } from "@/components/ui/Stamp";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ServiceHeroVisual({ service }: { service: Service }) {
  switch (service.slug) {
    case "frame":
      return <FrameHero />;
    case "direct":
      return <DirectHero />;
    case "signal":
      return <SignalHero />;
    case "full-frame":
      return <FullFrameHero />;
    default:
      return null;
  }
}

/* ── Shared analog board shell ───────────────────────────── */
function HeroShell({
  color,
  children,
}: {
  color: Service["color"];
  children: ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden border border-ink/15 shadow-window ${softBg(
        color
      )}`}
    >
      <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
      <div className="texture-paper-2 absolute inset-0 opacity-50" aria-hidden />
      <div className="relative aspect-[4/3] w-full">{children}</div>
    </div>
  );
}

/* ── FRAME · still-life framing, museum light, composition ── */
function FrameHero() {
  const reduced = useReducedMotion();
  return (
    <HeroShell color="frame">
      {/* museum spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_48%_at_28%_0%,rgba(242,214,78,0.3),transparent_65%)]" />

      {/* rule-of-thirds grid */}
      <div aria-hidden className="absolute inset-0 opacity-70">
        <span className="absolute inset-y-0 left-1/3 w-px bg-ink/20" />
        <span className="absolute inset-y-0 left-2/3 w-px bg-ink/20" />
        <span className="absolute inset-x-0 top-1/3 h-px bg-ink/20" />
        <span className="absolute inset-x-0 top-2/3 h-px bg-ink/20" />
      </div>

      {/* framed still-life — subtle zoom-in + scanning light sweep */}
      <motion.div
        className="absolute left-[6%] top-[10%] h-[72%] w-[50%]"
        style={{ rotate: -1.5 }}
        initial={{ scale: 0.96, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{
          scale: 1.04,
          transition: { duration: 0.3, ease: EASE },
        }}
        transition={{ duration: reduced ? 0 : 0.9, ease: EASE, delay: 0.15 }}
      >
        <div
          className="h-full w-full rounded-[2px] border-[10px] p-0.5 shadow-window"
          style={{
            borderColor: "#8a6234",
            background:
              "linear-gradient(135deg, #cdab6f 0%, #8a6234 55%, #6d4a2a 100%)",
          }}
        >
          <div className="relative h-full w-full overflow-hidden bg-[#e6d8b8]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#ece0c2] via-[#cdbf93] to-[#94a76c]" />
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 200 150"
              preserveAspectRatio="none"
              aria-hidden
            >
              <rect x="66" y="104" width="68" height="16" fill="#5b3a5c" opacity="0.8" />
              <path
                d="M84 104 q -16 -34 0 -66 q 14 30 32 66 Z"
                fill="#b9613e"
                opacity="0.88"
              />
              <path
                d="M74 42 q -12 -8 2 -18 q 14 8 2 18 Z"
                fill="#b9613e"
                opacity="0.72"
              />
              <motion.rect
                x="3"
                y="3"
                width="194"
                height="144"
                fill="none"
                stroke="#f2d64e"
                strokeWidth="2"
                strokeDasharray="10 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{
                  duration: reduced ? 0 : 3.2,
                  times: [0, 0.35, 0.65, 1],
                  repeat: reduced ? 0 : Infinity,
                  ease: "linear",
                }}
              />
            </svg>
            {/* scanning light sweep */}
            <motion.div
              aria-hidden
              className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              initial={{ x: "-160%" }}
              animate={{ x: "560%" }}
              transition={{
                duration: reduced ? 0 : 1.6,
                repeat: reduced ? 0 : Infinity,
                repeatDelay: 1.4,
                ease: "easeInOut",
              }}
            />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 border border-[#6d4a2a]/40 bg-[#e9dcbb]/90 px-2 py-0.5">
              <p className="mono-label text-[0.5rem] text-[#4a3a22]">
                STILL LIFE Nº 04 — VERMEER
              </p>
            </div>
          </div>
        </div>
        <Tape
          color="var(--color-frame)"
          rotation={-2}
          className="absolute -top-2 left-1/2 -translate-x-1/2"
        />
      </motion.div>

      {/* camera data chip */}
      <div className="absolute right-[5%] top-[8%] rotate-1 border border-ink/15 bg-paper px-2 py-1.5 shadow-stack">
        <p className="mono-label text-[0.5rem] leading-tight text-ink-soft">
          ISO 100 · f/2.8
          <br />
          1/125s · 35mm
        </p>
      </div>

      {/* viewfinder corner brackets */}
      <div aria-hidden className="absolute left-[40%] top-[7%] h-14 w-20 opacity-80">
        <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-frame-deep" />
        <span className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-frame-deep" />
        <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-frame-deep" />
        <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-frame-deep" />
      </div>

      {/* composition sheet */}
      <div className="absolute bottom-[7%] right-[5%] w-[38%] rotate-2 bg-paper p-3 shadow-paper">
        <p className="mono-label text-[0.55rem] text-ink-faint">
          COMPOSITION SHEET
        </p>
        <div className="relative mt-2 h-14 overflow-hidden border border-ink/10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#f4eddf_25%,transparent_25%,transparent_75%,#f4eddf_75%)] bg-[length:12px_12px] opacity-60" />
          <div className="absolute left-1/2 top-1/2 h-[70%] w-[46%] -translate-x-1/2 -translate-y-1/2 rotate-6 rounded-t-full bg-ink/30" />
          <span className="absolute inset-y-0 left-1/2 w-px bg-signal/50" />
          <span className="absolute inset-x-0 top-1/2 h-px bg-signal/50" />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="mono-label text-[0.5rem] text-ink-soft">
            RULE OF THIRDS
          </span>
          <span className="mono-label text-[0.5rem] font-bold text-frame-deep">
            A+
          </span>
        </div>
      </div>

      <Stamp
        text="FRAMED"
        tone="frame"
        rotation={-6}
        className="absolute left-[42%] top-[8%] opacity-90"
      />
    </HeroShell>
  );
}

/* ── DIRECT · filmstrip, clapperboard, camera angles ──────── */
function DirectHero() {
  const reduced = useReducedMotion();
  return (
    <HeroShell color="tape">
      {/* filmstrip — milestone frames light up sequentially */}
      <div className="absolute inset-x-[6%] top-[9%] flex gap-1.5 rounded-sm border border-ink/25 bg-paper-3 p-2 shadow-window">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="relative aspect-video flex-1 overflow-hidden border border-ink/20 bg-ink/5"
            initial={{ opacity: 0.4, scale: 1.07, borderColor: "#1f1c1640" }}
            animate={{ opacity: 1, scale: 1, borderColor: "#1f1c16" }}
            whileHover={{ scale: 1.06 }}
            transition={{
              duration: reduced ? 0 : 0.3,
              delay: reduced ? 0 : 0.12 + i * 0.12,
              ease: EASE,
            }}
          >
            <svg
              className="h-full w-full"
              viewBox="0 0 40 24"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden
            >
              <rect
                x="3"
                y="3"
                width="6"
                height="18"
                fill="none"
                stroke="#1f1c16"
                strokeOpacity="0.2"
                strokeWidth="1"
              />
              <g transform={`translate(${i * 4} 0)`} opacity={0.55 + i * 0.08}>
                <circle cx="15" cy="7" r="3.4" fill="#5a729b" />
                <path
                  d="M13 12 L10 21 M13 12 L15 17 L17 21 M12 14 L16 14"
                  fill="none"
                  stroke="#5a729b"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </motion.div>
        ))}
      </div>

      {/* clapperboard */}
      <div className="absolute bottom-[8%] left-[6%] w-[38%] -rotate-3 shadow-window">
        <div className="bg-ink px-2 py-1">
          <div className="flex h-2.5 overflow-hidden">
            <span className="flex-1 bg-tape" />
            <span className="flex-1 bg-paper-2" />
            <span className="flex-1 bg-tape" />
            <span className="flex-1 bg-paper-2" />
          </div>
        </div>
        <div className="flex bg-ink text-paper">
          <div className="flex-1 px-2 py-1.5 font-mono text-[0.5rem] leading-tight">
            <p>DIRECTOR</p>
            <p>FRAYM</p>
          </div>
          <div className="w-px bg-paper/30" />
          <div className="flex-1 px-2 py-1.5 font-mono text-[0.5rem] leading-tight text-paper/80">
            <p>SCENE 04</p>
            <p>TAKE 02</p>
          </div>
        </div>
      </div>

      {/* shot diagram */}
      <div className="absolute right-[6%] top-[20%] w-[30%] rotate-2 bg-paper p-2 shadow-stack">
        <p className="mono-label text-[0.5rem] text-ink-faint">
          SHOT DIAGRAM — TOP
        </p>
        <svg viewBox="0 0 80 56" className="mt-1 w-full" aria-hidden>
          <circle cx="40" cy="28" r="6" fill="none" stroke="#1f1c16" strokeWidth="1.2" />
          <g transform="rotate(-28 40 28) translate(0 -24)">
            <rect x="-4" y="-5" width="8" height="9" fill="#5a729b" />
            <path d="M0 -5 V -11" stroke="#5a729b" strokeWidth="1.2" />
          </g>
          <path
            d="M40 28 L 20 6 M40 28 L 60 6"
            stroke="#1f1c16"
            strokeOpacity="0.4"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />
          <text
            x="34"
            y="10"
            fontSize="6"
            fill="#1f1c16"
            opacity="0.6"
            fontFamily="ui-monospace, monospace"
          >
            25°
          </text>
        </svg>
        <p className="mono-label mt-1 text-[0.5rem] text-ink-soft">
          CAM A · dolly
        </p>
      </div>

      {/* reel + fps */}
      <div className="absolute bottom-[8%] right-[6%] flex rotate-1 items-center gap-2">
        <div className="relative size-12">
          <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#1f1c16"
              strokeOpacity="0.35"
              strokeWidth="2"
            />
            <circle cx="24" cy="24" r="8" fill="#1f1c16" opacity="0.7" />
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={i}
                x1="24"
                y1="4"
                x2="24"
                y2="8"
                stroke="#1f1c16"
                strokeOpacity="0.4"
                strokeWidth="1.4"
                transform={`rotate(${i * 45} 24 24)`}
              />
            ))}
          </svg>
          <span className="absolute inset-0 grid place-items-center font-mono text-[0.5rem] font-bold text-paper">
            25
          </span>
        </div>
        <div>
          <p className="mono-label text-[0.5rem] text-ink-soft">FPS</p>
          <p className="mono-label text-[0.5rem] font-bold text-tape">ROLLING</p>
        </div>
      </div>

      <Stamp
        text="DIRECTED"
        tone="tape"
        rotation={-6}
        className="absolute left-[42%] top-[16%] opacity-90"
      />
    </HeroShell>
  );
}

/* ── SIGNAL · observation lines, frequency, radar markers ─── */
function SignalHero() {
  const reduced = useReducedMotion();
  return (
    <HeroShell color="signal">
      {/* main chart board */}
      <div className="absolute left-[6%] top-[10%] w-[56%] -rotate-[1deg] border border-ink/15 bg-paper-3 p-3 shadow-window">
        <div className="flex items-center justify-between">
          <p className="mono-label text-[0.5rem] text-ink-faint">
            ROOM READ — WEEK 04
          </p>
          <p className="mono-label text-[0.5rem] font-bold text-signal">▲ 22%</p>
        </div>
        <svg viewBox="0 0 200 110" className="mt-1 w-full" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              x2="200"
              y1={8 + i * 22}
              y2={8 + i * 22}
              stroke="#1f1c1622"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          ))}
          <path
            d="M0 60 Q 10 40 20 60 T 40 60 T 60 60 T 80 60"
            fill="none"
            stroke="#5a729b"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          <path
            d="M120 80 Q 130 60 140 80 T 160 80 T 180 80 T 200 80"
            fill="none"
            stroke="#5a729b"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          <motion.polyline
            points="10,92 50,70 90,78 130,50 190,28"
            fill="none"
            stroke="#e25c4f"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: reduced ? 0 : 0.9,
              ease: "easeInOut",
              delay: reduced ? 0 : 0.2,
            }}
          />
          {[
            [10, 92],
            [50, 70],
            [90, 78],
            [130, 50],
            [190, 28],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 4 ? 4 : 3} fill="#e25c4f" />
          ))}
        </svg>
        <div className="mt-1 flex justify-between">
          <span className="mono-label text-[0.5rem] text-ink-soft">
            NOISE FILTERED
          </span>
          <span className="mono-label text-[0.5rem] text-ink-soft">
            SIGNAL · 0.94
          </span>
        </div>
      </div>

      {/* radar dial */}
      <div className="absolute bottom-[8%] right-[6%] w-[34%] rotate-2 border border-ink/15 bg-paper p-2.5 shadow-stack">
        <p className="mono-label text-[0.5rem] text-ink-faint">
          CATEGORY RADAR
        </p>
        <svg viewBox="0 0 100 100" className="mt-1 w-full" aria-hidden>
          <polygon
            points="50,8 88,35 78,78 22,78 12,35"
            fill="none"
            stroke="#1f1c16"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
          <polygon
            points="50,14 82,38 73,72 27,72 18,38"
            fill="none"
            stroke="#1f1c16"
            strokeOpacity="0.25"
            strokeWidth="1"
          />
          <polygon
            points="50,22 74,42 66,64 34,64 26,42"
            fill="none"
            stroke="#e25c4f"
            strokeOpacity="0.6"
            strokeWidth="1.4"
          />
          <polygon
            points="50,24 70,40 62,58 40,60 34,42"
            fill="#e25c4f"
            fillOpacity="0.18"
          />
          <circle cx="50" cy="40" r="2.5" fill="#e25c4f" />
          <motion.g
            initial={{ rotate: 0, opacity: 0.8 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: reduced ? 0 : 2.6,
              repeat: reduced ? 0 : Infinity,
              ease: "linear",
            }}
            style={{ originX: "50%", originY: "40%" }}
          >
            <line
              x1="50"
              y1="40"
              x2="50"
              y2="8"
              stroke="#e25c4f"
              strokeWidth="1.4"
              strokeOpacity="0.7"
            />
          </motion.g>
          <text
            x="50"
            y="95"
            textAnchor="middle"
            fontSize="7"
            fill="#1f1c16"
            opacity="0.5"
            fontFamily="ui-monospace, monospace"
          >
            PERCEPTION
          </text>
        </svg>
      </div>

      {/* signal markers */}
      <div className="absolute right-[6%] top-[10%] flex flex-col items-end gap-1.5">
        <div className="flex items-center gap-1.5 bg-paper px-2 py-1 shadow-stack">
          <span className="size-1.5 animate-pulse-dot rounded-full bg-signal" />
          <span className="mono-label text-[0.5rem] text-ink-soft">MARK 01</span>
        </div>
        <div className="flex items-center gap-1.5 bg-paper px-2 py-1 shadow-stack">
          <span
            className="size-1.5 animate-pulse-dot rounded-full bg-signal"
            style={{ animationDelay: "0.4s" }}
          />
          <span className="mono-label text-[0.5rem] text-ink-soft">MARK 02</span>
        </div>
      </div>

      {/* eye + note */}
      <svg
        className="absolute left-[66%] top-[13%] h-7 w-12 text-ink"
        viewBox="0 0 48 30"
        aria-hidden
      >
        <path
          d="M4 15 C 12 5, 36 5, 44 15 C 36 25, 12 25, 4 15 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.8"
        />
        <circle cx="24" cy="15" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      <p className="hand absolute left-[66%] top-[24%] text-lg text-ink-soft">
        read twice.
      </p>

      <Stamp
        text="OBSERVED"
        tone="signal"
        rotation={-6}
        className="absolute left-[42%] top-[8%] opacity-90"
      />
    </HeroShell>
  );
}

/* ── FULL FRAME · multi-layer perception architecture ─────── */
function FullFrameHero() {
  const layerTabs = [
    { label: "OBS", cls: "bg-signal text-white" },
    { label: "DIR", cls: "bg-tape text-white" },
    { label: "FRM", cls: "bg-frame text-ink" },
    { label: "SHP", cls: "bg-moss text-white" },
  ];
  return (
    <HeroShell color="moss">
      {/* blueprint title */}
      <div className="absolute left-[6%] top-[7%] -rotate-1 border-2 border-moss/50 bg-paper px-3 py-1.5 shadow-stack">
        <p className="mono-label text-[0.6rem] font-bold text-moss-deep">
          PERCEPTION ARCHITECTURE · CASE MAP
        </p>
      </div>

      {/* dashed connectors */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M150 132 L 170 138" stroke="#1f1c16" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="4 3" />
        <path d="M172 198 L 200 204" stroke="#1f1c16" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="4 3" />
        <path d="M220 264 L 280 150" stroke="#1f1c16" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="4 3" />
      </svg>

      {/* layer 1 · signal */}
      <motion.div
        className="absolute left-[8%] top-[24%] w-[46%] border border-ink/20 bg-paper p-2.5 shadow-stack"
        style={{ rotate: -3 }}
        whileHover={{ scale: 1.03 }}
      >
        <div className="flex items-center justify-between">
          <span className="mono-label text-[0.5rem] font-bold text-signal">
            01 · SIGNAL
          </span>
          <span className="size-1.5 rounded-full bg-signal" />
        </div>
        <p className="mt-1 text-[0.6rem] leading-tight text-ink-soft">
          the room is read. the pattern is named.
        </p>
        <div className="mt-1.5 flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1 flex-1 bg-signal/40" />
          ))}
        </div>
      </motion.div>

      {/* layer 2 · direct */}
      <motion.div
        className="absolute left-[26%] top-[46%] w-[46%] border border-ink/20 bg-paper p-2.5 shadow-stack"
        style={{ rotate: 1 }}
        whileHover={{ scale: 1.03 }}
      >
        <div className="flex items-center justify-between">
          <span className="mono-label text-[0.5rem] font-bold text-tape">
            02 · DIRECT
          </span>
          <span className="size-1.5 rounded-full bg-tape" />
        </div>
        <p className="mt-1 text-[0.6rem] leading-tight text-ink-soft">
          the story gets a spine, a cast, a plan.
        </p>
        <div className="mt-1.5 flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1 flex-1 bg-tape/40" />
          ))}
        </div>
      </motion.div>

      {/* layer 3 · frame */}
      <motion.div
        className="absolute left-[42%] top-[68%] w-[46%] border border-ink/20 bg-paper p-2.5 shadow-stack"
        style={{ rotate: 2 }}
        whileHover={{ scale: 1.03 }}
      >
        <div className="flex items-center justify-between">
          <span className="mono-label text-[0.5rem] font-bold text-frame-deep">
            03 · FRAME
          </span>
          <span className="size-1.5 rounded-full bg-frame" />
        </div>
        <p className="mt-1 text-[0.6rem] leading-tight text-ink-soft">
          what the world is allowed to see, decided.
        </p>
        <div className="mt-1.5 flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1 flex-1 bg-frame/40" />
          ))}
        </div>
      </motion.div>

      {/* final node */}
      <motion.div
        className="absolute right-[6%] top-[42%] w-[30%] border-2 border-moss/60 bg-moss/10 p-2.5 text-center shadow-window"
        style={{ rotate: -2 }}
        whileHover={{ scale: 1.05 }}
      >
        <p className="mono-label text-[0.55rem] font-bold text-moss-deep">
          04 · SHIPPED
        </p>
        <p className="mono-label mt-1 text-[0.45rem] text-ink-soft">
          ONE FILE · ONE VOICE
        </p>
      </motion.div>

      {/* layer tabs */}
      <div className="absolute bottom-[7%] left-[6%] flex flex-col gap-1">
        {layerTabs.map((t, i) => (
          <span
            key={t.label}
            className={`mono-label px-1.5 py-0.5 text-[0.5rem] font-bold ${t.cls}`}
            style={{ marginLeft: `${i * 6}px` }}
          >
            {t.label}
          </span>
        ))}
      </div>

      <Stamp
        text="SIGNED OFF"
        tone="moss"
        rotation={-4}
        className="absolute right-[8%] top-[10%] opacity-90"
      />
    </HeroShell>
  );
}
