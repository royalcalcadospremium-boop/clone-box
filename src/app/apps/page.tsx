import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterLanding } from "@/components/FooterLanding";
import { CopyrightBar } from "@/components/CopyrightBar";

interface AppCard {
  title: string;
  description: string;
  href: string;
  badge?: "New" | "Pro" | "PRO" | "Trending";
  image?: string;
}

interface AppCategory {
  title: string;
  subtitle: string;
  seeAllHref: string;
  apps: AppCard[];
}

const categories: AppCategory[] = [
  {
    title: "Professional",
    subtitle: "Generate shots, angles, and seamless transitions",
    seeAllHref: "https://higgsfield.ai/apps/camera-motion",
    apps: [
      { title: "Similarity Score", description: "Score your content's IP similarity", href: "https://higgsfield.ai/app/similarity-score", badge: "New" },
      { title: "Expand image", description: "Expand any image beyond its edges", href: "https://higgsfield.ai/app/expand-image" },
      { title: "Angles 2.0", description: "Generate any angle view for any image in seconds", href: "https://higgsfield.ai/app/angles", badge: "Pro" },
      { title: "Shots", description: "9 unique shots from one image", href: "https://higgsfield.ai/app/shots" },
      { title: "Transitions", description: "Create seamless transitions between any shots effortlessly", href: "https://higgsfield.ai/app/transitions", badge: "Trending" },
    ],
  },
  {
    title: "Enhance & Style",
    subtitle: "Perfect your photos with AI enhancement",
    seeAllHref: "https://higgsfield.ai/apps/enhance-style",
    apps: [
      { title: "Skin Enhancer", description: "Natural, realistic skin textures", href: "https://higgsfield.ai/app/skin-enhancer", badge: "Pro" },
      { title: "AI Stylist", description: "Your AI fitting room. Try everything on — instantly", href: "https://higgsfield.ai/app/ai-stylist", badge: "New" },
      { title: "Relight", description: "Adjust lighting position, color, and brightness", href: "https://higgsfield.ai/app/relight", badge: "Pro" },
      { title: "Outfit Swap", description: "Try on any outfit with a single photo upload", href: "https://higgsfield.ai/app/outfit-swap" },
      { title: "Style Snap", description: "Transform your look with instant style variations", href: "https://higgsfield.ai/app/style-snap" },
    ],
  },
  {
    title: "Face & Identity",
    subtitle: "Swap faces, characters, and transform your look",
    seeAllHref: "https://higgsfield.ai/apps/face-identity",
    apps: [
      { title: "Face Swap", description: "The best instant AI face swap technology for photos", href: "https://higgsfield.ai/app/face-swap" },
      { title: "Headshot Generator", description: "Get studio-quality professional headshots in seconds", href: "https://higgsfield.ai/app/ai-headshot-generator" },
      { title: "Character Swap 2.0", description: "Swap characters in your image with a single click", href: "https://higgsfield.ai/app/character-swap" },
      { title: "Recast", description: "Industry-leading character swap for any video in seconds", href: "https://higgsfield.ai/app/recast", badge: "Pro" },
      { title: "Video Face Swap", description: "Best-in-class face swapping technology for any video", href: "https://higgsfield.ai/app/video-face-swap" },
    ],
  },
  {
    title: "Video Editing",
    subtitle: "Cut, sync, and edit your videos",
    seeAllHref: "https://higgsfield.ai/apps/video-editing",
    apps: [
      { title: "ClipCut", description: "Turn One Selfie Into an Instant Outfit Reel", href: "https://higgsfield.ai/app/clipcut" },
      { title: "Urban Cuts", description: "Next-gen beat-synced AI outfit videos", href: "https://higgsfield.ai/app/urban-cuts" },
      { title: "Video Background Remover", description: "Upload any video and instantly strip the background", href: "https://higgsfield.ai/app/video-background-remover" },
      { title: "Breakdown", description: "Split any image into its individual components", href: "https://higgsfield.ai/app/breakdown" },
      { title: "Japanese Show", description: "Turn your photo into a retro 4-panel TV show scene", href: "https://higgsfield.ai/app/japanese-show" },
    ],
  },
  {
    title: "Ads & Products",
    subtitle: "Create professional video ads instantly",
    seeAllHref: "https://higgsfield.ai/apps/ads-products",
    apps: [
      { title: "Click to Ad", description: "Turn product links into UGC and professional video ads", href: "https://higgsfield.ai/app/link-to-video-ad", badge: "PRO" },
      { title: "Billboard Ad", description: "Turn your photo into a massive billboard takeover", href: "https://higgsfield.ai/app/billboard" },
      { title: "Bullet Time Scene", description: "Spin around your product with dynamic adaptive backgrounds", href: "https://higgsfield.ai/app/bullet-time-scene" },
      { title: "Truck Ad", description: "Showcase your brand on a moving truck billboard", href: "https://higgsfield.ai/app/truck-ad" },
      { title: "Bullet Time White", description: "Spin around your product on a clean white background", href: "https://higgsfield.ai/app/bullet-time-white" },
    ],
  },
  {
    title: "Games & Characters",
    subtitle: "Game avatars and character transformations",
    seeAllHref: "https://higgsfield.ai/apps/games-characters",
    apps: [
      { title: "Game Dump", description: "Transform yourself into 12 iconic video game styles", href: "https://higgsfield.ai/app/game-dump" },
      { title: "Nano Strike", description: "AI Tactical Shooter Character", href: "https://higgsfield.ai/app/nano-strike" },
      { title: "Nano Theft", description: "See yourself in a realistic open-world game style", href: "https://higgsfield.ai/app/nano-theft" },
      { title: "Simlife", description: "Transform yourself into a stylized life simulation character", href: "https://higgsfield.ai/app/simlife" },
      { title: "Plushies", description: "Transform any photo into an adorable plushie-style animation", href: "https://higgsfield.ai/app/plushies" },
    ],
  },
  {
    title: "Trending Templates",
    subtitle: "Create viral content with AI templates",
    seeAllHref: "https://higgsfield.ai/apps/trending-templates",
    apps: [
      { title: "On Fire", description: "Turn your photo into the iconic \"This is Fine\" meme", href: "https://higgsfield.ai/app/this-is-fine" },
      { title: "Skibidi", description: "Turn your photo into the Skibidi toilet meme", href: "https://higgsfield.ai/app/skibidi" },
      { title: "Mukbang", description: "Transform your photo into a viral eating show", href: "https://higgsfield.ai/app/mukbang" },
      { title: "Cloud Surf", description: "Turn your photo into a dreamy pink cloud surfing scene", href: "https://higgsfield.ai/app/cloud-surf" },
      { title: "Idol", description: "Transform your photo into a K-pop idol moment", href: "https://higgsfield.ai/app/idol" },
    ],
  },
];

