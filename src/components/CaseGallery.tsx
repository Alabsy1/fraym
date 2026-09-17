"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tape } from "@/components/ui/Tape";
import { Reveal } from "@/components/ui/Reveal";

interface GalleryImage {
  src: string;
  caption: string;
}

const ROTATIONS = [-2, 1.5, -1, 2, -1.5];

export function CaseGallery({ images }: { images: GalleryImage[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="border-t border-ink/10 bg-paper-2">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <p className="mono-label flex items-center gap-2 text-ink-soft">
            <span className="inline-block h-px w-8 bg-ink/30" />
            Evidence Gallery
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
            Selected visuals
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {images.map((img, i) => (
            <Reveal key={img.src} delay={i * 80}>
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative block w-full text-left"
              >
                <div
                  className="relative border border-ink/10 bg-white p-2 pb-3 shadow-paper transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-[1.02] group-hover:shadow-window sm:p-2.5 sm:pb-4"
                  style={{ transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)` }}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-3">
                    <img
                      src={img.src}
                      alt={img.caption}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="mono-label mt-2 text-center text-[0.5rem] text-ink-faint sm:text-[0.6rem]">
                    {img.caption}
                  </p>
                </div>
                <Tape
                  color="var(--color-tape)"
                  rotation={ROTATIONS[(i + 1) % ROTATIONS.length]}
                  className="absolute -left-1 -top-2 sm:-left-2 sm:-top-2.5"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image"
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-h-[85vh] max-w-[90vw]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightbox].src}
                alt={images[lightbox].caption}
                className="max-h-[80vh] rounded border border-ink/20 object-contain shadow-window"
              />
              <p className="mono-label mt-3 text-center text-[0.65rem] text-paper/80">
                {images[lightbox].caption}
              </p>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute -right-3 -top-3 flex size-8 items-center justify-center rounded-full border border-ink/20 bg-paper text-ink shadow-stack transition-colors hover:bg-ink hover:text-paper"
                aria-label="Close"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
