import Link from "next/link";
import { contact, services } from "@/lib/data";
import { VerbTriad } from "./ui/VerbTriad";
import { Wordmark } from "./ui/Wordmark";
import { Marquee } from "./ui/Marquee";
import { CtaLink } from "./ui/CtaLink";

const explore = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Cases", href: "/cases" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-ink/10 bg-paper-2">
      <div className="border-b border-ink/10 bg-signal py-3 text-white">
        <Marquee slow>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mono-label mx-6 flex items-center gap-6">
              LOOK CLOSER
              <span aria-hidden>✳</span>
              FIND WHAT MATTERS
              <span aria-hidden>✳</span>
              FRAME IT DIFFERENTLY
              <span aria-hidden>✳</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <VerbTriad size="compact" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-soft">
              FRAYM is a creative + business solutions studio. We investigate
              what brands, businesses and experiences need, then use strategy,
              creative direction and production to move them forward.
            </p>
            <div className="mt-6">
              <CtaLink href="/contact">Open a Case</CtaLink>
            </div>
          </div>

          <div>
            <h3 className="mono-label mb-4 text-ink">Explore</h3>
            <ul className="space-y-2.5">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mono-label mb-4 text-ink">Systems</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {s.system}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mono-label mb-3 mt-8 text-ink">Studio</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  About the studio
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mono-label mb-4 text-ink">Contact</h3>
            <ul className="space-y-2.5 text-sm text-ink-soft">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-ink"
                >
                  {contact.email}
                </a>
              </li>
              <li>{contact.phone}</li>
              <li>
                {contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </li>
            </ul>
            <div className="mt-6 flex gap-4">
              {contact.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mono-label text-ink-soft transition-colors hover:text-ink"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-ink/10 pt-6 sm:flex-row sm:items-center">
          <Wordmark />
          <p className="mono-label text-ink-soft">
            © {new Date().getFullYear()} FRAYM — A Creative + Business
            Solutions Studio. We observe. We direct. We frame.
          </p>
        </div>
      </div>
    </footer>
  );
}
