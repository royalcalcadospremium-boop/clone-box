import Link from "next/link";

const col1 = [
  "About", "Trust", "Careers", "Contact", "Pricing", "Apps",
  "Cinema Studio", "Marketing Studio", "Ninja Box Chat", "AI Influencer",
  "Community", "Enterprise", "Team", "Copilot", "Reference Extension",
  "Blog", "Contests", "Discord",
];
const col2 = [
  "AI Image", "Soul ID Character", "Draw to Edit", "Fashion Factory",
  "Edit Image", "Image Upscale", "Photodump Studio", "Ninja Box Popcorn",
  "Nano Banana Pro", "Nano Banana 2", "Prompt Guide", "Flux 2",
  "GPT Image 2", "Inpaint", "Soul 2.0", "Soul Cinema", "Soul Cast",
];
const col3 = [
  "AI Video", "Mixed media", "Sora 2 Introduction", "Veo 3.1 Introduction",
  "Create Video", "Lipsync Studio", "Talking Avatar", "Draw to Video",
  "UGC Factory", "Video Upscale", "Kling 3.0", "WAN 2.6", "Seedance 2.0",
];
const col4 = [
  "Banana Placement", "Product Placement", "Edit Image",
  "Multi Reference", "Upscale", "Sora 2 Upscale",
];

const socials = [
  { label: "X / Twitter", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "TikTok", href: "#" },
];

function NavColumn({ links }: { links: string[] }) {
  return (
    <ul className="flex flex-col" style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {links.map((label) => (
        <li key={label}>
          <Link
            href="/"
            className="block py-[3px] text-[14px] transition-opacity duration-150 hover:opacity-60"
            style={{ color: "rgb(20,21,26)" }}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FooterLanding() {
  return (
    <footer
      className="relative z-10 w-full"
      style={{ backgroundColor: "#d1fe17", color: "rgb(20,21,26)" }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "36px 16px",
          display: "grid",
          gap: 56,
        }}
      >
        {/* Top: headline + 4-col nav */}
        <div className="flex flex-col gap-8 xl:flex-row xl:justify-between">
          <h2
            className="font-medium uppercase leading-[1.05]"
            style={{
              fontSize: "clamp(32px, 4vw, 56px)",
              color: "rgb(19,21,23)",
              maxWidth: 384,
            }}
          >
            THE ULTIMATE AI-POWERED CAMERA CONTROL FOR FILMMAKERS &amp; CREATORS
          </h2>

          <div
            className="grid gap-12"
            style={{
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <NavColumn links={col1} />
            <NavColumn links={col2} />
            <NavColumn links={col3} />
            <NavColumn links={col4} />
          </div>
        </div>

        {/* Bottom: address + socials */}
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          <address
            className="not-italic text-[14px] leading-[1.5]"
            style={{ color: "rgb(19,21,23)" }}
          >
            535 Mission St, 14th floor, San Francisco, CA, 94105
          </address>

          <ul className="hidden items-center md:flex" style={{ gap: 32, listStyle: "none", padding: 0 }}>
            {socials.map((s) => (
              <li key={s.label}>
                <Link
                  href={s.href}
                  className="text-[14px] font-medium transition-opacity duration-150 hover:opacity-60"
                  style={{ color: "rgb(20,21,26)" }}
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
