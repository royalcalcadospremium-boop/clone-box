"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ChevronDown, ImageIcon, Play, Mic2, Wand2, Users, Sparkles, Camera, Zap, Star,
  Edit3, UserCircle, Trophy, DollarSign, Layers, ArrowUpRight, Palette, Crop,
  RefreshCw, ScanFace, Shirt, Bot, BarChart2, Film, Clapperboard, Music, Globe,
  Repeat, PenTool, MonitorPlay, TrendingUp, Bell, Folder, Menu, Rocket, Diamond,
} from "lucide-react";

/* ── Logo ─────────────────────────────────────────────────────────────── */
function NinjaLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-label="Ninja Box logo">
      <rect width="28" height="28" rx="7" fill="#1c1e20" />
      <path d="M8 8h3v5h6V8h3v12h-3v-5H11v5H8V8Z" fill="#f7f7f8" />
    </svg>
  );
}

/* ── Instagram SVG (lucide doesn't have it) ───────────────────────────── */
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

/* ── Badge helpers ────────────────────────────────────────────────────── */
function BadgeNew() {
  return <span className="bg-hf-neon text-[#13151a] text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide leading-none">New</span>;
}
function BadgeTop() {
  return <span className="bg-[#db3f3e] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase leading-none">Top</span>;
}
function BadgeVersion({ label }: { label: string }) {
  return <span className="bg-white/10 text-white/50 text-[10px] px-1 py-0.5 rounded leading-none">{label}</span>;
}
function BadgeSale({ label }: { label: string }) {
  return <span className="bg-[#db3f3e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase leading-none">{label}</span>;
}

/* ── Right-side action components ─────────────────────────────────────── */
function UpgradeButton() {
  return (
    <div className="relative shrink-0">
      <Link
        href="/pricing"
        className="flex items-center gap-1.5 rounded-xl border border-white/[0.12] px-3 py-[7px] text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.08]"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <Rocket size={13} className="text-hf-neon shrink-0" />
        <span>Upgrade</span>
      </Link>
      <span className="pointer-events-none absolute -right-2.5 -top-2.5 z-10 rounded-full bg-[#db3f3e] px-1.5 py-0.5 text-[9px] font-extrabold uppercase leading-none text-white shadow-md">
        30% OFF
      </span>
    </div>
  );
}

function NavSeparator() {
  return <div className="h-5 w-px shrink-0 bg-white/[0.1]" aria-hidden="true" />;
}

function NotificationsBell() {
  return (
    <button
      type="button"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-white/50 transition-colors hover:border-white/[0.16] hover:text-white"
      style={{ background: "rgba(255,255,255,0.03)" }}
      aria-label="Notifications"
    >
      <Bell size={15} />
    </button>
  );
}

function AssetsLink() {
  return (
    <Link
      href="/assets"
      className="hidden md:flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-2.5 py-[7px] text-[13px] text-white/60 transition-colors hover:border-white/[0.16] hover:text-white shrink-0"
      style={{ background: "rgba(255,255,255,0.03)" }}
    >
      <Folder size={13} />
      <span>Assets</span>
    </Link>
  );
}

function MobilePricingButton() {
  return (
    <div className="relative md:hidden shrink-0">
      <Link
        href="/pricing"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-white/60 transition-colors hover:text-white"
        style={{ background: "rgba(255,255,255,0.03)" }}
        aria-label="Pricing — 30% OFF"
      >
        <Diamond size={15} />
      </Link>
      <span className="pointer-events-none absolute -right-1.5 -top-2 rounded-full bg-[#db3f3e] px-1 py-px text-[8px] font-extrabold uppercase leading-none text-white">
        30%
      </span>
    </div>
  );
}

function MobileInstagramLink() {
  return (
    <Link
      href="https://www.instagram.com/higgsfield.ai/"
      target="_blank"
      rel="noopener noreferrer"
      className="md:hidden flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-white/50 transition-colors hover:text-white"
      style={{ background: "rgba(255,255,255,0.03)" }}
      aria-label="Instagram"
    >
      <InstagramIcon size={16} />
    </Link>
  );
}

