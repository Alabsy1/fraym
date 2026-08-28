import { cn } from "@/lib/cn";
import { Tape } from "./Tape";

const verbs = [
  { word: "observe", color: "#bb4a3e" },
  { word: "direct", color: "#5a729b" },
  { word: "frame", color: "#c9a71e" },
];

export function VerbTriad({
  size = "hero",
  showTape = false,
  className,
}: {
  size?: "hero" | "footer" | "compact";
  showTape?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {showTape && (
        <Tape
          color="var(--color-signal)"
          rotation={-5}
          className="absolute -top-4 left-4 z-10"
        />
      )}
      <h1
        className={cn(
          "font-display font-semibold leading-[0.98] tracking-tight text-ink",
          size === "hero" && "text-6xl sm:text-7xl md:text-8xl",
          size === "footer" && "text-5xl sm:text-6xl md:text-7xl",
          size === "compact" && "text-4xl sm:text-5xl"
        )}
      >
        {verbs.map((v, i) => (
          <span key={v.word} className="block">
            We <span style={{ color: v.color }}>{v.word}</span>
            {i < verbs.length - 1 ? "," : "."}
          </span>
        ))}
      </h1>
      <div className="mt-8 hidden flex-col gap-2 sm:flex">
        {verbs.map((v) => (
          <span key={v.word} className="flex items-center gap-3">
            <span
              className="inline-block w-10 border-b-[3px]"
              style={{ borderColor: v.color }}
            />
            <span className="hand text-xl text-ink-soft">→ {v.word}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
