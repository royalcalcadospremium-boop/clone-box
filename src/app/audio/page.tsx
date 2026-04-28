"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Mic2, Languages, RefreshCw, Play, FolderOpen, Plus } from "lucide-react";

type Tab = "voiceover" | "change-voice" | "translate";

const voices = [
  { name: "Rachel", lang: "EN", style: "Calm" },
  { name: "Antoni", lang: "EN", style: "Warm" },
  { name: "Bella", lang: "EN", style: "Soft" },
  { name: "Josh", lang: "EN", style: "Deep" },
  { name: "Elli", lang: "EN", style: "Emotional" },
  { name: "Arnold", lang: "EN", style: "Crisp" },
];

function VoiceCard({ voice, selected, onClick }: { voice: typeof voices[0]; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col gap-1 rounded-xl border p-3 text-left transition-all ${
        selected ? "border-hf-neon bg-hf-neon/10" : "border-white/[0.08] bg-white/[0.03] hover:border-white/20"
      }`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
        <Mic2 size={16} className="text-white/70" />
      </div>
      <p className="text-[13px] font-semibold text-hf-text">{voice.name}</p>
      <p className="text-[11px] text-white/40">{voice.lang} · {voice.style}</p>
      <button
        type="button"
        className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-hf-neon opacity-0 transition-opacity group-hover:opacity-100"
      >
        <Play size={9} /> Preview
      </button>
    </button>
  );
}

export default function AudioPage() {
  const [tab, setTab] = useState<Tab>("voiceover");
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [showVoicePicker, setShowVoicePicker] = useState(false);

  const tabs: { id: Tab; label: string; icon: typeof Mic2 }[] = [
    { id: "voiceover", label: "Voiceover", icon: Mic2 },
    { id: "change-voice", label: "Change Voice", icon: RefreshCw },
    { id: "translate", label: "Translate", icon: Languages },
  ];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-hf-bg">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <aside className="hidden w-[220px] shrink-0 flex-col border-r border-white/[0.06] bg-[#111214] lg:flex">
          <div className="flex items-center justify-between border-b border-white/[0.06] p-3">
            <span className="text-[12px] font-semibold text-white/60">My Generations</span>
            <button type="button" className="flex h-6 w-6 items-center justify-center rounded bg-white/[0.06] hover:bg-white/[0.1]">
              <Plus size={12} className="text-white/60" />
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4 text-center">
            <FolderOpen size={32} className="text-white/20" />
            <p className="text-[12px] text-white/40">No projects yet</p>
            <p className="text-[11px] text-white/25">Create a project to organize your images, videos, and audio</p>
            <button type="button" className="mt-1 rounded-lg border border-white/[0.1] px-3 py-1.5 text-[11px] font-semibold text-white/60 hover:border-white/20">
              Create project
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
            <Mic2 size={18} className="text-hf-neon" />
            <span className="text-[15px] font-black text-hf-text">Audio</span>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto p-6">
            <div className="w-full max-w-[560px]">
              {/* Hero text */}
              <h2 className="mb-6 text-center text-[clamp(22px,3vw,32px)] font-black leading-tight text-hf-text">
                Ready to give your<br /><span className="text-hf-neon">scene a voice?</span>
              </h2>

              {/* Tab switcher */}
              <div className="mb-5 flex rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTab(id)}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-[13px] font-semibold transition-colors ${
                      tab === id ? "bg-white/[0.1] text-hf-text" : "text-white/40 hover:text-white/60"
                    }`}
                  >
                    <Icon size={13} />{label}
                  </button>
                ))}
              </div>

              {/* Audio waveform visual */}
              <div className="mb-4 flex h-12 items-center justify-center gap-1">
                {Array.from({ length: 32 }, (_, i) => (
                  <div
                    key={i}
                    className="rounded-full bg-hf-neon/40"
                    style={{
                      width: 3,
                      height: `${20 + Math.sin(i * 0.7) * 16}px`,
                    }}
                  />
                ))}
              </div>

              {tab === "voiceover" && (
                <>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the sound you imagine..."
                    className="mb-4 w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] p-4 text-[14px] text-hf-text placeholder:text-white/30 focus:border-hf-neon/40 focus:outline-none"
                    rows={4}
                  />

                  {/* Voice selector */}
                  <button
                    type="button"
                    onClick={() => setShowVoicePicker(!showVoicePicker)}
                    className="mb-4 flex w-full items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[13px] text-hf-text hover:border-white/20"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-violet-600" />
                      <span>Eleven v3</span>
                      <span className="text-white/40">· {voices[selectedVoice].name}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-hf-neon">CHOOSE VOICE</span>
                  </button>

                  {showVoicePicker && (
                    <div className="mb-4 grid grid-cols-3 gap-2">
                      {voices.map((v, i) => (
                        <VoiceCard
                          key={v.name}
                          voice={v}
                          selected={selectedVoice === i}
                          onClick={() => { setSelectedVoice(i); setShowVoicePicker(false); }}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}

              {tab === "change-voice" && (
                <div className="mb-4 flex flex-col items-center gap-3 rounded-xl border border-dashed border-white/[0.1] bg-white/[0.02] p-8 text-center">
                  <RefreshCw size={28} className="text-white/30" />
                  <p className="text-[14px] text-white/50">Upload an audio file to change voice</p>
                  <button type="button" className="rounded-lg border border-white/[0.12] px-4 py-2 text-[13px] font-semibold text-hf-text hover:bg-white/[0.05]">
                    Choose File
                  </button>
                </div>
              )}

              {tab === "translate" && (
                <div className="mb-4 flex flex-col gap-3">
                  <select className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[13px] text-hf-text focus:outline-none">
                    <option>🇺🇸 English</option>
                    <option>🇪🇸 Spanish</option>
                    <option>🇫🇷 French</option>
                    <option>🇩🇪 German</option>
                    <option>🇯🇵 Japanese</option>
                    <option>🇧🇷 Portuguese</option>
                  </select>
                  <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-white/[0.1] bg-white/[0.02] p-8 text-center">
                    <Languages size={28} className="text-white/30" />
                    <p className="text-[14px] text-white/50">Upload audio to translate</p>
                    <button type="button" className="rounded-lg border border-white/[0.12] px-4 py-2 text-[13px] font-semibold text-hf-text hover:bg-white/[0.05]">
                      Choose File
                    </button>
                  </div>
                </div>
              )}

              <button
                type="button"
                className="w-full rounded-xl bg-hf-neon py-3 text-[14px] font-black text-black hover:opacity-90"
              >
                GENERATE
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