function ProfileRingAvatar() {
  const r = 13;
  const circ = 2 * Math.PI * r;
  const progress = 0.68;
  return (
    <button
      type="button"
      className="relative flex h-8 w-8 shrink-0 items-center justify-center"
      aria-label="Profile"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className="absolute inset-0"
        style={{ transform: "rotate(-90deg)" }}
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
        <circle
          cx="16"
          cy="16"
          r={r}
          fill="none"
          stroke="#d1fe17"
          strokeWidth="1.5"
          strokeDasharray={`${circ * progress} ${circ * (1 - progress)}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="flex h-[22px] w-[22px] overflow-hidden rounded-full bg-[#2a2d30] items-center justify-center">
        <UserCircle size={22} className="text-white/50" />
      </div>
    </button>
  );
}

function HamburgerButton() {
  return (
    <button
      type="button"
      className="md:hidden flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:text-white"
      aria-label="Open menu"
    >
      <Menu size={20} />
    </button>
  );
}

/* ── Dropdown data ────────────────────────────────────────────────────── */
interface DropItem {
  label: string;
  desc: string;
  href: string;
  badge?: "New" | "Top";
  live?: boolean;
  icon: React.ReactNode;
}
interface DropMenu {
  features: DropItem[];
  models?: DropItem[];
  groupLabel?: string;
}

const iconCls = "w-4 h-4 shrink-0";

const DROPS: Record<string, DropMenu> = {
  Image: {
    features: [
      { label: "Create Image",      desc: "Generate AI images",                    href: "/ai/image",           live: true, icon: <ImageIcon className={iconCls} /> },
      { label: "Soul ID Character", desc: "Create unique character",                href: "/character",                      icon: <UserCircle className={iconCls} /> },
      { label: "AI Influencer",     desc: "Create and manage your AI influencer",   href: "/apps",                           icon: <Star className={iconCls} /> },
      { label: "Photodump",         desc: "Generate your aesthetic",                href: "/apps",               badge:"New", icon: <Layers className={iconCls} /> },
      { label: "Relight",           desc: "Adjust lighting, color, and brightness", href: "/app/relight",                    icon: <Sparkles className={iconCls} /> },
      { label: "Inpaint",           desc: "Select an area, describe the change",    href: "/apps",                           icon: <Crop className={iconCls} /> },
      { label: "Image Upscale",     desc: "Enhance image quality",                  href: "/app/expand-image",               icon: <ArrowUpRight className={iconCls} /> },
      { label: "Face Swap",         desc: "Create realistic face swaps",            href: "/app/face-swap",                  icon: <ScanFace className={iconCls} /> },
      { label: "Character Swap",    desc: "Swap characters in your image",          href: "/app/character-swap",             icon: <RefreshCw className={iconCls} /> },
      { label: "Draw to Edit",      desc: "From sketch to picture",                 href: "/apps",                           icon: <PenTool className={iconCls} /> },
      { label: "Fashion Factory",   desc: "Create fashion sets",                    href: "/apps",                           icon: <Shirt className={iconCls} /> },
    ],
    models: [
      { label: "Soul 2.0",         desc: "Ultra-realistic fashion visuals",              href: "/ai/image", live: true,            icon: <Sparkles className={iconCls} /> },
      { label: "Soul Cinema",      desc: "Cinematic film-grade aesthetic",               href: "/ai/image", live: true,            icon: <Film className={iconCls} /> },
      { label: "GPT Image 2",      desc: "4K images with near-perfect text rendering",   href: "/ai/image", live: true, badge:"New", icon: <Bot className={iconCls} /> },
      { label: "Nano Banana 2",    desc: "Pro quality at flash speed",                   href: "/ai/image", live: true,            icon: <Zap className={iconCls} /> },
      { label: "Nano Banana Pro",  desc: "Best 4K image model ever",                     href: "/ai/image", live: true, badge:"Top", icon: <Star className={iconCls} /> },
      { label: "Flux 2",           desc: "Speed-optimized detail",                       href: "/ai/image", live: true,            icon: <BarChart2 className={iconCls} /> },
      { label: "Grok Imagine",     desc: "Versatile image styles by xAI",                href: "/ai/image",                        icon: <Globe className={iconCls} /> },
    ],
  },
  Video: {
    features: [
      { label: "Create Video",     desc: "Generate AI videos",                     href: "/ai/video", live: true, icon: <Play className={iconCls} /> },
      { label: "Cinema Studio 3.5",desc: "Cinematic video with AI director",       href: "/cinema-studio",        icon: <Clapperboard className={iconCls} /> },
      { label: "Edit Video",       desc: "Edit scenes, shots, elements",           href: "/ai/video",             icon: <Edit3 className={iconCls} /> },
      { label: "Click to Ad",      desc: "Turn product URLs into video ads",       href: "/app/link-to-video-ad", icon: <TrendingUp className={iconCls} /> },
      { label: "Lipsync Studio",   desc: "Create talking clips",                   href: "/apps",                 icon: <Mic2 className={iconCls} /> },
      { label: "Draw to Video",    desc: "Sketch turns into cinema",               href: "/apps",                 icon: <PenTool className={iconCls} /> },
      { label: "UGC Factory",      desc: "Build UGC video with avatar",            href: "/app/video-face-swap",  icon: <Users className={iconCls} /> },
      { label: "Video Upscale",    desc: "Enhance video quality",                  href: "/apps",                 icon: <ArrowUpRight className={iconCls} /> },
      { label: "Vibe Motion",      desc: "Professional motion graphics",           href: "/apps",                 icon: <Wand2 className={iconCls} /> },
    ],
    models: [
      { label: "Seedance 2.0",   desc: "Most advanced video model",              href: "/ai/video", live: true, badge:"Top", icon: <BarChart2 className={iconCls} /> },
      { label: "Kling 3.0",      desc: "Cinematic videos with audio",            href: "/ai/video", live: true,             icon: <Film className={iconCls} /> },
      { label: "WAN 2.6",        desc: "First and end frame video control",      href: "/ai/video", live: true, badge:"New", icon: <Zap className={iconCls} /> },
      { label: "Minimax Hailuo", desc: "Fastest high-dynamic video",             href: "/ai/video", live: true,             icon: <Play className={iconCls} /> },
      { label: "Sora 2",         desc: "OpenAI's most advanced video model",     href: "/ai/video",                         icon: <Bot className={iconCls} /> },
      { label: "Google Veo 3.1", desc: "Advanced AI video with sound",           href: "/ai/video",                         icon: <Globe className={iconCls} /> },
      { label: "Grok Imagine",   desc: "Cinematic videos with synchronized audio", href: "/ai/video",                       icon: <MonitorPlay className={iconCls} /> },
    ],
  },
  Audio: {
    features: [
      { label: "Voiceover",    desc: "Generate speech from text",           href: "/audio", live: true, icon: <Mic2 className={iconCls} /> },
      { label: "Change Voice", desc: "Swap voices in any video",            href: "/audio",             icon: <RefreshCw className={iconCls} /> },
      { label: "Translation",  desc: "Translate speech in any video",       href: "/audio",             icon: <Globe className={iconCls} /> },
    ],
    models: [
      { label: "Eleven v3",          desc: "Expressive AI voice with emotion control", href: "/audio", live: true, icon: <Music className={iconCls} /> },
      { label: "MiniMax Speech 2.8", desc: "Studio-quality text-to-speech",           href: "/audio",             icon: <Mic2 className={iconCls} /> },
      { label: "Seed Speech",        desc: "ByteDance multilingual text-to-speech",   href: "/audio",             icon: <Globe className={iconCls} /> },
      { label: "VibeVoice",          desc: "Long-form expressive voice synthesis",    href: "/audio",             icon: <Sparkles className={iconCls} /> },
    ],
  },
  Edit: {
    features: [
      { label: "Edit Video",    desc: "Advanced video editing",                 href: "/ai/video",              icon: <Edit3 className={iconCls} /> },
      { label: "Inpaint",       desc: "Select an area, describe the change",    href: "/apps",       badge:"Top", icon: <Crop className={iconCls} /> },
      { label: "Relight",       desc: "Adjust lighting, color, and brightness", href: "/app/relight",           icon: <Sparkles className={iconCls} /> },
      { label: "AI Stylist",    desc: "Find your perfect look",                 href: "/app/ai-stylist", badge:"New", icon: <Shirt className={iconCls} /> },
      { label: "Upscale",       desc: "Enhance resolution and quality",         href: "/app/expand-image",      icon: <ArrowUpRight className={iconCls} /> },
      { label: "Skin Enhancer", desc: "Natural, realistic skin textures",       href: "/app/skin-enhancer",     icon: <Palette className={iconCls} /> },
      { label: "Angles",        desc: "Generate from different angles",         href: "/app/angles",            icon: <Camera className={iconCls} /> },
    ],
    models: [
      { label: "Nano Banana Pro Inpaint", desc: "Maximum detail and accuracy",    href: "/ai/image", live: true, icon: <Star className={iconCls} /> },
      { label: "Nano Banana Inpaint",     desc: "Fast, lightweight edits",        href: "/ai/image", live: true, icon: <Zap className={iconCls} /> },
      { label: "Product Placement",       desc: "Seamless product integration",   href: "/apps",                 icon: <Layers className={iconCls} /> },
      { label: "Topaz",                   desc: "High-resolution upscaler",       href: "/apps",                 icon: <ArrowUpRight className={iconCls} /> },
      { label: "Kling Motion Control",    desc: "Control motion with references", href: "/ai/video",             icon: <Film className={iconCls} /> },
      { label: "Kling 3.0 Omni Edit",    desc: "Advanced video editing",         href: "/ai/video",             icon: <Edit3 className={iconCls} /> },
    ],
  },
  Character: {
    features: [
      { label: "Photodump",       desc: "Generate your aesthetic",               href: "/apps",      badge:"New", icon: <Layers className={iconCls} /> },
      { label: "AI Influencer",   desc: "Create and manage your AI influencer",  href: "/apps",                   icon: <Star className={iconCls} /> },
      { label: "AI Cast",         desc: "Expressive faces and detailed styling", href: "/apps",                   icon: <Users className={iconCls} /> },
      { label: "Face Swap",       desc: "Swap faces in photos",                  href: "/app/face-swap",          icon: <ScanFace className={iconCls} /> },
      { label: "Character Swap",  desc: "Swap characters in photos",             href: "/app/character-swap",     icon: <RefreshCw className={iconCls} /> },
      { label: "Video Face Swap", desc: "Swap faces in videos",                  href: "/app/video-face-swap",    icon: <Film className={iconCls} /> },
      { label: "AI Stylist",      desc: "Find your perfect look",                href: "/app/ai-stylist",         icon: <Shirt className={iconCls} /> },
      { label: "Recast Studio",   desc: "Swap characters in videos",             href: "/app/recast",             icon: <Repeat className={iconCls} /> },
    ],
    models: [
      { label: "Soul ID Character", desc: "Create unique character", href: "/character", icon: <UserCircle className={iconCls} /> },
    ],
  },
  Community: {
    groupLabel: "Compete & Earn",
    features: [
      { label: "Community", desc: "Posts, updates, discussion",  href: "/community",            icon: <Users className={iconCls} /> },
      { label: "Gallery",   desc: "Explore creator showcases",   href: "/community",            icon: <ImageIcon className={iconCls} /> },
      { label: "Contests",  desc: "Compete and win rewards",     href: "/earn",      badge:"New", icon: <Trophy className={iconCls} /> },
      { label: "Earn",      desc: "Get paid for your content",   href: "/earn",      badge:"New", icon: <DollarSign className={iconCls} /> },
    ],
  },
};

/* ── Dropdown panel ───────────────────────────────────────────────────── */
function DropdownPanel({ menu }: { menu: DropMenu }) {
  const hasTwoCols = !!menu.models;
  return (
    <div
      className="absolute left-0 top-full z-50 mt-0 min-w-[520px] rounded-b-2xl border border-white/[0.07] bg-[#0f1113]/95 backdrop-blur-xl shadow-2xl"
      style={{ maxWidth: hasTwoCols ? 700 : 320 }}
    >
      <div className={`grid p-4 gap-1 ${hasTwoCols ? "grid-cols-2 divide-x divide-white/[0.06]" : "grid-cols-1"}`}>
        {/* Features column */}
        <div className="pr-3">
          <p className="mb-2 px-2 text-[10px] font-black uppercase tracking-widest text-white/30">
            {menu.groupLabel ?? "Features"}
          </p>
          {menu.features.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex items-start gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/[0.05]"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-white/50 transition-colors group-hover:bg-hf-neon/10 group-hover:text-hf-neon">
                {item.icon}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-semibold leading-none text-hf-text group-hover:text-white">
                    {item.label}
                  </span>
                  {item.badge === "New" && <BadgeNew />}
                  {item.badge === "Top" && <BadgeTop />}
                  {item.live && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-hf-neon" title="Live integration" />
                  )}
                </div>
                <p className="mt-0.5 line-clamp-1 text-[11px] leading-tight text-white/40">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Models column */}
        {menu.models && (
          <div className="pl-3">
            <p className="mb-2 px-2 text-[10px] font-black uppercase tracking-widest text-white/30">Models</p>
            {menu.models.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-start gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/[0.05]"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-white/50 transition-colors group-hover:bg-hf-neon/10 group-hover:text-hf-neon">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-semibold leading-none text-hf-text group-hover:text-white">
                      {item.label}
                    </span>
                    {item.badge === "New" && <BadgeNew />}
                    {item.badge === "Top" && <BadgeTop />}
                    {item.live && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-hf-neon" title="Live integration" />
                    )}
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-[11px] leading-tight text-white/40">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Nav items config ─────────────────────────────────────────────────── */
interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  dropKey?: string;
  badge?: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Explore",          href: "/",                     active: true },
  { label: "MCP",              href: "/mcp",                  badge: <BadgeNew /> },
  { label: "Image",            href: "/ai/image",             dropKey: "Image" },
  { label: "Video",            href: "/ai/video",             dropKey: "Video" },
  { label: "Audio",            href: "/audio",                dropKey: "Audio" },
  { label: "Collab",           href: "/chat" },
  { label: "Edit",             href: "/ai/image",             dropKey: "Edit" },
  { label: "Character",        href: "/character",            dropKey: "Character" },
  { label: "Marketing Studio", href: "/marketing-studio/app", badge: <BadgeNew /> },
  { label: "Cinema Studio",    href: "/cinema-studio",        badge: <BadgeVersion label="3.5" /> },
  { label: "Originals",        href: "/original-series",      badge: <BadgeNew /> },
  { label: "Apps",             href: "/apps" },
  { label: "Community",        href: "/community",            dropKey: "Community" },
  { label: "Assist",           href: "/chat" },
  { label: "Pricing",          href: "/pricing",              badge: <BadgeSale label="30% OFF" /> },
];

/* ── Main export ──────────────────────────────────────────────────────── */
export function Navbar() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = useCallback((key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveKey(key);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveKey(null), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <header
      className="sticky top-0 z-[51] h-16"
      style={{
        background: "rgba(13,15,17,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "inset 0 1rem 1rem rgba(0,0,0,1)",
      }}
      onMouseLeave={scheduleClose}
    >
      <nav
        className="grid h-full grid-cols-[auto_1fr_auto] items-center pr-3 md:pr-4 relative container"
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 pr-3 shrink-0" aria-label="Ninja Box home">
          <NinjaLogo />
          <span className="font-bold text-[17px] text-hf-text md:hidden xl:block">Ninja Box</span>
        </Link>

        {/* ── Desktop nav items ── */}
        <ul className="hidden h-full md:flex items-center gap-0 overflow-x-auto hide-scrollbar list-none m-0 p-0">
          {NAV_ITEMS.map((item) => {
            const isOpen = item.dropKey ? activeKey === item.dropKey : false;
            return (
              <li key={item.label} className="relative h-full flex items-center">
                <Link
                  href={item.href}
                  onMouseEnter={() => item.dropKey ? open(item.dropKey) : setActiveKey(null)}
                  className={[
                    "flex h-full items-center gap-1.5 whitespace-nowrap rounded-xl px-2.5 py-1 text-[13px] font-medium transition-colors duration-150",
                    item.active || isOpen
                      ? "text-[#f7f7f8]"
                      : "text-white/60 hover:text-[#f7f7f8]",
                  ].join(" ")}
                >
                  {item.label}
                  {item.dropKey && (
                    <ChevronDown
                      size={13}
                      strokeWidth={2}
                      className={`shrink-0 opacity-50 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                    />
                  )}
                  {item.badge}
                </Link>

                {/* Dropdown */}
                {item.dropKey && activeKey === item.dropKey && (
                  <div
                    className="absolute top-full left-0"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  >
                    <DropdownPanel menu={DROPS[item.dropKey]} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* ── Right cluster ── */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Desktop: Upgrade + separator + Bell + Assets + Avatar */}
          <div className="hidden md:flex items-center gap-2">
            <UpgradeButton />
            <NavSeparator />
            <NotificationsBell />
            <AssetsLink />
          </div>

          {/* Mobile-only: Pricing icon + Instagram */}
          <MobilePricingButton />
          <MobileInstagramLink />

          {/* Both: Profile avatar */}
          <ProfileRingAvatar />

          {/* Mobile-only: Hamburger */}
          <HamburgerButton />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
