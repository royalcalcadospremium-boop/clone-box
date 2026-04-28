import { Navbar } from "@/components/Navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-hf-bg text-hf-text">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 py-24">
        <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-hf-neon">Contact</p>
        <h1 className="mb-4 text-[clamp(28px,5vw,48px)] font-black">Get in touch</h1>
        <p className="mb-12 text-[15px] text-white/50">
          Have a question, partnership inquiry, or need support? We&apos;d love to hear from you.
        </p>

        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-white/60">First name</label>
              <input type="text" placeholder="John" className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[14px] text-hf-text placeholder:text-white/25 focus:border-hf-neon/40 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-white/60">Last name</label>
              <input type="text" placeholder="Doe" className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[14px] text-hf-text placeholder:text-white/25 focus:border-hf-neon/40 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold text-white/60">Email</label>
            <input type="email" placeholder="john@company.com" className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[14px] text-hf-text placeholder:text-white/25 focus:border-hf-neon/40 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold text-white/60">Subject</label>
            <select className="w-full rounded-xl border border-white/[0.08] bg-[#14151a] px-4 py-3 text-[14px] text-hf-text focus:border-hf-neon/40 focus:outline-none">
              <option value="">Select a topic</option>
              <option>General inquiry</option>
              <option>Enterprise / Partnership</option>
              <option>Creator program</option>
              <option>Technical support</option>
              <option>Billing</option>
              <option>Press / Media</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold text-white/60">Message</label>
            <textarea placeholder="Tell us how we can help..." rows={5} className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[14px] text-hf-text placeholder:text-white/25 focus:border-hf-neon/40 focus:outline-none" />
          </div>
          <button type="submit" className="w-full rounded-xl bg-hf-neon py-3.5 text-[14px] font-black text-black hover:opacity-90 transition-opacity">
            Send Message
          </button>
        </form>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <p className="mb-1 text-[12px] font-black uppercase tracking-wide text-hf-neon">Address</p>
            <p className="text-[14px] text-white/60">535 Mission St, 14th floor<br />San Francisco, CA 94105</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <p className="mb-1 text-[12px] font-black uppercase tracking-wide text-hf-neon">Support</p>
            <p className="text-[14px] text-white/60">Available 24/7 via chat<br />Response within 4 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
