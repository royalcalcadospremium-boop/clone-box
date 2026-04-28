/* ─── HeroBanner ─────────────────────────────────────────────────────────
 * Three featured-content cards laid out in a 1-col (mobile) / 3-col (md+)
 * responsive grid. Each card uses a gradient div as a media placeholder.
 * ──────────────────────────────────────────────────────────────────────── */

import React from "react";

/* ── Placeholder media gradients ────────────────────────────────────────── */
function MediaTealDark() {
  return (
    <div
      className="w-full h-full"
      style={{
        background:
          "linear-gradient(135deg, #0d3d40 0%, #0a2a2c 40%, #0f1113 100%)",
      }}
      aria-hidden="true"
    />
  );
}

function MediaBlueDark() {
  return (
    <div
      className="w-full h-full"
      style={{
        background:
          "linear-gradient(135deg, #0d1f3d 0%, #0b1929 50%, #0f1113 100%)",
      }}
      aria-hidden="true"
    />
  );
}

function MediaSplitPanel() {
  return (
    <div
      className="w-full h-full flex"
      aria-hidden="true"
    >
      {/* Left panel */}
      <div
        className="flex-1"
        style={{
          background:
            "linear-gradient(135deg, #1a1230 0%, #0f0c20 100%)",
        }}
      />
      {/* Divider */}
      <div className="w-px bg-hf-border opacity-40" />
      {/* Right panel */}
      <div
        className="flex-1"
        style={{
          background:
            "linear-gradient(135deg, #0f1a2e 0%, #0a1020 100%)",
        }}
      />
    </div>
  );
}

/* ── Card data types ─────────────────────────────────────────────────────── */
interface HeroCardData {
  /** Small label shown inside the card overlay (optional) */
  overlayLabel?: string;
  /** Large title shown inside the card overlay (optional) */
  overlayTitle?: string;
  /** Caption title below the card */
  belowTitle: string;
  /** Caption subtitle below the card */
  belowSubtitle: string;
  /** The media placeholder element to render */
  media: React.ReactNode;
}

const CARDS: HeroCardData[] = [
  {
    overlayLabel: "OpenAI × Ninja Box",
    overlayTitle: "GPT IMAGE 2.0",
    belowTitle: "GPT IMAGE 2",
    belowSubtitle: "4K images with near-perfect text rendering",
    media: <MediaTealDark />,
  },
  {
    belowTitle: "KLING 3.0 IN 4K",
    belowSubtitle: "Cinema-grade video at full 4K resolution",
    media: <MediaBlueDark />,
  },
  {
    overlayTitle: "MARKETING STUDIO",
    overlayLabel: "Powered by Hermes Agent",
    belowTitle: "MARKETING STUDIO FOR APPS",
    belowSubtitle: "Powered by Hermes Agent",
    media: <MediaSplitPanel />,
  },
];

/* ── Single card ─────────────────────────────────────────────────────────── */
function HeroCard({ card }: { card: HeroCardData }) {
  return (
    <article className="flex flex-col">
      {/* Card with media + overlay */}
      <div className="relative overflow-hidden rounded-xl cursor-pointer group/card">
        {/* Media area */}
        <div className="aspect-[16/10] bg-hf-surface-2 w-full overflow-hidden">
          {card.media}
        </div>

        {/* Bottom gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
          aria-hidden="true"
        />

        {/* Overlay text */}
        {(card.overlayLabel || card.overlayTitle) && (
          <div className="absolute bottom-3 left-3 flex flex-col gap-0.5">
            {card.overlayLabel && (
              <span className="text-[11px] text-white/70 uppercase tracking-widest leading-none">
                {card.overlayLabel}
              </span>
            )}
            {card.overlayTitle && (
              <span className="text-2xl md:text-3xl font-bold uppercase text-white leading-none">
                {card.overlayTitle}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Below-card caption */}
      <p className="text-[13px] font-semibold text-hf-text uppercase tracking-[0.08em] mt-2">
        {card.belowTitle}
      </p>
      <p className="text-[13px] text-hf-text-muted mt-0.5">
        {card.belowSubtitle}
      </p>
    </article>
  );
}

/* ── Main export ──────────────────────────────────────────────────────────── */
export function HeroBanner() {
  return (
    <section
      className="relative px-0 pt-2 md:pt-3 mb-6 md:mb-8 z-0"
      aria-label="Featured content"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-1.5">
        {CARDS.map((card) => (
          <HeroCard key={card.belowTitle} card={card} />
        ))}
      </div>
    </section>
  );
}

export default HeroBanner;
