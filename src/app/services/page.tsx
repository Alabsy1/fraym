import type { Metadata } from "next";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceBook } from "@/components/ServiceBook";
import { CtaLink } from "@/components/ui/CtaLink";
import { Tape } from "@/components/ui/Tape";
import { Stamp } from "@/components/ui/Stamp";

export const metadata: Metadata = {
  title: "Services",
  description:
    "FRAYM's four systems — Frame, Direct, Signal and Full Frame. One method: observe, direct, frame.",
};

export default function ServicesPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink/10">
        <GridBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <p className="mono-label mb-5 flex items-center gap-3 text-ink-soft">
              <span className="inline-block h-px w-10 bg-ink/30" />
              Services · The Systems
            </p>
          </Reveal>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <Reveal delay={60}>
              <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl">
                Four systems.
                <br />
                <span className="text-ink-soft">One method.</span>
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <div className="max-w-sm">
                <p className="text-sm leading-relaxed text-ink-soft">
                  Every engagement is a case. Every case runs on one or more of
                  the systems below — observed first, directed second, framed
                  third. Select a system to see its position, deliverables and
                  process.
                </p>
                <p className="hand mt-3 text-xl text-ink-soft">
                  open each system. pull the tab.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={220} className="mt-12">
            <ServiceBook />
          </Reveal>

          <div className="relative mt-14 flex flex-wrap items-center gap-4">
            <Tape color="var(--color-frame)" rotation={-3} />
            <p className="mono-label text-ink-soft">
              Not sure which system your case needs?
            </p>
            <Stamp text="Investigate first" tone="tape" rotation={2} />
            <CtaLink href="/contact" size="sm" className="ml-auto">
              Open a case anyway
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="bg-paper-2">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="How it runs"
            title={
              <>
                From first signal to final frame —{" "}
                <span className="text-ink-soft">the full arc of a case.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                t: "Observe",
                d: "The brief arrives and the Signal System reads the room. We read it twice — once for what it says, once for what it omits.",
              },
              {
                n: "02",
                t: "Frame",
                d: "The empty frame is located. What the world is allowed to see — and how it feels when it sees it — is decided.",
              },
              {
                n: "03",
                t: "Direct",
                d: "The scene is directed and the story gets a spine, a cast and a plan for production.",
              },
              {
                n: "04",
                t: "Signal",
                d: "The direction is tested against the reading, and every deliverable ships in one voice.",
              },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 80}>
                <div className="relative border border-ink/15 bg-paper p-6">
                  <span className="mono-label text-ink-faint">{step.n}</span>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
                    {step.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {step.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
