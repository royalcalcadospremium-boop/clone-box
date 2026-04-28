"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ChevronDown, Sparkles, History, Users } from "lucide-react";

const MODELS = [
  { id: "nano-banana-pro", name: "Nano Banana Pro", badge: "UNLIMITED" },
  { id: "nano-banana-2", name: "Nano Banana 2", badge: "NEW" },
  { id: "soul-v2", name: "Soul 2.0", badge: null },
  { id: "soul-cinema", name: "Soul Cinema", badge: "NEW" },
  { id: "gpt-image-2", name: "GPT Image 2", badge: null },
  { id: "flux-2", name: "Flux 2", badge: null },
  { id: "imagegen_2_0", name: "ImageGen 2.0", badge: null },
];

const ASPECTS = ["3:4", "Auto", "1:1", "4:3", "3:2", "16:9", "9:16", "21:9"];
const QUALITIES = ["1K", "2K", "4K"];
const COUNTS = ["1/4", "2/4", "3/4", "4/4"];

const EMPTY_STATE_IMAGES = [
  "https://higgsfield.ai/cdn-cgi/image/fit=scale-down,format=webp,onerror=redirect,width=1920,quality=85/image/empty-state/image-01.jpg",
  "https://higgsfield.ai/cdn-cgi/image/fit=scale-down,format=webp,onerror=redirect,width=1920,quality=85/image/empty-state/image-02.jpg",
  "https://higgsfield.ai/cdn-cgi/image/fit=scale-down,format=webp,onerror=redirect,width=1920,quality=85/image/empty-state/image-03.jpg",
  "https://higgsfield.ai/cdn-cgi/image/fit=scale-down,format=webp,onerror=redirect,width=1920,quality=85/image/empty-state/image-04.jpg",
];

export default function AIImagePage() {
  const [model, setModel] = useState(MODELS[0]);
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [aspect, setAspect] = useState("3:4");
  const [quality, setQuality] = useState("1K");
  const [count, setCount] = useState("1/4");
  const [prompt, setPrompt] = useState("");
  const [tab, setTab] = useState<"history" | "community">("history");

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-hf-bg">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar — history / community */}
        <aside className="hidden w-[280px] shrink-0 flex-col border-r border-white/[0.06] bg-[#111214] lg:flex">
          <div className="flex border-b border-white/[0.06]">
            {(["history", "community"] as const).map((t) => {
              const Icon = t === "history" ? History : Users;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-[12px] font-semibold capitalize transition-colors ${
                    tab === t ? "border-b-2 border-hf-neon text-hf-text" : "text-white/40 hover:text-white/60"
                  }`}
                >
                  <Icon size={13} /> {t}
                </button>
              );
            })}
          </div>

          <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
            {tab === "history" ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                <Sparkles size={28} className="text-white/20" />
                <p className="text-[12px] text-white/40">Your generated images will appear here</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1.5">
                {EMPTY_STATE_IMAGES.concat(EMPTY_STATE_IMAGES).map((src, i) => (
                  <div key={i} className="overflow-hidden rounded-lg bg-hf-surface-2 aspect-[3/4]">
                    <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Center — workspace */}
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Soul Cinema banner */}
          <div className="relative overflow-hidden border-b border-white/[0.06]">
            <img
              src="https://static.higgsfield.ai/soul-cinema/soul-cinema-banner.webp"
              alt="Soul Cinema"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-hf-bg via-hf-bg/60 to-transparent" />
            <div className="relative flex items-center gap-4 px-5 py-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider text-hf-neon">Soul Cinema is here</p>
                <p className="text-[12px] text-white/60">The world's first cinematic film model — upgraded, unleashed, and ready for your story</p>
              </div>
            </div>
          </div>

          {/* Prompt area */}
          <div className="flex flex-1 flex-col items-center justify-center gap-6 overflow-y-auto p-6">
            <div className="w-full max-w-[640px]">
              <h2 className="mb-4 text-center text-[clamp(20px,3vw,30px)] font-black text-hf-text">
                Start creating with{" "}
                <button
                  type="button"
                  onClick={() => setShowModelPicker(!showModelPicker)}
                  className="text-hf-neon hover:opacity-80"
                >
                  {model.name}
                </button>
              </h2>

              {showModelPicker && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {MODELS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => { setModel(m); setShowModelPicker(false); }}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                        model.id === m.id ? "border-hf-neon bg-hf-neon/10 text-hf-neon" : "border-white/[0.1] text-white/60 hover:border-white/20"
                      }`}
                    >
                      {m.name}
                      {m.badge && (
                        <span className={`rounded px-1 py-0.5 text-[9px] font-black uppercase ${
                          m.badge === "NEW" ? "bg-hf-neon text-black" : "bg-red-500 text-white"
                        }`}>{m.badge}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Prompt textarea */}
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe a scene, character, mood, or style — and watch it come to life"
                  className="w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 pr-32 text-[14px] text-hf-text placeholder:text-white/25 focus:border-hf-neon/40 focus:outline-none"
                  rows={4}
                />
                <div className="absolute bottom-3 right-3">
                  <button
                    type="button"
                    className="rounded-xl bg-hf-neon px-4 py-2 text-[12px] font-black text-black hover:opacity-90"
                  >
                    Generate
                  </button>
                </div>
              </div>

              {/* Options row */}
              <div className="mt-3 flex flex-wrap gap-3">
                {/* Aspect */}
                <div className="flex gap-1">
                  {ASPECTS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAspect(a)}
                      className={`rounded-lg px-2 py-1 text-[11px] font-semibold transition-colors ${
                        aspect === a ? "bg-hf-neon text-black" : "text-white/40 hover:text-white/60"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>

                <div className="flex gap-1">
                  {QUALITIES.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuality(q)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                        quality === q ? "bg-white/[0.12] text-hf-text" : "text-white/40 hover:text-white/60"
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>

                <div className="flex gap-1">
                  {COUNTS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCount(c)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                        count === c ? "bg-white/[0.12] text-hf-text" : "text-white/40 hover:text-white/60"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Example images */}
            <div className="grid w-full max-w-[640px] grid-cols-4 gap-2 opacity-30">
              {EMPTY_STATE_IMAGES.map((src, i) => (
                <div key={i} className="overflow-hidden rounded-xl aspect-[3/4]">
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
