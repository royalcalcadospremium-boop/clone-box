import Link from "next/link";
import { Check, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CopyrightBar } from "@/components/CopyrightBar";

interface Plan {
  name: string;
  price: number;
  priceAnnual?: number;
  period: string;
  description: string;
  cta: string;
  ctaHref: string;
  highlight?: boolean;
  badge?: string;
  credits: string;
  features: string[];
}

const plans: Plan[] = [
  {
    name: "Basic",
    price: 8,
    period: "month",
    description: "Perfect for getting started with AI video and image generation.",
    cta: "Get Started",
    ctaHref: "/chat",
    credits: "100 credits / month",
    features: [
      "100 generation credits",
      "Access to base models",
      "720p video output",
      "Standard queue priority",
      "Community access",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: 29,
    period: "month",
    description: "For creators who need more power and higher quality output.",
    cta: "Upgrade to Pro",
    ctaHref: "/chat",
    highlight: true,
    badge: "Most Popular",
    credits: "500 credits / month",
    features: [
      "500 generation credits",
      "Access to all models",
      "1080p & 4K output",
      "Priority queue",
      "Cinema Studio access",
      "Kling 3.0 access",
      "Commercial license",
      "Priority support",
    ],
  },
  {
    name: "Ultra",
    price: 79,
    period: "month",
    description: "For power users and studios with unlimited creative needs.",
    cta: "Go Ultra",
    ctaHref: "/chat",
    badge: "30% OFF",
    credits: "Unlimited + 2000 credits",
    features: [
      "Unlimited Nano Banana Pro & 2",
      "Unlimited Kling 3.0",
      "2000 additional credits",
      "All models including exclusives",
      "4K & 8K output",
      "Fastest queue priority",
      "Marketing Studio access",
      "Soul ID Character",
      "API access",
      "Dedicated support",
    ],
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl p-6 ${
        plan.highlight
          ? "border-2 border-hf-neon bg-hf-surface"
          : "border border-white/[0.08] bg-hf-surface"
      }`}
    >
      {plan.badge && (
        <span
          className={`absolute right-5 top-5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${
            plan.badge === "30% OFF"
              ? "bg-hf-neon text-black"
              : "bg-white/[0.1] text-hf-text-muted"
          }`}
        >
          {plan.badge}
        </span>
      )}

      <h2 className="text-[20px] font-black text-hf-text">{plan.name}</h2>
      <p className="mt-1 text-[13px] text-hf-text-muted">{plan.description}</p>

      <div className="mt-5 flex items-end gap-1">
        <span className="text-[42px] font-black leading-none text-hf-text">
          ${plan.price}
        </span>
        <span className="mb-1 text-[14px] text-hf-text-muted">/ {plan.period}</span>
      </div>

      <p className="mt-2 text-[12px] font-semibold text-hf-neon">{plan.credits}</p>

      <Link
        href={plan.ctaHref}
        className={`mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl text-[14px] font-black transition-all duration-150 ${
          plan.highlight
            ? "bg-hf-neon text-black hover:opacity-90"
            : "border border-white/[0.15] bg-white/[0.05] text-hf-text hover:bg-white/[0.1]"
        }`}
      >
        {plan.cta}
      </Link>

      <ul className="mt-6 flex flex-col gap-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13px] text-hf-text">
            <Check size={15} className="mt-0.5 shrink-0 text-hf-neon" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-[1440px] px-3 pb-24 pt-12 md:px-4">
        {/* Promo banner */}
        <div className="mb-10 overflow-hidden rounded-2xl bg-hf-neon px-6 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Zap size={22} className="shrink-0 text-black" />
              <div>
                <p className="text-[14px] font-black uppercase text-black">Special 30% OFF</p>
                <p className="text-[13px] font-semibold text-black/75">
                  Nano Banana Pro &amp; Nano Banana 2 Unlimited. Kling 3.0 Unlimited with 30% discount.
                </p>
              </div>
            </div>
            <Link
              href="/pricing"
              className="shrink-0 rounded-xl bg-black px-5 py-2.5 text-[13px] font-black text-hf-neon hover:opacity-90"
            >
              Claim Offer
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-[clamp(36px,5vw,56px)] font-black leading-none text-hf-text">
            Choose your plan
          </h1>
          <p className="mt-3 text-[15px] text-hf-text-muted">
            Generate AI videos, animations, and ads with unlimited access to powerful AI tools.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-10 rounded-2xl border border-white/[0.08] bg-hf-surface p-8 text-center">
          <h2 className="text-[26px] font-black text-hf-text">Need something bigger?</h2>
          <p className="mt-2 text-[14px] text-hf-text-muted">
            Custom plans for studios, agencies, and enterprise teams with dedicated infrastructure, priority support, and volume pricing.
          </p>
          <Link
            href="/enterprise"
            className="mt-5 inline-flex h-11 items-center rounded-xl bg-white/[0.08] px-6 text-[14px] font-black text-hf-text hover:bg-white/[0.12] transition-colors"
          >
            Contact Sales
          </Link>
        </div>
      </main>
      <CopyrightBar />
    </>
  );
}
