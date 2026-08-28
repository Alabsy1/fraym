"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const tones: Record<string, string> = {
  signal: "text-signal border-signal",
  tape: "text-tape border-tape",
  ink: "text-ink border-ink",
  moss: "text-moss border-moss",
  frame: "text-frame-deep border-frame-deep",
};

export function AnimatedStamp({
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
  const reduced = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      initial={
        reduced
          ? { opacity: 1, scale: 1, rotate: rotation }
          : { opacity: 0, scale: 2.4, rotate: rotation - 9 }
      }
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{ type: "spring", stiffness: 520, damping: 22, mass: 0.8 }}
      className={cn(
        "mono-label inline-block border-2 px-3 py-1 font-bold uppercase leading-none tracking-[0.22em]",
        tones[tone],
        className
      )}
    >
      {text}
    </motion.span>
  );
}
