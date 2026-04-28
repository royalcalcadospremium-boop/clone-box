import Link from "next/link";

const gridImages = [
  "https://cdn.higgsfield.ai/card/c0b57ae7-f877-4f98-ae78-f62542a108fc.webp",
  "https://cdn.higgsfield.ai/card/d814674d-d264-4121-b093-d1eeffff6555.webp",
  "https://cdn.higgsfield.ai/card/831011af-a320-40a8-bf95-ebc55ff59900.webp",
  "https://cdn.higgsfield.ai/card/87919735-396b-4fcf-9970-ca8b6aeb20d4.webp",
  "https://cdn.higgsfield.ai/card/3ecf80d1-a279-42ad-b99b-c840baeb17eb.webp",
  "https://cdn.higgsfield.ai/card/19aa0ae4-dcbb-4473-9cbc-93f222d2faf0.webp",
  "https://cdn.higgsfield.ai/card/df0944c8-17f5-44bb-be7d-d46952e858fa.webp",
  "https://cdn.higgsfield.ai/card/424836bc-64a8-4b6e-b52c-384673212340.webp",
  "https://cdn.higgsfield.ai/card/02a55528-f1b7-4cf7-a176-4e1ea9171eee.webp",
  "https://cdn.higgsfield.ai/card/1907d968-9588-4599-a53b-4d40f551356b.webp",
  "https://cdn.higgsfield.ai/card/55cebf94-e94a-46ef-9c15-3bc0ff501b54.webp",
  "https://cdn.higgsfield.ai/card/14244036-98db-43fb-8cb6-0fd3f092ad38.webp",
];

export function SeedanceBanner() {
  return (
    <div className="mb-6 overflow-hidden rounded-2xl md:rounded-3xl bg-hf-bg">
      <div className="flex flex-col lg:flex-row p-4 md:p-5">
        {/* Left column */}
        <div className="flex flex-col gap-3 lg:w-[280px] lg:shrink-0 lg:pr-5 justify-center mb-4 lg:mb-0">
          <p
            className="flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.08em]"
            style={{ color: "rgb(137,138,139)" }}
          >
            <span className="font-black" style={{ color: "#d1fe17" }}>||</span>
            SEEDANCE 2.0
          </p>
          <h2
            className="text-[clamp(32px,4vw,40px)] font-extrabold uppercase leading-[1.0] tracking-[-0.02em] text-hf-text"
          >
            CINEMATIC VFX
            <br />
            READY TO USE
          </h2>
          <p className="text-[14px] leading-[1.5]" style={{ color: "rgb(137,138,139)" }}>
            Turn any shot cinematic
          </p>
          <Link
            href="https://higgsfield.ai/ai/video?model=seedance_2_0"
            className="inline-flex w-max items-center rounded-full px-5 py-2.5 text-[14px] font-medium transition-colors duration-150 hover:bg-hf-neon-10"
            style={{
              border: "1px solid #d1fe17",
              color: "#d1fe17",
            }}
          >
            Explore All Presets
          </Link>
          <Link
            href="https://higgsfield.ai/ai/video?model=kling3_0"
            className="text-[14px] font-medium text-hf-text hover:underline"
          >
            Explore Kling 3.0
          </Link>
        </div>

        {/* Right column — image grid */}
        <div
          className="flex-1 grid gap-1.5 overflow-hidden rounded-xl"
          style={{ gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(3, auto)" }}
        >
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
    </div>
  );
}
