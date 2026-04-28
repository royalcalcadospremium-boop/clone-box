import Link from "next/link";

const gridImages = [
  "https://cdn.higgsfield.ai/card/831011af-a320-40a8-bf95-ebc55ff59900.webp",
  "https://cdn.higgsfield.ai/card/d814674d-d264-4121-b093-d1eeffff6555.webp",
  "https://cdn.higgsfield.ai/card/c0b57ae7-f877-4f98-ae78-f62542a108fc.webp",
  "https://cdn.higgsfield.ai/card/87919735-396b-4fcf-9970-ca8b6aeb20d4.webp",
  "https://cdn.higgsfield.ai/card/55cebf94-e94a-46ef-9c15-3bc0ff501b54.webp",
  "https://cdn.higgsfield.ai/card/1907d968-9588-4599-a53b-4d40f551356b.webp",
  "https://cdn.higgsfield.ai/card/02a55528-f1b7-4cf7-a176-4e1ea9171eee.webp",
  "https://cdn.higgsfield.ai/card/424836bc-64a8-4b6e-b52c-384673212340.webp",
  "https://cdn.higgsfield.ai/card/14244036-98db-43fb-8cb6-0fd3f092ad38.webp",
  "https://cdn.higgsfield.ai/card/3ecf80d1-a279-42ad-b99b-c840baeb17eb.webp",
  "https://cdn.higgsfield.ai/card/df0944c8-17f5-44bb-be7d-d46952e858fa.webp",
  "https://cdn.higgsfield.ai/card/19aa0ae4-dcbb-4473-9cbc-93f222d2faf0.webp",
];

function KlingLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect width="48" height="48" rx="10" fill="#1c1e20" />
      <path
        d="M12 34V14l8 10-8 10ZM24 14l10 10-10 10V14ZM34 14h2v20h-2V14Z"
        fill="#d1fe17"
      />
    </svg>
  );
}

export function KlingExclusive() {
  return (
    <section className="mb-8 overflow-hidden rounded-2xl" style={{ backgroundColor: "rgb(19,21,23)" }}>
      <div className="flex flex-col lg:flex-row">
        {/* Left panel */}
        <div className="flex flex-col gap-4 p-5 lg:w-[280px] lg:shrink-0">
          <KlingLogo />
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "rgb(137,138,139)" }}
          >
            Exclusively on Higgsfield
          </p>
          <div>
            <h2
              className="text-[clamp(40px,5vw,56px)] font-black uppercase leading-[0.95] tracking-[-0.02em]"
              style={{ color: "#d1fe17" }}
            >
              KLING 3.0
            </h2>
            <p
              className="text-[clamp(28px,4vw,40px)] font-black uppercase leading-[0.95] tracking-[-0.02em]"
              style={{ color: "#d1fe17", marginTop: -4 }}
            >
              EXCLUSIVE ACCESS
            </p>
          </div>
          <p className="text-[14px] leading-[1.5]" style={{ color: "rgb(137,138,139)" }}>
            Explore Higgsfield Community gallery for stunning Kling 3.0 creations
          </p>
          <Link
            href="https://higgsfield.ai/ai/video?model=kling3_0"
            className="inline-flex w-max items-center rounded-full px-6 py-3 text-[14px] font-bold transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#d1fe17", color: "rgb(19,21,23)" }}
          >
            Get Exclusive Offer
          </Link>
          <Link
            href="https://higgsfield.ai/ai/video?model=kling3_0"
            className="text-[14px] font-medium text-hf-text hover:underline"
          >
            Explore Kling 3.0
          </Link>
        </div>

        {/* Right panel — 4×3 media grid */}
        <div className="grid flex-1 gap-1 p-3" style={{ gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(3, auto)" }}>
          {gridImages.map((src, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg"
              style={{ aspectRatio: "16/10", backgroundColor: "rgb(28,30,32)" }}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
