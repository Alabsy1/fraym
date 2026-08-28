"use client";

import { useMemo, useState } from "react";
import { cases, industries } from "@/lib/data";
import { CaseCard } from "./CaseCard";
import { cn } from "@/lib/cn";

export function CasesExplorer() {
  const [industry, setIndustry] = useState("All Industries");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(
    () =>
      industry === "All Industries"
        ? cases
        : cases.filter((c) => c.industry === industry),
    [industry]
  );

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {industries.map((ind) => {
            const active = industry === ind;
            return (
              <button
                key={ind}
                type="button"
                onClick={() => setIndustry(ind)}
                className={cn(
                  "mono-label border px-3.5 py-2 transition-colors",
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/20 bg-paper text-ink-soft hover:border-ink/50 hover:text-ink"
                )}
              >
                {ind}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <p className="mono-label mr-2 text-ink-soft">
            {filtered.length} file{filtered.length === 1 ? "" : "s"}
          </p>
          <div className="flex border border-ink/20">
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-label="Grid view"
              className={cn(
                "flex size-9 items-center justify-center transition-colors",
                view === "grid" ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
              )}
            >
              <svg className="size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <rect x="1" y="1" width="6" height="6" />
                <rect x="9" y="1" width="6" height="6" />
                <rect x="1" y="9" width="6" height="6" />
                <rect x="9" y="9" width="6" height="6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              aria-label="List view"
              className={cn(
                "flex size-9 items-center justify-center transition-colors",
                view === "list" ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
              )}
            >
              <svg className="size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <rect x="1" y="2" width="4" height="3" />
                <rect x="7" y="2" width="8" height="3" />
                <rect x="1" y="6.5" width="4" height="3" />
                <rect x="7" y="6.5" width="8" height="3" />
                <rect x="1" y="11" width="4" height="3" />
                <rect x="7" y="11" width="8" height="3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "mt-10",
          view === "grid"
            ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-5"
        )}
      >
        {filtered.map((item) => (
          <CaseCard key={item.slug} item={item} layout={view} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 border border-dashed border-ink/20 py-20 text-center">
          <p className="hand text-2xl text-ink-soft">
            nothing filed here yet — check another drawer.
          </p>
        </div>
      )}
    </div>
  );
}
