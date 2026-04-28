import { Navbar } from "@/components/Navbar";
import { CopyrightBar } from "@/components/CopyrightBar";
import { Heart, Search } from "lucide-react";

const GRADIENTS = [
  "from-slate-700 to-slate-900",
  "from-violet-800 to-purple-950",
  "from-teal-700 to-emerald-900",
  "from-amber-700 to-orange-900",
  "from-rose-700 to-pink-900",
  "from-blue-700 to-indigo-900",
  "from-cyan-700 to-sky-900",
  "from-green-800 to-emerald-950",
  "from-stone-600 to-stone-900",
  "from-red-800 to-rose-950",
  "from-indigo-700 to-indigo-900",
  "from-lime-700 to-lime-900",
];

const CREATORS = ["mrabujoe", "shestak", "ash_creates", "jaemin_yoo", "corrygw", "boriko_sensei",
  "oddikt", "baroque_tea", "ryanlightbourn", "imagineif", "roomboy", "myrzakhan"];

const filters = ["All", "Images", "Videos", "4K", "Cinematic", "Portrait", "Animation"];

function PostCard({ index }: { index: number }) {
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const creator = CREATORS[index % CREATORS.length];
  const likes = 128 + (index * 37) % 872;

  return (
    <div className="group cursor-pointer overflow-hidden rounded-xl bg-hf-surface-2" style={{ aspectRatio: "3/4" }}>
      <div className="relative h-full w-full">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} transition duration-300 group-hover:scale-[1.025]`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="flex items-center gap-1.5">
            <div className="h-6 w-6 rounded-full bg-gray-400" />
            <span className="text-[11px] font-medium text-white">{creator}</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5">
            <Heart size={10} className="text-white/70" />
            <span className="text-[11px] text-white/70">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-[1440px] px-3 pb-16 pt-6 md:px-4">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[clamp(28px,4vw,40px)] font-black leading-none text-hf-text">
              Community
            </h1>
            <p className="mt-1 text-[14px] text-hf-text-muted">
              Discover stunning AI-generated works from creators worldwide
            </p>
          </div>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-hf-text-muted" />
            <input
              type="text"
              placeholder="Search creations..."
              className="h-10 rounded-xl border border-white/[0.1] bg-hf-surface pl-9 pr-4 text-[13px] text-hf-text placeholder:text-hf-text-muted outline-none focus:border-hf-neon/50 w-[220px]"
            />
          </div>
        </div>

        {/* Filter pills */}
        <div className="mb-6 flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {filters.map((f, i) => (
            <button
              key={f}
              type="button"
              className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                i === 0
                  ? "bg-hf-neon text-black"
                  : "border border-white/[0.1] bg-hf-surface text-hf-text hover:border-hf-neon/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-2 gap-3 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 [&>div]:mb-3 [&>div]:break-inside-avoid">
          {Array.from({ length: 48 }, (_, i) => (
            <PostCard key={i} index={i} />
          ))}
        </div>
      </main>
      <CopyrightBar />
    </>
  );
}
