"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { RefreshCw, Link2 } from "lucide-react";

type ProductType = "Product" | "App";
type AdFormat = "UGC" | "Mobile" | "Desktop" | "9:16" | "16:9" | "4:3" | "3:4" | "1:1" | "21:9" | "8s";
type AdType = "App" | "Avatar";

const adTemplates = [
  "Hyper Motion", "Unboxing", "UGC", "TV Spot", "Tutorial",
  "UGC Virtual Try On", "Pro Virtual Try On", "Hyper Motion",
  "UGC", "Unboxing", "Tutorial", "UGC Virtual Try On",
  "TV Spot", "Hyper Motion", "UGC", "Pro Virtual Try On",
];

const TEMPLATE_GRADIENTS = [
  "from-blue-800 to-blue-950",
  "from-orange-700 to-orange-950",
  "from-violet-700 to-violet-950",
  "from-teal-700 to-teal-950",
  "from-rose-700 to-rose-950",
  "from-slate-600 to-slate-900",
  "from-amber-700 to-amber-950",
  "from-green-700 to-green-950",
];

export default function MarketingStudioPage() {
  const [productType, setProductType] = useState<ProductType>("Product");
  const [adType, setAdType] = useState<AdType>("App");
  const [prompt, setPrompt] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [showUrlTip, setShowUrlTip] = useState(true);

  const formats: AdFormat[] = ["UGC", "Mobile", "9:16", "16:9", "4:3", "3:4", "1:1", "21:9"];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-hf-bg">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <aside className="hidden w-[200px] shrink-0 flex-col border-r border-white/[0.06] bg-[#111214] lg:flex">
          <div className="border-b border-white/[0.06] p-3">
            <p className="text-[11px] font-black uppercase tracking-wider text-hf-text">Marketing Studio</p>
          </div>
          <nav className="flex flex-col gap-0.5 p-2">
            <button type="button" className="rounded-lg bg-white/[0.06] px-3 py-2 text-left text-[12px] font-semibold text-hf-text">
              New project
            </button>
            <div className="px-3 py-2">
              <p className="text-[10px] font-semibold uppercase text-white/30">Tools</p>
            </div>
            <button type="button" className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-[12px] text-white/60 hover:bg-white/[0.04]">
              <Link2 size={12} /> Url to Ad
            </button>
            <div className="px-3 py-2">
              <p className="text-[10px] font-semibold uppercase text-white/30">Projects</p>
            </div>
          </nav>
          <div className="mt-auto border-t border-white/[0.06] p-3">
            <a href="/pricing" className="block rounded-lg bg-hf-neon px-3 py-2 text-center text-[11px] font-black text-black hover:opacity-90">
              30% OFF — Pricing
            </a>
          </div>
        </aside>

        {/* Main */}
        <main className="flex flex-1 flex-col overflow-y-auto">
          <div className="mx-auto w-full max-w-[900px] px-5 py-6">
            {/* Header */}
            <div className="mb-6 text-center">
              <h1 className="text-[clamp(28px,4vw,42px)] font-black leading-none text-hf-text">
                Turn any product into a video ad
              </h1>
            </div>

            {/* Product / App toggle */}
            <div className="mb-4 flex gap-2">
              {(["Product", "App"] as ProductType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setProductType(t)}
                  className={`rounded-lg px-4 py-2 text-[13px] font-semibold transition-colors ${
                    productType === t ? "bg-white/[0.1] text-hf-text" : "text-white/40 hover:text-white/60"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Prompt area */}
            <div className="relative mb-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what happens in the ad..."
                className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] p-4 pr-28 text-[14px] text-hf-text placeholder:text-white/30 focus:border-hf-neon/40 focus:outline-none"
                rows={3}
              />
            </div>

            {/* Format selectors */}
            <div className="mb-4 flex flex-wrap gap-2">
              {formats.map((f) => (
                <button
                  key={f}
                  type="button"
                  className="rounded-full border border-white/[0.1] px-3 py-1 text-[11px] font-semibold text-white/50 hover:border-white/20 hover:text-white/70 transition-colors"
                >
                  {f}
                </button>
              ))}
              <button type="button" className="rounded-full border border-white/[0.1] px-3 py-1 text-[11px] font-semibold text-white/50">8s</button>
            </div>

            {/* Ad type + generate */}
            <div className="mb-6 flex items-center gap-3">
              {(["App", "Avatar"] as AdType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setAdType(t)}
                  className={`rounded-lg px-4 py-2 text-[13px] font-semibold transition-colors ${
                    adType === t ? "bg-hf-neon text-black" : "border border-white/[0.1] text-white/60 hover:border-white/20"
                  }`}
                >
                  {t}
                </button>
              ))}
              <button
                type="button"
                className="ml-auto rounded-xl bg-hf-neon px-6 py-2.5 text-[14px] font-black text-black hover:opacity-90"
              >
                GENERATE
              </button>
            </div>

            {/* URL to Ad tooltip */}
            {showUrlTip && (
              <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-hf-surface p-5">
                <button
                  type="button"
                  onClick={() => setShowUrlTip(false)}
                  className="absolute right-3 top-3 text-white/30 hover:text-white/60"
                >✕</button>
                <p className="text-[13px] font-black text-hf-text">Create UGC video for your app or website</p>
                <p className="mt-1 text-[12px] text-white/50">Just drop a link</p>
                <div className="mt-3 flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://yourproduct.com"
                    className="flex-1 rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-[13px] text-hf-text placeholder:text-white/30 outline-none focus:border-hf-neon/40"
                  />
                  <button type="button" className="rounded-lg bg-hf-neon px-4 py-2 text-[12px] font-black text-black hover:opacity-90">
                    Try
                  </button>
                </div>
              </div>
            )}

            {/* Template gallery */}
            <h2 className="mb-3 text-[16px] font-black text-hf-text">Generate across formats</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {adTemplates.map((tpl, i) => (
                <div key={i} className="group cursor-pointer overflow-hidden rounded-xl" style={{ aspectRatio: "9/16" }}>
                  <div className={`relative h-full w-full bg-gradient-to-br ${TEMPLATE_GRADIENTS[i % TEMPLATE_GRADIENTS.length]}`}>
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex flex-col justify-between p-3">
                      <span className="w-max rounded bg-black/50 px-1.5 py-0.5 text-[9px] font-black uppercase text-white/80">
                        {tpl}
                      </span>
                      <button
                        type="button"
                        className="flex items-center gap-1 self-start rounded-lg border border-white/20 px-2 py-1 text-[10px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <RefreshCw size={9} /> Recreate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
