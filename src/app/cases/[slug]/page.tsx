import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseBySlug, cases, serviceBySlug, type CaseStudy, type Service } from "@/lib/data";
import { solid, textOn, softBg, softBorder } from "@/lib/color";
import { CaseCover } from "@/components/CaseCover";
import { StatusBadge } from "@/components/CaseCard";
import { CaseTabs, type TabItem } from "@/components/CaseTabs";
import { SystemWindow } from "@/components/ui/SystemWindow";
import { StickyNote } from "@/components/ui/StickyNote";
import { Stamp } from "@/components/ui/Stamp";
import { Tape } from "@/components/ui/Tape";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = caseBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.client} — Case File`,
    description: item.summary,
  };
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const item = caseBySlug(slug);
  if (!item) notFound();

  const index = cases.findIndex((c) => c.slug === slug);
  const next = cases[(index + 1) % cases.length];
  const prev = cases[(index - 1 + cases.length) % cases.length];

  const tabs = buildTabs(item);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className={cn("relative overflow-hidden border-b border-ink/10", softBg(item.accent))}>
        <GridBackdrop />
        <div className={cn("relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", item.personality === "incline" && "lg:py-24")}>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={item.status} />
              <span className="mono-label text-ink-soft">
                {item.industry} · {item.year}
              </span>
              <Stamp
                text={item.personality}
                tone="tape"
                rotation={item.personality === "eccentric" ? 6 : -4}
              />
            </div>
          </Reveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <Reveal delay={60}>
                <h1
                  className={cn(
                    "font-display font-semibold leading-[0.98] tracking-tight text-ink",
                    item.personality === "eccentric" ? "text-6xl sm:text-8xl" : "text-5xl sm:text-7xl"
                  )}
                >
                  {item.client}
                </h1>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
                  {item.summary}
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-7 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className={cn("mono-label border px-2.5 py-1 text-[0.6rem]", softBorder(item.accent))}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={160} className="relative">
              <CaseCover item={item} />
              {item.personality === "eccentric" && (
                <>
                  <Tape color="var(--color-signal)" rotation={5} className="absolute -right-4 -top-4" />
                  <StickyNote tone="frame" rotation={7} className="absolute -left-5 -bottom-6 hidden sm:block">
                    <p className="hand text-lg text-ink">personality: eccentric</p>
                  </StickyNote>
                </>
              )}
              {item.personality === "casualist" && (
                <StickyNote tone="moss" rotation={-4} className="absolute -left-4 top-8 hidden sm:block">
                  <p className="hand text-lg text-ink">worn in, not glossed</p>
                </StickyNote>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Tabs ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <CaseTabs tabs={tabs} personality={item.personality} />
      </section>

      {/* ── Quote ────────────────────────────────────────────── */}
      <section className="border-t border-ink/10 bg-paper-2">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <Reveal>
            <span className="hand text-2xl text-ink-faint">said by the client</span>
            <blockquote className="mt-4 font-display text-2xl font-medium leading-snug text-ink sm:text-4xl">
              “{item.quote.text}”
            </blockquote>
            <p className="mono-label mt-6 text-ink-soft">
              {item.quote.author} — {item.quote.role}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Prev / Next ──────────────────────────────────────── */}
      <section className="border-t border-ink/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:px-8">
          <PrevNext href={`/cases/${prev.slug}`} label="Previous file" client={prev.client} align="left" />
          <PrevNext href={`/cases/${next.slug}`} label="Next file" client={next.client} align="right" />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="border-t border-ink/10 bg-signal py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <p className="hand text-2xl">your brand deserves a file this deliberate.</p>
          <CtaLink href="/contact" tone="ink">
            Open a Case
          </CtaLink>
        </div>
      </section>
    </div>
  );
}

function PrevNext({
  href,
  label,
  client,
  align,
}: {
  href: string;
  label: string;
  client: string;
  align: "left" | "right";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group border-ink/10 px-2 py-8 transition-colors hover:bg-paper-2 sm:px-6",
        align === "right" && "border-l text-right"
      )}
    >
      <p className="mono-label text-ink-faint">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold text-ink group-hover:underline sm:text-3xl">
        {align === "left" ? "← " : ""}{client}{align === "right" ? " →" : ""}
      </p>
    </Link>
  );
}

function buildTabs(item: CaseStudy): TabItem[] {
  const tabs: TabItem[] = [
    {
      id: "brief",
      label: "Brief",
      shortLabel: "Brief",
      content: (
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <TabLabel label="The Brief" />
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink md:text-xl">
              {item.brief}
            </p>
          </div>
          <div className="case-sheet case-holes relative self-start p-6">
            <Tape color="var(--color-frame)" rotation={-3} className="absolute -top-3 left-8" />
            <TabLabel label="File summary" />
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ["Client", item.client],
                ["Industry", item.industry],
                ["Year", item.year],
                ["Status", item.status === "closed" ? "Case Closed" : "In Progress"],
                ["Systems", item.services.map((s) => s.replace("-", " ")).join(" · ")],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-ink/10 pb-2">
                  <dt className="mono-label text-ink-faint">{k}</dt>
                  <dd className="text-right font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      ),
    },
  ];

  tabs.push({
    id: "observe",
    label: "Observe",
    shortLabel: "Observe",
    content: (
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <TabLabel label="The Observation" />
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink md:text-xl">
            {item.observe}
          </p>
        </div>
        <div className="relative self-start">
          <SystemWindow title="ROOM_READ.txt">
            <div className="bg-ink p-6">
              <p className="hand text-xl leading-snug text-paper">
                observed before opinion. read twice, acted once.
              </p>
              <p className="mono-label mt-4 text-[0.6rem] text-paper/60">
                SIGNAL SYSTEM · OBSERVATION LOG
              </p>
            </div>
          </SystemWindow>
        </div>
      </div>
    ),
  });

  const order: Record<string, number> = { frame: 0, direct: 1, signal: 2 };
  const purchased = [...item.services].sort(
    (a, b) => (order[a] ?? 3) - (order[b] ?? 3)
  );
  for (const s of purchased) {
    const service = serviceBySlug(s);
    if (service) tabs.push(serviceTab(item, service));
  }

  tabs.push({
    id: "impact",
    label: "Impact",
    shortLabel: "Impact",
    content: (
      <div>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <TabLabel label="The Impact" />
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink md:text-xl">
              {item.impact}
            </p>
            <div className="mt-8">
              <SystemWindow title="IMPACT_LOG.txt">
                <div className="grid gap-4 bg-ink p-6 sm:grid-cols-3">
                  {item.metrics.map((m) => (
                    <div key={m.label} className="border-l-2 border-frame pl-3">
                      <p className="font-display text-3xl font-bold text-paper">{m.value}</p>
                      <p className="mono-label mt-1 text-[0.6rem] text-paper/70">{m.label}</p>
                    </div>
                  ))}
                </div>
              </SystemWindow>
            </div>
          </div>
          <div className="relative self-start">
            <StickyNote tone="bone" rotation={-2} className="mt-2">
              <p className="hand text-2xl leading-snug text-ink">
                “{item.quote.text}”
              </p>
              <p className="mono-label mt-3 text-ink-soft">
                {item.quote.author} · {item.quote.role}
              </p>
            </StickyNote>
          </div>
        </div>
      </div>
    ),
  });

  return tabs;
}

function serviceTab(item: CaseStudy, service: Service): TabItem {
  const c = service.color;
  return {
    id: service.slug,
    label: service.system,
    shortLabel: service.short,
    content: (
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <TabLabel label={`${service.system} in this case`} />
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink">
            For {item.client}, the {service.system.toLowerCase()} ran on its core
            promise: <em className="text-ink">{service.verb.toLowerCase()}</em>.{" "}
            {service.tagline} The engagement in {item.year} applied this system
            directly to the brief — {item.summary.toLowerCase()}
          </p>
          <p className="hand mt-4 text-2xl text-ink-soft">
            the field note: {service.process[0].detail}
          </p>
        </div>
        <div className="space-y-6">
          <div className="case-sheet case-holes relative p-6">
            <Tape color={`var(--color-${c})`} rotation={-3} className="absolute -top-3 left-8" />
            <TabLabel label="Deliverables involved" />
            <ul className="mt-4 space-y-2.5">
              {service.deliverables.slice(0, 4).map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${solid(c)}`} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="case-sheet case-holes relative p-6">
            <Tape color={`var(--color-${c})`} rotation={2} className="absolute -top-3 right-8" />
            <TabLabel label="Process in the field" />
            <ol className="mt-4 space-y-3">
              {service.process.slice(0, 3).map((step, i) => (
                <li key={step.step} className="flex gap-3 text-sm">
                  <span className={`flex size-5 shrink-0 items-center justify-center font-mono text-[0.6rem] font-bold ${solid(c)} ${textOn(c)}`}>
                    {i + 1}
                  </span>
                  <span>
                    <span className="font-semibold text-ink">{step.step}.</span>{" "}
                    <span className="text-ink-soft">{step.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    ),
  };
}

function TabLabel({ label }: { label: string }) {
  return (
    <p className="mono-label flex items-center gap-2 text-ink-soft">
      <span className="inline-block h-px w-8 bg-ink/30" />
      {label}
    </p>
  );
}