const CARD_GRADIENTS = [
  "from-slate-700 to-slate-900",
  "from-violet-800 to-purple-950",
  "from-teal-700 to-emerald-900",
  "from-amber-700 to-orange-900",
  "from-rose-700 to-pink-900",
  "from-blue-700 to-indigo-900",
  "from-cyan-700 to-sky-900",
];

function BadgePill({ type }: { type: AppCard["badge"] }) {
  if (!type) return null;
  const map = {
    New: "bg-hf-neon text-black",
    Pro: "bg-violet-600 text-white",
    PRO: "bg-violet-600 text-white",
    Trending: "bg-orange-500 text-white",
  };
  return (
    <span className={`absolute left-2 top-2 z-10 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${map[type]}`}>
      {type}
    </span>
  );
}

function AppCardItem({ app, index }: { app: AppCard; index: number }) {
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  return (
    <Link
      href={app.href}
      className="group flex w-[200px] shrink-0 flex-col"
    >
      <div className="relative h-[200px] w-[200px] overflow-hidden rounded-xl bg-hf-surface-2">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} transition duration-300 group-hover:scale-[1.03]`} />
        <BadgePill type={app.badge} />
        <div className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-[11px] font-medium text-white/80">
          Try now
        </div>
      </div>
      <div className="mt-2.5">
        <p className="text-[14px] font-semibold text-hf-text">{app.title}</p>
        <p className="mt-0.5 line-clamp-2 text-[12px] text-hf-text-muted">{app.description}</p>
      </div>
    </Link>
  );
}

function CategorySection({ cat }: { cat: AppCategory }) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[22px] font-black leading-none text-hf-text">{cat.title}</h2>
          <p className="mt-1 text-[13px] text-hf-text-muted">{cat.subtitle}</p>
        </div>
        <Link
          href={cat.seeAllHref}
          className="flex shrink-0 items-center gap-1 text-[13px] font-semibold text-hf-neon hover:opacity-80"
        >
          See all <ArrowRight size={14} />
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
        {cat.apps.map((app, i) => (
          <AppCardItem key={app.title} app={app} index={i} />
        ))}
      </div>
    </section>
  );
}

export default function AppsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-[1440px] px-3 pb-16 pt-8 md:px-4">
        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-[clamp(32px,5vw,52px)] font-black leading-none text-hf-text">
            Welcome to<br className="sm:hidden" />{" "}
            <span className="text-hf-neon">Higgsfield apps</span>
          </h1>
          <p className="mt-3 max-w-[540px] text-[15px] text-hf-text-muted">
            One-click AI effects that transform any content into professional ads, viral trends, or artistic masterpieces
          </p>
        </div>

        {/* Category sections */}
        {categories.map((cat) => (
          <CategorySection key={cat.title} cat={cat} />
        ))}
      </main>
      <FooterLanding />
      <CopyrightBar />
    </>
  );
}
