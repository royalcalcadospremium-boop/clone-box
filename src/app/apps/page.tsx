import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterLanding } from "@/components/FooterLanding";
import { CopyrightBar } from "@/components/CopyrightBar";

const CDN = "https://cdn.higgsfield.ai";
const STATIC = "https://static.higgsfield.ai";

interface AppCard {
  title: string;
  description: string;
  href: string;
  badge?: "New" | "Pro" | "PRO" | "Trending";
  image: string;
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
    seeAllHref: "/apps",
    apps: [
      { title: "Similarity Score", description: "Score your content's IP similarity", href: "/app/similarity-score", badge: "New", image: `${CDN}/card/578d27f2-663d-4817-96e7-89f90426c72c.webp` },
      { title: "Expand image", description: "Expand any image beyond its edges", href: "/app/expand-image", image: `${CDN}/application_detail/expand-hero.webp` },
      { title: "Angles 2.0", description: "Generate any angle view for any image in seconds", href: "/app/angles", badge: "Pro", image: `${CDN}/application_detail/angles-hero.webp` },
      { title: "Shots", description: "9 unique shots from one image", href: "/app/shots", image: `${CDN}/application_detail/shots-hero.webp` },
      { title: "Transitions", description: "Create seamless transitions between any shots effortlessly", href: "/app/transitions", badge: "Trending", image: `${CDN}/application_detail/transitions-hero.webp` },
    ],
  },
  {
    title: "Enhance & Style",
    subtitle: "Perfect your photos with AI enhancement",
    seeAllHref: "/apps",
    apps: [
      { title: "Skin Enhancer", description: "Natural, realistic skin textures", href: "/app/skin-enhancer", badge: "Pro", image: `${CDN}/application_detail/skin-enhancer-hero.webp` },
      { title: "AI Stylist", description: "Your AI fitting room. Try everything on — instantly", href: "/app/ai-stylist", badge: "New", image: `${CDN}/application_detail/ai-stylist-hero.webp` },
      { title: "Relight", description: "Adjust lighting position, color, and brightness", href: "/app/relight", badge: "Pro", image: `${CDN}/application_detail/relight-hero.webp` },
      { title: "Outfit Swap", description: "Try on any outfit with a single photo upload", href: "/app/outfit-swap", image: `${CDN}/card/c10ed514-8e43-4390-b20c-58254f837086.webp` },
      { title: "Style Snap", description: "Transform your look with instant style variations", href: "/app/style-snap", image: `${CDN}/application_detail/style-snap-hero.webp` },
    ],
  },
  {
    title: "Face & Identity",
    subtitle: "Swap faces, characters, and transform your look",
    seeAllHref: "/apps",
    apps: [
      { title: "Face Swap", description: "The best instant AI face swap technology for photos", href: "/app/face-swap", image: `${CDN}/application_detail/8982dc33-6823-4c61-a39e-558816b494b3.webp` },
      { title: "Headshot Generator", description: "Get studio-quality professional headshots in seconds", href: "/app/ai-headshot-generator", image: `${CDN}/application_detail/headshot-hero.webp` },
      { title: "Character Swap 2.0", description: "Swap characters in your image with a single click", href: "/app/character-swap", image: `${CDN}/application_detail/character-swap-hero.webp` },
      { title: "Recast", description: "Industry-leading character swap for any video in seconds", href: "/app/recast", badge: "Pro", image: `${CDN}/application_detail/recast-hero.webp` },
      { title: "Video Face Swap", description: "Best-in-class face swapping technology for any video", href: "/app/video-face-swap", image: `${STATIC}/videofaceswap/showcase-2-v2-thumbnail.webp` },
    ],
  },
  {
    title: "Video Editing",
    subtitle: "Cut, sync, and edit your videos",
    seeAllHref: "/apps",
    apps: [
      { title: "ClipCut", description: "Turn One Selfie Into an Instant Outfit Reel", href: "/app/clipcut", image: `${CDN}/card/2230dfb0-c7b6-466e-99ea-f4eee9d08814.webp` },
      { title: "Urban Cuts", description: "Next-gen beat-synced AI outfit videos", href: "/app/urban-cuts", image: `${CDN}/card/b1988a79-e9d2-4058-9c90-82ab677b6058.webp` },
      { title: "Video Background Remover", description: "Upload any video and instantly strip the background", href: "/app/video-background-remover", image: `${CDN}/application_detail/video-bg-hero.webp` },
      { title: "Breakdown", description: "Split any image into its individual components", href: "/app/breakdown", image: `${CDN}/card/0a707acf-5df0-429a-b9e8-e4961d8d01cd.webp` },
      { title: "Japanese Show", description: "Turn your photo into a retro 4-panel TV show scene", href: "/app/japanese-show", image: `${CDN}/card/a524d80e-204d-40ba-bcd8-39f75dcd5c92.webp` },
    ],
  },
  {
    title: "Ads & Products",
    subtitle: "Create professional video ads instantly",
    seeAllHref: "/apps",
    apps: [
      { title: "Click to Ad", description: "Turn product links into UGC and professional video ads", href: "/app/link-to-video-ad", badge: "PRO", image: `${CDN}/card/7e661736-c838-4789-a053-cfb09990a688.webp` },
      { title: "Billboard Ad", description: "Turn your photo into a massive billboard takeover", href: "/app/billboard", image: `${CDN}/card/96cb52c1-23e9-47a0-badc-239cf0a29570.webp` },
      { title: "Bullet Time Scene", description: "Spin around your product with dynamic adaptive backgrounds", href: "/app/bullet-time-scene", image: `${CDN}/card/ddd778ac-253e-4251-8d9a-340189a311e8.webp` },
      { title: "Truck Ad", description: "Showcase your brand on a moving truck billboard", href: "/app/truck-ad", image: `${CDN}/card/051a430d-eb46-423f-93e7-b450faaf7337.webp` },
      { title: "Bullet Time White", description: "Spin around your product on a clean white background", href: "/app/bullet-time-white", image: `${CDN}/card/e868fb8f-a0af-4f86-ae5a-6f3ac727878e.webp` },
    ],
  },
  {
    title: "Games & Characters",
    subtitle: "Game avatars and character transformations",
    seeAllHref: "/apps",
    apps: [
      { title: "Game Dump", description: "Transform yourself into 12 iconic video game styles", href: "/app/game-dump", image: `${CDN}/application_detail/game-dump-hero.webp` },
      { title: "Nano Strike", description: "AI Tactical Shooter Character", href: "/app/nano-strike", image: `${CDN}/card/9e7e9e9a-716f-4b59-878c-d3c7f1f7012d.webp` },
      { title: "Nano Theft", description: "See yourself in a realistic open-world game style", href: "/app/nano-theft", image: `${CDN}/card/14ed53ed-4cad-46a7-9dad-4cebb7d9cd41.webp` },
      { title: "Simlife", description: "Transform yourself into a stylized life simulation character", href: "/app/simlife", image: `${CDN}/card/2b3cc30f-49c4-4868-b1d7-5f56a4c946c3.webp` },
      { title: "Plushies", description: "Transform any photo into an adorable plushie-style animation", href: "/app/plushies", image: `${CDN}/application_detail/plushies-hero.webp` },
    ],
  },
  {
    title: "Trending Templates",
    subtitle: "Create viral content with AI templates",
    seeAllHref: "/apps",
    apps: [
      { title: "On Fire", description: "Turn your photo into the iconic \"This is Fine\" meme", href: "/app/this-is-fine", image: `${CDN}/card/153574e6-6f8b-4857-806e-22b37202dd29.webp` },
      { title: "Skibidi", description: "Turn your photo into the Skibidi toilet meme", href: "/app/skibidi", image: `${CDN}/card/1907d968-9588-4599-a53b-4d40f551356b.webp` },
      { title: "Mukbang", description: "Transform your photo into a viral eating show", href: "/app/mukbang", image: `${CDN}/card/3ecf80d1-a279-42ad-b99b-c840baeb17eb.webp` },
      { title: "Cloud Surf", description: "Turn your photo into a dreamy pink cloud surfing scene", href: "/app/cloud-surf", image: `${CDN}/card/a5c235aa-388c-477e-8974-955aa5eacb13.webp` },
      { title: "Idol", description: "Transform your photo into a K-pop idol moment", href: "/app/idol", image: `${CDN}/card/19aa0ae4-dcbb-4473-9cbc-93f222d2faf0.webp` },
    ],
  },
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

function AppCardItem({ app }: { app: AppCard }) {
  return (
    <Link href={app.href} className="group flex w-[200px] shrink-0 flex-col">
      <div className="relative h-[200px] w-[200px] overflow-hidden rounded-xl bg-hf-surface-2">
        <img
          src={app.image}
          alt={app.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
        {cat.apps.map((app) => (
          <AppCardItem key={app.title} app={app} />
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
            <span className="text-hf-neon">Ninja Box apps</span>
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
