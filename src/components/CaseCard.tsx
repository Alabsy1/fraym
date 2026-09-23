import Link from "next/link";
import type { CaseStudy } from "@/lib/data";
import { CaseCover } from "./CaseCover";
import { InspectionView } from "./ui/InspectionView";
import { cn } from "@/lib/cn";

export function StatusBadge({ status }: { status: CaseStudy["status"] }) {
  return (
    <span
      className={cn(
        "mono-label inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.6rem] font-bold",
        status === "closed"
          ? "bg-moss text-white"
          : "border border-signal bg-paper text-signal"
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "closed" ? "bg-white" : "animate-pulse-dot bg-signal"
        )}
      />
      {status === "closed" ? "Case Closed" : "In Progress"}
    </span>
  );
}

export function CaseCard({
  item,
  layout = "grid",
  className,
  inspect = false,
}: {
  item: CaseStudy;
  layout?: "grid" | "list";
  className?: string;
  inspect?: boolean;
}) {
  if (layout === "list") {
    return (
      <Link
        href={`/cases/${item.slug}`}
        className={cn(
          "group grid gap-6 border border-ink/15 bg-paper p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-window sm:grid-cols-[240px_1fr] sm:p-5",
          className
        )}
      >
        {inspect ? (
          <InspectionView>
            <CaseCover item={item} />
          </InspectionView>
        ) : (
          <CaseCover item={item} />
        )}
        <div className="flex flex-col justify-between gap-4 py-1">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={item.status} />
              <span className="mono-label text-ink-faint">
                {item.industry} · {item.year}
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink group-hover:underline">
              {item.client}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
              {item.summary}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {item.services.map((s) => (
                <span
                  key={s}
                  className="mono-label border border-ink/15 bg-paper-2 px-2 py-0.5 text-[0.6rem] text-ink-soft"
                >
                  {s.replace("-", " ")}
                </span>
              ))}
            </div>
            <span className="mono-label text-ink-soft">
              View case <span aria-hidden>→</span>
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/cases/${item.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden border border-ink/15 bg-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-window",
        className
      )}
    >
      <div className="relative">
        {inspect ? (
          <InspectionView>
            <CaseCover item={item} />
          </InspectionView>
        ) : (
          <CaseCover item={item} />
        )}
        <div className="absolute left-3 top-3">
          <StatusBadge status={item.status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-ink group-hover:underline">
            {item.client}
          </h3>
          <span aria-hidden className="text-ink-faint transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
        <p className="text-sm leading-relaxed text-ink-soft">{item.summary}</p>
        {item.question && (
          <div>
            <p className="mono-label text-ink-faint">The question</p>
            <p className="mt-1 text-sm italic leading-relaxed text-ink">
              {item.question}
            </p>
          </div>
        )}
        <div className="mt-auto flex items-center justify-between border-t border-ink/10 pt-3">
          <span className="mono-label text-ink-faint">
            {item.industry} · {item.year}
          </span>
          <div className="flex gap-1.5">
            {item.services.map((s) => (
              <span
                key={s}
                className="mono-label border border-ink/15 px-1.5 py-0.5 text-[0.55rem] text-ink-soft"
              >
                {s.replace("-", " ")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
