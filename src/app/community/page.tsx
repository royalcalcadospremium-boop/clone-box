import { Navbar } from "@/components/Navbar";
import { CopyrightBar } from "@/components/CopyrightBar";
import { Heart, Search } from "lucide-react";

const CARD_IMAGES = [
  "https://cdn.higgsfield.ai/card/578d27f2-663d-4817-96e7-89f90426c72c.webp",
  "https://cdn.higgsfield.ai/card/c10ed514-8e43-4390-b20c-58254f837086.webp",
  "https://cdn.higgsfield.ai/card/2230dfb0-c7b6-466e-99ea-f4eee9d08814.webp",
  "https://cdn.higgsfield.ai/card/b1988a79-e9d2-4058-9c90-82ab677b6058.webp",
  "https://cdn.higgsfield.ai/card/0a707acf-5df0-429a-b9e8-e4961d8d01cd.webp",
  "https://cdn.higgsfield.ai/card/a524d80e-204d-40ba-bcd8-39f75dcd5c92.webp",
  "https://cdn.higgsfield.ai/card/7e661736-c838-4789-a053-cfb09990a688.webp",
  "https://cdn.higgsfield.ai/card/96cb52c1-23e9-47a0-badc-239cf0a29570.webp",
  "https://cdn.higgsfield.ai/card/ddd778ac-253e-4251-8d9a-340189a311e8.webp",
  "https://cdn.higgsfield.ai/card/051a430d-eb46-423f-93e7-b450faaf7337.webp",
  "https://cdn.higgsfield.ai/card/e868fb8f-a0af-4f86-ae5a-6f3ac727878e.webp",
  "https://cdn.higgsfield.ai/card/9e7e9e9a-716f-4b59-878c-d3c7f1f7012d.webp",
  "https://cdn.higgsfield.ai/card/14ed53ed-4cad-46a7-9dad-4cebb7d9cd41.webp",
  "https://cdn.higgsfield.ai/card/2b3cc30f-49c4-4868-b1d7-5f56a4c946c3.webp",
  "https://cdn.higgsfield.ai/card/c2124f76-f96f-4df1-870c-03e5ad15fae4.webp",
  "https://cdn.higgsfield.ai/card/153574e6-6f8b-4857-806e-22b37202dd29.webp",
  "https://cdn.higgsfield.ai/card/1907d968-9588-4599-a53b-4d40f551356b.webp",
  "https://cdn.higgsfield.ai/card/3ecf80d1-a279-42ad-b99b-c840baeb17eb.webp",
  "https://cdn.higgsfield.ai/card/a5c235aa-388c-477e-8974-955aa5eacb13.webp",
  "https://cdn.higgsfield.ai/card/19aa0ae4-dcbb-4473-9cbc-93f222d2faf0.webp",
  "https://cdn.higgsfield.ai/card/d814674d-d264-4121-b093-d1eeffff6555.webp",
];

const CREATORS = ["mrabujoe", "shestak", "ash_creates", "jaemin_yoo", "corrygw", "boriko_sensei",
  "oddikt", "baroque_tea", "ryanlightbourn", "imagineif", "roomboy", "myrzakhan"];

const filters = ["All", "Images", "Videos", "4K", "Cinematic", "Portrait", "Animation"];

function PostCard({ index }: { index: number }) {
  const image = CARD_IMAGES[index % CARD_IMAGES.length];
  const creator = CREATORS[index % CREATORS.length];
  const likes = 128 + (index * 37) % 872;

  return (
    <div className="group cursor-pointer overflow-hidden rounded-xl bg-hf-surface-2" style={{ aspectRatio: "3/4" }}>
      <div className="relative h-full w-full">
        <img
          src={image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="flex items-center gap-1.5">
            <div className="h-6 w-6 rounded-full bg-gray-400" />
            <span className="text-[11px] font-medium text-white">{creator}</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5">
            <Heart size={10} className="text-white/70" />
            <span className="text-[11px] text-white/70">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-[1440px] px-3 pb-16 pt-6 md:px-4">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[clamp(28px,4vw,40px)] font-black leading-none text-hf-text">
              Community
            </h1>
            <p className="mt-1 text-[14px] text-hf-text-muted">
              Discover stunning AI-generated works from creators worldwide
            </p>
          </div>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-hf-text-muted" />
            <input
              type="text"
              placeholder="Search creations..."
              className="h-10 rounded-xl border border-white/[0.1] bg-hf-surface pl-9 pr-4 text-[13px] text-hf-text placeholder:text-hf-text-muted outline-none focus:border-hf-neon/50 w-[220px]"
            />
          </div>
        </div>

        {/* Filter pills */}
        <div className="mb-6 flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {filters.map((f, i) => (
            <button
              key={f}
              type="button"
              className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                i === 0
                  ? "bg-hf-neon text-black"
                  : "border border-white/[0.1] bg-hf-surface text-hf-text hover:border-hf-neon/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-2 gap-3 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 [&>div]:mb-3 [&>div]:break-inside-avoid">
          {Array.from({ length: 48 }, (_, i) => (
            <PostCard key={i} index={i} />
          ))}
        </div>
      </main>
      <CopyrightBar />
    </>
  );
}
