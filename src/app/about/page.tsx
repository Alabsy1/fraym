import type { Metadata } from "next";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { StickyNote } from "@/components/ui/StickyNote";
import { Tape } from "@/components/ui/Tape";
import { Stamp } from "@/components/ui/Stamp";
import { CtaLink } from "@/components/ui/CtaLink";
import { VerbTriad } from "@/components/ui/VerbTriad";
import { beliefs, team, values, industries } from "@/lib/data";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "About",
  description:
    "FRAYM is not an agency. We are an observation studio — a collective of observers, thinkers and makers.",
};

export default function AboutPage() {
  return (
    <div>
      {/* ── Manifesto hero ───────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-ink/10">
        <GridBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal>
            <p className="mono-label mb-6 flex items-center gap-3 text-ink-soft">
              <span className="inline-block h-px w-10 bg-ink/30" />
              About · The Manifesto
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="max-w-5xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              We are not an agency.{" "}
              <span className="text-ink-soft">
                We are an observation studio.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-10 grid max-w-4xl gap-8 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-ink-soft">
                An agency delivers what you asked for. A studio asks what you
                actually meant. We exist in the second category — watching the
                room, reading the market, and only then touching a camera, a
                script or a layout.
              </p>
              <p className="text-lg leading-relaxed text-ink-soft">
                The verb triad isn&apos;t a slogan. It&apos;s the sequence every
                case runs: observe the room, direct the scene, frame the
                decision. Nothing is accidental here — not the light, not the
                silence, not the frame.
              </p>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-12">
              <VerbTriad size="compact" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Belief list ──────────────────────────────────────── */}
      <section className="bg-paper-2">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="What we believe"
            title={
              <>
                Perception is never accidental.{" "}
                <span className="text-ink-soft">It is designed.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {beliefs.map((belief, i) => (
              <Reveal key={belief} delay={i * 60}>
                <div className="flex h-full items-start gap-4 border border-ink/15 bg-paper p-6">
                  <span className="mono-label mt-1 text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-xl font-medium leading-snug text-ink">
                    {belief}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy corkboard ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        <GridBackdrop small />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <SectionTitle
              align="center"
              eyebrow="Philosophy Corkboard"
              title={
                <>
                  We see beyond{" "}
                  <span className="text-ink-soft">the surface.</span>
                </>
              }
            />
          </div>

          <div className="texture-paper-2 relative mx-auto max-w-5xl border border-ink/15 p-6 shadow-window sm:p-12">
            <Tape color="var(--color-tape)" rotation={-2} className="absolute -top-3 left-1/2 -translate-x-1/2" />
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              {[
                { text: "the brief is never the brief.", tone: "frame" as const, rot: -3 },
                { text: "read the room twice.", tone: "tape" as const, rot: 2 },
                { text: "rehearse the accident.", tone: "moss" as const, rot: -2 },
                { text: "the frame is the decision.", tone: "frame" as const, rot: 4 },
                { text: "quiet details win.", tone: "moss" as const, rot: -4 },
                { text: "perception. is. designed.", tone: "tape" as const, rot: 1 },
              ].map((note, i) => (
                <StickyNote
                  key={note.text}
                  tone={note.tone as "frame" | "tape" | "moss"}
                  rotation={note.rot}
                  className={cn(
                    "flex min-h-28 items-center justify-center",
                    i % 2 === 1 && "md:translate-y-4"
                  )}
                >
                  <p className="hand text-center text-2xl leading-tight text-ink">
                    {note.text}
                  </p>
                </StickyNote>
              ))}
            </div>
            <p className="mono-label mt-10 text-center text-ink-soft">
              pin #001 → pin #006 · replace only when a better truth shows up
            </p>
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────── */}
      <section className="border-t border-ink/10 bg-paper-2">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionTitle
              eyebrow="The Studio"
              title={
                <>
                  A collective of observers,{" "}
                  <span className="text-ink-soft">thinkers and makers.</span>
                </>
              }
            />
            <CtaLink href="/careers" variant="outline" tone="ink" className="shrink-0">
              Join the collective
            </CtaLink>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 60}>
                <div className="group border border-ink/15 bg-paper p-5 transition-all hover:-translate-y-0.5 hover:shadow-window">
                  <div className="relative aspect-[4/3] overflow-hidden border border-ink/10 bg-paper-3">
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="font-display text-6xl font-semibold text-ink/15">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div className="grid-lines absolute inset-0 opacity-40" />
                    <Tape color="var(--color-frame)" rotation={-4} className="absolute -top-2 left-1/2 -translate-x-1/2" />
                    <div className="absolute bottom-2 right-2 rounded-full bg-paper/90 px-2 py-0.5">
                      <span className="mono-label text-[0.55rem] text-ink-soft">observer nº {String(i + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink">{member.name}</h3>
                      <p className="mono-label mt-1 text-ink-soft">{member.role}</p>
                    </div>
                    <span className="hand shrink-0 text-lg text-ink-faint">{member.note}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values + industries ──────────────────────────────── */}
      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionTitle
                eyebrow="Values"
                title={
                  <>
                    What the studio{" "}
                    <span className="text-ink-soft">runs on.</span>
                  </>
                }
              />
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {values.map((v) => (
                  <div key={v.label} className="border border-ink/15 bg-paper-2 p-5 text-center">
                    <Icon name={v.icon} />
                    <p className="mono-label mt-3 text-ink-soft">{v.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionTitle
                eyebrow="Industries observed"
                title={
                  <>
                    We read every room,{" "}
                    <span className="text-ink-soft">from finance to fashion.</span>
                  </>
                }
              />
              <div className="mt-8 flex flex-wrap gap-2.5">
                {industries.filter((i) => i !== "All Industries").map((ind) => (
                  <span
                    key={ind}
                    className="mono-label border border-ink/20 bg-paper px-3.5 py-2 text-ink-soft"
                  >
                    {ind}
                  </span>
                ))}
                <Stamp text="No genre bias" tone="moss" rotation={3} className="ml-2" />
              </div>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-ink-soft">
                Perception behaves the same way in every industry: people decide
                in seconds, based on frames. Our method is industry-agnostic
                because observation is.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Icon({ name }: { name: string }) {
  const cls = "mx-auto h-7 w-7 text-ink";
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    className: cls,
  };
  switch (name) {
    case "eye":
      return (
        <svg {...common} aria-hidden>
          <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "ruler":
      return (
        <svg {...common} aria-hidden>
          <rect x="2" y="9" width="20" height="6" rx="1" />
          <path d="M6 9v3M10 9v2M14 9v3M18 9v2" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M15.5 8.5l-2 5-5 2 2-5 5-2Z" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      );
    case "hand":
      return (
        <svg {...common} aria-hidden>
          <path d="M8 11V5.5a1.5 1.5 0 0 1 3 0V11M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7.5" />
          <path d="M17 9.5V8a1.5 1.5 0 0 1 3 0v6a6 6 0 0 1-6 6h-1.5c-2.5 0-4-1-5.5-3L4 12.5a1.5 1.5 0 0 1 2.3-1.9L8 12.5" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
          <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
        </svg>
      );
    default:
      return null;
  }
}
