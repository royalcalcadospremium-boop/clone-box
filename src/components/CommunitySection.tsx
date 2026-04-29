import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CommunitySectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  viewAllHref: string;
  viewAllLabel: string;
  ctaLabel: string;
  ctaHref: string;
  accentColor?: string;
  items?: number;
  images?: string[];
}

const COMMUNITY_IMAGES = [
  "https://cdn.higgsfield.ai/card/578d27f2-663d-4817-96e7-89f90426c72c.webp",
  "https://cdn.higgsfield.ai/card/c10ed514-8e43-4390-b20c-58254f837086.webp",
  "https://cdn.higgsfield.ai/card/2230dfb0-c7b6-466e-99ea-f4eee9d08814.webp",
  "https://cdn.higgsfield.ai/card/b1988a79-e9d2-4058-9c90-82ab677b6058.webp",
  "https://cdn.higgsfield.ai/card/0a707acf-5df0-429a-b9e8-e4961d8d01cd.webp",
  "https://cdn.higgsfield.ai/card/a524d80e-204d-40ba-bcd8-39f75dcd5c92.webp",
  "https://cdn.higgsfield.ai/card/7e661736-c838-4789-a053-cfb09990a688.webp",
  "https://cdn.higgsfield.ai/card/96cb52c1-23e9-47a0-badc-239cf0a29570.webp",
  "https://cdn.higgsfield.ai/card/ddd778ac-253e-4251-8d9a-340189a311e8.webp",
  "https://cdn.higgsfield.ai/card/051a430d-eb46-423f-93e7-b450faaf7337.webp",
  "https://cdn.higgsfield.ai/card/e868fb8f-a0af-4f86-ae5a-6f3ac727878e.webp",
  "https://cdn.higgsfield.ai/card/9e7e9e9a-716f-4b59-878c-d3c7f1f7012d.webp",
  "https://cdn.higgsfield.ai/card/14ed53ed-4cad-46a7-9dad-4cebb7d9cd41.webp",
  "https://cdn.higgsfield.ai/card/2b3cc30f-49c4-4868-b1d7-5f56a4c946c3.webp",
  "https://cdn.higgsfield.ai/card/c2124f76-f96f-4df1-870c-03e5ad15fae4.webp",
  "https://cdn.higgsfield.ai/card/153574e6-6f8b-4857-806e-22b37202dd29.webp",
];

export function CommunitySection({
  id,
  title,
  subtitle,
  viewAllHref,
  viewAllLabel,
  ctaLabel,
  ctaHref,
  accentColor,
  items = 8,
  images,
}: CommunitySectionProps) {
  const pool = images ?? COMMUNITY_IMAGES;
  const count = Math.max(1, items);

  return (
    <section id={id} className="mt-6 scroll-mt-4">
      {/* Header */}
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-[22px] font-black text-white">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-[13px] font-medium text-white/45">{subtitle}</p>
          )}
        </div>
        <Link
          href={viewAllHref}
          className="flex shrink-0 items-center gap-1 text-[13px] font-black transition-opacity hover:opacity-75"
          style={{ color: accentColor ?? "#d1fe17" }}
        >
          {viewAllLabel} <ArrowRight size={14} />
        </Link>
      </div>

      {/* Horizontal scroll strip */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {Array.from({ length: count }, (_, i) => (
          <Link
            key={i}
            href={ctaHref}
            className="group relative flex-shrink-0 overflow-hidden rounded-[10px] bg-hf-surface-2"
            style={{ width: 220, height: 154 }}
          >
            <img
              src={pool[i % pool.length]}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
            />
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-4 flex justify-center">
        <Link
          href={ctaHref}
          className="inline-flex h-10 items-center gap-2 rounded-full border px-6 text-[13px] font-black transition hover:opacity-80"
          style={{
            borderColor: accentColor ?? "#d1fe17",
            color: accentColor ?? "#d1fe17",
          }}
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}

export default CommunitySection;
