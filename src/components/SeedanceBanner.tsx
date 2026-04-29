import { ArrowUpRight, Heart } from "lucide-react";
import Link from "next/link";

const AVATAR = "https://static.higgsfield.ai/profile/avatar.png";

type SeedanceVideo = {
  src: string;
  aspect: string;
  creator: string;
  likes: number;
  label: string;
};

const columns: SeedanceVideo[][] = [
  [
    {
      src: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094513_629920b7-4009-46de-b3b6-b80cc2185275_min.mp4",
      aspect: "1.77778 / 1",
      creator: "modular_pufferfish_swift82",
      likes: 320,
      label: "Street skating cinematic clip",
    },
    {
      src: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094615_1849e0bf-3c53-4790-80d7-d83d03968910_min.mp4",
      aspect: "1.77778 / 1",
      creator: "romantic_grappe",
      likes: 112,
      label: "Dark apartment horror clip",
    },
    {
      src: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094557_c0e3952b-1ecf-4621-9b06-eb86a7fe29e8_min.mp4",
      aspect: "1.77778 / 1",
      creator: "steampunk_donut_jade65",
      likes: 139,
      label: "Fantasy alley action clip",
    },
  ],
  [
    {
      src: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094445_b0de712b-ae62-4fb9-9b07-2757b2d0338b_min.mp4",
      aspect: "1.77778 / 1",
      creator: "sketching_manatee_peak94",
      likes: 305,
      label: "Music festival neon clip",
    },
    {
      src: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094601_f698d8f7-c96a-42c6-ad0c-8e830417201e_min.mp4",
      aspect: "1.77778 / 1",
      creator: "rococo_pen",
      likes: 142,
      label: "Urban building documentary clip",
    },
    {
      src: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094505_e898193e-ec14-4ecc-92ed-be976174fc88_min.mp4",
      aspect: "1.77778 / 1",
      creator: "atompunk_cupcake_aero96",
      likes: 261,
      label: "Fantasy fire VFX clip",
    },
  ],
  [
    {
      src: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094417_ba8bf934-a387-4bf5-8a24-f34be2a65d46_min.mp4",
      aspect: "1.77778 / 1",
      creator: "almasyan",
      likes: 484,
      label: "Bathroom fight cinematic clip",
    },
    {
      src: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094612_2b122af8-b47a-4518-9d91-9675dd8e3f41_min.mp4",
      aspect: "1.77778 / 1",
      creator: "crafting_capybara_live88",
      likes: 96,
      label: "Abandoned apartment horror clip",
    },
    {
      src: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094412_fbc2c33e-b861-4744-8aa3-13047b3b83c3_min.mp4",
      aspect: "1.77778 / 1",
      creator: "parametric_llama_swift35",
      likes: 125,
      label: "Office thriller clip",
    },
  ],
  [
    {
      src: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094509_a0443ee0-fd26-4f6a-9938-ee153fde5822_min.mp4",
      aspect: "1.77778 / 1",
      creator: "quantized_porcupine",
      likes: 154,
      label: "Highway crash action clip",
    },
    {
      src: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094654_27691a7e-7a4c-4511-95e2-cd3ae1a11273_min.mp4",
      aspect: "1.77778 / 1",
      creator: "institutional_butterflying",
      likes: 155,
      label: "Jewelry shop crash clip",
    },
    {
      src: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094622_41c4ed95-c7c2-49a8-933e-1cec2ea4e6d9_min.mp4",
      aspect: "1.77778 / 1",
      creator: "zhanay",
      likes: 108,
      label: "Aerial fantasy flight clip",
    },
  ],
];

