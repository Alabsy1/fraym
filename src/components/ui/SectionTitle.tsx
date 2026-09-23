import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mono-label flex items-center gap-2 text-ink-soft">
          <span className="inline-block h-px w-8 bg-ink/30" />
          {eyebrow}
        </p>
      )}
      <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
