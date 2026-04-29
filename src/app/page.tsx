import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import {
  ArrowRight,
  BadgePlus,
  Bot,
  Clapperboard,
  ImageIcon,
  MessageCircle,
  Mic2,
  Play,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { HeroBanner } from "@/components/HeroBanner";
import { TopChoice } from "@/components/TopChoice";
import { SeedanceBanner } from "@/components/SeedanceBanner";
import { KlingExclusive } from "@/components/KlingExclusive";
import { CommunitySection } from "@/components/CommunitySection";
import { CreditSaleBanner } from "@/components/CreditSaleBanner";
import { FooterLanding } from "@/components/FooterLanding";
import { CopyrightBar } from "@/components/CopyrightBar";
import { GptImage2Banner } from "@/components/GptImage2Banner";


const launchCards = [
  {
    title: "Create Image",
    subtitle: "Prompt high-detail images, edits and visual variations.",
    icon: ImageIcon,
    href: "/ai/image",
    image: "https://cdn.higgsfield.ai/card/a5c235aa-388c-477e-8974-955aa5eacb13.webp",
  },
  {
    title: "Generate Video",
    subtitle: "Use top video models with motion, scenes and sound.",
    icon: Play,
    href: "/ai/video",
    image: "https://cdn.higgsfield.ai/card/37540ebd-ae97-4f45-aa9b-8da2fce2dafd.webp",
  },
  {
    title: "Cinema Studio 3.5",
    subtitle: "Director-level shot control for cinematic sequences.",
    icon: Clapperboard,
    href: "/cinema-studio",
    image: "https://cdn.higgsfield.ai/card/e88bb549-1b08-44c7-be91-671ec4ff647c.webp",
  },
  {
    title: "Ninja Box Chat",
    subtitle: "Collaborate in real time with voice, video and generation.",
    icon: MessageCircle,
    href: "/chat",
    image: "https://cdn.higgsfield.ai/card/23a5304e-af7a-4f3d-96dd-f97406f0f926.webp",
  },
  {
    title: "Ninja Box Audio",
    subtitle: "Voice cloning, multilingual synthesis and localization.",
    icon: Mic2,
    href: "/audio",
    image: "https://cdn.higgsfield.ai/card/30bcdc8f-7aa9-42bd-b820-40f2e9959f27.webp",
  },
  {
    title: "Soul 2.0",
    subtitle: "Fashion-forward photo model with cultural fluency.",
    icon: Sparkles,
    href: "/ai/image",
    image: "https://cdn.higgsfield.ai/card/c2124f76-f96f-4df1-870c-03e5ad15fae4.webp",
  },
];

const exploreCards = [
  ["Nano Banana 2", "Pro-level quality at Flash speed", "https://cdn.higgsfield.ai/card/1907d968-9588-4599-a53b-4d40f551356b.webp"],
  ["Unlimited Seedream 5.0 lite", "Intelligent visual reasoning for consistent images", "https://cdn.higgsfield.ai/card/02a55528-f1b7-4cf7-a176-4e1ea9171eee.webp"],
  ["Cinema Studio 2.0", "Step inside 3D scenes and control every shot", "https://cdn.higgsfield.ai/card/424836bc-64a8-4b6e-b52c-384673212340.webp"],
  ["KLING 3.0 Public Release", "Reduced wait times and faster generation", "https://cdn.higgsfield.ai/card/831011af-a320-40a8-bf95-ebc55ff59900.webp"],
  ["Ninja Box Contests", "Submit AI action videos and compete for prizes", "https://cdn.higgsfield.ai/card/14244036-98db-43fb-8cb6-0fd3f092ad38.webp"],
  ["Vibe Motion", "Turn prompts into motion-designed videos", "https://cdn.higgsfield.ai/card/3ecf80d1-a279-42ad-b99b-c840baeb17eb.webp"],
  ["Grok Imagine", "Generate cinematic videos with synchronized audio", "https://cdn.higgsfield.ai/card/df0944c8-17f5-44bb-be7d-d46952e858fa.webp"],
  ["Angles V2", "360-degree coverage and generation history", "https://cdn.higgsfield.ai/card/19aa0ae4-dcbb-4473-9cbc-93f222d2faf0.webp"],
];

const gptImageGrid = [
  "578d27f2-663d-4817-96e7-89f90426c72c",
  "c10ed514-8e43-4390-b20c-58254f837086",
  "2230dfb0-c7b6-466e-99ea-f4eee9d08814",
  "b1988a79-e9d2-4058-9c90-82ab677b6058",
  "0a707acf-5df0-429a-b9e8-e4961d8d01cd",
  "a524d80e-204d-40ba-bcd8-39f75dcd5c92",
  "7e661736-c838-4789-a053-cfb09990a688",
  "96cb52c1-23e9-47a0-badc-239cf0a29570",
  "ddd778ac-253e-4251-8d9a-340189a311e8",
  "051a430d-eb46-423f-93e7-b450faaf7337",
  "e868fb8f-a0af-4f86-ae5a-6f3ac727878e",
  "9e7e9e9a-716f-4b59-878c-d3c7f1f7012d",
];

const exploreMoreTags = [
  "Cinema Studio", "Visual Effects", "Ninja Box Soul", "Ninja Box Apps",
  "Kling 2.1 Master", "Camera Controls", "Viral", "Action movements",
  "Commercial", "MiniMax Hailuo 02", "Seedance Pro", "Community",
  "Wan 2.2 Image", "Seedream 4.0", "Nano Banana", "Flux Kontext",
  "GPT Image", "Topaz", "Google Veo3", "Kling 2.5 Turbo",
  "Kling Avatars 2.0", "Wan 2.5", "Sora 2", "Sora 2 Presets",
  "Banana Placement", "Product Placement", "Edit Image", "Multi Reference",
  "Upscale", "Assists", "YouTube", "TikTok", "Instagram Reels",
  "YouTube Shorts", "Nano Banana Pro", "Kling o1",
];

function readMotionLinks() {
  const urlFile = path.resolve(
    process.cwd(),
    "..",
    "..",
    "urls_motion_presets.txt",
  );

  try {
    return fs
      .readFileSync(urlFile, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((url) => {
        const id = url.split("/motion/")[1] ?? url;
        return { id, url, href: `/motion/${id}` };
      });
  } catch {
    return [];
  }
}

function MediaCard({
  title,
  subtitle,
  image,
  href,
  kicker,
  priority = false,
}: {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  kicker?: string;
  priority?: boolean;
}) {
  return (
    <Link href={href} className="group block min-w-0">
      <article className="overflow-hidden rounded-[10px] bg-hf-surface">
        <div className="relative aspect-[1.62] overflow-hidden bg-hf-surface-2">
          <img
            src={image}
            alt=""
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
          {kicker && (
            <span className="absolute left-3 top-3 rounded-md bg-black/55 px-2 py-1 text-[10px] font-black uppercase text-white/85 backdrop-blur">
              {kicker}
            </span>
          )}
          <div className="absolute bottom-3 left-3 right-3">
            <h2 className="text-[18px] font-black leading-none text-white md:text-[22px]">
              {title}
            </h2>
            <p className="mt-1 line-clamp-2 text-[12px] font-semibold leading-tight text-white/68">
              {subtitle}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function Home() {
  const motionLinks = readMotionLinks();

  return (
    <>
      <Navbar />
      <main className="w-full px-2 pb-24 pt-2 md:px-3">

        {/* ── Featured video scroll (HeroBanner) ── */}
        <HeroBanner />

        {/* ── Credit sale banner ── */}
        <CreditSaleBanner />

        {/* ── GPT Image 2 "Meet" section — two-column ── */}
        <GptImage2Banner />
        <section className="hidden">
          {/* Left: text panel */}
          <div className="flex flex-col bg-[#0d0e10] p-7">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">
              New Model
            </p>
            <div className="mt-1.5 h-px bg-white/[0.07]" />
            <h2 className="mt-5 text-[clamp(24px,2.6vw,38px)] font-black leading-[0.9] tracking-tight text-white">
              Meet<br />
              <span className="text-hf-neon">GPT Image 2</span>
            </h2>
            <p className="mt-3 text-[13px] font-medium leading-snug text-white/50">
              4K images with near-perfect text rendering
            </p>
            <Link
              href="/ai/image"
              className="mt-6 inline-flex h-10 w-max items-center gap-2 rounded-xl bg-white px-4 text-[13px] font-black text-black transition hover:bg-white/90"
            >
              <Sparkles size={13} /> Try Model
            </Link>
            <div className="mt-auto pt-8 opacity-[0.07]">
              <svg viewBox="0 0 24 24" className="h-20 w-20 text-white" fill="currentColor">
                <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654 2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
              </svg>
            </div>
          </div>
          {/* Right: masonry image grid */}
          <div className="relative overflow-hidden bg-[#141518]">
            <div className="columns-4 gap-0.5 p-0.5 [column-fill:balance]">
              {gptImageGrid.map((id) => (
                <img
                  key={id}
                  src={`https://cdn.higgsfield.ai/card/${id}.webp`}
                  alt=""
                  className="mb-0.5 w-full rounded-[3px] object-cover"
                />
              ))}
            </div>
            <Link
              href="/ai/image"
              className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-hf-neon px-4 py-2 text-[13px] font-black text-black shadow-xl transition hover:bg-hf-neon/90"
            >
              View all GPT Image 2 ↗
            </Link>
          </div>
        </section>

        {/* ── Marketing Studio banner ── */}
        <section className="mt-4 grid gap-4 overflow-hidden rounded-[14px] bg-[#141518] lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col justify-center p-8 md:p-10">
            <span className="mb-3 inline-flex w-max rounded-md bg-hf-neon/15 px-2 py-1 text-[11px] font-black uppercase tracking-wide text-hf-neon">
              Marketing Studio
            </span>
            <h2 className="text-[clamp(28px,4vw,48px)] font-black leading-[0.95] tracking-tight">
              One link in.<br />
              <span className="text-white/60">marketing out.</span>
            </h2>
            <p className="mt-3 max-w-[340px] text-[14px] font-semibold text-white/52">
              Create UGC, demos, and ads across channels from one product link.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/marketing-studio/app"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-hf-neon px-5 text-sm font-black text-black transition hover:bg-hf-neon/90"
              >
                Try Marketing Studio
              </Link>
              <Link href="/marketing-studio/app" className="text-sm font-semibold text-white/52 hover:text-white transition">
                View all Marketing Studio
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-0.5 overflow-hidden p-0.5 lg:min-h-[280px]">
            {[
              "c1387f77-3127-4c01-add8-9ee2d1a36b14",
              "e534933b-f6b9-4c2a-8ef2-7abb99817f4e",
              "a820e015-58b0-437e-9d1f-f044b8ba0b81",
              "58d0cc0b-fc49-45a8-b66e-ebeea64125b3",
            ].map((id) => (
              <img
                key={id}
                src={`https://cdn.higgsfield.ai/card/${id}.webp`}
                alt=""
                className="h-full w-full rounded-[4px] object-cover"
              />
            ))}
          </div>
        </section>

        {/* ── Seedance availability banner ── */}
        <section className="mt-4 overflow-hidden rounded-[14px] bg-[#141518] p-6 md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="text-[11px] font-black uppercase tracking-[0.12em] text-white/38">
                Available for everyone
              </span>
              <h2 className="mt-2 text-[clamp(22px,3.5vw,36px)] font-black leading-none">
                World&apos;s best video model available with up to{" "}
                <span className="text-hf-neon">30% OFF</span>{" "}
                with special offer
              </h2>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link
                href="/ai/video"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-hf-neon px-5 text-sm font-black text-black transition hover:bg-hf-neon/90"
              >
                Get Seedance 2.0
              </Link>
              <Link href="/ai/video" className="text-sm font-semibold text-white/52 hover:text-white transition">
                Learn more
              </Link>
            </div>
          </div>
        </section>

        {/* ── Original Series ── */}
        <section className="mt-4 grid gap-2 md:grid-cols-[1.5fr_1fr]">
          <Link
            href="/original-series"
            className="group relative min-h-[280px] overflow-hidden rounded-[14px] bg-[#0a0a0c]"
          >
            <img
              src="https://static.higgsfield.ai/original-series/mork-promo/3x4%20Mork%20CLEAN%20(1)%201%20(1).png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5" />
            <div className="relative flex h-full flex-col justify-end p-6">
              <img
                src="https://static.higgsfield.ai/original-series/mork-promo/LOGO.png"
                alt="Arena Zero"
                className="mb-3 h-8 w-auto object-contain object-left"
              />
              <p className="text-[12px] font-black uppercase tracking-[0.1em] text-white/52">
                Available on Ninja Box Original Series
              </p>
              <h2 className="mt-1 text-[22px] font-black leading-tight text-white">
                First ever AI series streaming platform
              </h2>
              <span className="mt-4 inline-flex h-10 w-max items-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-black">
                Watch Zephyr <ArrowRight size={14} />
              </span>
            </div>
          </Link>
          <div className="grid gap-2">
            <Link
              href="/original-series"
              className="group relative min-h-[130px] overflow-hidden rounded-[14px] bg-[#1a1218] p-5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black/60" />
              <div className="relative">
                <span className="text-[11px] font-black uppercase tracking-[0.1em] text-white/40">New Series</span>
                <h3 className="mt-2 text-[20px] font-black text-white">Zephyr: Cuties on Duty</h3>
                <p className="mt-1 text-[13px] font-semibold text-white/55">First episode is live. The adventure starts here.</p>
              </div>
            </Link>
            <Link
              href="/original-series"
              className="group relative min-h-[130px] overflow-hidden rounded-[14px] bg-[#0f1418] p-5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-black/60" />
              <div className="relative">
                <span className="text-[11px] font-black uppercase tracking-[0.1em] text-white/40">Explore</span>
                <h3 className="mt-2 text-[20px] font-black text-white">Ninja Box Originals</h3>
                <p className="mt-1 text-[13px] font-semibold text-white/55">Exclusive AI-generated cinematic series and short films.</p>
              </div>
            </Link>
          </div>
        </section>

        {/* ── "What will you create?" hero + launch cards ── */}
        <section className="mt-4 grid gap-2 lg:grid-cols-[1.18fr_2fr]">
          <Link
            href="/ai/image"
            className="group relative min-h-[310px] overflow-hidden rounded-[14px] bg-[#151719] p-5"
          >
            <img
              src="https://cdn.higgsfield.ai/card/153574e6-6f8b-4857-806e-22b37202dd29.webp"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-300 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent" />
            <div className="relative flex h-full max-w-[300px] flex-col">
              <span className="mb-3 w-max rounded-md bg-hf-neon px-2 py-1 text-[10px] font-black uppercase text-black">
                Start creating
              </span>
              <h1 className="text-[34px] font-black leading-[0.95] tracking-normal md:text-[48px]">
                What will you create today?
              </h1>
              <p className="mt-3 text-sm font-semibold text-white/62">
                Images, videos, ads, characters, edits and motion presets in the same dark creative workspace.
              </p>
              <span className="mt-auto inline-flex h-11 w-max items-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-black">
                Generate <ArrowRight size={16} />
              </span>
            </div>
          </Link>

          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {launchCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group relative min-h-[150px] overflow-hidden rounded-[14px] bg-hf-surface p-4"
                >
                  <img
                    src={card.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-38 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-55"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/58 to-black/5" />
                  <div className="relative flex h-full flex-col">
                    <Icon className="mb-auto text-white/72" size={22} />
                    <h2 className="text-[18px] font-black leading-tight">{card.title}</h2>
                    <p className="mt-1 line-clamp-2 text-[12px] font-semibold leading-tight text-white/58">
                      {card.subtitle}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Explore ── */}
        <section className="mt-8">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-[26px] font-black leading-none">Explore</h2>
              <p className="mt-1 text-sm font-semibold text-white/48">
                Public cards and tools mirrored from the Ninja Box home feed.
              </p>
            </div>
            <Link href="/apps" className="hidden items-center gap-1 text-sm font-black text-hf-neon sm:flex">
              Apps <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {exploreCards.map(([title, subtitle, image]) => (
              <MediaCard
                key={title}
                title={title}
                subtitle={subtitle}
                image={image}
                href="/apps"
              />
            ))}
          </div>
        </section>

        {/* ── Different Scenes Same Star ── */}
        <section className="mt-4 grid gap-4 overflow-hidden rounded-[14px] bg-[#141518] lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col justify-center p-8 md:p-10">
            <span className="mb-3 inline-flex w-max rounded-md bg-white/[0.07] px-2 py-1 text-[11px] font-black uppercase tracking-wide text-white/55">
              Character
            </span>
            <h2 className="text-[clamp(28px,4vw,48px)] font-black leading-[0.95] tracking-tight">
              Different Scenes<br />
              <span className="text-white/55">Same Star</span>
            </h2>
            <p className="mt-3 max-w-[340px] text-[14px] font-semibold text-white/52">
              Build your character. One click does the rest.
            </p>
            <div className="mt-6">
              <Link
                href="/character"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-hf-neon px-5 text-sm font-black text-black transition hover:bg-hf-neon/90"
              >
                Try Photodump <ArrowRight size={15} />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 p-3 lg:min-h-[280px]">
            <img
              src="https://cdn.higgsfield.ai/card/14ed53ed-4cad-46a7-9dad-4cebb7d9cd41.webp"
              alt=""
              className="h-full min-h-[160px] w-full rounded-[10px] object-cover"
            />
            <div className="grid gap-2">
              <img
                src="https://cdn.higgsfield.ai/card/2b3cc30f-49c4-4868-b1d7-5f56a4c946c3.webp"
                alt=""
                className="h-full w-full rounded-[10px] object-cover"
              />
              <img
                src="https://cdn.higgsfield.ai/card/19aa0ae4-dcbb-4473-9cbc-93f222d2faf0.webp"
                alt=""
                className="h-full w-full rounded-[10px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* ── Motion presets ── */}
        <section className="mt-8 rounded-[14px] border border-white/[0.08] bg-[#141518] p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-[24px] font-black leading-none">Motion presets</h2>
              <p className="mt-1 text-sm font-semibold text-white/48">
                {motionLinks.length} motion presets available
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-2 text-xs font-black text-white/70">
              <BadgePlus size={14} /> Local cloned routes
            </span>
          </div>
          <div className="grid max-h-[620px] gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {motionLinks.map((motion, index) => (
              <Link
                key={motion.id}
                href={motion.href}
                className="group rounded-[10px] border border-white/[0.07] bg-white/[0.035] p-3 transition hover:border-hf-neon/50 hover:bg-hf-neon-10"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-black uppercase text-white/38">
                    Motion {String(index + 1).padStart(3, "0")}
                  </span>
                  <Wand2 size={14} className="text-white/35 group-hover:text-hf-neon" />
                </div>
                <p className="mt-2 truncate font-mono text-[11px] text-white/72">
                  {motion.id}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Promo row ── */}
        <section className="mt-8 grid gap-2 md:grid-cols-[1fr_1fr_1.3fr]">
          <div className="rounded-[14px] bg-hf-neon p-5 text-black">
            <Bot size={26} />
            <h2 className="mt-8 text-[28px] font-black leading-none">Assist</h2>
            <p className="mt-2 text-sm font-bold text-black/68">
              A compact chat entry point, matching the utility-heavy Ninja Box shell.
            </p>
          </div>
          <div className="rounded-[14px] bg-white/[0.055] p-5">
            <h2 className="text-[28px] font-black leading-none">Community</h2>
            <p className="mt-2 text-sm font-semibold text-white/52">
              Creator spotlights, public projects and inspiration feeds are represented as scannable media blocks.
            </p>
          </div>
          <div className="relative min-h-[210px] overflow-hidden rounded-[14px] bg-white/[0.055] p-5">
            <img
              src="https://cdn.higgsfield.ai/card/f6330878-adf6-48ef-a91e-0a86b13feb03.webp"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/15" />
            <div className="relative max-w-[340px]">
              <h2 className="text-[28px] font-black leading-none">Originals New</h2>
              <p className="mt-2 text-sm font-semibold text-white/65">
                Zephyr, series launches and cinematic releases stay visible in the first full scroll.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ── Below-fold sections ── */}
      <div className="w-full px-2 md:px-3">
        <div className="mt-12">
          <TopChoice />
        </div>

        <div className="mt-6">
          <SeedanceBanner />
        </div>

        <div className="mt-6">
          <KlingExclusive />
        </div>

        <CommunitySection
          title="Soul Cinema"
          subtitle="Community gallery — cinematic AI portraits and scenes"
          viewAllHref="/community"
          viewAllLabel="View all"
          ctaLabel="Browse Soul Cinema"
          ctaHref="/ai/image"
          items={8}
        />

        <CommunitySection
          title="Community"
          subtitle="Creator spotlights and top-rated AI generations"
          viewAllHref="/community"
          viewAllLabel="View all"
          ctaLabel="Explore Community"
          ctaHref="/community"
          items={12}
        />
      </div>

      {/* ── Explore more AI features ── */}
      <div className="w-full px-2 pb-12 md:px-3">
        <h2 className="mb-4 text-[22px] font-black">Explore more AI features</h2>
        <div className="flex flex-wrap gap-2">
          {exploreMoreTags.map((tag) => (
            <Link
              key={tag}
              href="/apps"
              className="rounded-full border border-white/[0.1] bg-white/[0.045] px-4 py-2 text-[13px] font-semibold text-white/65 transition hover:border-hf-neon/40 hover:text-white"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      <FooterLanding />
      <CopyrightBar />
    </>
  );
}
