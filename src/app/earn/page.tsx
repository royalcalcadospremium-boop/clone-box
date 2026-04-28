import { Navbar } from "@/components/Navbar";
import Link from "next/link";

const STEPS = [
  { num: "1", title: "Submit your work", description: "Open to creators at every skill level. Generate and submit your videos through your Ninja Box Creator Account. We reward original expression and high-engagement content that resonates with the community." },
  { num: "2", title: "Earn direct payouts", description: "Approved submissions receive direct compensation through the Ninja Box Earn program. This provides a clear, professional alternative to traditional ad-revenue shares, allowing creators to turn their output into real-world income." },
  { num: "3", title: "Access opportunities", description: "Gain visibility with the world's leading brands. Ninja Box Earn acts as a bridge, connecting our top talent with professional contracts from Fortune 500 agencies, NBA teams, and global fashion houses." },
];

const BRANDS = ["Fortune 500 Agencies", "NBA Teams", "Fashion Houses", "Global Brands", "Tech Companies", "Media Studios"];

export default function EarnPage() {
  return (
    <div className="min-h-screen bg-hf-bg text-hf-text">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-white/[0.06] py-24 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-hf-neon/5 to-transparent" />
        <div className="relative">
          <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-hf-neon">Ninja Box Earn</p>
          <h1 className="mx-auto max-w-4xl text-[clamp(32px,6vw,72px)] font-black leading-tight mb-6">
            Turn your creativity into real income
          </h1>
          <p className="mx-auto max-w-2xl text-[16px] text-white/50 mb-10">
            Ninja Box Earn is an innovative, automated program designed for creator monetization. It directly pays creators for their work — connecting them with professional projects, paid opportunities, and the visibility to build lasting careers.
          </p>
          <Link href="/pricing" className="inline-block rounded-xl bg-hf-neon px-10 py-4 text-[15px] font-black text-black hover:opacity-90">
            Apply Now — It&apos;s Free
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-white/[0.06] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[{ v: "10,000+", l: "Creators commissioned" }, { v: "$1M+", l: "Distributed to creators" }, { v: "90%", l: "Approval rate" }, { v: "50,000+", l: "Submissions processed" }].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-[40px] font-black text-hf-neon">{s.v}</p>
                <p className="text-[13px] text-white/40">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-white/[0.06] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="mb-2 text-center text-[11px] font-black uppercase tracking-widest text-hf-neon">How it works</p>
          <h2 className="mb-12 text-center text-[clamp(24px,4vw,40px)] font-black">Three steps to earning</h2>
          <div className="flex flex-col gap-6">
            {STEPS.map((step) => (
              <div key={step.num} className="flex gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-hf-neon text-[18px] font-black text-black">
                  {step.num}
                </div>
                <div>
                  <h3 className="mb-2 text-[16px] font-black text-hf-text uppercase tracking-wide">{step.title}</h3>
                  <p className="text-[14px] text-white/50">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="border-b border-white/[0.06] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-hf-neon">Our network</p>
          <h2 className="mb-12 text-[clamp(24px,4vw,40px)] font-black">Connect with world-class brands</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {BRANDS.map((brand) => (
              <div key={brand} className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-4 text-[14px] font-semibold text-white/60">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to create */}
      <section className="border-b border-white/[0.06] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="mb-2 text-center text-[11px] font-black uppercase tracking-widest text-hf-neon">What we reward</p>
          <h2 className="mb-12 text-center text-[clamp(24px,4vw,40px)] font-black">Content that earns</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { title: "Original AI Videos", description: "Cinematic, creative, and engaging AI-generated video content that resonates with the Ninja Box community." },
              { title: "High-Engagement Content", description: "Content that gets likes, shares, and comments — showing real audience impact across social platforms." },
              { title: "Brand Collaborations", description: "Videos created specifically for brand campaigns through the Ninja Box Earn matching system." },
              { title: "Series & Recurring Content", description: "Consistent creators who build an audience over time earn recurring contract opportunities." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <h3 className="mb-2 text-[15px] font-black text-hf-neon">{item.title}</h3>
                <p className="text-[13px] text-white/50">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="mb-4 text-[clamp(28px,5vw,56px)] font-black">Start earning today</h2>
        <p className="mx-auto mb-10 max-w-xl text-[16px] text-white/50">
          Create your first AI video, submit it to Ninja Box Earn, and start building your creative career — completely free to join.
        </p>
        <Link href="/pricing" className="inline-block rounded-xl bg-hf-neon px-10 py-4 text-[15px] font-black text-black hover:opacity-90">
          Apply Now
        </Link>
      </section>
    </div>
  );
}
