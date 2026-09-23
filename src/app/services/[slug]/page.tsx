import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, serviceBySlug, cases } from "@/lib/data";
import { solid, textColor, textOn, softBg } from "@/lib/color";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { SystemWindow } from "@/components/ui/SystemWindow";
import { StickyNote } from "@/components/ui/StickyNote";
import { Stamp } from "@/components/ui/Stamp";
import { Tape } from "@/components/ui/Tape";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceHeroVisual } from "@/components/ServiceHeroVisual";
import { CaseCard } from "@/components/CaseCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.system}`,
    description: service.seoDescription,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const c = service.color;
  const related = cases.filter((cs) => cs.services.includes(service.slug)).slice(0, 3);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className={`relative overflow-hidden ${softBg(c)}`}>
        <GridBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-4">
                  <span className={`${solid(c)} ${textOn(c)} flex h-12 w-12 items-center justify-center font-mono text-sm font-bold`}>
                    Nº {service.number}
                  </span>
                  <span className="mono-label text-ink-soft">{service.system}</span>
                  <Stamp text="System" tone="ink" rotation={-3} />
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-8 font-display text-5xl font-semibold leading-[1.0] tracking-tight text-ink sm:text-7xl">
                  {service.short}
                </h1>
                <p className={`hand mt-3 text-3xl ${textColor(c)}`}>
                  {service.verb}
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
                  {service.tagline}
                </p>
              </Reveal>
            </div>

            <Reveal delay={220}>
              <ServiceHeroVisual service={service} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Position ─────────────────────────────────────────── */}
      <section className="border-b border-ink/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          <Reveal>
            <SectionLabel label="01 · The problem this system solves" />
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
              {service.problem}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <SectionLabel label="02 · What FRAYM investigates" />
            <p className="mt-4 max-w-2xl text-xl leading-relaxed text-ink md:text-2xl">
              {service.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Deliverables + Process ───────────────────────────── */}
      <section className="bg-paper-2">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="case-sheet case-holes relative p-6 sm:p-8">
                <Tape
                  color={`var(--color-${c})`}
                  rotation={-3}
                  className="absolute -top-3 left-8"
                />
                <SectionLabel label="03 · What we build / deliver" />
                <ul className="mt-6 space-y-3">
                  {service.deliverables.map((d, i) => (
                    <li
                      key={d}
                      className="flex items-center gap-3 border-b border-ink/10 pb-3 text-sm text-ink-soft"
                    >
                      <span className={`flex size-6 shrink-0 items-center justify-center font-mono text-[0.6rem] font-bold ${solid(c)} ${textOn(c)}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <SystemWindow title={`PROCESS_${service.slug.toUpperCase()}.txt`}>
                <div className="p-6 sm:p-8">
                  <SectionLabel label="04 · How we work" />
                  <ol className="mt-6 space-y-6">
                    {service.process.map((step, i) => (
                      <li key={step.step} className="flex gap-4">
                        <span className="flex flex-col items-center">
                          <span className={`flex size-8 shrink-0 items-center justify-center font-mono text-xs font-bold ${solid(c)} ${textOn(c)}`}>
                            {i + 1}
                          </span>
                          {i < service.process.length - 1 && (
                            <span className="mt-1 w-px flex-1 bg-ink/15" />
                          )}
                        </span>
                        <div>
                          <p className="font-display text-lg font-semibold text-ink">
                            {step.step}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                            {step.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </SystemWindow>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="relative mt-14 flex flex-col items-start justify-between gap-6 rounded-none border border-ink/15 bg-paper p-6 sm:flex-row sm:items-center sm:p-8">
              <StickyNote tone="bone" rotation={-1}>
                <p className="hand text-xl text-ink">
                  the {service.short.toLowerCase()} is a decision. make it deliberate.
                </p>
              </StickyNote>
              <CtaLink href="/contact">Open a Case</CtaLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Related cases ────────────────────────────────────── */}
      {related.length > 0 && (
      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionLabel label="05 · Relevant evidence" />
          <div className="mt-4 flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {service.system} <span className="text-ink-soft">in the field</span>
            </h2>
            <Link href="/cases" className="mono-label shrink-0 text-ink-soft hover:text-ink">
              All cases →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item, i) => (
              <Reveal key={item.slug} delay={i * 80}>
                <CaseCard item={item} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="mono-label flex items-center gap-2 text-ink-soft">
      <span className="inline-block h-px w-8 bg-ink/30" />
      {label}
    </p>
  );
}
