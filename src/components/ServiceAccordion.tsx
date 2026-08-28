"use client";

import { useState } from "react";
import Link from "next/link";
import { services, type Service } from "@/lib/data";
import { solid, textColor, textOn } from "@/lib/color";
import { CtaLink } from "./ui/CtaLink";
import { cn } from "@/lib/cn";

export function ServiceAccordion() {
  const [open, setOpen] = useState<string | null>("frame");

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {services.map((service) => {
        const isOpen = open === service.slug;
        return (
          <ServiceRow
            key={service.slug}
            service={service}
            isOpen={isOpen}
            onToggle={() => setOpen(isOpen ? null : service.slug)}
          />
        );
      })}
    </div>
  );
}

function ServiceRow({
  service,
  isOpen,
  onToggle,
}: {
  service: Service;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const c = service.color;
  return (
    <div className={cn("transition-colors", isOpen && "bg-paper-2/60")}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-2 py-6 text-left sm:gap-6 sm:px-4"
      >
        <span className={`${solid(c)} ${textOn(c)} hidden h-12 w-12 items-center justify-center font-mono text-sm font-bold sm:flex`}>
          {service.number}
        </span>
        <span className="flex flex-col">
          <span className="mono-label text-ink-soft">{service.system}</span>
          <span className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {service.short}
          </span>
          <span className={`hand mt-0.5 text-lg ${textColor(c)}`}>
            {service.verb}
          </span>
        </span>
        <span
          aria-hidden
          className={cn(
            "flex size-10 shrink-0 items-center justify-center border border-ink/20 text-ink transition-transform duration-300",
            isOpen && "rotate-45 bg-ink text-paper"
          )}
        >
          +
        </span>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="grid gap-10 px-2 pb-8 sm:px-4 lg:grid-cols-[1fr_1fr_1.1fr]">
            <div>
              <p className="mono-label mb-3 text-ink-soft">Position</p>
              <p className="text-sm leading-relaxed text-ink-soft">
                {service.position}
              </p>
              <div className="mt-6">
                <CtaLink href={`/services/${service.slug}`} tone="ink" size="sm">
                  Open the {service.short.toLowerCase()} file
                </CtaLink>
              </div>
            </div>

            <div>
              <p className="mono-label mb-3 text-ink-soft">Deliverables</p>
              <ul className="space-y-2">
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2.5 text-sm text-ink-soft"
                  >
                    <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${solid(c)}`} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mono-label mb-3 text-ink-soft">Process</p>
              <ol className="space-y-4">
                {service.process.map((step, i) => (
                  <li key={step.step} className="relative flex gap-3.5">
                    <span className="flex flex-col items-center">
                      <span
                        className={`flex size-6 shrink-0 items-center justify-center font-mono text-[0.65rem] font-bold ${solid(c)} ${textOn(c)}`}
                      >
                        {i + 1}
                      </span>
                      {i < service.process.length - 1 && (
                        <span className="mt-1 w-px flex-1 bg-ink/15" />
                      )}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{step.step}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">
                        {step.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServiceAccordionLink({
  service,
}: {
  service: Service;
}) {
  const c = service.color;
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group flex items-center justify-between border border-ink/15 bg-paper p-5 transition-all hover:-translate-y-0.5 hover:shadow-window`}
    >
      <span className="flex items-center gap-4">
        <span className={`${solid(c)} ${textOn(c)} flex size-10 items-center justify-center font-mono text-xs font-bold`}>
          {service.number}
        </span>
        <span>
          <span className="mono-label block text-ink-soft">{service.system}</span>
          <span className="font-display text-2xl font-semibold text-ink">
            {service.short}
          </span>
        </span>
      </span>
      <span aria-hidden className="text-ink transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
