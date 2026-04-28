import { Navbar } from "@/components/Navbar";
import Link from "next/link";

const STATS = [
  { value: "22M+", label: "Users" },
  { value: "110M+", label: "Videos created" },
  { value: "~5M", label: "Videos per day" },
  { value: "4B+", label: "Social media reach" },
];

const PRINCIPLES = [
  { num: "01", title: "Make creative tools a force for good.", description: "Expanding access to powerful tools for everyone, regardless of background or experience." },
  { num: "02", title: "Built by creators, shaped by community.", description: "Every feature is built by award-winning filmmakers, producers, and world-class researchers." },
  { num: "03", title: "Create opportunity, create careers.", description: "Ninja Box helps creators monetize their talent and grow professionally — starting with Ninja Box Earn." },
  { num: "04", title: "Connecting creators globally.", description: "Building for 20M+ creators worldwide. Headquartered in San Francisco, backed by leading venture firms." },
  { num: "05", title: "Earn trust every day.", description: "Committed to creator trust — a dedicated Trust page covering terms, policies, and support operations." },
  { num: "06", title: "Always getting better.", description: "More than 200 releases since launch — new creative solutions, models, and platform updates shipping every week." },
];

const PARTNERS = [
  { name: "OpenAI", logo: "https://static.higgsfield.ai/enterprise/partners-logo/openai.svg" },
  { name: "Google", logo: "https://static.higgsfield.ai/enterprise/partners-logo/Google_2015_logo.svg" },
  { name: "Black Forest Labs", logo: "https://static.higgsfield.ai/enterprise/partners-logo/black-forest-labs.svg" },
  { name: "ByteDance", logo: "https://static.higgsfield.ai/enterprise/partners-logo/byte-dance.svg" },
  { name: "Kling", logo: "https://static.higgsfield.ai/enterprise/partners-logo/kling.svg" },
  { name: "Minimax", logo: "https://static.higgsfield.ai/enterprise/partners-logo/minimax.svg" },
  { name: "Wan", logo: "https://static.higgsfield.ai/enterprise/partners-logo/wan.svg" },
  { name: "Fal", logo: "https://static.higgsfield.ai/enterprise/partners-logo/fal.svg" },
];

