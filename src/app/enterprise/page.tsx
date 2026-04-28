import { Navbar } from "@/components/Navbar";
import Link from "next/link";

const FEATURES = [
  { title: "Dedicated Account Manager", description: "A dedicated creative success manager for onboarding, strategy, and ongoing support." },
  { title: "Custom Model Access", description: "Priority access to new models and exclusive enterprise-only AI capabilities before public launch." },
  { title: "SSO & Team Management", description: "Single sign-on, role-based access controls, and centralized team management." },
  { title: "Shared Credit Pool", description: "Team credits pooled across all members — no wasted allocations, maximum flexibility." },
  { title: "Usage Analytics", description: "Full dashboard of generation metrics, cost tracking, and team activity reports." },
  { title: "SLA & Priority Support", description: "99.9% uptime SLA, dedicated Slack channel, and 1-hour response time." },
  { title: "API Access", description: "Direct API integration for embedding Higgsfield AI into your own products and workflows." },
  { title: "Custom Billing", description: "Invoice-based billing, PO processing, and volume discounts negotiated directly." },
];

const LOGOS = [
  "Fortune 500", "NBA Teams", "Fashion Houses", "Ad Agencies", "Media Studios", "Tech Companies",
];

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-hf-bg text-hf-text">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-white/[0.06] py-24 text-center px-6">
        <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-hf-neon">Enterprise</p>
        <h1 className="mx-auto max-w-4xl text-[clamp(32px,6vw,72px)] font-black leading-tight mb-6">
          AI infrastructure for teams and agencies
        </h1>
        <p className="mx-auto max-w-2xl text-[16px] text-white/50 mb-10">
          Custom contracts, dedicated support, private model access, and team features built for professional creative organizations.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/contact" className="rounded-xl bg-hf-neon px-8 py-3 text-[14px] font-black text-black hover:opacity-90">
            Talk to Sales
          </Link>
          <Link href="/pricing" className="rounded-xl border border-white/[0.15] px-8 py-3 text-[14px] font-semibold text-white/70 hover:border-white/30">
            View Pricing
          </Link>
        </div>
      </section>

      {/* Client logos */}
      <section className="border-b border-white/[0.06] py-12">
        <p className="mb-8 text-center text-[12px] text-white/30 uppercase tracking-widest">Trusted by world-class organizations</p>
        <div className="flex flex-wrap justify-center gap-4 px-6">
          {LOGOS.map((l) => (
            <div key={l} className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-3 text-[14px] font-semibold text-white/50">{l}</div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-white/[0.06] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-2 text-center text-[11px] font-black uppercase tracking-widest text-hf-neon">Enterprise features</p>
          <h2 className="mb-12 text-center text-[clamp(24px,4vw,40px)] font-black">Everything your team needs</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <h3 className="mb-2 text-[14px] font-black text-hf-neon">{f.title}</h3>
                <p className="text-[13px] text-white/50">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing card */}
      <section className="border-b border-white/[0.06] py-20">
        <div className="mx-auto max-w-2xl px-6">
          <div className="rounded-2xl border border-hf-neon/30 bg-hf-neon/5 p-8 text-center">
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-hf-neon">Business Plan</p>
            <p className="mb-1 text-[48px] font-black">$62<span className="text-[18px] font-normal text-white/40">/seat/mo</span></p>
            <p className="mb-6 text-[14px] text-white/50">Billed annually · Minimum 2 seats · 30% OFF</p>
            <ul className="mb-8 flex flex-col gap-2 text-left">
              {["2–15 members in one shared workspace", "1,500 credits per seat/month", "Shared credit pool across the team", "Parallel generations: 16 videos, 16 images", "Priority support + dedicated Slack", "Usage analytics and tracking", "Custom SSO access"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[14px] text-white/60">
                  <span className="text-hf-neon flex-shrink-0">✓</span> {item}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="block w-full rounded-xl bg-hf-neon py-3.5 text-[14px] font-black text-black hover:opacity-90">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="mb-4 text-[clamp(28px,5vw,48px)] font-black">Ready to scale your creative team?</h2>
        <p className="mx-auto mb-10 max-w-xl text-[16px] text-white/50">
          Our team will work with you to create a custom plan that fits your organization&apos;s needs.
        </p>
        <Link href="/contact" className="inline-block rounded-xl bg-hf-neon px-10 py-4 text-[15px] font-black text-black hover:opacity-90">
          Contact Sales
        </Link>
      </section>
    </div>
  );
}
