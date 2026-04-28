import Link from "next/link";
import { ArrowLeft, Play, Wand2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";

type MotionPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MotionPage({ params }: MotionPageProps) {
  const { id } = await params;
  const originalUrl = `/ai/video`;

  return (
    <>
      <Navbar />
      <main className="mx-auto grid min-h-[calc(100vh-64px)] w-full max-w-[1200px] gap-4 px-4 py-5 lg:grid-cols-[1.35fr_0.65fr]">
        <section className="relative min-h-[560px] overflow-hidden rounded-[16px] bg-[#151719]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(209,254,23,.18),transparent_26%),linear-gradient(135deg,#1d2024,#070809_70%)]" />
          <div className="absolute inset-x-8 top-8 aspect-video rounded-[14px] border border-white/[0.08] bg-black shadow-2xl">
            <div className="grid h-full place-items-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-black">
                <Play fill="currentColor" size={26} />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-6 pt-32">
            <span className="inline-flex items-center gap-2 rounded-full bg-hf-neon px-3 py-1.5 text-xs font-black uppercase text-black">
              <Wand2 size={14} /> Motion preset
            </span>
            <h1 className="mt-4 max-w-[820px] font-mono text-[20px] font-black leading-tight text-white md:text-[32px]">
              {id}
            </h1>
            <p className="mt-3 max-w-[620px] text-sm font-semibold text-white/58">
              Local functional clone route for the Ninja Box motion sublink. The original generation and account actions remain external.
            </p>
          </div>
        </section>

        <aside className="rounded-[16px] border border-white/[0.08] bg-[#141518] p-5">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-white/70 hover:text-hf-neon">
            <ArrowLeft size={16} /> Back to Explore
          </Link>

          <div className="mt-8">
            <p className="text-xs font-black uppercase text-white/36">Preset id</p>
            <p className="mt-2 break-all font-mono text-sm font-semibold text-white/78">{id}</p>
          </div>

          <div className="mt-6 rounded-[12px] bg-white/[0.045] p-4">
            <h2 className="text-lg font-black">Try this motion</h2>
            <p className="mt-2 text-sm font-semibold text-white/52">
              This clone mirrors the route and visual shell. Opening the source link keeps the real Ninja Box preset available.
            </p>
          </div>

          <Link
            href={originalUrl}
            className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-hf-neon text-sm font-black text-black"
          >
            Generate Video <Wand2 size={16} />
          </Link>
        </aside>
      </main>
    </>
  );
}
