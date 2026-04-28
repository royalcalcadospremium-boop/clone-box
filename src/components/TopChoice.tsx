import { ChevronRight } from "lucide-react";

interface ToolCard {
  name: string;
  description: string;
  gradient: string;
  pro?: boolean;
}

const tools: ToolCard[] = [
  {
    name: "Nano Banana Pro",
    description: "Best 4K image model ever",
    gradient: "bg-gradient-to-br from-amber-700 to-amber-900",
  },
  {
    name: "Motion Control",
    description: "Precise control of character actions",
    gradient: "bg-gradient-to-br from-blue-700 to-indigo-900",
  },
  {
    name: "Skin Enhancer",
    description: "Natural, realistic skin textures",
    gradient: "bg-gradient-to-br from-rose-700 to-pink-900",
    pro: true,
  },
  {
    name: "Shots",
    description: "9 unique shots from one image",
    gradient: "bg-gradient-to-br from-teal-700 to-cyan-900",
  },
  {
    name: "Angles 2.0",
    description: "Generate any angle view for any subject",
    gradient: "bg-gradient-to-br from-slate-600 to-gray-900",
    pro: true,
  },
  {
    name: "Kling 3.0",
    description: "15-second video generation",
    gradient: "bg-gradient-to-br from-violet-700 to-purple-900",
  },
];

export function TopChoice() {
  return (
    <section className="mb-8 md:mb-16 container relative">
      {/* Header row */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-hf-text">Top Choice</h2>
          <p className="text-sm text-hf-text-muted mt-1">
            Creator-recommended tools tailored for you
          </p>
        </div>
        <a
          href="#"
          className="text-sm font-medium text-hf-text hover:text-hf-neon flex items-center gap-1 transition-colors"
        >
          See all
          <ChevronRight size={16} />
        </a>
      </div>

      {/* Scroll row */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="flex-shrink-0 w-[200px] cursor-pointer group/tool"
          >
            {/* Image area */}
            <div className="w-[200px] h-[240px] rounded-xl overflow-hidden bg-hf-surface-2 relative">
              <div className={`absolute inset-0 ${tool.gradient}`} />
              {tool.pro && (
                <span className="absolute top-2 left-2 bg-violet-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase z-10">
                  PRO
                </span>
              )}
            </div>

            {/* Below image */}
            <div className="mt-2.5">
              <div className="flex justify-between items-center">
                <span className="text-[15px] font-semibold text-hf-text">
                  {tool.name}
                </span>
                <ChevronRight size={16} className="text-hf-text-muted" />
              </div>
              <p className="text-[13px] text-hf-text-muted mt-0.5 line-clamp-2">
                {tool.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
