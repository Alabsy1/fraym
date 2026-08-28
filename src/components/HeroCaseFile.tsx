"use client";

import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { usePageTransition } from "@/components/transition/PageTransitionProvider";
import { serviceBySlug } from "@/lib/data";
import { cn } from "@/lib/cn";

export type TabId = "frame" | "direct" | "signal" | "full";

interface TabContent {
  id: TabId;
  label: string;
  ref: string;
  clientType: string;
  industry: string;
  location: string;
  date: string;
  status: string;
}

const tabs: TabContent[] = [
  {
    id: "frame",
    label: "FRAME",
    ref: "FR-001",
    clientType: "Hospitality / Lifestyle",
    industry: "Experience Driven",
    location: "Global",
    date: "May 24, 2025",
    status: "Open",
  },
  {
    id: "direct",
    label: "DIRECT",
    ref: "DR-002",
    clientType: "Brand Motion",
    industry: "Production",
    location: "On-Set",
    date: "Mar 15, 2025",
    status: "Active",
  },
  {
    id: "signal",
    label: "SIGNAL",
    ref: "SG-003",
    clientType: "Perception Audit",
    industry: "Strategy",
    location: "Worldwide",
    date: "Jan 22, 2025",
    status: "Open",
  },
  {
    id: "full",
    label: "FULL",
    ref: "FF-004",
    clientType: "Full Case",
    industry: "Creative",
    location: "Copenhagen",
    date: "Jun 10, 2025",
    status: "Active",
  },
];

interface FolderTab {
  id: string;
  label: string;
  slug: string;
  color: string;
  activeColor: string;
  textColor: string;
}

const folderTabs: FolderTab[] = [
  { id: "open", label: "OPEN FILE", slug: "", color: "#c8a84e", activeColor: "#b89838", textColor: "#1f1c16" },
  { id: "evidence", label: "EVIDENCE", slug: "frame", color: "#d4c4a8", activeColor: "#c4b498", textColor: "#1f1c16" },
  { id: "observation", label: "OBSERVATION", slug: "signal", color: "#7a9ab0", activeColor: "#6a8aa0", textColor: "#fff" },
  { id: "execution", label: "EXECUTION", slug: "direct", color: "#c4604a", activeColor: "#b45040", textColor: "#fff" },
  { id: "results", label: "RESULTS", slug: "full-frame", color: "#8a9a6a", activeColor: "#7a8a5a", textColor: "#fff" },
];

const slugToTabId: Record<string, TabId> = {
  frame: "frame",
  direct: "direct",
  signal: "signal",
  "full-frame": "full",
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.45, ease: EASE },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

