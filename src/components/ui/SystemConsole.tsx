"use client";

import type { CSSProperties, ReactNode } from "react";
import { Draggable, type DragRef } from "./Draggable";

export function SystemConsole({
  title,
  tag,
  lines,
  constraints,
  defaultX = 0,
  defaultY = 0,
  rotation = 0,
  className,
  style,
}: {
  title: string;
  tag?: string;
  lines: { label: string; value: ReactNode }[];
  constraints?: DragRef;
  defaultX?: number;
  defaultY?: number;
  rotation?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Draggable
      constraints={constraints}
      defaultX={defaultX}
      defaultY={defaultY}
      rotate={rotation}
      handle
      className={className}
      style={style}
    >
      {({ onPointerDown }) => (
        <div className="w-64 border border-ink/25 bg-paper/95 shadow-window backdrop-blur-[1px]">
          <div
            onPointerDown={onPointerDown}
            className="flex cursor-grab items-center justify-between gap-3 border-b border-ink/15 bg-ink/5 px-3 py-2 active:cursor-grabbing"
            role="presentation"
          >
            <div className="flex items-center gap-1.5" aria-hidden>
              <span className="size-2 rounded-full bg-signal" />
              <span className="size-2 rounded-full bg-frame" />
              <span className="size-2 rounded-full bg-moss" />
            </div>
            <p className="mono-label text-[0.6rem] font-bold text-ink">
              {title}
            </p>
            {tag ? (
              <span className="mono-label text-[0.5rem] text-ink-faint">
                {tag}
              </span>
            ) : null}
          </div>
          <div className="grid gap-1.5 p-3">
            {lines.map((l) => (
              <div
                key={l.label}
                className="flex items-baseline justify-between gap-3 border-b border-dashed border-ink/10 pb-1 font-mono text-[0.68rem] text-ink-soft last:border-0 last:pb-0"
              >
                <span>{l.label}</span>
                <span className="font-bold text-ink">{l.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Draggable>
  );
}
