import type { CaseStudy } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { Tape } from "@/components/ui/Tape";
import { cn } from "@/lib/cn";

export function CaseReel({
  videos,
}: {
  videos: NonNullable<CaseStudy["videos"]>;
}) {
  return (
    <section className="border-t border-ink/10">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <p className="mono-label flex items-center gap-2 text-ink-soft">
            <span className="inline-block h-px w-8 bg-ink/30" />
            Evidence Reel
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
            Selected motion
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:gap-8 lg:grid-cols-3 lg:items-start">
          {videos.map((video, i) => {
            const portrait = video.orientation === "portrait";
            return (
              <Reveal
                key={video.src}
                delay={i * 80}
                className={cn(
                  "min-w-0",
                  portrait
                    ? "mx-auto w-full max-w-[20rem] lg:col-span-1"
                    : "lg:col-span-2"
                )}
              >
                <div className="case-sheet relative p-2 shadow-window sm:p-3">
                  <Tape
                    color="var(--color-frame)"
                    rotation={i % 2 === 0 ? -3 : 2}
                    className="absolute -top-3 left-8 z-10"
                  />

                  <div
                    className={cn(
                      "relative w-full overflow-hidden border border-ink/15 bg-ink",
                      portrait ? "aspect-[9/16]" : "aspect-video"
                    )}
                  >
                    <video
                      src={video.src}
                      controls
                      playsInline
                      preload="metadata"
                      aria-label={video.caption}
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* corner brackets */}
                    <div aria-hidden className="pointer-events-none absolute inset-2.5">
                      <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-frame" />
                      <span className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-frame" />
                      <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-frame" />
                      <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-frame" />
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between gap-3 border-t border-ink/10 pt-2.5">
                    <span className="mono-label min-w-0 truncate text-[0.6rem] text-ink-soft">
                      {video.caption}
                    </span>
                    <span className="mono-label hidden shrink-0 text-[0.6rem] font-bold text-ink sm:block">
                      {video.format}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
