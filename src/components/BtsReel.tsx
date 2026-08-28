"use client";

import { useEffect, useState } from "react";
import { SystemWindow } from "./ui/SystemWindow";

const clips = [
  { n: "A01", label: "roofline — still life", tone: "from-frame/60 to-paper-2" },
  { n: "B03", label: "northlight — winter", tone: "from-tape/50 to-paper-2" },
  { n: "C07", label: "hemera — worn in", tone: "from-moss/50 to-paper-2" },
  { n: "D02", label: "kestrel — silence", tone: "from-plum to-terracotta/70" },
  { n: "E05", label: "verdant — appetite", tone: "from-terracotta/60 to-paper-2" },
  { n: "F01", label: "atlas — the human", tone: "from-signal/40 to-paper-2" },
];

export function BtsReel() {
  const [playing, setPlaying] = useState(false);
  const [clipIdx, setClipIdx] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setClipIdx((i) => (i + 1) % clips.length);
    }, 1400);
    return () => clearInterval(timer);
  }, [playing]);

  return (
    <SystemWindow title="FRAYM_BTS_REEL_2026.mov — 04:12">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink text-paper">
        <div className="grid-lines absolute inset-0 opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#00000066)]" />

        {playing ? (
          <div className="absolute inset-0">
            {clips.map((clip, i) => (
              <div
                key={clip.n}
                className={`absolute inset-0 bg-gradient-to-br ${clip.tone} ${i === clipIdx ? "animate-reel" : "hidden"}`}
              />
            ))}
            <div className="absolute left-5 top-5 flex items-center gap-2">
              <span className="size-2.5 animate-pulse-dot rounded-full bg-signal" />
              <span className="mono-label text-[0.65rem] text-white/80">REC</span>
            </div>
            <div className="mono-label absolute right-5 top-5 text-[0.65rem] text-white/80">
              TC 00:04:12:07 · clip {clips[clipIdx].n}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play behind-the-scenes reel"
              className="group flex size-20 items-center justify-center rounded-full border-2 border-white/60 bg-ink/40 backdrop-blur-sm transition-all hover:scale-105 hover:bg-signal"
            >
              <svg className="ml-1 size-8 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5.5v13l11-6.5-11-6.5z" />
              </svg>
            </button>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-5">
          {playing && (
            <div className="h-1 w-full origin-left bg-white/20">
              <div className="h-full w-full origin-left animate-progress bg-signal" />
            </div>
          )}
          <div className="mt-3 flex items-center justify-between">
            <p className="hand text-xl text-white/90">
              {playing ? "on set — directing the accident." : "press play — a compile of our favourite room-notes."}
            </p>
            <p className="mono-label text-[0.65rem] text-white/70">
              04:12 · cut by frame finishers
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto border-t border-ink/10 bg-ink px-3 py-3">
        {clips.map((clip, i) => (
          <button
            key={clip.n}
            type="button"
            onClick={() => {
              setClipIdx(i);
              setPlaying(true);
            }}
            aria-label={`Play clip ${clip.n} — ${clip.label}`}
            className={`relative shrink-0 border ${playing && i === clipIdx ? "border-signal" : "border-white/20"} transition-colors`}
          >
            <div className={`size-16 bg-gradient-to-br sm:size-20 ${clip.tone}`} />
            <div className="mono-label absolute left-1 top-1 bg-ink/70 px-1 text-[0.5rem] text-white/90">
              {clip.n}
            </div>
          </button>
        ))}
        <div className="ml-2 hidden shrink-0 items-center sm:flex">
          <p className="mono-label text-[0.6rem] text-white/60">
            filmstrip · {clips.length} clips · multiple shoots
          </p>
        </div>
      </div>
    </SystemWindow>
  );
}
