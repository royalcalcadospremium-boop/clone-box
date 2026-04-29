import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ToolCard {
  name: string;
  description: string;
  image: string;
  href: string;
  badge?: string;
  badgeColor?: string;
}

const tools: ToolCard[] = [
  {
    name: "Nano Banana Pro",
    description: "Best 4K image model ever",
    image: "https://cdn.higgsfield.ai/card/1907d968-9588-4599-a53b-4d40f551356b.webp",
    href: "/ai/image",
  },
  {
    name: "Motion Control",
    description: "Precise control of character actions",
    image: "https://cdn.higgsfield.ai/card/3ecf80d1-a279-42ad-b99b-c840baeb17eb.webp",
    href: "/ai/video",
  },
  {
    name: "Skin Enhancer",
    description: "Natural, realistic skin textures",
    image: "https://cdn.higgsfield.ai/card/c2124f76-f96f-4df1-870c-03e5ad15fae4.webp",
    href: "/ai/image",
    badge: "PRO",
    badgeColor: "#8b5cf6",
  },
  {
    name: "Shots",
    description: "9 unique shots from one image",
    image: "https://cdn.higgsfield.ai/card/a5c235aa-388c-477e-8974-955aa5eacb13.webp",
    href: "/ai/image",
  },
  {
    name: "Angles 2.0",
    description: "Generate any angle view for any subject",
    image: "https://cdn.higgsfield.ai/card/19aa0ae4-dcbb-4473-9cbc-93f222d2faf0.webp",
    href: "/ai/image",
    badge: "PRO",
    badgeColor: "#8b5cf6",
  },
  {
    name: "Kling 3.0",
    description: "15-second video generation",
    image: "https://cdn.higgsfield.ai/card/d814674d-d264-4121-b093-d1eeffff6555.webp",
    href: "/ai/video",
  },
];

export function TopChoice() {
  return (
    <section className="mb-8 md:mb-12">
      {/* Header row */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-[22px] font-black text-white">Top Choice</h2>
          <p className="mt-0.5 text-[13px] font-medium text-white/45">
            Creator-recommended tools tailored for you
          </p>
        </div>
        <Link
          href="/apps"
          className="flex items-center gap-1 text-[13px] font-black text-hf-neon hover:opacity-75 transition-opacity"
        >
          See all <ArrowRight size={14} />
        </Link>
      </div>

      {/* Horizontal scroll row */}
      <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.href}
            className="group flex-shrink-0 w-[185px]"
          >
            {/* Card image */}
            <div className="relative h-[230px] w-[185px] overflow-hidden rounded-[10px] bg-hf-surface-2">
              <img
                src={tool.image}
                alt={tool.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
              />
              {tool.badge && (
                <span
                  className="absolute left-2 top-2 rounded px-1.5 py-0.5 text-[9px] font-black uppercase text-white"
                  style={{ backgroundColor: tool.badgeColor }}
                >
                  {tool.badge}
                </span>
              )}
            </div>

            {/* Below card */}
            <div className="mt-2">
              <p className="text-[13px] font-black text-white leading-tight">
                {tool.name}
              </p>
              <p className="mt-0.5 text-[11.5px] font-medium text-white/45 leading-snug">
                {tool.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
