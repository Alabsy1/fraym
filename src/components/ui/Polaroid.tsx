import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Tape } from "./Tape";

export function Polaroid({
  children,
  caption,
  rotation = -2,
  pin = false,
  className,
}: {
  children: ReactNode;
  caption?: ReactNode;
  rotation?: number;
  pin?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-52 bg-[#fdfaf1] p-2.5 pb-3 shadow-window",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {pin ? <PushPin /> : null}
      <Tape
        rotation={0}
        className="absolute -top-3 left-1/2 z-10 -translate-x-1/2"
      />
      <div className="relative aspect-[4/3] overflow-hidden border border-ink/10 bg-paper-2">
        {children}
      </div>
      {caption ? (
        <p className="hand mt-2 text-center text-lg leading-tight text-ink-soft">
          {caption}
        </p>
      ) : null}
    </div>
  );
}

function PushPin() {
  return (
    <span
      aria-hidden
      className="absolute -top-2 left-1/2 z-20 size-4 -translate-x-1/2 rounded-full bg-signal shadow-[inset_0_1px_1px_#ffffff55,0_2px_4px_#1f1c1644]"
    />
  );
}