const USE_CASES = [
  { title: "Social Media Content", description: "Optimized for TikTok, Reels, and Shorts. Cinematic quality meets authentic UGC aesthetics.", image: "https://static.higgsfield.ai/about/Social%20Media%20Content..png" },
  { title: "Product Video Ads", description: "Paste a product URL, get a social-first ad. Click-to-Ad generates trend-matched video ads at scale.", image: "https://static.higgsfield.ai/about/Product%20Video%20Ads.jpg" },
  { title: "Enterprise Content", description: "Fortune 500 agencies use Ninja Box for campaigns and launches — professional output, maximum efficiency.", image: "https://static.higgsfield.ai/about/Enterprise%20Content.png" },
  { title: "AI Filmmaking", description: "Cinema Studio is our flagship horizontal workspace. World-class agencies trust us for cinematic videos.", image: "https://static.higgsfield.ai/about/AI%20Filmmaking..jpg" },
  { title: "Pre-Production & Storyboards", description: "Helps directors and agencies visualize concepts, iterate on storyboards, and lock creative direction.", image: "https://static.higgsfield.ai/about/Pre-Production%20and%20Storyboards..jpeg" },
  { title: "Creative Experimentation", description: "Test dozens of directions in an hour. Plan campaigns around infinite variation and high volume.", image: "https://static.higgsfield.ai/about/Creative%20Experimentation..jpg" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-hf-bg text-hf-text">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-white/[0.06] py-24 text-center px-6">
        <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-hf-neon">About Ninja Box</p>
        <h1 className="mx-auto max-w-4xl text-[clamp(32px,6vw,72px)] font-black leading-tight">
          The ultimate infrastructure for AI video and image Generation
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[16px] text-white/50">
          Ninja Box brings together cinematic intelligence and a unified creative workflow — giving creators, marketing agencies, and filmmakers the power to produce cinematic-quality video and visuals at any scale.
        </p>
      </section>

      {/* Partners marquee */}
      <section className="border-b border-white/[0.06] py-8 overflow-hidden">
        <div className="flex gap-12 animate-marquee items-center">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <img key={i} src={p.logo} alt={p.name} className="h-6 opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all flex-shrink-0" />
          ))}
        </div>
      </section>

      {/* Main image */}
      <section className="border-b border-white/[0.06]">
        <img src="https://static.higgsfield.ai/about/main.png" alt="Ninja Box platform" className="w-full object-cover max-h-[500px]" />
      </section>

      {/* Stats */}
      <section className="border-b border-white/[0.06] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-8 text-center text-[15px] font-bold text-white/60">
            Launched in 2025, Ninja Box is on a mission to make professional video and image creation accessible to anyone with an idea.
          </p>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-[40px] font-black text-hf-neon">{s.value}</p>
                <p className="text-[13px] text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-b border-white/[0.06] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.num} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <p className="mb-3 text-[11px] font-black text-hf-neon">{p.num}</p>
                <h3 className="mb-2 text-[15px] font-black text-hf-text">{p.title}</h3>
                <p className="text-[13px] text-white/50">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For first-time creators */}
      <section className="border-b border-white/[0.06] py-20">
        <div className="mx-auto max-w-5xl px-6 grid grid-cols-1 gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-hf-neon">First-time creators</p>
            <h2 className="mb-4 text-[clamp(24px,4vw,40px)] font-black">Remove technical barriers</h2>
            <ul className="flex flex-col gap-3">
              {["No prior filmmaking or editing experience needed", "Automatic camera logic & pacing", "Professional-quality output without manual editing", "Generate from text, image, or link input"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[14px] text-white/60">
                  <span className="text-hf-neon">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <img src="https://static.higgsfield.ai/about/first-time%20creators.png" alt="First-time creators" className="rounded-2xl object-cover w-full" />
        </div>
      </section>

      {/* For professional filmmakers */}
      <section className="border-b border-white/[0.06] py-20">
        <div className="mx-auto max-w-5xl px-6 grid grid-cols-1 gap-10 md:grid-cols-2 items-center">
          <img src="https://static.higgsfield.ai/about/professional%20filmmakers%20.png" alt="Professional filmmakers" className="rounded-2xl object-cover w-full order-last md:order-first" />
          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-hf-neon">Professional filmmakers</p>
            <h2 className="mb-4 text-[clamp(24px,4vw,40px)] font-black">Cinema-grade tools</h2>
            <ul className="flex flex-col gap-3">
              {["Used by professional filmmakers for full-cycle production", "Pro camera & lens controls", "Cinematic color grading", "Industry-standard output formats"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[14px] text-white/60">
                  <span className="text-hf-neon">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="border-b border-white/[0.06] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-2 text-center text-[11px] font-black uppercase tracking-widest text-hf-neon">Use cases</p>
          <h2 className="mb-12 text-center text-[clamp(24px,4vw,40px)] font-black">Bridging imagination and production</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <img src={uc.image} alt={uc.title} className="w-full aspect-video object-cover" />
                <div className="p-5">
                  <h3 className="mb-2 text-[14px] font-black text-hf-text">{uc.title}</h3>
                  <p className="text-[13px] text-white/50">{uc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earn stats */}
      <section className="border-b border-white/[0.06] py-20 bg-hf-neon/5">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="mb-12 text-[clamp(24px,4vw,40px)] font-black">Creators earn real value</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mb-12">
            {[{ v: "10,000+", l: "Creators commissioned" }, { v: "$1M+", l: "Distributed to creators" }, { v: "90%", l: "Approval rate" }, { v: "50,000+", l: "Submissions processed" }].map((s) => (
              <div key={s.l}>
                <p className="text-[32px] font-black text-hf-neon">{s.v}</p>
                <p className="text-[13px] text-white/40">{s.l}</p>
              </div>
            ))}
          </div>
          <Link href="/earn" className="inline-block rounded-xl bg-hf-neon px-8 py-3 text-[14px] font-black text-black hover:opacity-90">
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}