function SeedanceVideoCard({ item }: { item: SeedanceVideo }) {
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
          src={item.src}
          aria-label={item.label}
          className="h-full w-full object-cover"
        />
        <figcaption className="hidden">{item.label}</figcaption>
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

export function SeedanceBanner() {
  return (
    <section className="relative mb-6 mt-4 overflow-hidden rounded-[20px] bg-[#10161f] p-4 md:rounded-3xl md:p-5 md:pl-8 lg:h-[444px]">
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          boxShadow:
            "inset 0 -1px 1px rgba(255,255,255,0.25), inset 0 1px 1px rgba(255,255,255,0.25)",
        }}
      />
      <div className="pointer-events-none absolute -left-20 -top-28 h-[263px] w-[519px] rounded-full bg-[linear-gradient(283deg,#315BB2_53.39%,#77E7DB_86.88%)] opacity-45 blur-[132px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(73,143,255,0.17),transparent_32%),linear-gradient(90deg,rgba(9,16,28,0.97)_0%,rgba(11,16,22,0.95)_45%,rgba(12,14,18,0.98)_100%)]" />

      <div className="relative z-10 flex size-full flex-col gap-5 lg:flex-row lg:gap-10">
        <div className="flex w-full flex-col items-center justify-center gap-4 pt-2 text-center lg:w-[380px] lg:shrink-0 lg:gap-6 lg:py-6">
          <p className="bg-[linear-gradient(-10deg,#3C65B8_6.38%,#F1FFFE_121.64%)] bg-clip-text font-grotesk text-sm font-bold uppercase tracking-[4.48px] text-transparent lg:tracking-[2.24px]">
            Available for everyone
          </p>
          <div className="h-px w-[88px] bg-[linear-gradient(90deg,rgba(107,207,255,0)_0%,#6BCFFF_52%,rgba(255,255,255,0)_100%)]" />
          <h2 className="bg-[linear-gradient(180deg,#62ccff_0%,#ffffff_100%)] bg-clip-text text-center text-[clamp(62px,8vw,92px)] font-black uppercase leading-[0.82] tracking-normal text-transparent drop-shadow-[0_0_22px_rgba(97,204,255,0.2)]">
            Seedance 2.0
          </h2>
          <p className="max-w-[308px] text-center text-sm font-semibold leading-5 text-white/55">
            World&apos;s best video model available with up to 30% OFF with special offer
          </p>
          <div className="flex w-full max-w-[358px] flex-col items-center gap-6">
            <Link
              href="/seedance-2-community"
              className="inline-flex h-14 w-full items-center justify-center rounded-[14px] border-0 bg-[radial-gradient(67.59%_67.59%_at_41.85%_100%,rgba(255,255,255,0.50)_0%,rgba(255,255,255,0)_100%),linear-gradient(90deg,#148CEE_0%,#1895BF_50%,#4EC7F0_100%)] px-6 text-md font-semibold text-white shadow-[10px_34px_24px_rgba(0,0,0,0.15),0_1px_0_#1F9BC5_inset,0_-3px_0_#1F9BC5_inset] transition hover:brightness-110"
              style={{ textShadow: "0 0 8px rgba(255,255,255,0.45)" }}
            >
              Get Seedance 2.0
            </Link>
            <Link
              href="/seedance/2.0"
              className="text-sm font-semibold text-white/48 transition hover:text-white/70 lg:text-md"
            >
              Learn more
            </Link>
          </div>
        </div>

        <div className="relative h-auto flex-1 overflow-hidden md:h-[400px] lg:h-auto">
          <div className="h-[28rem] md:h-auto">
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
                    <SeedanceVideoCard key={item.src} item={item} />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-1 left-0 z-10 grid h-40 w-full items-end justify-center bg-gradient-to-t from-[#10161f] to-transparent pb-8 md:pb-9">
            <Link
              href="/seedance-2-community"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-[#8cb213]/90 px-5 text-sm font-black text-[#e7ff4a] shadow-[0_10px_28px_rgba(0,0,0,0.3)] backdrop-blur-sm transition hover:bg-[#99c21c]"
            >
              View all of SEEDANCE 2.0
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
