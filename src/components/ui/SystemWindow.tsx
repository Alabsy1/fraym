import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SystemWindow({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border border-ink/25 bg-paper shadow-window", className)}>
      <div className="flex items-center gap-3 border-b border-ink/15 bg-ink/5 px-3 py-2">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-signal" />
          <span className="size-2 rounded-full bg-frame" />
          <span className="size-2 rounded-full bg-moss" />
        </div>
        <p className="mono-label min-w-0 flex-1 truncate text-center text-[0.6rem] font-bold text-ink">
          {title}
        </p>
        <span
          aria-hidden
          className="mono-label text-[0.6rem] text-ink-faint"
        >
          ×
        </span>
      </div>
      {children}
    </div>
  );
}
