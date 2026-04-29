import { ArrowUpRight, CheckCircle, Heart, Link2, Sparkles, Store } from "lucide-react";
import Link from "next/link";

const AVATAR = "https://static.higgsfield.ai/profile/avatar.png";
const ILLUSTRATION = "https://static.higgsfield.ai/home-marketing-studuio-banner-illustration.webp";

type MarketingVideo = {
  src: string;
  poster?: string;
  aspect: string;
  creator: string;
  likes: number;
  label: string;
};

const columns: MarketingVideo[][] = [
  [
    {
      src: "https://d8j0ntlcm91z4.cloudfront.net/user_3Bu8kApHUBmQcoBNUYoyCcOGJne/hf_20260414_170749_3474b08b-9dc4-49e6-b6e2-4af862eff61d.mp4",
      aspect: "1.77778 / 1",
      creator: "byzantinetiger1459",
      likes: 70,
      label: "Chocolate Japanese style product commercial",
    },
    {
      src: "https://d8j0ntlcm91z4.cloudfront.net/user_3CIezRC2bfkh5fn1Cl8MjaHdSlp/hf_20260415_012608_2c21b2ad-368a-4199-bde3-e2c648d78186.mp4",
      aspect: "0.5625 / 1",
      creator: "byzantinetiger1459",
      likes: 28,
      label: "UGC sneaker unboxing review",
    },
    {
      src: "https://d8j0ntlcm91z4.cloudfront.net/user_3Bu8kApHUBmQcoBNUYoyCcOGJne/hf_20260414_232148_e856f696-c60e-4c40-921e-3fc3ac60224f.mp4",
      poster:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fcdn.higgsfield.ai%2Fuser_3Bu8kApHUBmQcoBNUYoyCcOGJne%2Fhf_20260414_232148_e856f696-c60e-4c40-921e-3fc3ac60224f_thumbnail.webp&w=240&q=85",
      aspect: "1.77778 / 1",
      creator: "byzantinetiger1459",
      likes: 9,
      label: "Chrome sneaker commercial",
    },
  ],
  [
    {
      src: "https://d8j0ntlcm91z4.cloudfront.net/user_3CIjqzTsrKEUr8OzFBaYO4ux3nG/hf_20260413_121933_7dfa9582-a536-4a83-9041-ee5aa102ff8c.mp4",
      aspect: "0.75 / 1",
      creator: "byzantinetiger1459",
      likes: 63,
      label: "Tumbler UGC review",
    },
    {
      src: "https://d8j0ntlcm91z4.cloudfront.net/user_3Cfdr00kbZ1hJCLpPQkaicInqxv/hf_20260421_221116_5e4782a0-5148-4832-9362-d17ba238b58b.mp4",
      aspect: "0.5625 / 1",
      creator: "glowingblueberry1245",
      likes: 15,
      label: "Pet app UGC ad",
    },
    {
      src: "https://d8j0ntlcm91z4.cloudfront.net/user_34hPp7fXOu4gkTrKKk2ESqFSfG1/hf_20260413_124545_9ae0acdc-4d0e-4c03-a065-b572bf9c66cf.mp4",
      poster:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fcdn.higgsfield.ai%2Fuser_34hPp7fXOu4gkTrKKk2ESqFSfG1%2Fhf_20260413_124545_9ae0acdc-4d0e-4c03-a065-b572bf9c66cf_thumbnail.webp&w=240&q=85",
      aspect: "0.75 / 1",
      creator: "byzantinetiger1459",
      likes: 13,
      label: "Dynamic product video",
    },
  ],
  [
    {
      src: "https://d8j0ntlcm91z4.cloudfront.net/user_3BuPFKmNsBjkEgZ5LeOvNlL8ShO/hf_20260415_014636_4873f538-b114-48c3-b604-05e32945d184.mp4",
      aspect: "0.5625 / 1",
      creator: "byzantinetiger1459",
      likes: 39,
      label: "Fashion get ready with me UGC",
    },
    {
      src: "https://d8j0ntlcm91z4.cloudfront.net/user_3Cfdr00kbZ1hJCLpPQkaicInqxv/hf_20260422_011129_528f4835-f2b2-4b35-90a0-e4471af95636.mp4",
      aspect: "1.33333 / 1",
      creator: "glowingblueberry1245",
      likes: 10,
      label: "Fitness app UGC ad",
    },
    {
      src: "https://d8j0ntlcm91z4.cloudfront.net/user_3B9ysSkvPFs8NnELOqJwjcodGpA/hf_20260410_200105_6b9142b4-9ac9-4c42-9206-84b70c939e52.mp4",
      poster:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fcdn.higgsfield.ai%2Fuser_3B9ysSkvPFs8NnELOqJwjcodGpA%2Fhf_20260410_200105_6b9142b4-9ac9-4c42-9206-84b70c939e52_thumbnail.webp&w=240&q=85",
      aspect: "0.75 / 1",
      creator: "byzantinetiger1459",
      likes: 22,
      label: "Skincare product UGC",
    },
  ],
  [
    {
      src: "https://d8j0ntlcm91z4.cloudfront.net/user_39acLUpaKDzX3Ox7Ekzzl7vlQ67/hf_20260413_132040_3db6758b-7eef-4046-87e1-ec81097c126e.mp4",
      aspect: "0.75 / 1",
      creator: "byzantinetiger1459",
      likes: 40,
      label: "Fashion try-on haul",
    },
    {
      src: "https://d8j0ntlcm91z4.cloudfront.net/user_3BtuMjeO56IlCCzTiD419c4NiyM/hf_20260415_011357_9dd4f822-d35c-4a43-9102-61ad0bb14331.mp4",
      aspect: "0.75 / 1",
      creator: "byzantinetiger1459",
      likes: 9,
      label: "Chocolate pirate ad",
    },
    {
      src: "https://d8j0ntlcm91z4.cloudfront.net/user_34hPp7fXOu4gkTrKKk2ESqFSfG1/hf_20260410_231619_0c2814a2-9a87-48f8-a18f-811265d90dca.mp4",
      poster:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fcdn.higgsfield.ai%2Fuser_34hPp7fXOu4gkTrKKk2ESqFSfG1%2Fhf_20260410_231619_0c2814a2-9a87-48f8-a18f-811265d90dca_thumbnail.webp&w=240&q=85",
      aspect: "0.75 / 1",
      creator: "byzantinetiger1459",
      likes: 14,
      label: "Luxury bag reveal UGC",
    },
  ],
];

