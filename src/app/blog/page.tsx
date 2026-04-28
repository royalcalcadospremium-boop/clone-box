import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterLanding } from "@/components/FooterLanding";
import { CopyrightBar } from "@/components/CopyrightBar";

interface BlogPost {
  title: string;
  href: string;
  image: string;
  author?: string;
  authorImage?: string;
  date?: string;
  readTime?: string;
}

interface BlogCategory {
  id: string;
  title: string;
  seeAllHref: string;
  posts: BlogPost[];
}

const featured: BlogPost = {
  title: "Soul Cinema Preview: Cinematic-Grade Visuals In One Click",
  href: "https://higgsfield.ai/blog/soul-cinema-preview",
  image: "https://images.ctfassets.net/91663d1w6kgm/43Qmw43t4xj1cdmaCoXA04/c70f1ccb6512a04ad07eb4bc52c95f87/SOUL_CINEMA_Thumbnail-2_optimized_2500.png",
  author: "David Matamoros",
  authorImage: "https://images.ctfassets.net/91663d1w6kgm/3VAx6DtId28qhefBSBbaoF/c5a660c358c0c087886493bb30073352/final_david_matamoros.png",
  date: "Mar 4, 2026",
  readTime: "7 minutes",
};

const categories: BlogCategory[] = [
  {
    id: "fresh-release",
    title: "Fresh Release",
    seeAllHref: "https://higgsfield.ai/blog/Fresh-Releases",
    posts: [
      { title: "SOUL 2.0: A Photorealistic AI Image Generator Built for Creative Direction", href: "https://higgsfield.ai/blog/SOUL-2.0-Realistic-AI-Image-Generator-for-Creative-Direction", image: "https://images.ctfassets.net/91663d1w6kgm/32cHRq5WU24VDWhBxazjYC/2de46d70ff85859116a5596ed25c286d/SOUL-2_COVER_DESIGN_5_1_optimized_2500.png" },
      { title: "Cinema Studio 3.0 – Full Prompt Library", href: "https://higgsfield.ai/blog/cinema-studio-3.0", image: "https://images.ctfassets.net/91663d1w6kgm/1BnQtMvcq0RYgube1BKdGR/1ab3ea4969de2ed52c81e6e618d3b13b/COVER_03_-_CS3__1_.jpg" },
      { title: "Technical Overview of Seedance 2.0 AI Video Model", href: "https://higgsfield.ai/blog/seedance-2-on-higgsfield", image: "https://images.ctfassets.net/91663d1w6kgm/6kPNyEfjOS5FaCQUx9AxHP/a5c11f739b2b5c71560dc79b40b9b7d8/hf_20260209_145513_f085d9b2-de71-4de9-bf57-5e8eb8e7d04d_1_optimized_2500.png" },
      { title: "Cinema Studio 3.0: The Most Powerful AI Film Studio We've Ever Built", href: "https://higgsfield.ai/blog/cinema-studio-3", image: "https://images.ctfassets.net/91663d1w6kgm/SQyNjftRmkvN7qYlyLAe9/de02b373dd5ebd55591c01e926c68f37/CS-3-Thumbnail-2_1_1_optimized_2500.png" },
      { title: "Higgsfield Chat: A Social Network for Collaborative AI Content Creation", href: "https://higgsfield.ai/blog/higgsfield-chat-social-network", image: "https://images.ctfassets.net/91663d1w6kgm/57P7TahWrlL0Bpp4wmU2EL/4a9a420f35fcc90ceaf9338798bc3b5c/HIGGSFIEL_CHAT_optimized_2500.png" },
      { title: "Higgsfield Original Series: The First Complete AI Streaming Platform", href: "https://higgsfield.ai/blog/blog-original-series", image: "https://images.ctfassets.net/91663d1w6kgm/2Wbuj3FQSeNRrwmRxPrmjq/e09afe09a744212d17d2abe67f67722e/ARENA_ZERO-16x9_2_optimized_2500.png" },
    ],
  },
  {
    id: "how-to",
    title: "How To Guides",
    seeAllHref: "https://higgsfield.ai/blog/How-to-guides",
    posts: [
      { title: "How to Make Money Online in 2026 with Higgsfield Earn", href: "https://higgsfield.ai/blog/how-to-make-money-online-using-higgsfield-earn", image: "https://images.ctfassets.net/91663d1w6kgm/1pQmkmeg4rghhy8DSp9tJd/0c90f1b9f651f2bb3838dc8f3c795577/3__1_.png" },
      { title: "Best AI Video Generator: How to Create on Higgsfield", href: "https://higgsfield.ai/blog/AI-Video-Generator-How-to-Create-on-Higgsfield", image: "https://images.ctfassets.net/91663d1w6kgm/6muNGW88vI5HQORx35emAE/55537e06e66b98dff30c967d4b908b50/Frame_2147228688_2_optimized_2500.png" },
      { title: "A Guide to Creating AI Motion Design with Higgsfield Vibe Motion", href: "https://higgsfield.ai/blog/Higgsfield-Vibe-Motion-Guide-AI-Motion-Design", image: "https://images.ctfassets.net/91663d1w6kgm/5iovtzsjocnmspr04KuiXm/cc734548be949ac7b109f3c6df88a3fb/Frame_2147228704_2_1_optimized_2500.png" },
      { title: "Testing the Best AI Storyboard Tools to Find The Absolute Winner", href: "https://higgsfield.ai/blog/best-ai-storyboard-generator", image: "https://images.ctfassets.net/91663d1w6kgm/5PW0wotBmfs3SpJy6mvkP1/a10dd31471bbf95000cea03557dc22c7/Frame_2147228578__3_.png" },
      { title: "Seedance 2.0 Complete Prompting Guide", href: "https://higgsfield.ai/blog/seedance-prompting-guide", image: "https://images.ctfassets.net/91663d1w6kgm/SuSw52vikPWm2WGz83epo/99f2015361706f1d2e305e6afc602f59/1.png" },
      { title: "Full AI Animations with Seedance 2.0", href: "https://higgsfield.ai/blog/guide-animation-seedance2.0", image: "https://images.ctfassets.net/91663d1w6kgm/5zWj2OiJpZFjtTJHIw4Aho/d60aca4f1f8e2c902b42e5f40c9284dc/Ai_Animation__3_.png" },
    ],
  },
  {
    id: "future-models",
    title: "Insights on Future Models",
    seeAllHref: "https://higgsfield.ai/blog/future-models-insights",
    posts: [
      { title: "What's New in GenAI: AI Motion Design Meets CodeGen Video Generation", href: "https://higgsfield.ai/blog/AI-Motion-Design-When-Video-Generation-Meets-Code", image: "https://images.ctfassets.net/91663d1w6kgm/4NyEfvvBLympxHlR8xQe7Y/5c5e1423a8826ae00ff3d30df7a052f3/hf_20260127_011938_8745cff2-1aec-4e22-8add-73e63eeb8536.png" },
      { title: "Nano Banana 2 and Gemini 3.0: Early Signs of a Major Shift in AI Image Generation", href: "https://higgsfield.ai/blog/Nano-Banana-2-and-Gemini-3-Early-Signs", image: "https://images.ctfassets.net/91663d1w6kgm/qWdGIn4EFEOX6u6kGXMIV/2ee1153a6b6abafe9d8d1160f115e303/tg_image_586293373.png" },
      { title: "FLUX.2: A Technical Preview", href: "https://higgsfield.ai/blog/FLUX-2-Technical-Predictions", image: "https://images.ctfassets.net/91663d1w6kgm/e4KXkTKmHjvRKVu2TXG2Q/b0b8450bd921d9be7fc781fa6cffc3cb/tg_image_3570851177__1_.png" },
      { title: "Nano Banana 2 vs. Nano Banana 1: What Improvements to Expect?", href: "https://higgsfield.ai/blog/Nano-Banana-2-vs-Nano-Banana-1", image: "https://images.ctfassets.net/91663d1w6kgm/7xE5pUdkkN9UFGPXm3xNgg/310425893d5031d29ad81ddded618726/Frame_2147228670.png" },
      { title: "Seedance 2.0 AI Video: Technical Preview and User Discussion", href: "https://higgsfield.ai/blog/Seedance-2.0-AI-Video-Technical-Preview", image: "https://images.ctfassets.net/91663d1w6kgm/6kPNyEfjOS5FaCQUx9AxHP/a5c11f739b2b5c71560dc79b40b9b7d8/hf_20260209_145513_f085d9b2-de71-4de9-bf57-5e8eb8e7d04d_1_optimized_2500.png" },
      { title: "Seedream 5.0: AI Image Generator Model Preview and Expectations", href: "https://higgsfield.ai/blog/Seedream-5.0-AI-Image-Technical-Preview", image: "https://images.ctfassets.net/91663d1w6kgm/5741w7Yo83sg4XHNP9b2YI/2736422dc85e908ab1caa57168ed697c/hf_20260209_164737_50239ea6-5d95-4656-afae-6c2d1c890364_optimized_2500.png" },
    ],
  },
  {
    id: "social-media",
    title: "Social Media Tips",
    seeAllHref: "https://higgsfield.ai/blog/Social-Media-Tips",
    posts: [
      { title: "What Influencers Know About Sora 2 That You Don't", href: "https://higgsfield.ai/blog/What-Influencers-Know-About-Sora-2-That-You-Dont", image: "https://images.ctfassets.net/91663d1w6kgm/5frIcgrXqJHiig7pzXEXYo/bda1a0e5d5815b45f6a6184ba1b5fb58/10__2_.png" },
      { title: "The Future of Creator Partnerships: How Brands and AI Platforms Will Co-Create Content", href: "https://higgsfield.ai/blog/How-Brands-and-AI-Platforms-Will-Co-Create-Content", image: "https://images.ctfassets.net/91663d1w6kgm/51KVZIYiq2ADGd5J9BWrac/1a5b0965e1da4d614754ef29fe26ae71/11__1_.png" },
      { title: "AI Skin Enhancer: How AI Retouching Works in Editing?", href: "https://higgsfield.ai/blog/AI-Skin-Enhancer-How-AI-Retouching-Works-in-Editing", image: "https://images.ctfassets.net/91663d1w6kgm/38JLm7TynAe35Fgh7w4HPF/665e3f64f7bd3fc16f668210133b64cc/Frame_2147228716__2_.png" },
      { title: "The Role of AI in Social Media Marketing in 2025", href: "https://higgsfield.ai/blog/The-Role-of-AI-in-Social-Media-Marketing", image: "https://images.ctfassets.net/91663d1w6kgm/6TIoeGAnwhvIYjcgOkamzZ/34b58b005973173f46b79a8545a75c3e/89abb4f6-7f24-4b28-a9f5-c064225b54b1.png" },
    ],
  },
];

