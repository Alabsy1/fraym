"use client";

import { motion, useDragControls } from "framer-motion";
import type { ReactNode, RefObject } from "react";
import { cn } from "@/lib/cn";

export type DragRef = RefObject<HTMLElement | null>;

export interface DragHandleContext {
  onPointerDown: (e: React.PointerEvent<Element>) => void;
}

export function Draggable({
  children,
  className,
  constraints,
  defaultX = 0,
  defaultY = 0,
  rotate = 0,
  handle = false,
  onDragEnd,
}: {
  children: ReactNode | ((ctx: DragHandleContext) => ReactNode);
  className?: string;
  constraints?: DragRef;
  defaultX?: number;
  defaultY?: number;
  rotate?: number;
  handle?: boolean;
  onDragEnd?: () => void;
}) {
  const controls = useDragControls();

  const content =
    typeof children === "function"
      ? children({ onPointerDown: (e) => controls.start(e) })
      : children;

  return (
    <motion.div
      drag
      dragListener={!handle}
      dragControls={handle ? controls : undefined}
      dragConstraints={constraints as RefObject<Element | null> | undefined}
      dragElastic={0.16}
      dragMomentum={false}
      whileDrag={{ rotate: rotate * 1.6, scale: 1.05, zIndex: 70 }}
      initial={{ x: defaultX, y: defaultY, rotate }}
      animate={{ x: defaultX, y: defaultY, rotate }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={cn("relative touch-none select-none", className)}
      onDragEnd={onDragEnd}
    >
      {content}
    </motion.div>
  );
}
