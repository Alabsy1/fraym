export function Wordmark({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="grid place-items-center border-2 border-ink font-display font-bold text-ink"
        style={{
          width: size === "lg" ? "44px" : "34px",
          height: size === "lg" ? "44px" : "34px",
        }}
        aria-hidden
      >
        <span className="text-[0.65em] leading-none">
          <span className="text-signal">F</span>
          <span className="text-tape">M</span>
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className="font-display font-bold tracking-tight text-ink"
          style={{ fontSize: size === "lg" ? "1.9rem" : "1.45rem" }}
        >
          FRAYM
        </span>
        <span className="mono-label mt-1 text-[0.55rem] text-ink-soft">
          Creative + Business
          <br />
          Solutions Studio
        </span>
      </span>
    </span>
  );
}
