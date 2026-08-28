import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

export function Stamp({
  text,
  tone = "signal",
  rotation = -8,
  className,
}: {
  text: string;
  tone?: "signal" | "tape" | "ink" | "moss" | "frame";
  rotation?: number;
  className?: string;
}) {
  const tones: Record<string, string> = {
    signal: "text-signal border-signal",
    tape: "text-tape border-tape",
    ink: "text-ink border-ink",
    moss: "text-moss border-moss",
    frame: "text-frame-deep border-frame-deep",
  };
  return (
    <span
      aria-hidden
      className={cn(
        "mono-label inline-block border-2 px-3 py-1 font-bold uppercase leading-none tracking-[0.22em]",
        tones[tone],
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` } as CSSProperties}
    >
      {text}
    </span>
  );
}
