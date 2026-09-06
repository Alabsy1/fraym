import type { Metadata } from "next";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { Reveal } from "@/components/ui/Reveal";
import { Stamp } from "@/components/ui/Stamp";
import { StickyNote } from "@/components/ui/StickyNote";
import { CaseFileForm } from "@/components/CaseFileForm";
import { CtaLink } from "@/components/ui/CtaLink";
import { contact } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Open a case with FRAYM. Tell us what the world sees today and what it should see instead.",
};

export default function ContactPage() {
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
                Contact · Intake
              </p>
              <Stamp text="Priority: Investigate" tone="signal" rotation={3} />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-7xl">
              Let&apos;s frame{" "}
              <span className="text-ink-soft">what matters.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
              Every engagement begins as a case file. Fill it in below — or use
              any of the channels on this page. Every case gets read by a human
              observer before it gets a file number.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Form ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <CaseFileForm />
      </section>

      {/* ── Alternative channels ─────────────────────────────── */}
      <section className="border-t border-ink/10 bg-paper-2">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Email the studio",
                body: "For briefs, referrals and quiet questions.",
                value: contact.email,
                href: `mailto:${contact.email}`,
                cta: "Write to us",
              },
              {
                title: "Visit the room",
                body: "Our studio is based in Hurghada & El Gouna, on the Red Sea coast of Egypt.",
                value: contact.address.join(", "),
                href: "https://maps.google.com",
                cta: "See the map",
              },
              {
                title: "Prefer a call?",
                body: "Book a fifteen-minute observation call — no deck, just a conversation about your case.",
                value: contact.phone,
                href: `tel:${contact.phone.replace(/\s/g, "")}`,
                cta: "Schedule a call",
              },
            ].map((channel, i) => (
              <Reveal key={channel.title} delay={i * 70}>
                <div className="flex h-full flex-col border border-ink/15 bg-paper p-6">
                  <p className="mono-label text-ink-faint">CHANNEL 0{i + 1}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
                    {channel.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {channel.body}
                  </p>
                  <p className="mono-label mt-4 text-ink">{channel.value}</p>
                  <div className="mt-6">
                    <CtaLink href={channel.href} variant="outline" tone="ink" size="sm" external>
                      {channel.cta}
                    </CtaLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-14 flex flex-col items-center gap-4 text-center">
              <StickyNote tone="tape" rotation={-1}>
                <p className="hand text-2xl text-ink">
                  no pitch decks. no deadlines on day one. just observation.
                </p>
              </StickyNote>
              <div className="mt-4 flex gap-4">
                {contact.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mono-label border border-ink/20 bg-paper px-4 py-2 text-ink-soft transition-colors hover:border-ink hover:text-ink"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
