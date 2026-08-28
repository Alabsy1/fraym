import { clientLogos } from "@/lib/data";
import { Marquee } from "./ui/Marquee";

const styles = [
  { font: "font-display", weight: "font-bold", tracking: "tracking-tight" },
  { font: "font-sans", weight: "font-black", tracking: "tracking-widest" },
  { font: "font-display", weight: "font-medium italic", tracking: "" },
  { font: "font-mono", weight: "font-bold", tracking: "tracking-[0.3em]" },
];

export function LogoMarquee() {
  return (
    <div className="border-y border-ink/15 bg-paper-2 py-6">
      <p className="mono-label mx-auto mb-5 max-w-7xl px-4 text-center text-ink-soft sm:px-6 lg:px-8">
        Clients whose perception we have framed
      </p>
      <Marquee slow>
        {clientLogos.map((name, i) => {
          const s = styles[i % styles.length];
          return (
            <span
              key={name}
              className={`mx-8 whitespace-nowrap text-2xl text-ink/70 sm:text-3xl ${s.font} ${s.weight} ${s.tracking}`}
            >
              {name}
            </span>
          );
        })}
      </Marquee>
    </div>
  );
}
