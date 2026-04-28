import { Navbar } from "@/components/Navbar";
import Link from "next/link";

const SECTIONS = [
  {
    title: "Terms of Service",
    description: "Our terms define your rights and responsibilities when using the Higgsfield platform. By using our services, you agree to these terms.",
    points: ["Content ownership and licensing", "Acceptable use policy", "Account responsibilities", "Payment and subscription terms", "Dispute resolution"],
  },
  {
    title: "Privacy Policy",
    description: "We take your privacy seriously. Learn how we collect, use, and protect your personal information.",
    points: ["What data we collect", "How we use your data", "Data sharing and third parties", "Your rights and controls", "Data retention and deletion"],
  },
  {
    title: "Cookie Policy",
    description: "We use cookies to improve your experience and analyze platform usage. You can control cookie preferences at any time.",
    points: ["Essential cookies", "Analytics and performance cookies", "Preference cookies", "Marketing cookies", "Managing your preferences"],
  },
  {
    title: "Content Policy",
    description: "Higgsfield is built for creative expression. Our content policy defines what is and isn't allowed on the platform.",
    points: ["Prohibited content types", "NSFW and adult content guidelines", "Intellectual property rights", "Deepfake and face swap ethics", "Community standards"],
  },
  {
    title: "Safety & Ethics",
    description: "We are committed to responsible AI development. Our safety framework ensures the platform is used for positive creative purposes.",
    points: ["Non-consensual content prohibition", "Bias detection and mitigation", "AI transparency standards", "User reporting system", "Safety review process"],
  },
  {
    title: "DMCA & IP",
    description: "We respect intellectual property rights. Learn how to report infringement and how we handle IP claims.",
    points: ["How to file a DMCA notice", "Counter-notification process", "Repeat infringer policy", "Licensed content usage", "Trademark guidelines"],
  },
];

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-hf-bg text-hf-text">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-white/[0.06] py-20 text-center px-6">
        <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-hf-neon">Trust & Safety</p>
        <h1 className="mb-4 text-[clamp(32px,5vw,56px)] font-black">We earn trust every day</h1>
        <p className="mx-auto max-w-2xl text-[15px] text-white/50">
          Committed to creator trust — covering terms, policies, and support operations. Transparency is not optional; it&apos;s the foundation of everything we build.
        </p>
      </section>

      {/* Commitments */}
      <section className="border-b border-white/[0.06] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { icon: "🔒", title: "Your data is yours", description: "We never sell your personal data. Content you generate belongs to you." },
              { icon: "⚖️", title: "Ethical AI", description: "Built with safeguards against misuse, harmful content, and non-consensual generation." },
              { icon: "🌐", title: "Transparent policies", description: "Clear, readable terms and policies — no legal jargon designed to confuse." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center">
                <div className="mb-3 text-3xl">{c.icon}</div>
                <h3 className="mb-2 text-[15px] font-black text-hf-text">{c.title}</h3>
                <p className="text-[13px] text-white/50">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy sections */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col gap-6">
            {SECTIONS.map((section) => (
              <div key={section.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <h2 className="mb-2 text-[18px] font-black text-hf-text">{section.title}</h2>
                <p className="mb-4 text-[14px] text-white/50">{section.description}</p>
                <ul className="flex flex-col gap-1.5">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-[13px] text-white/40">
                      <span className="text-hf-neon">→</span> {point}
                    </li>
                  ))}
                </ul>
                <button type="button" className="mt-4 text-[13px] font-semibold text-hf-neon hover:opacity-80">
                  Read full policy →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-white/[0.06] py-16 text-center px-6">
        <h2 className="mb-4 text-[24px] font-black">Questions about our policies?</h2>
        <p className="mb-6 text-[14px] text-white/50">Our trust & safety team is available to help with any concerns or reports.</p>
        <Link href="/contact" className="inline-block rounded-xl bg-hf-neon px-8 py-3 text-[14px] font-black text-black hover:opacity-90">
          Contact Trust & Safety
        </Link>
      </section>
    </div>
  );
}
