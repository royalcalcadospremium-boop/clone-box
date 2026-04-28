import { Video, BarChart2, Sparkles, Monitor, Film, Atom } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SmallCard {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  badge?: "NEW" | "UNLIMITED" | "FREE_GENS";
}

const smallCards: SmallCard[] = [
  {
    title: "Generate Video",
    subtitle: "Create high-quality videos in seconds",
    icon: Video,
  },
  {
    title: "Seedance 2.0",
    subtitle: "Most advanced video model",
    icon: BarChart2,
    badge: "NEW",
  },
  {
    title: "Nano Banana Pro",
    subtitle: "Generate high-quality visuals",
    icon: Sparkles,
    badge: "UNLIMITED",
  },
  {
    title: "Marketing Studio",
    subtitle: "Launch full campaigns from one prompt",
    icon: Monitor,
    badge: "NEW",
  },
  {
    title: "Cinema Studio 3.5",
    subtitle: "Create cinematic scenes effortlessly",
    icon: Film,
  },
  {
    title: "Higgsfield Soul V2",
    subtitle: "Generate ultra-realistic visuals",
    icon: Atom,
    badge: "FREE_GENS",
  },
];

function Badge({ type }: { type: SmallCard["badge"] }) {
  if (!type) return null;

  if (type === "NEW") {
    return (
      <span className="bg-hf-neon text-[#13151a] text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
        NEW
      </span>
    );
  }
  if (type === "UNLIMITED") {
    return (
      <span className="bg-[#db3f3e] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
        UNLIMITED
      </span>
    );
  }
  if (type === "FREE_GENS") {
    return (
      <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
        FREE GENS
      </span>
    );
  }
  return null;
}

export function ToolsGrid() {
  return (
    <div className="container grid gap-2 grid-cols-1 md:grid-cols-[2fr_3fr]">
      {/* Large Generate Image card */}
      <div className="bg-hf-surface rounded-2xl p-5 relative overflow-hidden min-h-[280px] flex flex-col">
        {/* Bottom gradient fade so text reads over the image placeholder */}
        <div className="absolute inset-0 bg-gradient-to-r from-hf-surface from-40% to-transparent pointer-events-none z-10" />

        {/* Image placeholder */}
        <div className="absolute right-0 bottom-0 w-[60%] h-full bg-gradient-to-l from-teal-800/40 to-transparent rounded-r-2xl" />

        <div className="relative z-20 flex flex-col h-full">
          <h2 className="text-[22px] font-semibold text-hf-text leading-tight">
            Generate Image
          </h2>
          <p className="text-[14px] text-hf-text-muted mt-1 max-w-[180px]">
            Describe an image and click generate
          </p>
          <button
            type="button"
            className="bg-white text-[#13151a] font-semibold text-sm px-5 py-2 rounded-lg mt-auto self-start hover:bg-white/90 transition-colors cursor-pointer"
          >
            Generate
          </button>
        </div>
      </div>

      {/* 2×3 grid of small tool cards */}
      <div className="grid grid-cols-3 grid-rows-2 gap-2">
        {smallCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-hf-surface hover:bg-hf-surface-2 rounded-2xl p-4 cursor-pointer transition-colors flex flex-col justify-between min-h-[130px] relative"
            >
              <div className="flex justify-between items-start">
                <Icon size={24} className="text-hf-text-muted" />
                {card.badge && (
                  <div className="absolute top-3 right-3">
                    <Badge type={card.badge} />
                  </div>
                )}
              </div>
              <div>
                <p className="text-[18px] font-semibold text-hf-text mt-3 leading-tight">
                  {card.title}
                </p>
                <p className="text-[13px] text-hf-text-muted mt-1">
                  {card.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
