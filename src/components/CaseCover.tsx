import type { CSSProperties } from "react";
import type { CaseStudy } from "@/lib/data";
import { softBg, softBorder } from "@/lib/color";

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const rot = (deg: number): CSSProperties => ({ transform: `rotate(${deg}deg)` });

export function CaseCover({ item }: { item: CaseStudy }) {
  const h = hash(item.slug);
  const a = (h % 13) - 6;
  const c = item.accent;

  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden border border-ink/15 ${softBg(c)}`}
      aria-hidden
    >
      {/* archival paper base */}
      <div className="texture-paper absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 22% 26%, rgba(120,90,50,0.28), transparent 48%), radial-gradient(ellipse at 82% 72%, rgba(90,60,40,0.2), transparent 44%)",
        }}
      />
      <div className="grid-lines absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_12%,transparent_74%)]" />

      {/* personality collage */}
      {item.personality === "eccentric" && <EccentricCollage item={item} a={a} />}
      {item.personality === "incline" && <InclineCollage />}
      {item.personality === "casualist" && <CasualistCollage item={item} />}

      {/* bottom bar */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
        <span className={`mono-label border ${softBorder(c)} bg-paper px-2 py-1 text-[0.6rem]`}>
          {item.industry}
        </span>
        <span className="mono-label text-[0.6rem] text-ink-soft">
          {item.year} · {item.personality}
        </span>
      </div>
    </div>
  );
}

/* ── Eccentric: bright contact sheet, stickers, evidence ── */
function EccentricCollage({
  item,
  a,
}: {
  item: CaseStudy;
  a: number;
}) {
  return (
    <div className="absolute inset-0">
      {/* contact sheet */}
      <div className="absolute left-[10%] top-[12%] w-[54%] overflow-hidden border border-ink/20 bg-paper shadow-paper" style={rot(a)}>
        <div className="aspect-[4/3] bg-gradient-to-br from-terracotta via-paper to-plum" />
        <div className="flex justify-between px-2 py-1">
          <span className="mono-label text-[0.5rem] text-ink-faint">contact sheet 04</span>
          <span className="mono-label text-[0.5rem] text-ink-faint">{item.client}</span>
        </div>
      </div>

      {/* post-it */}
      <div className="absolute right-[10%] top-[40%] w-[34%] border border-ink/10 bg-frame/85 px-2 py-2 shadow-stack" style={rot(a + 5)}>
        <div className="grid-lines-sm aspect-square bg-paper/50" />
        <p className="hand mt-1 text-center text-lg leading-none text-ink">
          note to self
        </p>
      </div>

      {/* tape + evidence stamp */}
      <div className="tape absolute left-[18%] top-[16%] h-6 w-24" style={{ "--tape-color": "var(--color-frame)" } as CSSProperties} />
      <span className="absolute left-[8%] top-[64%] -rotate-12 border-2 border-signal px-1.5 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-signal opacity-80">
        Evidence
      </span>

      {/* barcode sticker */}
      <BarcodeSticker className="absolute bottom-[22%] right-[6%]" />

      <Filmstrip className="absolute bottom-[24%] left-[22%] w-[40%]" />
    </div>
  );
}

/* ── Incline: film still on a diagonal, strips + label ── */
function InclineCollage() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-x-[-15%] top-[6%] h-[64%] origin-bottom-left border-y border-ink/15 bg-paper-2"
        style={{ transform: "rotate(6deg)" }}
      >
        <div className="mx-[16%] mt-[5%] aspect-[16/9] overflow-hidden border border-ink/25 bg-paper shadow-paper">
          <div className="h-full w-full bg-gradient-to-br from-frame/55 via-paper to-tape/45" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="hand text-xl text-ink-soft">still 07</span>
          </div>
        </div>
      </div>

      {/* filmstrip */}
      <Filmstrip className="absolute bottom-[20%] right-[8%] w-[34%]" />

      {/* label */}
      <div className="absolute bottom-[14%] left-[6%] border border-ink/15 bg-paper px-3 py-1.5 shadow-stack" style={rot(-2)}>
        <p className="hand text-lg leading-none text-ink-soft">from the cut</p>
      </div>

      <div className="tape absolute right-[10%] top-[10%] h-6 w-20" style={{ "--tape-color": "var(--color-tape)" } as CSSProperties} />
      <span className="absolute right-[6%] top-[52%] rotate-6 border-2 border-tape px-1.5 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-tape opacity-80">
        Directed
      </span>
    </div>
  );
}

/* ── Casualist: overlapping worn-in polaroids ── */
function CasualistCollage({
  item,
}: {
  item: CaseStudy;
}) {
  return (
    <div className="absolute inset-0 p-[10%]">
      <div className="absolute left-[14%] top-[14%] w-[54%] border border-ink/15 bg-white p-2 pb-3 shadow-paper" style={rot(-2)}>
        <div className="grid-lines-sm relative aspect-[4/3] w-full bg-paper-3">
          <PhotoCorners />
        </div>
        <p className="hand mt-1.5 text-center text-lg leading-none text-ink-soft">
          {item.client} — worn in
        </p>
      </div>

      <div className="absolute right-[8%] top-[42%] w-[46%] border border-ink/20 bg-white p-2 pb-2.5 shadow-stack" style={rot(3)}>
        <div className="aspect-[3/2] w-full bg-gradient-to-br from-moss/50 to-paper" />
        <p className="hand mt-1 text-center text-sm leading-none text-ink-faint">
          no retouch
        </p>
      </div>

      <div className="tape absolute left-[16%] top-[30%] h-5 w-20" style={{ "--tape-color": "var(--color-moss)" } as CSSProperties} />

      <span className="absolute bottom-[20%] left-[46%] -rotate-6 border-2 border-moss px-1.5 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-moss opacity-80">
        Framed
      </span>
    </div>
  );
}

function Filmstrip({ className }: { className?: string }) {
  return (
    <div className={`relative bg-ink p-[3px] shadow-stack ${className ?? ""}`}>
      <div className="absolute inset-x-[6%] top-[10%] h-[3px] bg-paper/15" />
      <div className="absolute inset-x-[6%] bottom-[10%] h-[3px] bg-paper/15" />
      <div className="flex gap-[3px]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 bg-paper-2">
            <div className="m-[2px] aspect-[3/2] bg-gradient-to-br from-signal/30 via-paper to-tape/30" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PhotoCorners() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M4 12 V 4 H 12 M96 12 V 4 H 88 M4 88 V 96 H 12 M96 88 V 96 H 88"
        stroke="#8a8271"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BarcodeSticker({ className }: { className?: string }) {
  const bars = [2, 1, 3, 1, 1, 4, 2, 1, 3, 2];
  return (
    <div
      className={`flex h-8 items-end gap-[2px] border border-ink/10 bg-paper px-1.5 py-1 shadow-stack ${className ?? ""}`}
    >
      {bars.map((w, i) => (
        <span
          key={i}
          className="bg-ink"
          style={{ width: `${w}px`, height: `${[9, 14, 7, 16, 11, 13][i % 6]}px` }}
        />
      ))}
      <span className="mono-label ml-1 text-[0.45rem] text-ink-soft">FR</span>
    </div>
  );
}
