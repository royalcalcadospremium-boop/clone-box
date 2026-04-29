import Link from "next/link";

const USER_CDN = "https://dqv0cqkoy5oj7.cloudfront.net/user_3CgVhvaX3mV5mOxcjBTK96F6n03";
const HF_CDN = "https://cdn.higgsfield.ai/card";
const AVATAR = "https://static.higgsfield.ai/profile/avatar.png";

function proxyImg(rawUrl: string, w = 640) {
  return `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(rawUrl)}&w=${w}&q=85`;
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="fill-transparent shrink-0" aria-hidden="true">
      <path
        d="M15.1424 6.625C15.1424 10.5781 9.48962 13.5 8.97575 13.5C8.46188 13.5 2.80908 10.5781 2.80908 6.625C2.80908 3.875 4.52204 2.5 6.23501 2.5C7.94795 2.5 8.97575 3.53125 8.97575 3.53125C8.97575 3.53125 10.0035 2.5 11.7165 2.5C13.4295 2.5 15.1424 3.875 15.1424 6.625Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg className="size-5 shrink-0" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M8.25 16.25C8.25 16.6642 8.58579 17 9 17C9.41421 17 9.75 16.6642 9.75 16.25C9.75 13.8242 10.2859 12.2487 11.2673 11.2673C12.2487 10.2859 13.8242 9.75 16.25 9.75C16.6642 9.75 17 9.41421 17 9C17 8.58579 16.6642 8.25 16.25 8.25C13.8242 8.25 12.2487 7.71411 11.2673 6.73269C10.2859 5.75127 9.75 4.17581 9.75 1.75C9.75 1.33579 9.41421 1 9 1C8.58579 1 8.25 1.33579 8.25 1.75C8.25 4.17581 7.71411 5.75127 6.73269 6.73269C5.75127 7.71411 4.17581 8.25 1.75 8.25C1.33579 8.25 1 8.58579 1 9C1 9.41421 1.33579 9.75 1.75 9.75C4.17581 9.75 5.75127 10.2859 6.73269 11.2673C7.71411 12.2487 8.25 13.8242 8.25 16.25Z"
        fill="currentColor"
      />
      <path
        d="M16.75 22.25C16.75 22.6642 17.0858 23 17.5 23C17.9142 23 18.25 22.6642 18.25 22.25C18.25 20.6922 18.5949 19.7418 19.1684 19.1684C19.7418 18.5949 20.6922 18.25 22.25 18.25C22.6642 18.25 23 17.9142 23 17.5C23 17.0858 22.6642 16.75 22.25 16.75C20.6922 16.75 19.7418 16.4051 19.1684 15.8316C18.5949 15.2582 18.25 14.3078 18.25 12.75C18.25 12.3358 17.9142 12 17.5 12C17.0858 12 16.75 12.3358 16.75 12.75C16.75 14.3078 16.4051 15.2582 15.8316 15.8316C15.2582 16.4051 14.3078 16.75 12.75 16.75C12.3358 16.75 12 17.0858 12 17.5C12 17.9142 12.3358 18.25 12.75 18.25C14.3078 18.25 15.2582 18.5949 15.8316 19.1684C16.4051 19.7418 16.75 20.6922 16.75 22.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface GridImage {
  src: string;
  aspect: number;
  creator: string;
  likes: number;
}

