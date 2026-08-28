import type { Metadata } from "next";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Stamp } from "@/components/ui/Stamp";
import { CasesExplorer } from "@/components/CasesExplorer";
import { LogoMarquee } from "@/components/LogoMarquee";
import { BtsReel } from "@/components/BtsReel";
import { CtaLink } from "@/components/ui/CtaLink";

export const metadata: Metadata = {
  title: "Case Files",
  description:
    "Filterable case studies from FRAYM — closed and in-progress cases across industries, plus behind-the-scenes reels.",
};

export default function CasesPage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-ink/10">
        <GridBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <p className="mono-label flex items-center gap-3 text-ink-soft">
                <span className="inline-block h-px w-10 bg-ink/30" />
                Cases · The File Cabinet
              </p>
              <Stamp text="Filterable" tone="tape" rotation={3} />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-7xl">
              The case files,
              <br />
              <span className="text-ink-soft">open for inspection.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
              Every closed case is filed with its brief, its observations and
              its impact. In-progress cases are filed as they run. Filter by
              industry, flip between grid and list — every file is read.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Explorer ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <CasesExplorer />
      </section>

      {/* ── Logo Marquee ─────────────────────────────────────── */}
      <LogoMarquee />

      {/* ── BTS Reel ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-center">
          <div>
            <SectionTitle
              eyebrow="Behind the Frame"
              title={
                <>
                  The BTS reel —{" "}
                  <span className="text-ink-soft">one compile, many shoots.</span>
                </>
              }
              description="Clips from across the studio's recent productions, cut into a single reel: light checks, room reads, directorial whispers and the occasional happy accident. Play it loud."
            />
            <div className="mt-6">
              <CtaLink href="/contact" variant="outline" tone="ink">
                Book a studio visit
              </CtaLink>
            </div>
          </div>
          <Reveal delay={100}>
            <BtsReel />
          </Reveal>
        </div>
      </section>

      {/* ── CTA footer ───────────────────────────────────────── */}
      <section className="border-t border-ink/10 bg-signal py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <p className="hand text-2xl">
            the files above are closed. yours is still waiting to be opened.
          </p>
          <CtaLink href="/contact" tone="ink">
            Open a New Case
          </CtaLink>
        </div>
      </section>
    </div>
  );
}
