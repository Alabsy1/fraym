import type { Metadata } from "next";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { StickyNote } from "@/components/ui/StickyNote";
import { Stamp } from "@/components/ui/Stamp";
import { CtaLink } from "@/components/ui/CtaLink";
import { traits, positions, contact } from "@/lib/data";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join FRAYM — a studio for curious minds and clear eyes. Open positions, our four traits, and how to apply.",
};

export default function CareersPage() {
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
                Careers · Join the Studio
              </p>
              <Stamp text="Hiring" tone="signal" rotation={4} />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              We&apos;re looking for people{" "}
              <span className="text-ink-soft">who look closer.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
              Curious enough to question.
              <br />
              Thoughtful enough to listen.
              <br />
              Structured enough to build.
              <br />
              Brave enough to challenge the obvious.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Four traits ──────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="The four traits"
          title={
            <>
              What we&apos;re looking for —{" "}
              <span className="text-ink-soft">measured in behaviour, not CVs.</span>
            </>
          }
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {traits.map((trait, i) => (
            <Reveal key={trait.title} delay={i * 70}>
              <div className="group relative h-full border border-ink/15 bg-paper p-6 transition-all hover:-translate-y-1 hover:shadow-window">
                <span className="mono-label text-ink-faint">TRAIT 0{i + 1}</span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
                  {trait.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {trait.detail}
                </p>
                <span className="absolute bottom-0 left-0 h-1 w-full bg-ink transition-all duration-300 group-hover:h-2" aria-hidden />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-wrap items-center gap-6 border border-ink/15 bg-paper-2 p-6 sm:p-8">
            <StickyNote tone="frame" rotation={-2}>
              <p className="hand text-2xl text-ink">
                we hire the temperament, not the template.
              </p>
            </StickyNote>
            <p className="max-w-md text-sm leading-relaxed text-ink-soft">
              No portfolio page required at first contact. Write us a case-file
              about something you observed recently — a shop, a feed, a room, a
              product. That file tells us more than a CV ever could.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── Positions table ──────────────────────────────────── */}
      <section className="border-t border-ink/10 bg-paper-2">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionTitle
              eyebrow="Open positions"
              title={
                <>
                  The case files{" "}
                  <span className="text-ink-soft">we need to staff.</span>
                </>
              }
            />
            <p className="mono-label text-ink-soft">
              {positions.filter((p) => p.status === "Open").length} open right now
            </p>
          </div>

          <Reveal delay={100}>
            <div className="mt-10 overflow-hidden border border-ink/15 bg-paper">
              <div className="grid grid-cols-[1fr_auto] gap-4 border-b-2 border-ink bg-paper-2 px-5 py-3 sm:grid-cols-[1.6fr_1fr_1fr_0.6fr_0.6fr]">
                {["Position", "Team", "Type", "Location", "Status"].map((h) => (
                  <span key={h} className="mono-label text-ink-soft">{h}</span>
                ))}
              </div>
              {positions.map((p, i) => (
                <div
                  key={p.title}
                  className={cn(
                    "grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-[1.6fr_1fr_1fr_0.6fr_0.6fr] sm:items-center",
                    i < positions.length - 1 && "border-b border-ink/10"
                  )}
                >
                  <span className="font-display text-lg font-semibold text-ink">{p.title}</span>
                  <span className="mono-label text-ink-soft">{p.team}</span>
                  <span className="mono-label text-ink-soft">{p.type}</span>
                  <span className="mono-label text-ink-faint">{p.location}</span>
                  <span>
                    {p.status === "Open" ? (
                      <span className="mono-label inline-flex items-center gap-1.5 bg-moss px-2.5 py-1 text-[0.6rem] font-bold text-white">
                        <span className="size-1.5 rounded-full bg-white" />
                        Open
                      </span>
                    ) : (
                      <span className="mono-label inline-flex items-center gap-1.5 border border-ink/20 px-2.5 py-1 text-[0.6rem] font-bold text-ink-faint">
                        Paused
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-10 flex flex-col items-start justify-between gap-6 border border-ink/15 bg-paper p-8 sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-2xl font-semibold text-ink">
                  Don&apos;t see your role?
                </p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
                  We run on observation, not org charts. Send your case-file note
                  to {contact.careers} and we&apos;ll read it — we usually write back.
                </p>
              </div>
              <CtaLink
                href={`mailto:${contact.careers}?subject=Observer%20case-file%20—%20open%20position`}
                external
              >
                Apply by email
              </CtaLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
