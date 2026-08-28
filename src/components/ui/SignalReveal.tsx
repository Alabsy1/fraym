"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const NOISE_CHARS = "▓▒░█#@%&*+×÷/\\|<>~";

function randomNoise() {
  return NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)];
}

function noiseOf(message: string) {
  return message
    .split("")
    .map((ch) => (ch === " " ? " " : randomNoise()))
    .join("");
}

export function SignalReveal({
  message,
  as: Tag = "span",
  className,
  interval = 38,
  steps = 12,
}: {
  message: string;
  as?: "span" | "p";
  className?: string;
  interval?: number;
  steps?: number;
}) {
  const reduced = useReducedMotion();
  const [cleared, setCleared] = useState(false);
  const [text, setText] = useState(() => noiseOf(message));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => clearTimer, []);

  const startDecode = () => {
    if (cleared) return;
    if (reduced) {
      setText(message);
      setCleared(true);
      return;
    }
    clearTimer();
    let tick = 0;
    timerRef.current = setInterval(() => {
      tick++;
      const settled = Math.floor((tick / steps) * message.length);
      setText(
        message
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < settled) return ch;
            if (i === settled && Math.random() < 0.4) return ch;
            return randomNoise();
          })
          .join("")
      );
      if (tick >= steps) {
        clearTimer();
        setText(message);
        setCleared(true);
      }
    }, interval);
  };

  const resetNoise = () => {
    if (reduced) return;
    clearTimer();
    setText(noiseOf(message));
    setCleared(false);
  };

  return (
    <Tag
      aria-label={message}
      onPointerEnter={startDecode}
      onPointerLeave={resetNoise}
      onFocus={startDecode}
      onBlur={resetNoise}
      tabIndex={0}
      className={cn(
        "font-mono transition-[filter,opacity] duration-300",
        cleared ? "opacity-100 blur-0" : "opacity-75 blur-[1.5px]",
        className
      )}
    >
      {text}
    </Tag>
  );
}
