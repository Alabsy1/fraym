"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const CIRCLE_PATH =
  "M5 24 C 7 11, 26 4, 60 5 C 93 6, 115 12, 115 24 C 115 36, 89 43, 60 42 C 31 41, 7 34, 5 24 Z";
const UNDERLINE_PATH =
  "M2 8 C 22 3, 42 9, 62 5 C 82 2, 102 8, 118 5";

/* ── Red hand-drawn circle around a key term ─────────────── */
export function CircleHighlight({
  children,
  className,
  color = "#e25c4f",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className={cn("relative inline-block", className)}
      initial={reduced ? "hover" : "idle"}
      whileHover="hover"
    >
      {children}
      <svg
        aria-hidden
        className="pointer-events-none absolute -inset-x-2 -inset-y-1 h-auto w-[calc(100%+1rem)]"
        viewBox="0 0 120 48"
        fill="none"
        preserveAspectRatio="none"
      >
        <motion.path
          d={CIRCLE_PATH}
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          variants={{ idle: { pathLength: 0 }, hover: { pathLength: 1 } }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      </svg>
    </motion.span>
  );
}

/* ── Rough red ink underline on hover ────────────────────── */
export function InkUnderline({
  children,
  className,
  color = "#e25c4f",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className={cn("relative inline-block", className)}
      initial={reduced ? "hover" : "idle"}
      whileHover="hover"
    >
      {children}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-[0.18em] h-[0.26em] w-full"
        viewBox="0 0 120 12"
        fill="none"
        preserveAspectRatio="none"
      >
        <motion.path
          d={UNDERLINE_PATH}
          stroke={color}
          strokeWidth="3.4"
          strokeLinecap="round"
          variants={{ idle: { pathLength: 0 }, hover: { pathLength: 1 } }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </svg>
    </motion.span>
  );
}
