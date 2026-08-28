import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journalPosts } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { StickyNote } from "@/components/ui/StickyNote";
import { Tape } from "@/components/ui/Tape";
import { CtaLink } from "@/components/ui/CtaLink";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

const bodies: Record<string, string[]> = {
  "perception-is-never-accidental": [
    "We stopped calling ourselves an agency for a reason that has nothing to do with fashion and everything to do with the work. An agency is a service you hire. A studio is a position you take. When a client asks an agency 'what will you make us?', they are ordering a product. When they ask a studio the same question, they are asking how we think.",
    "Perception is not a by-product of good work. It is the work. The market does not experience your strategy, your craft or your effort — it experiences the frame you give it. Every decision upstream of that frame is just evidence gathering. The frame is where the audience makes up its mind, in seconds, before they read a single word.",
    "So we observe first. We watch the shelf, the feed, the counter, the comments — the places where perception actually happens — before we touch a layout or a light. Then we direct, with the patience of someone who has already seen the film once in their head. Then we frame, ruthlessly, so that what is omitted says as much as what is kept.",
  ],
  "the-room-reads-back": [
    "Observation is the first system, and it is the least glamorous. It does not involve moodboards. It involves sitting in the room where the decision happens — the shop, the feed, the meeting — and letting the room talk.",
    "The room always reads back. A brand does not have an identity; it has a set of impressions accumulated by people who were not paying attention. Our job is to study those impressions the way a detective studies a scene: not what people said, but what they did, glanced at, skipped, repeated.",
    "Three rules we keep: observe without a hypothesis first, because a hypothesis is a preference in disguise. Name the pattern before you name the answer, because the pattern is the truth and the answer is just a suggestion. And never present an observation without the evidence that would let someone else disagree with it.",
  ],
  "on-framing-what-you-omit": [
    "The frame is not where the image begins. It is where the world ends. What you leave out of the picture is often the actual argument.",
    "In product photography, the omission is almost always clutter — the context that says 'this brand doesn't know what it is'. In strategy, the omission is the hard choice: the audience you will not court, the promise you will not make, the word you will not use.",
    "The most mature brands we work with do not ask what they should show. They ask what they should stop showing. That is when framing stops being a technique and becomes a discipline.",
  ],
  "directing-the-accident": [
    "Every good set has a moment that no one planned. A glance, a stumble, a gust of wind. The mistake most people make is believing these moments are the source of the magic. They are not — they are the reward.",
    "You cannot plan the accident, but you can prepare the room so that it has somewhere to land. That is what we mean by direction: rehearsing everything until the spontaneous thing is the only unpredictable variable left. We direct the scene so precisely that the happy accident becomes inevitable.",
    "This is why the verb is direct, not 'create'. Creating implies invention from nothing. Directing implies choice within a prepared field. The best work we have ever shipped was the work we did not see coming — which we made possible by seeing everything else clearly.",
  ],
  "the-shelf-is-a-stage": [
    "We spent four afternoons in supermarkets and one at a perfume counter, watching people not choose things. It is remarkable how much of branding is invisible until you watch it fail live.",
    "A person does not read your packaging. They scan it for three seconds and file it under a feeling. The winning shelf is not the loudest — it is the one that matches the feeling the shopper walked in with. That is the whole profession, in one sentence.",
    "The lesson we carry into every case: before you design anything, go stand where the decision happens. Bring a notebook. Count the glances. The shelf is a stage, and everyone is performing — especially the product that is being ignored.",
  ],
};

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const body =
    bodies[slug] ??
    [
      "This note was written between cases, from the studio floor. The point of the Journal is not to publish for its own sake — it is to keep the observation muscle warm between engagements.",
      post.excerpt,
    ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <Reveal>
        <p className="mono-label flex items-center gap-3 text-ink-soft">
          <span className="inline-block h-px w-8 bg-ink/30" />
          {post.category} · {post.date} · {post.readTime}
        </p>
      </Reveal>
      <Reveal delay={60}>
        <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
          {post.title}
        </h1>
      </Reveal>
      <Reveal delay={120}>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">{post.excerpt}</p>
      </Reveal>

      <div className="relative mt-12 space-y-6">
        <Tape color="var(--color-frame)" rotation={-3} className="absolute -top-3 left-8" />
        <div className="case-sheet case-holes p-6 sm:p-10">
          <div className="space-y-6">
            {body.map((para, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-ink md:text-lg"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
        <StickyNote tone="frame" rotation={2} className="absolute -right-3 top-6 hidden sm:block">
          <p className="hand text-xl text-ink">filed under: observation</p>
        </StickyNote>
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-ink/10 pt-8">
        <Link
          href="/journal"
          className="mono-label text-ink-soft transition-colors hover:text-ink"
        >
          ← Back to the journal
        </Link>
        <CtaLink href="/contact" size="sm">
          Open a case
        </CtaLink>
      </div>
    </article>
  );
}
