import type { Metadata } from "next";
import Link from "next/link";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { Reveal } from "@/components/ui/Reveal";
import { Stamp } from "@/components/ui/Stamp";
import { Tape } from "@/components/ui/Tape";
import { journalPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "FRAYM's journal — observations, methods and craft notes from the studio floor.",
};

export default function JournalPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink/10">
        <GridBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <p className="mono-label flex items-center gap-3 text-ink-soft">
                <span className="inline-block h-px w-10 bg-ink/30" />
                Journal · Field Notes
              </p>
              <Stamp text="Issue Nº 12" tone="tape" rotation={-3} />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-7xl">
              Notes from the{" "}
              <span className="text-ink-soft">studio floor.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
              Observations on perception, methods for framing and craft notes
              written between cases. No filler, no trend pieces — just what we
              actually noticed.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {journalPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 60}>
              <Link
                href={`/journal/${post.slug}`}
                className="group relative flex h-full flex-col border border-ink/15 bg-paper p-6 transition-all hover:-translate-y-1 hover:shadow-window sm:p-8"
              >
                <Tape
                  color={i % 2 === 0 ? "var(--color-frame)" : "var(--color-tape)"}
                  rotation={i % 2 === 0 ? -2 : 2}
                  className="absolute -top-2 left-1/2 -translate-x-1/2"
                />
                <div className="flex flex-wrap items-center gap-3">
                  <span className="mono-label bg-ink px-2 py-1 text-[0.6rem] text-paper">
                    {post.category}
                  </span>
                  <span className="mono-label text-ink-faint">
                    {post.date} · {post.readTime}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold leading-snug tracking-tight text-ink group-hover:underline sm:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {post.excerpt}
                </p>
                <span className="mono-label mt-6 flex items-center gap-2 border-t border-ink/10 pt-4 text-ink-soft">
                  Read the note
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
