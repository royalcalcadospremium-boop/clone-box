import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { APP_TOOLS } from "@/data/app-tools";
import Link from "next/link";

export function generateStaticParams() {
  return Object.keys(APP_TOOLS).map((slug) => ({ tool: slug }));
}

const PRICING = [
  { name: "Starter", price: "$15", credits: "200 credits/mo", highlight: false },
  { name: "Plus", price: "$39", credits: "1,000 credits/mo", highlight: true },
  { name: "Ultra", price: "$99", credits: "3,000 credits/mo", highlight: false },
];

export default async function AppToolPage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  const data = APP_TOOLS[tool];
  if (!data) notFound();

  return (
    <div className="min-h-screen bg-hf-bg text-hf-text">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0">
          <img src={data.heroImage} alt="" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-hf-bg/60 via-hf-bg/80 to-hf-bg" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
          {data.badge && (
            <span className="mb-4 inline-block rounded-full bg-hf-neon px-3 py-1 text-[11px] font-black uppercase tracking-widest text-black">
              {data.badge}
            </span>
          )}
          <p className="mb-2 text-[12px] font-black uppercase tracking-widest text-hf-neon">{data.subtitle}</p>
          <h1 className="mb-4 text-[clamp(28px,5vw,56px)] font-black leading-tight">{data.title}</h1>
          <p className="mx-auto mb-8 max-w-2xl text-[16px] text-white/60">{data.description}</p>
          <Link
            href="/pricing"
            className="inline-block rounded-xl bg-hf-neon px-8 py-3 text-[14px] font-black text-black hover:opacity-90 transition-opacity"
          >
            {data.ctaLabel}
          </Link>
        </div>
      </section>

      {/* ── Upload Interface ── */}
      <section className="border-b border-white/[0.06] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
            <h2 className="mb-6 text-center text-[20px] font-black text-hf-text">Try it now</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-white/[0.15] bg-white/[0.02] p-6 text-center">
                <div className="text-3xl">📁</div>
                <p className="text-[13px] font-semibold text-white/60">Upload your file</p>
                <p className="text-[11px] text-white/30">PNG, JPG, MP4, MOV supported</p>
                <Link href="/pricing" className="mt-2 rounded-lg border border-white/[0.15] px-4 py-2 text-[12px] font-semibold text-white/60 hover:bg-white/[0.05]">
                  Choose File
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-hf-neon/5 border border-hf-neon/20 p-6 text-center">
                <div className="text-3xl">✨</div>
                <p className="text-[13px] font-semibold text-hf-neon">{data.ctaLabel}</p>
                <p className="text-[11px] text-white/40">Sign up to generate</p>
                <Link href="/pricing" className="mt-2 rounded-xl bg-hf-neon px-5 py-2 text-[12px] font-black text-black hover:opacity-90">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-b border-white/[0.06] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-2 text-center text-[11px] font-black uppercase tracking-widest text-hf-neon">How it works</p>
          <h2 className="mb-12 text-center text-[clamp(24px,4vw,40px)] font-black">Three steps to perfection</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {data.steps.map((step, i) => (
              <div key={i} className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-hf-neon text-[14px] font-black text-black">
                  {i + 1}
                </div>
                <img src={step.image} alt={step.title} className="w-full rounded-xl object-cover aspect-video" />
                <h3 className="text-[15px] font-black uppercase tracking-wide text-hf-text">{step.title}</h3>
                <p className="text-[13px] text-white/50">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="border-b border-white/[0.06] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-12 text-center text-[clamp(24px,4vw,40px)] font-black">Why it&apos;s the best</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.features.map((feature, i) => (
              <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <h3 className="mb-2 text-[15px] font-black text-hf-neon">{feature.title}</h3>
                <p className="text-[13px] text-white/50">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      {data.gallery.length > 0 && (
        <section className="border-b border-white/[0.06] py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-8 text-center text-[clamp(20px,3vw,32px)] font-black">Created with {data.subtitle}</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {data.gallery.map((src, i) => (
                <div key={i} className="overflow-hidden rounded-2xl aspect-[4/3] bg-hf-surface-2">
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Pricing ── */}
      <section className="border-b border-white/[0.06] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="mb-2 text-center text-[11px] font-black uppercase tracking-widest text-hf-neon">Pricing</p>
          <h2 className="mb-12 text-center text-[clamp(24px,4vw,40px)] font-black">Pick your plan</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {PRICING.map((plan) => (
              <div key={plan.name} className={`rounded-2xl border p-6 ${plan.highlight ? "border-hf-neon bg-hf-neon/5" : "border-white/[0.08] bg-white/[0.02]"}`}>
                <h3 className={`mb-1 text-[16px] font-black ${plan.highlight ? "text-hf-neon" : "text-hf-text"}`}>{plan.name}</h3>
                <p className="mb-4 text-[28px] font-black text-hf-text">{plan.price}<span className="text-[14px] font-normal text-white/40">/mo</span></p>
                <p className="mb-6 text-[13px] text-white/50">{plan.credits}</p>
                <Link href="/pricing" className={`block w-full rounded-xl py-2.5 text-center text-[13px] font-black transition-opacity hover:opacity-90 ${plan.highlight ? "bg-hf-neon text-black" : "bg-white/[0.08] text-hf-text"}`}>
                  Get Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-b border-white/[0.06] py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-12 text-center text-[clamp(24px,4vw,40px)] font-black">Frequently asked questions</h2>
          <div className="flex flex-col gap-4">
            {data.faq.map((item, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <h3 className="mb-2 text-[14px] font-bold text-hf-text">{item.question}</h3>
                <p className="text-[13px] text-white/50">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="mb-4 text-[clamp(24px,4vw,40px)] font-black">Start creating today</h2>
          <p className="mb-8 text-[15px] text-white/50">Join millions of creators using AI to produce stunning content</p>
          <Link href="/pricing" className="inline-block rounded-xl bg-hf-neon px-10 py-4 text-[15px] font-black text-black hover:opacity-90 transition-opacity">
            {data.ctaLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
