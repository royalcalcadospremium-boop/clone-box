import Link from "next/link";
import { Play } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CopyrightBar } from "@/components/CopyrightBar";

interface Series {
  title: string;
  href: string;
  gradient: string;
  tag?: string;
}

const higgsChoice: Series[] = [
  { title: "Hell Grind", href: "/original-series", gradient: "from-red-900 to-red-950" },
  { title: "Soulmate: The Last Wagon", href: "/original-series", gradient: "from-violet-900 to-purple-950" },
  { title: "Arena Zero", href: "/original-series", gradient: "from-slate-700 to-slate-900" },
  { title: "Spit and Glow", href: "/original-series", gradient: "from-orange-800 to-amber-950" },
  { title: "Bucket List", href: "/original-series", gradient: "from-teal-800 to-cyan-950" },
  { title: "Mother Trucker", href: "/original-series", gradient: "from-stone-700 to-stone-900" },
  { title: "Misfortune", href: "/original-series", gradient: "from-gray-700 to-gray-900" },
  { title: "Vermin Control Unit", href: "/original-series", gradient: "from-green-900 to-emerald-950" },
];

const firstLook: Series[] = [
  { title: "Zephyr", href: "/original-series", gradient: "from-sky-800 to-blue-950", tag: "First Look" },
  { title: "MORK: Behind the Scenes", href: "/original-series", gradient: "from-slate-600 to-slate-900", tag: "First Look" },
  { title: "Arena Zero: Music Video", href: "/original-series", gradient: "from-indigo-800 to-indigo-950", tag: "Music Video" },
  { title: "Tails of Steel", href: "/original-series", gradient: "from-zinc-700 to-zinc-900" },
  { title: "Dinoforce", href: "/original-series", gradient: "from-lime-800 to-lime-950" },
  { title: "Viking Courier", href: "/original-series", gradient: "from-amber-800 to-yellow-950" },
  { title: "Buddy", href: "/original-series", gradient: "from-pink-800 to-rose-950" },
];

const onRadar: Series[] = [
  { title: "Frozen Monster", href: "/original-series", gradient: "from-blue-700 to-cyan-950" },
  { title: "Alright Alright Alright", href: "/original-series", gradient: "from-orange-700 to-amber-900" },
  { title: "Peter Pan", href: "/original-series", gradient: "from-teal-700 to-emerald-900" },
];

function SeriesCard({ series }: { series: Series }) {
  return (
    <Link
      href={series.href}
      className="group relative overflow-hidden rounded-xl bg-hf-surface-2"
      style={{ aspectRatio: "16/9" }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${series.gradient}`} />
      <div className="absolute inset-0 bg-black/30" />
      {series.tag && (
        <span className="absolute left-2 top-2 z-10 rounded bg-hf-neon px-1.5 py-0.5 text-[10px] font-black uppercase text-black">
          {series.tag}
        </span>
      )}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur">
          <Play size={20} className="ml-0.5 text-white" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-[13px] font-bold text-white leading-tight">{series.title}</p>
      </div>
    </Link>
  );
}

function SectionRow({ title, items }: { title: string; items: Series[] }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-[22px] font-black text-hf-text">{title}</h2>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((s) => (
          <SeriesCard key={s.href} series={s} />
        ))}
      </div>
    </section>
  );
}

export default function OriginalSeriesPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-[1440px] px-3 pb-16 pt-0 md:px-4">
        {/* Hero — MORK featured */}
        <div className="relative mb-8 min-h-[480px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-t from-hf-bg via-transparent to-transparent" />
          <div className="relative flex h-full min-h-[480px] flex-col justify-end p-6 md:p-10">
            <img
              src="https://du4zrvwy3vtek.cloudfront.net/series/f11e4476-a1ff-49a9-93a8-e2fd334785e3/logo/f013c8dd-342f-4a06-b648-3589fe24d7e6.png"
              alt="MORK"
              className="mb-4 h-16 w-auto object-contain"
            />
            <p className="mb-4 max-w-[420px] text-[14px] text-white/70">
              An epic AI-generated original series. Watch the first episode now.
            </p>
            <Link
              href="/original-series"
              className="inline-flex h-11 w-max items-center gap-2 rounded-xl bg-white px-5 text-[14px] font-black text-black hover:opacity-90"
            >
              <Play size={16} /> Watch now
            </Link>
          </div>
        </div>

        {/* Promo banner */}
        <div className="mb-10 overflow-hidden rounded-2xl bg-hf-surface p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[12px] font-black uppercase tracking-wider text-hf-neon">up to 30% OFF</p>
              <p className="mt-1 text-[16px] font-black text-hf-text">
                Start creating with <span className="text-hf-neon">Seedance 2.0</span>
              </p>
              <p className="text-[13px] text-hf-text-muted">World's best video model available with up to 30% OFF</p>
            </div>
            <Link
              href="/pricing"
              className="shrink-0 rounded-xl bg-hf-neon px-5 py-2.5 text-[14px] font-black text-black hover:opacity-90"
            >
              Get Seedance 2.0
            </Link>
          </div>
        </div>

        <SectionRow title="Ninja Box Choice" items={higgsChoice} />
        <SectionRow title="First Look" items={firstLook} />
        <SectionRow title="On Our Radar" items={onRadar} />

        {/* Contest CTA */}
        <div className="mt-6 rounded-2xl border border-white/[0.08] bg-hf-surface p-8 text-center">
          <h2 className="text-[26px] font-black text-hf-text">Become a Creator</h2>
          <p className="mt-2 max-w-[480px] mx-auto text-[14px] text-hf-text-muted">
            From contest winner to Original Series creator. Filmmakers worldwide are using Ninja Box to make short films — and the best ones get picked to produce full series with our team.
          </p>
          <Link
            href="/earn"
            className="mt-5 inline-flex h-11 items-center rounded-xl bg-hf-neon px-6 text-[14px] font-black text-black hover:opacity-90"
          >
            Enter the Contest
          </Link>
        </div>
      </main>
      <CopyrightBar />
    </>
  );
}
