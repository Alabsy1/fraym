import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Marquee({
  children,
  className,
  slow = false,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  slow?: boolean;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn("relative flex w-full overflow-hidden", className)}
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center",
          slow ? "animate-marquee-slow" : "animate-marquee",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