/* Each sub-array is one visual column (rendered top-to-bottom within that col) */
const COLUMNS: GridImage[][] = [
  /* col 0 — always visible */
  [
    {
      src: proxyImg(`${USER_CDN}/hf_20260422_215626_8f188629-c5bb-441a-a0fe-a0be4d976fc6.png`),
      aspect: 0.5655, creator: "cezanne_cupcake_haze12", likes: 247,
    },
    {
      src: proxyImg(`${USER_CDN}/hf_20260422_202551_baf580a8-979d-486e-b0a0-b0b09ee83d6d.png`),
      aspect: 0.7466, creator: "piffle_jack", likes: 101,
    },
    {
      src: proxyImg(`${USER_CDN}/hf_20260422_144420_5f74e1a3-ff9e-4f59-b8f8-799982bdd36b.png`),
      aspect: 0.5655, creator: "adapting_potato_keen39", likes: 46,
    },
  ],
  /* col 1 — always visible */
  [
    { src: `${HF_CDN}/578d27f2-663d-4817-96e7-89f90426c72c.webp`, aspect: 0.67, creator: "impressionist_cookie_haz", likes: 71 },
    { src: `${HF_CDN}/c10ed514-8e43-4390-b20c-58254f837086.webp`, aspect: 0.90, creator: "baroque_tea", likes: 38 },
    { src: `${HF_CDN}/2230dfb0-c7b6-466e-99ea-f4eee9d08814.webp`, aspect: 1.30, creator: "ryanlightbourn", likes: 52 },
  ],
  /* col 2 — lg+ only */
  [
    { src: `${HF_CDN}/b1988a79-e9d2-4058-9c90-82ab677b6058.webp`, aspect: 0.67, creator: "imagineif", likes: 83 },
    { src: `${HF_CDN}/0a707acf-5df0-429a-b9e8-e4961d8d01cd.webp`, aspect: 0.75, creator: "roomboy", likes: 27 },
    { src: `${HF_CDN}/9e7e9e9a-716f-4b59-878c-d3c7f1f7012d.webp`, aspect: 1.33, creator: "myrzakhan", likes: 33 },
  ],
  /* col 3 — xl+ only */
  [
    { src: `${HF_CDN}/a524d80e-204d-40ba-bcd8-39f75dcd5c92.webp`, aspect: 0.67, creator: "boriko_sensei", likes: 119 },
    { src: `${HF_CDN}/7e661736-c838-4789-a053-cfb09990a688.webp`, aspect: 0.75, creator: "mrabujoe", likes: 44 },
  ],
];

function ImageCard({ img }: { img: GridImage }) {
  return (
    <aside className="relative group rounded-xl overflow-hidden">
      <figure
        className="relative overflow-hidden z-[1]"
        style={{ aspectRatio: `${img.aspect} / 1` }}
      >
        <img
          src={img.src}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </figure>

      {/* Hover dark gradient overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/60 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

      {/* Hover header: creator + like */}
      <div className="absolute top-0 left-0 right-0 z-[3] flex items-center justify-between gap-4 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-[opacity,visibility] duration-200">
        <a
          href={`/@${img.creator}`}
          className="flex items-center gap-2 min-w-0 text-white hover:text-hf-neon transition-colors"
        >
          <div className="relative size-7 rounded-full overflow-hidden bg-[#3a3d40] shrink-0">
            <img
              src={AVATAR}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <p className="text-sm font-medium truncate">{img.creator}</p>
        </a>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-white text-[12px] font-semibold shrink-0"
          style={{
            background: "rgba(255,255,255,0.08)",
            boxShadow:
              "rgba(255,255,255,0.3) -0.5px -0.5px 1px 0px inset, rgba(255,255,255,0.6) 0.8px 0.5px 0.5px 0px inset",
          }}
        >
          <HeartIcon />
          {img.likes}
        </button>
      </div>
    </aside>
  );
}

