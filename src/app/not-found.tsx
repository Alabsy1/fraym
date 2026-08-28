import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { VerbTriad } from "@/components/ui/VerbTriad";
import { CtaLink } from "@/components/ui/CtaLink";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <GridBackdrop />
      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="mono-label text-ink-faint">FILE ERROR · 404</p>
        <VerbTriad size="compact" className="mt-6" />
        <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-ink-soft">
          This case file is missing, misfiled, or was never opened. A good
          observer would read the room — the room says to try the front door.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <CtaLink href="/">Back to the studio</CtaLink>
          <CtaLink href="/cases" variant="ghost">
            Browse case files
          </CtaLink>
        </div>
        <p className="hand mt-12 text-2xl text-ink-soft">
          — filed under: lost &amp; found
        </p>
      </div>
    </section>
  );
}