function MarketingVideoCard({ item }: { item: MarketingVideo }) {
  return (
    <aside className="group relative overflow-hidden rounded-xl bg-black/40">
      <figure className="relative z-[1] overflow-hidden" style={{ aspectRatio: item.aspect }}>
        <video
          loop
          muted
          autoPlay
          playsInline
          disablePictureInPicture
          preload="metadata"
          poster={item.poster}
          src={item.src}
          aria-label={item.label}
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/60 to-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <header className="invisible absolute left-0 right-0 top-0 z-[3] grid grid-cols-[1fr_auto] items-center gap-4 p-2 opacity-0 transition-[opacity,visibility] duration-200 group-hover:visible group-hover:opacity-100">
        <Link
          href={`/@${item.creator}`}
          className="grid min-w-0 grid-cols-[1.75rem_1fr] items-center gap-2 text-white hover:text-hf-neon"
        >
          <figure className="relative size-7 overflow-hidden rounded-full bg-white/10">
            <img src={AVATAR} alt="" loading="lazy" className="h-full w-full object-cover" />
          </figure>
          <p className="truncate text-sm font-medium">{item.creator}</p>
        </Link>
        <button
          type="button"
          className="inline-flex h-10 items-center gap-1.5 rounded-full bg-white/[0.08] px-2.5 text-[12px] font-semibold text-white"
          style={{
            boxShadow:
              "rgba(255,255,255,0.3) -0.5px -0.5px 1px 0px inset, rgba(255,255,255,0.6) 0.8px 0.5px 0.5px 0px inset",
          }}
        >
          <Heart size={16} className="fill-transparent" />
          {item.likes}
        </button>
      </header>
    </aside>
  );
}