export function HeroCaseFile({
  active,
  onSelect,
}: {
  active: TabId;
  onSelect: (id: TabId, point?: { x: number; y: number }) => void;
}) {
  const router = useRouter();
  const { start } = usePageTransition();
  const reduced = useReducedMotion();

  const tab = tabs.find((t) => t.id === active) ?? tabs[0];

  const handleTabClick = (folderTab: FolderTab, e: React.MouseEvent) => {
    e.stopPropagation();

    if (folderTab.id === "open") {
      onSelect("frame", { x: e.clientX, y: e.clientY });
      return;
    }

    const service = serviceBySlug(folderTab.slug);
    if (service) {
      start(service, e.currentTarget.getBoundingClientRect());
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    onSelect(active, { x: e.clientX, y: e.clientY });
  };

  return (
    <motion.div
      className="relative w-full lg:h-full"
      variants={reduced ? undefined : stagger}
      initial="hidden"
      animate="show"
    >
      <div
        className="relative h-full cursor-pointer select-none transition-transform duration-200 hover:-rotate-[0.3deg] hover:scale-[1.005]"
        onClick={handleCardClick}
      >
        {/* ── Full manila folder background ── */}
        <motion.img
          src="/layer1.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          variants={reduced ? undefined : fadeUp}
        />

        {/* ── Content rendered directly on the folder ── */}
        <motion.div
          className="absolute inset-0 flex flex-col p-[8%] pr-[18%]"
          variants={reduced ? undefined : fadeIn}
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-ink/60 pb-3">
            <div>
              <p className="mono-label text-ink-faint">CASE FILE</p>
              <p className="font-mono text-xl font-bold tracking-tight text-ink sm:text-2xl">
                {tab.ref}
              </p>
            </div>
          </div>

          {/* Metadata fields */}
          <div className="mt-5 flex-1 space-y-4">
            <Field label="CLIENT TYPE" value={tab.clientType} />
            <Field label="INDUSTRY" value={tab.industry} />
            <Field label="LOCATION" value={tab.location} />
            <Field label="DATE" value={tab.date} />
            <Field label="STATUS" value={tab.status} highlight />
          </div>

          {/* Bottom: Globe + CONFIDENTIAL */}
          <div className="relative mt-auto flex items-end justify-between">
            <Globe className="pointer-events-none w-20 sm:w-24" />
            <ConfidentialStampInline />
          </div>
        </motion.div>

        {/* ── Interactive folder tabs ── */}
        <motion.div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Case file systems"
          className="absolute right-0 top-[6%] z-30 flex flex-col"
          variants={reduced ? undefined : slideRight}
        >
          {folderTabs.map((folderTab) => {
            const mappedId = slugToTabId[folderTab.slug];
            const isActive =
              folderTab.id === "open"
                ? false
                : mappedId === active;

            return (
              <button
                key={folderTab.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                title={
                  folderTab.id === "open"
                    ? "Open the dossier"
                    : `Open the ${folderTab.label} file`
                }
                onClick={(e) => handleTabClick(folderTab, e)}
                className={cn(
                  "mono-label cursor-pointer select-none px-1.5 py-2 text-[0.45rem] font-bold shadow-stack [writing-mode:vertical-rl] transition-all duration-200 sm:px-2 sm:py-2.5 sm:text-[0.55rem]",
                  isActive
                    ? "shadow-window scale-105"
                    : "opacity-85 hover:scale-105 hover:opacity-100"
                )}
                style={{
                  backgroundColor: isActive ? folderTab.activeColor : folderTab.color,
                  color: folderTab.textColor,
                  transform: `rotate(${isActive ? 0 : 1}deg)`,
                }}
              >
                {folderTab.label}
              </button>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── metadata field row ──────────────────────────────────── */
function Field({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <dt className="mono-label text-[0.6rem] font-bold text-ink-faint mb-0.5 uppercase tracking-wider">
        {label}:
      </dt>
      {highlight ? (
        <dd className="mono-label inline-block bg-frame/40 px-2 py-0.5 font-bold text-ink text-[0.7rem] tracking-wider uppercase">
          {value}
        </dd>
      ) : (
        <dd className="mono-label text-[0.7rem] font-semibold text-ink tracking-wide">
          {value}
        </dd>
      )}
    </div>
  );
}

/* ── CONFIDENTIAL stamp ──────────────────────────────────── */
function ConfidentialStampInline() {
  return (
    <span
      aria-hidden
      className="inline-block -rotate-6 border-[2px] border-signal px-3 py-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.25em] text-signal opacity-80 sm:text-xs"
    >
      CONFIDENTIAL
    </span>
  );
}

/* ── realistic metallic barcode ──────────────────────────── */
function Barcode({ code }: { code: string }) {
  const bars = [2, 1, 3, 1, 1, 4, 2, 1, 3, 2, 1, 1, 2, 3, 1, 4, 1, 2, 1, 1, 3, 2, 2, 1];
  const heights = [14, 20, 10, 22, 16, 20];
  return (
    <div className="flex h-9 items-end gap-[2px]" aria-hidden>
      {bars.map((w, i) => (
        <span
          key={i}
          className="bg-ink"
          style={{ width: `${w}px`, height: `${heights[i % heights.length]}px` }}
        />
      ))}
      <span className="mono-label ml-2 text-[0.5rem] text-ink-soft">
        {code}
      </span>
    </div>
  );
}

/* ── antique globe ────────────────────────────────────────── */
function Globe({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 100 100"
      fill="none"
    >
      <path d="M33 82 L67 82 L61 95 H39 Z" fill="#5e4352" />
      <ellipse cx="50" cy="96" rx="15" ry="2.6" fill="#5b3a5c" />
      <line x1="50" y1="12" x2="50" y2="70" stroke="#5b3a5c" strokeWidth="2" />
      <circle
        cx="50"
        cy="43"
        r="29"
        fill="#e9dcc4"
        fillOpacity="0.35"
        stroke="#b9613e"
        strokeWidth="1.6"
      />
      <ellipse cx="50" cy="43" rx="11" ry="29" stroke="#b9613e" strokeWidth="0.9" />
      <ellipse
        cx="50"
        cy="43"
        rx="23"
        ry="29"
        stroke="#b9613e"
        strokeWidth="0.6"
        opacity="0.7"
      />
      <ellipse
        cx="50"
        cy="43"
        rx="29"
        ry="11"
        stroke="#b9613e"
        strokeWidth="0.6"
        opacity="0.7"
      />
      <ellipse
        cx="50"
        cy="43"
        rx="29"
        ry="10"
        stroke="#b9613e"
        strokeWidth="1.1"
      />
      <path
        d="M37 33 q -6 4 -8 10 q 6 5 10 2 q 4 -6 0 -10 Z"
        fill="#b9613e"
        fillOpacity="0.5"
      />
      <path
        d="M61 51 q 5 2 7 9 q -5 7 -11 4 q -2 -9 4 -13 Z"
        fill="#b9613e"
        fillOpacity="0.5"
      />
      <path d="M17 39 A 34 34 0 0 1 83 39" stroke="#b9613e" strokeWidth="1.6" />
      <path d="M17 47 A 34 34 0 0 0 83 47" stroke="#b9613e" strokeWidth="1.6" />
    </svg>
  );
}