const tabs = ["Fresh Release", "How To Guides", "Insights on Future Models", "Social Media Tips", "Listicles"];

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={post.href} className="group block min-w-0">
      <div className="overflow-hidden rounded-xl bg-hf-surface-2 aspect-[16/9] mb-3">
        <img
          src={post.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"
        />
      </div>
      <h3 className="text-[14px] font-semibold text-hf-text leading-snug line-clamp-2 group-hover:text-hf-neon transition-colors">
        {post.title}
      </h3>
    </Link>
  );
}

function CategorySection({ cat }: { cat: BlogCategory }) {
  return (
    <section id={cat.id} className="mb-14 scroll-mt-20">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-[22px] font-black text-hf-text">{cat.title}</h2>
        <Link href={cat.seeAllHref} className="flex items-center gap-1 text-[13px] font-semibold text-hf-neon hover:opacity-80">
          View all <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {cat.posts.map((post) => (
          <PostCard key={post.href} post={post} />
        ))}
      </div>
    </section>
  );
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-[1440px] px-3 pb-16 pt-8 md:px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[clamp(32px,5vw,52px)] font-black leading-none text-hf-text">
            Higgsfield Blog
          </h1>
          <p className="mt-2 max-w-[480px] text-[15px] text-hf-text-muted">
            Learn how to use AI-generated video and images to grow your brand. Tips, tutorials, and the latest drops for creators and marketers.
          </p>
        </div>

        {/* Category nav pills */}
        <nav className="mb-10 flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {tabs.map((tab) => (
            <a
              key={tab}
              href={`#${tab.toLowerCase().replace(/\s+/g, "-")}`}
              className="shrink-0 rounded-full border border-white/[0.1] bg-hf-surface px-4 py-2 text-[13px] font-semibold text-hf-text hover:border-hf-neon/50 hover:text-hf-neon transition-colors"
            >
              {tab}
            </a>
          ))}
        </nav>

        {/* Featured post */}
        <Link href={featured.href} className="group mb-14 flex flex-col overflow-hidden rounded-2xl bg-hf-surface md:flex-row">
          <div className="relative overflow-hidden md:w-[55%]">
            <img
              src={featured.image}
              alt=""
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              style={{ minHeight: 280 }}
            />
          </div>
          <div className="flex flex-col justify-center gap-4 p-6 md:w-[45%]">
            {featured.authorImage && (
              <div className="flex items-center gap-2">
                <img src={featured.authorImage} alt={featured.author} className="h-8 w-8 rounded-full object-cover" />
                <span className="text-[13px] text-hf-text-muted">{featured.author} · {featured.date} · {featured.readTime}</span>
              </div>
            )}
            <h2 className="text-[clamp(20px,2.5vw,28px)] font-black leading-tight text-hf-text group-hover:text-hf-neon transition-colors">
              {featured.title}
            </h2>
          </div>
        </Link>

        {/* Category sections */}
        {categories.map((cat) => (
          <CategorySection key={cat.id} cat={cat} />
        ))}
      </main>
      <FooterLanding />
      <CopyrightBar />
    </>
  );
}
