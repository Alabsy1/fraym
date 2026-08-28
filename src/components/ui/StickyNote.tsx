import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function StickyNote({
  children,
  rotation = -2,
  tone = "frame",
  className,
}: {
  children: ReactNode;
  rotation?: number;
  tone?: "frame" | "tape" | "signal" | "moss" | "bone";
  className?: string;
}) {
  const tones: Record<string, string> = {
    frame: "bg-frame/85",
    tape: "bg-tape/20",
    signal: "bg-signal/20",
    moss: "bg-moss/20",
    bone: "bg-paper-3",
  };
  return (
    <div
      className={cn(
        "shadow-stack px-4 py-3 border border-ink/10",
        tones[tone],
        className
      )}
      style={
        {
          "--float-rot": `${rotation}deg`,
          transform: `rotate(${rotation}deg)`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
