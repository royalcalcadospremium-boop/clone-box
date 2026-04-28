"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ChevronDown, FolderOpen, Plus, Clapperboard, Image, Video } from "lucide-react";
import Link from "next/link";

const genres = ["General", "Action", "Drama", "Sci-Fi", "Horror", "Comedy", "Documentary"];
const styles = ["Auto", "Cinematic", "Film Noir", "Anime", "Watercolor", "3D Render"];
const cameras = ["Auto", "Wide Shot", "Close Up", "Tracking Shot", "POV", "Aerial", "Handheld"];
const resolutions = ["480p", "720p", "1080p"];
const durations = ["4s", "8s", "16s"];
const aspects = ["1:1", "3:4", "9:16", "4:3", "3:2", "16:9", "2.39:1"];

function Select({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-semibold uppercase tracking-wider text-white/40">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 pr-7 text-[13px] text-hf-text focus:border-hf-neon/40 focus:outline-none"
        >
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/40" />
      </div>
    </div>
  );
}

export default function CinemaStudioPage() {
  const [mode, setMode] = useState<"image" | "video">("video");
  const [genre, setGenre] = useState("General");
  const [style, setStyle] = useState("Auto");
  const [camera, setCamera] = useState("Auto");
  const [resolution, setResolution] = useState("1080p");
  const [duration, setDuration] = useState("8s");
  const [aspect, setAspect] = useState("16:9");
  const [prompt, setPrompt] = useState("");
  const [credits] = useState(96);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-hf-bg">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar — projects */}
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
            <p className="text-[11px] text-white/25">Create a project to organize your images, videos, and audio in one place</p>
            <button type="button" className="mt-1 rounded-lg border border-white/[0.1] px-3 py-1.5 text-[11px] font-semibold text-white/60 hover:border-white/20">
              Create project
            </button>
          </div>
        </aside>

        {/* Main area */}
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
            <div className="flex items-center gap-2">
              <Clapperboard size={18} className="text-hf-neon" />
              <span className="text-[15px] font-black text-hf-text">Cinema Studio 3.5</span>
            </div>
            <Link href="/pricing" className="text-[12px] font-semibold text-hf-neon">
              {credits} credits
            </Link>
          </div>

          {/* Central workspace */}
          <div className="flex flex-1 flex-col items-center justify-center gap-6 overflow-y-auto p-6">
            <div className="w-full max-w-[680px]">
              {/* Mode toggle */}
              <div className="mb-4 flex gap-2">
                {(["image", "video"] as const).map((m) => {
                  const Icon = m === "image" ? Image : Video;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
                      className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-semibold capitalize transition-colors ${
                        mode === m ? "bg-white/[0.1] text-hf-text" : "text-white/40 hover:text-white/60"
                      }`}
                    >
                      <Icon size={14} />{m}
                    </button>
                  );
                })}
              </div>

              {/* Selectors */}
              <div className="mb-3 grid grid-cols-3 gap-2">
                <Select label="Genre" options={genres} value={genre} onChange={setGenre} />
                <Select label="Style" options={styles} value={style} onChange={setStyle} />
                <Select label="Camera" options={cameras} value={camera} onChange={setCamera} />
              </div>

              {/* Prompt textarea */}
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your scene — use @ to add characters & locations"
                  className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] p-4 pr-28 text-[14px] text-hf-text placeholder:text-white/30 focus:border-hf-neon/40 focus:outline-none"
                  rows={5}
                />
                <div className="absolute bottom-3 right-3">
                  <button
                    type="button"
                    className="rounded-lg bg-hf-neon px-4 py-2 text-[12px] font-black text-black hover:opacity-90"
                  >
                    GENERATE
                  </button>
                </div>
              </div>

              {/* Settings row */}
              <div className="mt-3 flex flex-wrap gap-2">
                {[...resolutions, ...durations, ...aspects].map((opt, i) => (
                  <button
                    key={opt + i}
                    type="button"
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                      opt === resolution || opt === duration || opt === aspect
                        ? "bg-hf-neon text-black"
                        : "border border-white/[0.1] text-white/50 hover:border-white/20"
                    }`}
                    onClick={() => {
                      if (resolutions.includes(opt)) setResolution(opt);
                      else if (durations.includes(opt)) setDuration(opt);
                      else setAspect(opt);
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero text when no generations */}
            <div className="mt-4 text-center">
              <h2 className="text-[clamp(22px,3vw,34px)] font-black leading-none text-hf-text">
                What would you shoot
              </h2>
              <h2 className="text-[clamp(22px,3vw,34px)] font-black leading-none text-hf-text">
                with <span className="text-hf-neon">infinite budget?</span>
              </h2>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
