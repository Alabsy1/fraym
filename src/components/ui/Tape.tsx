import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

export function Tape({
  color = "var(--color-tape)",
  rotation = -3,
  className,
  height = "h-6",
  width = "w-28",
}: {
  color?: string;
  rotation?: number;
  className?: string;
  height?: string;
  width?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("tape", height, width, className)}
      style={
        {
          "--tape-color": color,
          "--tape-rot": `${rotation}deg`,
        } as CSSProperties
      }
    />
  );
}
