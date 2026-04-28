"use client";
import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Play, Square, AlertCircle } from "lucide-react";

const VOICES = [
  { name: "Rachel", description: "Calm, American", style: "Narration" },
  { name: "Antoni", description: "Well-rounded", style: "Narration" },
  { name: "Bella", description: "Soft, American", style: "Narration" },
  { name: "Josh", description: "Deep, American", style: "News" },
  { name: "Elli", description: "Emotional, American", style: "Narration" },
  { name: "Arnold", description: "Crisp, American", style: "Narration" },
];

const TABS = ["Voiceover", "Change Voice", "Translate"] as const;
type Tab = (typeof TABS)[number];

export default function AudioPage() {
  const [tab, setTab] = useState<Tab>("Voiceover");
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("Rachel");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const bars = Array.from({ length: 32 }, (_, i) => 8 + Math.abs(Math.sin(i * 0.4)) * 32);

  async function handleGenerate() {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError(null);
    setAudioUrl(null);
    try {
      const res = await fetch("/api/audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice, model_id: "eleven_multilingual_v2" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Audio generation failed");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Audio generation failed");
    } finally {
      setLoading(false);
    }
  }

  function togglePlay() {
    if (!audioRef.current || !audioUrl) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-hf-bg">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center overflow-y-auto p-6">
        <div className="w-full max-w-[640px]">
          {/* Header */}
          <div className="mb-6 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-hf-neon mb-1">ElevenLabs v3</p>
            <h1 className="text-[clamp(24px,4vw,40px)] font-black text-hf-text">AI Audio Studio</h1>
            <p className="mt-2 text-[13px] text-white/50">Generate voiceovers, change voices, and translate audio</p>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
            {TABS.map((t) => (
              <button key={t} type="button" onClick={() => setTab(t)}
                className={`flex-1 rounded-lg py-2 text-[13px] font-semibold transition-colors ${
                  tab === t ? "bg-white/[0.1] text-hf-text" : "text-white/40 hover:text-white/60"
                }`}>
                {t}
              </button>
            ))}
          </div>

          {/* Waveform visualizer */}
          <div className="mb-6 flex h-16 items-end justify-center gap-[2px] rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4">
            {bars.map((h, i) => (
              <div key={i} className="w-1.5 rounded-full"
                style={{
                  height: `${playing ? h : h * 0.4}px`,
                  backgroundColor: playing ? "#d1fe17" : "rgba(255,255,255,0.15)",
                  transition: "height 0.15s ease, background-color 0.3s ease",
                }}
              />
            ))}
          </div>

          {tab === "Voiceover" && (
            <>
              {/* Voice picker */}
              <div className="mb-4 grid grid-cols-3 gap-2">
                {VOICES.map((v) => (
                  <button key={v.name} type="button" onClick={() => setVoice(v.name)}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      voice === v.name ? "border-hf-neon bg-hf-neon/10" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                    }`}>
                    <p className={`text-[13px] font-bold ${voice === v.name ? "text-hf-neon" : "text-hf-text"}`}>{v.name}</p>
                    <p className="text-[11px] text-white/40">{v.description}</p>
                    <p className="text-[10px] text-white/30">{v.style}</p>
                  </button>
                ))}
              </div>

              {/* Text input */}
              <div className="relative mb-4">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type the text you want to convert to speech..."
                  className="w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 pr-32 text-[14px] text-hf-text placeholder:text-white/25 focus:border-hf-neon/40 focus:outline-none"
                  rows={4}
                  disabled={loading}
                />
                <div className="absolute bottom-3 right-3">
                  <button type="button" onClick={handleGenerate}
                    disabled={loading || !text.trim()}
                    className="rounded-xl bg-hf-neon px-4 py-2 text-[12px] font-black text-black hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed">
                    {loading ? "Generating…" : "Generate"}
                  </button>
                </div>
              </div>
              <p className="mb-4 text-right text-[11px] text-white/30">{text.length} / 2500 characters</p>
            </>
          )}

          {(tab === "Change Voice" || tab === "Translate") && (
            <div className="mb-4 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] p-10 text-center">
              <p className="text-[13px] text-white/40">
                Upload an audio file to {tab === "Translate" ? "translate" : "change its voice"}
              </p>
              <button type="button" className="rounded-xl border border-white/[0.12] px-5 py-2 text-[13px] font-semibold text-white/70 hover:bg-white/[0.05]">
                Choose Audio File
              </button>
            </div>
          )}

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-400">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          {/* Audio player */}
          {audioUrl && (
            <div className="rounded-2xl border border-hf-neon/20 bg-hf-neon/5 p-4">
              <audio ref={audioRef} src={audioUrl} onEnded={() => setPlaying(false)} className="hidden" />
              <div className="flex items-center gap-4">
                <button type="button" onClick={togglePlay}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-hf-neon text-black hover:opacity-90">
                  {playing ? <Square size={14} fill="black" /> : <Play size={14} fill="black" />}
                </button>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-hf-text">{voice} — Voiceover</p>
                  <p className="text-[11px] text-white/40">ElevenLabs Multilingual v2</p>
                </div>
                <a href={audioUrl} download="voiceover.mp3"
                  className="rounded-lg border border-white/[0.1] px-3 py-1.5 text-[12px] text-white/60 hover:text-white/80">
                  Download
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