export function GptImage2Banner() {
  return (
    <div
      className="relative flex w-full mb-6 flex-col lg:flex-row overflow-hidden rounded-[20px] md:rounded-3xl md:p-5 md:pl-8 gap-5 lg:gap-10 bg-black"
      style={{ paddingBottom: 0 }}
    >
      {/* Mobile border */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[20px] md:hidden"
        style={{ border: "1px solid rgba(255,255,255,0.12)" }}
        aria-hidden="true"
      />
      {/* Desktop inset glow border */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl hidden md:block"
        style={{
          boxShadow:
            "inset 0px -1px 1px 0px rgba(255,255,255,0.15), inset 0px 1px 1px 0px rgba(255,255,255,0.15)",
        }}
        aria-hidden="true"
      />
      {/* White glow orb */}
      <div className="hidden md:block absolute pointer-events-none inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute rounded-full bg-white opacity-10"
          style={{ left: -50, top: -350, width: 583, height: 583, filter: "blur(100px)" }}
        />
      </div>

      {/* ── Left panel ── */}
      <div className="relative z-[1] flex flex-col items-center w-full lg:w-[380px] lg:self-stretch pt-2">
        {/* Mobile-only GPT image (overlaps text below on mobile) */}
        <div className="relative z-0 w-full aspect-square lg:hidden -mb-[88px] -mt-[56px]">
          <img
            src="https://static.higgsfield.ai/gpt-2-banner-image-new.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain object-center select-none pointer-events-none"
            style={{
              maskImage:
                "radial-gradient(ellipse 70% 70% at 50% 65%, black 45%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 70% at 50% 65%, black 45%, transparent 100%)",
            }}
          />
        </div>

        {/* Text content (sits above the image on mobile via z-10) */}
        <div className="px-4 relative z-10 flex flex-col items-center gap-5 w-full max-w-full">
          <div className="flex flex-col items-center gap-4 w-full">
            {/* "NEW MODEL" label with gradient text */}
            <p
              className="font-grotesk text-base font-bold uppercase tracking-[2.56px]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, white 50%, rgba(255,255,255,0.1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              New Model
            </p>

            {/* Decorative gradient divider */}
            <svg width="80" height="1" viewBox="0 0 80 1" fill="none" aria-hidden="true">
              <path d="M0 0.5H80" stroke="url(#gpt2-divider)" />
              <defs>
                <linearGradient id="gpt2-divider" x1="0" y1="1" x2="80" y2="1" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9CC4FF" stopOpacity="0" />
                  <stop offset="0.521413" stopColor="#C9DCFF" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <div className="flex flex-col items-center gap-1.5 w-full">
              <h2 className="text-center text-white text-3xl font-semibold leading-9">
                Meet GPT Image 2
              </h2>
              <p className="text-center text-zinc-500 text-lg font-normal leading-7">
                4K images with near-perfect text rendering
              </p>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/ai/image?model=imagegen_2_0"
            className="h-11 px-4 rounded-xl bg-white flex items-center justify-center gap-2 w-full lg:w-auto lg:inline-flex lg:self-center text-neutral-900 text-base font-semibold leading-6 transition-colors hover:bg-white/90"
            style={{ outline: "1px solid rgba(255,255,255,0.1)", outlineOffset: -1 }}
          >
            <SparkleIcon />
            Try Model
          </Link>
        </div>

        {/* Desktop-only GPT logo image (absolutely positioned behind text) */}
        <div className="z-0 hidden lg:block absolute inset-0 w-full h-full">
          <img
            src="https://static.higgsfield.ai/gpt-2-banner-image-new.png"
            alt=""
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto max-w-none select-none pointer-events-none"
            style={{
              height: "65%",
              maskImage:
                "radial-gradient(ellipse 70% 70% at 50% 65%, black 45%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 70% at 50% 65%, black 45%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* ── Right panel: image grid ── */}
      <div className="flex-1 overflow-hidden h-auto md:h-[400px] lg:h-auto relative px-4 md:px-0">
        <div style={{ height: "38rem" }} className="md:h-auto">
          <div className="overflow-x-hidden grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {COLUMNS.map((col, ci) => (
              <div
                key={ci}
                className={[
                  "space-y-2",
                  ci === 0 ? "pr-2" : "pl-2",
                  ci >= 2 ? "hidden lg:block" : "",
                  ci >= 3 ? "lg:hidden xl:block" : "",
                ].join(" ")}
              >
                {col.map((img, ii) => (
                  <ImageCard key={ii} img={img} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient fade + "View all" CTA */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-end px-4 pb-4 md:pb-3 h-24 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <Link
            href="/ai/image?model=imagegen_2_0"
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-black transition hover:opacity-90"
            style={{ background: "#d1fe17" }}
          >
            View all of GPT Image 2 <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
