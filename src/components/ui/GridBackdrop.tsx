import { cn } from "@/lib/cn";

export function GridBackdrop({
  className,
  small = false,
  fade = true,
}: {
  className?: string;
  small?: boolean;
  fade?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0",
        small ? "grid-lines-sm" : "grid-lines",
        fade &&
          "[mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_30%,transparent_75%)]",
        className
      )}
    />
  );
}
