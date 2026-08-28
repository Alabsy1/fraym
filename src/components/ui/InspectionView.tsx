"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/cn";

export function InspectionView({
  children,
  label = "INSPECT",
  lensSize = 132,
  zoom = 1.8,
  className,
}: {
  children: React.ReactNode;
  label?: string;
  lensSize?: number;
  zoom?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hovering, setHovering] = useState(false);
  const reduced = useReducedMotion();

  const cursorX = useMotionValue(-9999);
  const cursorY = useMotionValue(-9999);
  const lensX = useSpring(cursorX, { stiffness: 420, damping: 40, mass: 0.6 });
  const lensY = useSpring(cursorY, { stiffness: 420, damping: 40, mass: 0.6 });
  const originX = useMotionValue("0%");
  const originY = useMotionValue("0%");
  const origin = useMotionTemplate`${originX} ${originY}`;

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    cursorX.set(cx);
    cursorY.set(cy);
    originX.set(`${(cx / rect.width) * 100}%`);
    originY.set(`${(cy / rect.height) * 100}%`);
  };

  const hide = () => {
    setHovering(false);
    cursorX.set(-9999);
    cursorY.set(-9999);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={hide}
      className={cn("relative overflow-hidden", className)}
    >
      {children}

      {/* scan grid */}
      <div
        aria-hidden
        className={cn(
          "grid-lines pointer-events-none absolute inset-0 transition-opacity duration-300",
          hovering ? "opacity-35" : "opacity-0"
        )}
      />

      {/* crosshair + corner ticks */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-10">
        <motion.div
          className="absolute inset-y-0 w-px bg-signal/60"
          style={{ left: lensX }}
        />
        <motion.div
          className="absolute inset-x-0 h-px bg-signal/60"
          style={{ top: lensY }}
        />
        <span
          className={cn(
            "absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 border-signal transition-opacity duration-300",
            hovering ? "opacity-100" : "opacity-0"
          )}
        />
        <span
          className={cn(
            "absolute right-2 top-2 h-3 w-3 border-r-2 border-t-2 border-signal transition-opacity duration-300",
            hovering ? "opacity-100" : "opacity-0"
          )}
        />
        <span
          className={cn(
            "absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-signal transition-opacity duration-300",
            hovering ? "opacity-100" : "opacity-0"
          )}
        />
        <span
          className={cn(
            "absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-signal transition-opacity duration-300",
            hovering ? "opacity-100" : "opacity-0"
          )}
        />
      </motion.div>

      {/* magnifying lens */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-20 overflow-hidden rounded-full border-2 border-signal bg-paper shadow-window transition-opacity duration-300"
        style={{
          left: lensX,
          top: lensY,
          x: "-50%",
          y: "-50%",
          width: lensSize,
          height: lensSize,
          opacity: hovering ? 1 : 0,
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformOrigin: origin, scale: reduced ? 1 : zoom }}
        >
          {children}
        </motion.div>
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(226,92,79,0.35)]" />
        <div className="mono-label absolute inset-x-0 bottom-1 text-center text-[0.5rem] font-bold tracking-[0.22em] text-signal">
          {label}
        </div>
      </motion.div>
    </div>
  );
}
