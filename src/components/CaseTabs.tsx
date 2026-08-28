"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  id: string;
  label: string;
  shortLabel: string;
  content: ReactNode;
}

export function CaseTabs({
  tabs,
  personality = "casualist",
}: {
  tabs: TabItem[];
  personality?: "eccentric" | "incline" | "casualist";
}) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");

  return (
    <div>
      <div
        className={cn(
          "flex gap-1 overflow-x-auto border-b-2 border-ink pb-px",
          personality === "incline" && "[transform:skewX(-6deg)] -mx-2"
        )}
        role="tablist"
        aria-label="Case study sections"
      >
        {tabs.map((tab, i) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={cn(
                "mono-label group relative shrink-0 px-3 pb-3 pt-2 text-xs transition-colors sm:px-5",
                isActive ? "font-bold text-ink" : "text-ink-faint hover:text-ink",
                personality === "eccentric" &&
                  i % 2 === 1 &&
                  "[transform:rotate(1.5deg)] origin-bottom-left"
              )}
            >
              <span className="mr-1.5 text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
              {tab.label}
              {isActive && (
                <span
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-ink"
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={tab.id !== active}
            className={cn(
              tab.id === active && "animate-reveal-up",
              personality === "casualist" && "texture-paper-2 p-6 sm:p-8"
            )}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
