"use client";

import type { Service } from "@/lib/data";
import { CtaLink } from "@/components/ui/CtaLink";
import { usePageTransition } from "./PageTransitionProvider";

export function ServiceOpenLink({
  service,
  href,
  children,
  tone = "ink",
  size = "md",
  className,
}: {
  service: Service;
  href: string;
  children: React.ReactNode;
  tone?: "signal" | "tape" | "ink" | "moss";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { start } = usePageTransition();

  return (
    <CtaLink
      href={href}
      tone={tone}
      size={size}
      className={className}
      onClick={(e) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
          return;
        e.preventDefault();
        start(service, e.currentTarget.getBoundingClientRect());
      }}
    >
      {children}
    </CtaLink>
  );
}
