"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";

const STYLES = ["Photorealistic", "Anime", "3D Render", "Comic Book", "Cinematic", "Fantasy"];
const AGES = ["Young Adult (20s)", "Adult (30–40s)", "Middle-Aged (50s)", "Elderly (60s+)"];
const GENDERS = ["Female", "Male", "Non-binary"];
const ETHNICITIES = ["Any", "Asian", "Black", "Latino", "Middle Eastern", "South Asian", "White"];
const EXPRESSIONS = ["Neutral", "Happy", "Serious", "Mysterious", "Confident", "Sad"];

export default function CharacterPage() {
  const [style, setStyle] = useState("Photorealistic");
  const [age, setAge] = useState("Young Adult (20s)");
  const [gender, setGender] = useState("Female");
  const [ethnicity, setEthnicity] = useState("Any");
  const [expression, setExpression] = useState("Neutral");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (loading) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-hf-bg">
      <Navbar />
      <main className="flex flex-1 overflow-hidden">
        {/* Left panel — controls */}
        <aside className="hidden w-[300px] shrink-0 flex-col gap-6 overflow-y-auto border-r border-white/[0.06] bg-[#111214] p-5 lg:flex">
          <div>
            <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-hf-neon">Character Style</p>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button key={s} type="button" onClick={() => setStyle(s)}
                  className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors ${style === s ? "bg-hf-neon text-black" : "border border-white/[0.08] text-white/50 hover:text-white/80"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-hf-neon">Gender</p>
            <div className="flex gap-2">
              {GENDERS.map((g) => (
                <button key={g} type="button" onClick={() => setGender(g)}
                  className={`flex-1 rounded-lg py-2 text-[12px] font-semibold transition-colors ${gender === g ? "bg-hf-neon text-black" : "border border-white/[0.08] text-white/50 hover:text-white/80"}`}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-hf-neon">Age Range</p>
            <div className="flex flex-col gap-1.5">
              {AGES.map((a) => (
                <button key={a} type="button" onClick={() => setAge(a)}
                  className={`rounded-lg px-3 py-2 text-left text-[12px] font-semibold transition-colors ${age === a ? "bg-hf-neon/10 text-hf-neon border border-hf-neon/30" : "border border-white/[0.06] text-white/50 hover:text-white/80"}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-hf-neon">Ethnicity</p>
            <div className="flex flex-wrap gap-2">
              {ETHNICITIES.map((e) => (
                <button key={e} type="button" onClick={() => setEthnicity(e)}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${ethnicity === e ? "bg-hf-neon text-black" : "border border-white/[0.08] text-white/50 hover:text-white/80"}`}>
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-hf-neon">Expression</p>
            <div className="flex flex-wrap gap-2">
              {EXPRESSIONS.map((e) => (
                <button key={e} type="button" onClick={() => setExpression(e)}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${expression === e ? "bg-hf-neon text-black" : "border border-white/[0.08] text-white/50 hover:text-white/80"}`}>
                  {e}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main area */}
        <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto p-6">
          <div className="w-full max-w-[560px]">
            <div className="mb-6 text-center">
              <p className="mb-1 text-[11px] font-black uppercase tracking-widest text-hf-neon">Soul ID</p>
              <h1 className="text-[clamp(22px,4vw,36px)] font-black">Create your AI character</h1>
              <p className="mt-2 text-[13px] text-white/40">Define personality, looks, and style — then generate a consistent character for any scene.</p>
            </div>

            <div className="relative mb-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your character — appearance, personality, backstory, clothing style..."
                className="w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 pr-32 text-[14px] text-hf-text placeholder:text-white/25 focus:border-hf-neon/40 focus:outline-none"
                rows={4}
                disabled={loading}
              />
              <div className="absolute bottom-3 right-3">
                <button type="button" onClick={handleGenerate} disabled={loading}
                  className="rounded-xl bg-hf-neon px-4 py-2 text-[12px] font-black text-black hover:opacity-90 disabled:opacity-40">
                  {loading ? "Creating…" : "Create"}
                </button>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {[style, gender, age, ethnicity, expression].map((tag) => (
                <span key={tag} className="rounded-full border border-hf-neon/20 bg-hf-neon/5 px-3 py-1 text-[11px] font-semibold text-hf-neon">{tag}</span>
              ))}
            </div>

            {/* Empty state */}
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] py-16 text-center">
              <div className="text-5xl">🎭</div>
              <p className="text-[13px] text-white/40">Your character will appear here after generation</p>
              <p className="text-[11px] text-white/20">Consistent across images, videos, and scenes</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
