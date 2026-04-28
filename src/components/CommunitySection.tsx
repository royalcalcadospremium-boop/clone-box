/* ─── CommunitySection ──────────────────────────────────────────────────────
 * Reusable community gallery section. Used multiple times on the page
 * (Soul Cinema, Soul 2.0, Mixed Media, Effects, Apps, Soul, Kling, etc.)
 * ──────────────────────────────────────────────────────────────────────── */

import React from "react";
import { ExternalLink, Heart } from "lucide-react";

/* ── Types ───────────────────────────────────────────────────────────────── */
interface CommunitySectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  viewAllHref: string;
  viewAllLabel: string;
  ctaLabel: string;
  ctaHref: string;
  accentColor?: string; // defaults to hf-neon
  items?: number; // number of placeholder thumbnails, default 12
}

/* ── Gradient palette for thumbnails ─────────────────────────────────────── */
const THUMB_GRADIENTS: string[] = [
  "linear-gradient(135deg, #334155 0%, #0f172a 100%)",
  "linear-gradient(135deg, #44403c 0%, #1c1917 100%)",
  "linear-gradient(135deg, #1e3a5f 0%, #0a1929 100%)",
  "linear-gradient(135deg, #3b2a4a 0%, #1a0f2e 100%)",
  "linear-gradient(135deg, #0f3d30 0%, #041f17 100%)",
  "linear-gradient(135deg, #4a3000 0%, #1a1000 100%)",
  "linear-gradient(135deg, #1a2a44 0%, #0b1520 100%)",
  "linear-gradient(135deg, #3d1f3d 0%, #1a0a1a 100%)",
  "linear-gradient(135deg, #1f3d2a 0%, #0a1a10 100%)",
  "linear-gradient(135deg, #3d2a1f 0%, #1a100a 100%)",
  "linear-gradient(135deg, #2a2a3d 0%, #10101a 100%)",
  "linear-gradient(135deg, #3d3a1a 0%, #1a1800 100%)",
];

/* ── Thumbnail ───────────────────────────────────────────────────────────── */
interface ThumbProps {
  index: number;
  showBadges: boolean;
}

function Thumbnail({ index, showBadges }: ThumbProps) {
  const gradient = THUMB_GRADIENTS[index % THUMB_GRADIENTS.length];

  return (
    <div className="relative overflow-hidden rounded-xl cursor-pointer group/thumb bg-hf-surface-2 aspect-[16/10]">
      {/* Gradient placeholder */}
      <div
        className="w-full h-full transition-transform duration-200 group-hover/thumb:scale-[1.02]"
        style={{ background: gradient }}
        aria-hidden="true"
      />

      {/* Creator badge (last 2 items only) */}
      {showBadges && (
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gray-400 border border-white/30 flex-shrink-0" />
          <span className="text-[11px] text-white/90 font-medium leading-none">
            creator_name
          </span>
        </div>
      )}

      {/* Like badge (last 2 items only) */}
      {showBadges && (
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 rounded-full px-2 py-0.5">
          <Heart className="w-[10px] h-[10px] text-white/80" />
          <span className="text-[11px] text-white/80 leading-none">
            {(index * 37 + 128) % 999}
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────────────────────── */
export function CommunitySection({
  id,
  title,
  subtitle,
  viewAllHref,
  viewAllLabel,
  ctaLabel,
  ctaHref,
  accentColor,
  items = 12,
}: CommunitySectionProps) {
  const thumbCount = Math.max(1, items);
  const lastTwoStart = thumbCount - 2;

  const accentStyle = accentColor
    ? { color: accentColor, borderColor: accentColor }
    : undefined;

  return (
    <section
      id={id}
      className="mb-10 md:mb-16 scroll-mt-4 md:scroll-mt-20 container relative px-0"
    >
      {/* Header row */}
      <div className="flex justify-between items-start mb-4">
        {/* Left */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-hf-text leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-hf-text-muted mt-1">{subtitle}</p>
          )}
        </div>

        {/* Right — View all link */}
        <a
          href={viewAllHref}
          className="flex items-center gap-1.5 text-sm font-medium text-hf-neon hover:opacity-80 transition-opacity flex-shrink-0 mt-1"
          style={accentColor ? { color: accentColor } : undefined}
          target="_blank"
          rel="noopener noreferrer"
        >
          {viewAllLabel}
          <ExternalLink className="w-[14px] h-[14px]" />
        </a>
      </div>

      {/* Media grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6">
        {Array.from({ length: thumbCount }, (_, i) => (
          <Thumbnail
            key={i}
            index={i}
            showBadges={i >= lastTwoStart}
          />
        ))}
      </div>

      {/* CTA button */}
      <div className="flex justify-center">
        <a
          href={ctaHref}
          className="border border-hf-neon text-hf-neon bg-transparent rounded-full px-6 py-2.5 text-sm font-medium hover:bg-hf-neon-10 transition-colors"
          style={accentStyle}
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}

export default CommunitySection;
