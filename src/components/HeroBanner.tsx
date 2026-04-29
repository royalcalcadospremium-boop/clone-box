import Link from "next/link";

const CDN = "https://cdn.higgsfield.ai/card";

const CARDS = [
  {
    title: "NINJA BOX MCP",
    subtitle: "End-to-end content creation inside any AI agent",
    video: `${CDN}/2485b7a4-c1c9-4a68-acc1-a7dac15bbacd.mp4`,
    href: "/mcp",
  },
  {
    title: "GPT IMAGE 2",
    subtitle: "4K images with near-perfect text rendering",
    video: `${CDN}/50e17d9f-5212-430d-8079-8fbec994880b.mp4`,
    href: "/ai/image",
  },
  {
    title: "KLING 3.0 IN 4K",
    subtitle: "Cinema-grade video at full 4K resolution",
    video: `${CDN}/2c356558-2f34-4783-bdcc-ce2d6f575b9e.mp4`,
    href: "/ai/video",
  },
  {
    title: "MARKETING STUDIO FOR APPS",
    subtitle: "Powered by Hermes Agent",
    video: `${CDN}/8943e464-dde1-4ff2-ad1a-7121f72bc1d5.mp4`,
    href: "/marketing-studio/app",
  },
  {
    title: "SEEDANCE 2.0 IN 1080P",
    subtitle: "Sharper detail and smoother motion output",
    poster: `${CDN}/c0b57ae7-f877-4f98-ae78-f62542a108fc.webp`,
    video: `${CDN}/62a87445-46a0-4c36-a129-ba9b8b6c06c4.mp4`,
    href: "/ai/video",
  },
];

export function HeroBanner() {
  return (
    <section aria-label="Featured content" className="mb-4 pt-2 md:pt-3">
      <ul className="flex min-w-0 gap-5 overflow-x-auto hide-scrollbar *:flex-[0_0_19.5rem] md:*:flex-[0_0_25rem] xl:*:flex-[0_0_32rem]">
        {CARDS.map((card) => (
          <li key={card.title}>
            <Link
              href={card.href}
              className="group grid grid-flow-row-dense gap-3 rounded-lg transition active:brightness-75"
            >
              <figure
                className="relative overflow-hidden rounded-lg"
                style={{ aspectRatio: "16/9" }}
              >
                <video
                  loop
                  muted
                  autoPlay
                  playsInline
                  disablePictureInPicture
                  preload="none"
                  src={card.video}
                  poster={card.poster}
                  className="size-full object-cover"
                  aria-label={`${card.title} - ${card.subtitle}`}
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-lg"
                  style={{
                    boxShadow:
                      "-0.5px -0.5px 1px 0 rgba(255,255,255,0.12) inset, 0.8px 0.5px 0.5px 0 rgba(27,27,27,0.17) inset",
                  }}
                />
              </figure>
              <div className="grid grid-rows-2 text-left">
                <h3 className="truncate font-bold uppercase tracking-[0.05em] text-hf-text group-hover:text-hf-neon transition-colors text-[13px] xl:text-[14px]">
                  {card.title}
                </h3>
                <p className="truncate text-xs text-hf-text-muted xl:text-sm">
                  {card.subtitle}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default HeroBanner;
