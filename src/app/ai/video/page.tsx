"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { History, Users, Play, Upload } from "lucide-react";

const MODELS = [
  { id: "seedance_2_0", name: "Seedance 2.0", badge: "NEW" },
  { id: "kling3_0", name: "Kling 3.0", badge: "EXCLUSIVE" },
  { id: "nano-banana-pro", name: "Nano Banana Pro", badge: "UNLIMITED" },
  { id: "sora-2", name: "Sora 2", badge: null },
  { id: "veo-3", name: "Veo 3.1", badge: "NEW" },
  { id: "wan-2-6", name: "WAN 2.6", badge: null },
  { id: "hailuo", name: "Hailuo", badge: null },
];

const ASPECTS = ["Auto", "9:16", "16:9", "4:3", "1:1", "3:4", "21:9"];
const DURATIONS = ["5s", "8s", "10s", "15s"];

const GENERATION_MODES = [
  { label: "Text to Video", icon: Play },
  { label: "Image to Video", icon: Upload },
];

export default function AIVideoPage() {
  const [model, setModel] = useState(MODELS[0]);
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [aspect, setAspect] = useState("Auto");
  const [duration, setDuration] = useState("8s");
  const [mode, setMode] = useState<"text" | "image">("text");
  const [prompt, setPrompt] = useState("");
  const [tab, setTab] = useState<"history" | "community">("history");

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-hf-bg">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
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
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4 text-center">
            <Play size={28} className="text-white/20" />
            <p className="text-[12px] text-white/40">
              {tab === "history" ? "Your generated videos will appear here" : "Community videos from Higgsfield creators"}
            </p>
          </div>
        </aside>

        {/* Main workspace */}
        <main className="flex flex-1 flex-col items-center justify-center overflow-y-auto p-6">
          <div className="w-full max-w-[640px]">
            {/* Mode tabs */}
            <div className="mb-5 flex gap-2">
              {GENERATION_MODES.map(({ label, icon: Icon }) => {
                const isText = label === "Text to Video";
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setMode(isText ? "text" : "image")}
                    className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-semibold transition-colors ${
                      (isText ? mode === "text" : mode === "image") ? "bg-white/[0.1] text-hf-text" : "text-white/40 hover:text-white/60"
                    }`}
                  >
                    <Icon size={13} />{label}
                  </button>
                );
              })}
            </div>

            {/* Model selector */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => setShowModelPicker(!showModelPicker)}
                className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-[13px] font-semibold text-hf-text hover:border-white/20"
              >
                {model.name}
                {model.badge && (
                  <span className={`rounded px-1.5 py-0.5 text-[9px] font-black uppercase ${
                    model.badge === "NEW" ? "bg-hf-neon text-black" :
                    model.badge === "EXCLUSIVE" ? "bg-violet-600 text-white" :
                    "bg-red-500 text-white"
                  }`}>{model.badge}</span>
                )}
                <span className="ml-1 text-white/40">▾</span>
              </button>

              {showModelPicker && (
                <div className="mt-2 flex flex-wrap gap-2">
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
                          m.badge === "NEW" ? "bg-hf-neon text-black" :
                          m.badge === "EXCLUSIVE" ? "bg-violet-600 text-white" :
                          "bg-red-500 text-white"
                        }`}>{m.badge}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Image upload area (image mode only) */}
            {mode === "image" && (
              <div className="mb-4 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] p-8 text-center">
                <Upload size={28} className="text-white/30" />
                <p className="text-[13px] text-white/50">Drop an image or click to upload</p>
                <button type="button" className="rounded-xl border border-white/[0.12] px-5 py-2 text-[13px] font-semibold text-white/70 hover:bg-white/[0.05]">
                  Choose Image
                </button>
              </div>
            )}

            {/* Prompt textarea */}
            <div className="relative mb-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the scene you imagine..."
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

            {/* Options */}
            <div className="flex flex-wrap gap-3">
              <div className="flex gap-1">
                {ASPECTS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAspect(a)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                      aspect === a ? "bg-hf-neon text-black" : "text-white/40 hover:text-white/60"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <div className="flex gap-1">
                {DURATIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDuration(d)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                      duration === d ? "bg-white/[0.12] text-hf-text" : "text-white/40 hover:text-white/60"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