function FeaturePill({ icon: Icon, label }: { icon: typeof Link2; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs font-semibold tracking-[-0.12px] text-white/70">
      <Icon size={14} className="shrink-0 text-white/60" />
      {label}
    </div>
  );
}

export function MarketingStudioBanner() {
  return (
    <section className="relative isolate mb-6 mt-4 overflow-hidden rounded-[20px] p-4 md:rounded-3xl md:p-5 md:pl-8 lg:h-[600px]">
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/12" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(179.49deg,#030406_14.65%,#3d081b_98.81%)]" />
      <div className="pointer-events-none absolute inset-x-px top-px h-px bg-white/8" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_20%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(rgba(255,255,255,0.75)_0.8px,transparent_0.8px)] [background-size:14px_14px]" />

      <div className="relative z-10 flex size-full flex-col gap-7 lg:flex-row lg:gap-10">
        <div className="flex w-full flex-col items-center gap-6 px-2 pt-3 text-center lg:w-[378px] lg:items-start lg:justify-between lg:px-3 lg:py-2">
          <div className="flex w-full flex-col items-center gap-5">
            <div className="space-y-2">
              <h2 className="bg-[linear-gradient(90deg,#ffffff_0%,#ffb9d1_100%)] bg-clip-text text-center font-grotesk text-[40px] font-bold uppercase leading-[40px] tracking-[-1.6px] text-transparent">
                One link in.
                <br />
                Marketing out.
              </h2>
              <p className="text-[14px] font-normal leading-[20px] text-white/60">
                Create UGC, demos, and ads across channels
              </p>
            </div>
            <Link
              href="/marketing-studio/app"
              className="inline-flex h-10 w-full max-w-full items-center justify-center gap-2 rounded-[14px] bg-white px-5 text-[14px] font-semibold leading-5 text-[#131517] shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition hover:bg-white/80 lg:w-auto"
            >
              <Sparkles size={16} className="rotate-180" />
              Try Marketing Studio
            </Link>
          </div>

          <div className="hidden min-h-0 flex-1 flex-col gap-4 space-y-4 pt-4 lg:flex">
            <div className="relative mx-auto min-h-0 w-full flex-1">
              <img
                src={ILLUSTRATION}
                alt="Marketing Studio product preview"
                loading="eager"
                className="w-full rounded-[18px] object-cover"
              />
              <div className="absolute inset-x-0 bottom-10 flex justify-center px-4 pb-3">
                <div className="flex w-full items-center gap-3 rounded-full border border-white/12 bg-white/[0.08] px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.15)] backdrop-blur-[24px]">
                  <Link2 size={16} className="shrink-0 text-white/80" />
                  <span className="min-w-0 flex-1 truncate text-left text-sm font-semibold tracking-[-0.18px] text-white">
                    Your product or app link
                  </span>
                  <CheckCircle size={16} className="shrink-0 text-white/90" />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <FeaturePill icon={Link2} label="Product link" />
              <FeaturePill icon={Store} label="Link your App" />
            </div>
          </div>
        </div>

        <div className="relative h-auto flex-1 overflow-hidden md:h-[400px] lg:h-auto">
          <div className="h-[38rem] md:h-auto">
            <div className="grid grid-cols-2 overflow-x-hidden md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {columns.map((column, index) => (
                <div
                  key={index}
                  className={[
                    "space-y-2",
                    index === 0 ? "pr-2" : "pl-2",
                    index === 1 ? "md:pr-2" : "",
                    index === 2 ? "hidden lg:block lg:pr-2" : "",
                    index === 3 ? "hidden xl:block xl:pr-2" : "",
                  ].join(" ")}
                >
                  {column.map((item) => (
                    <MarketingVideoCard key={item.src} item={item} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -bottom-1 left-0 z-10 grid h-52 w-full items-end justify-center bg-gradient-to-t from-[#141518] to-transparent pb-8 md:pb-9">
            <Link
              href="/marketing-studio/app"
              className="inline-flex items-center gap-2 rounded-xl bg-hf-neon px-4 py-2.5 text-[13px] font-black text-black shadow-xl transition hover:bg-hf-neon/90"
            >
              View all Marketing Studio <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
