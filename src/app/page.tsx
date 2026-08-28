import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfter } from "@/components/BeforeAfter";
import { ServiceCard } from "@/components/ServiceCard";
import { CaseCard } from "@/components/CaseCard";
import { CaseFileForm } from "@/components/CaseFileForm";
import { HeroDossier } from "@/components/HeroDossier";
import { EvidenceBoard } from "@/components/EvidenceBoard";
import { ScrollDrivenHero } from "@/components/ScrollDrivenHero";
import {
  CircleHighlight,
  InkUnderline,
} from "@/components/ui/FramedHighlight";
import { services, cases } from "@/lib/data";

export default function HomePage() {
  const featured = cases.filter((c) => c.featured).slice(0, 3);

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <HeroDossier />

      {/* ── SAME BRAND, DIFFERENT FRAME ──────────────────────── */}
      <section className="border-t border-ink/10 bg-paper-2">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <SectionTitle
                eyebrow="Same Brand, Different Frame"
                title={
                  <>
                    The painting was always there.{" "}
                    <span className="text-ink-soft">
                      We just learned{" "}
                      <CircleHighlight>where to stand.</CircleHighlight>
                    </span>
                  </>
                }
                description="A photograph is a painting with the edges still visible. Drag the handle. The same subject, the same light — one frame raw, one frame decided. That difference, applied consistently, is what a brand feels like."
              />
              <div className="mt-6 flex flex-wrap gap-4">
                <CtaLink href="/services" tone="ink">
                  <InkUnderline>See the systems</InkUnderline>
                </CtaLink>
                <CtaLink href="/cases" variant="ghost">
                  <InkUnderline>View case files</InkUnderline>
                </CtaLink>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <span className="hand text-2xl text-ink-soft">
                  drag the divider — see the difference
                </span>
              </div>
            </div>
            <BeforeAfter className="w-full" />
          </div>
        </div>
      </section>

      {/* ── SCROLL / SCRUB ───────────────────────────────────── */}
      <ScrollDrivenHero />

      {/* ── OUR SYSTEMS ──────────────────────────────────────── */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionTitle
              eyebrow="Our Systems"
              title={
                <>
                  Four systems. One method:{" "}
                  <span className="text-ink-soft">observe, direct, frame.</span>
                </>
              }
            />
            <CtaLink href="/services" variant="outline" tone="ink" className="shrink-0">
              <InkUnderline>All systems</InkUnderline>
            </CtaLink>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 70}>
                <ServiceCard service={service} className="h-full" inspect />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVIDENCE BOARD ───────────────────────────────────── */}
      <EvidenceBoard />

      {/* ── FEATURED CASES ───────────────────────────────────── */}
      <section className="border-t border-ink/10 bg-paper-2">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionTitle
              eyebrow="Featured Cases"
              title={
                <>
                  Closed cases, open for{" "}
                  <span className="text-ink-soft">inspection.</span>
                </>
              }
            />
            <CtaLink href="/cases" variant="outline" tone="ink" className="shrink-0">
              <InkUnderline>All case files</InkUnderline>
            </CtaLink>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((item, i) => (
              <Reveal key={item.slug} delay={i * 80}>
                <CaseCard item={item} className="h-full" inspect />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN A NEW CASE ──────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <GridBackdrop small />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mb-14 text-center">
            <SectionTitle
              align="center"
              eyebrow="Open a New Case"
              title={
                <>
                  Let&apos;s frame{" "}
                  <span className="text-ink-soft">what matters.</span>
                </>
              }
              description="Tell us what the world currently sees — and what it should see instead. No pitch deck required."
            />
          </div>
          <CaseFileForm compact />
        </div>
      </section>
    </div>
  );
}
