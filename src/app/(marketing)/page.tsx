import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Gem,
  ImageIcon,
  Instagram,
  Menu,
  Play,
  Sparkles,
  Video,
  Wand2,
  Zap,
} from 'lucide-react'
import Link from 'next/link'

const heroCards = [
  {
    title: 'GPT Image 2',
    description: '4K images with near-perfect text rendering',
    image: '/higgsfield-home/gpt-panel-glow.png',
  },
  {
    title: 'KLING 3.0 in 4K',
    description: 'Cinema-grade video at full 4K resolution',
    image: '/higgsfield-home/hero-cinema.png',
  },
  {
    title: 'Marketing Studio for Apps',
    description: 'Powered by Hermes Agent',
    image: '/higgsfield-home/hero-marketing.png',
  },
  {
    title: 'Seedance 2.0 in 1080p',
    description: 'Now generating in 1080p - sharper detail, smoother motion output',
    image: '/higgsfield-home/hero-seedance.png',
  },
  {
    title: 'Marketing Studio',
    description: 'Different Formats. One Product. Powered by Seedance 2.0.',
    image: '/higgsfield-home/hero-url.png',
  },
]

const imageSet = [
  '/higgsfield-home/gpt-01.png',
  '/higgsfield-home/gpt-02.png',
  '/higgsfield-home/gpt-03.png',
  '/higgsfield-home/gpt-04.png',
  '/higgsfield-home/gpt-05.png',
  '/higgsfield-home/gpt-06.png',
]

const marketingImages = [
  '/higgsfield-home/marketing-02.png',
  '/higgsfield-home/marketing-03.png',
  '/higgsfield-home/marketing-04.png',
  '/higgsfield-home/marketing-01.png',
  '/higgsfield-home/marketing-05.png',
]

const seedanceImages = [
  '/higgsfield-home/seedance-01.png',
  '/higgsfield-home/seedance-02.png',
  '/higgsfield-home/seedance-03.png',
  '/higgsfield-home/seedance-04.png',
  '/higgsfield-home/seedance-05.png',
  '/higgsfield-home/seedance-06.png',
]

const tools = [
  {
    name: 'Create Image',
    desc: 'Generate AI images',
    icon: ImageIcon,
    image: '/higgsfield-home/tool-create-image.png',
    tag: '',
  },
  {
    name: 'Create Video',
    desc: 'Generate AI videos',
    icon: Video,
    image: '/higgsfield-home/tool-create-video.png',
    tag: '',
  },
  {
    name: 'Motion Control',
    desc: 'Precise control of character actions and expressions up to 30 seconds',
    icon: Play,
    image: '/higgsfield-home/tool-motion-control.png',
    tag: 'NEW',
  },
  {
    name: 'Soul 2.0',
    desc: 'Next generation ultra-realistic fashion visuals',
    icon: Sparkles,
    image: '/higgsfield-home/tool-soul.png',
    tag: 'NEW',
  },
  {
    name: 'Soul ID',
    desc: 'Create unique character',
    icon: Wand2,
    image: '/higgsfield-home/tool-soul-id.png',
    tag: '',
  },
  {
    name: 'Upscale',
    desc: 'Enhance media quality',
    icon: Zap,
    image: '/higgsfield-home/tool-upscale.png',
    tag: '',
  },
  {
    name: 'Edit Image',
    desc: 'Brush areas to edit images',
    icon: ImageIcon,
    image: '/higgsfield-home/tool-edit-image.png',
    tag: '',
  },
  {
    name: 'Edit Video',
    desc: 'Advanced video editing',
    icon: Video,
    image: '/higgsfield-home/tool-create-video.png',
    tag: '',
  },
]

const chipGroups = [
  {
    title: 'Mixed Media',
    desc: 'Explore stylized community creations with layered references.',
    chips: [
      'Layer mixed media',
      'Sketch',
      'Canvas',
      'Flash comic',
      'Overexposed',
      'Paper',
      'Noir',
      'Particles',
      'Hand paint',
      'Toxic',
      'Tracking',
      'Ultraviolet',
      'Windows',
      'Acid',
      'Palette',
      'Comic',
    ],
  },
  {
    title: 'Visual Effects',
    desc: 'Big-budget visual effects, from explosions to surreal transformations.',
    chips: [
      'Raven Transition',
      'Air Bending',
      'Animalization',
      'Water Bending',
      'Earth Zoom Out',
      'Giant Grab',
      'Shadow Smoke',
      'Splash Transition',
      'Firelava',
      'Explosion',
      'Flame On',
      'Train Rush',
      'Point Cloud',
      'Money Rain',
    ],
  },
  {
    title: 'Ninja Box Apps',
    desc: 'Ready-to-share content in one click, from viral effects to commercials.',
    chips: [
      'Angles 2.0',
      'AI Stylist',
      'Relight',
      'Shots',
      'Zooms',
      'Skin Enhancer',
      'ClipCut',
      'Outfit Swap',
      'Style Snap',
      'Click to Ad',
      'Face Swap',
      'Packshot',
      'Billboard Ad',
      'Background Remover',
    ],
  },
]

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0f1113] text-[#fbfbfe]">
      <Header />

      <section className="mx-auto max-w-[1380px] px-3 pb-5 pt-[76px] sm:px-5">
        <div className="relative">
          <button
            type="button"
            className="absolute left-0 top-24 z-20 hidden h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="absolute right-0 top-24 z-20 hidden h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="flex gap-3 overflow-x-auto pb-1 lg:grid lg:grid-cols-5">
            {heroCards.map((card) => (
              <article key={card.title} className="group w-[220px] flex-none lg:w-auto lg:min-w-0">
                <div
                  aria-label={card.title}
                  className="relative h-[140px] overflow-hidden rounded-2xl bg-[#171717] md:h-[190px]"
                >
                  <img
                    src={card.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="mt-2.5 space-y-0.5">
                  <h3 className="text-[13px] font-black leading-tight text-white">{card.title}</h3>
                  <p className="line-clamp-2 text-[11px] font-medium leading-[1.4] text-white/45">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] space-y-4 px-3 pb-5 sm:px-5">
        <FeatureBlock
          eyebrow="NEW MODEL"
          title="Meet GPT Image 2"
          description="4K images with near-perfect text rendering"
          button="Try Model"
          viewAll="View all of GPT Image 2"
          variant="dark"
          images={imageSet}
          panelImage="/higgsfield-home/gpt-panel-glow.png"
        />
        <FeatureBlock
          eyebrow=""
          title="One link in. marketing out."
          description="Create UGC, demos, and ads across channels"
          button="Try Marketing Studio"
          viewAll="View all Marketing Studio"
          variant="pink"
          images={marketingImages}
          panelImage="/higgsfield-home/marketing-panel-products.png"
        />
        <FeatureBlock
          eyebrow="AVAILABLE FOR EVERYONE"
          title="Seedance 2.0"
          description="World's best video model. Up to 30% OFF with special offer."
          button="Get Seedance 2.0"
          viewAll="View all of SEEDANCE 2.0"
          variant="blue"
          images={seedanceImages}
        />
      </section>

      <section className="mx-auto max-w-[1380px] px-3 pb-5 sm:px-5">
        <div className="rounded-3xl border border-white/[0.08] bg-[#14151a] p-5 md:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[.2em] text-[#d1fe17]">
                Explore all tools
              </p>
              <h2 className="max-w-xl text-4xl font-black uppercase leading-[.9] tracking-[-.05em] md:text-6xl">
                What will you create today?
              </h2>
            </div>
            <Link
              href="/apps"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-black text-black"
            >
              Explore all tools <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map(({ name, desc, icon: Icon, image, tag }) => (
              <Link
                key={name}
                href="/apps"
                className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1c1e20] transition hover:border-[#d1fe17]/30"
              >
                <div className="relative aspect-video overflow-hidden bg-[#101113]">
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {tag && (
                    <span className="absolute left-3 top-3 rounded-md bg-[#d1fe17] px-2 py-1 text-[10px] font-black text-black">
                      {tag}
                    </span>
                  )}
                  <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-black text-white">{name}</h3>
                  <p className="mt-1 text-sm text-white/45">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1380px] gap-4 px-3 pb-5 sm:px-5 lg:grid-cols-[1fr_1fr]">
        <PosterCard
          title="Cinematic VFX ready to use"
          subtitle="Turn any shot cinematic"
          image="/higgsfield-home/poster-cinematic.png"
          cta="Explore All Presets"
        />
        <PosterCard
          title="Different scenes. Same star."
          subtitle="Build your character. One click does the rest"
          image="/higgsfield-home/poster-photodump.png"
          cta="Try Photodump"
        />
      </section>

      <section className="mx-auto max-w-[1380px] px-3 pb-5 sm:px-5">
        <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0a0c]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(60,20,100,.6),transparent_60%)]" />
          <div className="relative grid min-h-[360px] lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="mb-3 text-xs font-black uppercase tracking-[.24em] text-white/40">
                Ninja Box Originals
              </p>
              <h2 className="text-5xl font-black uppercase leading-[.9] tracking-[-.05em] text-white md:text-7xl">
                Watch<br />Zephyr
              </h2>
              <p className="mt-4 max-w-xs text-base font-medium leading-7 text-white/50">
                First ever AI series streaming platform. Available on Ninja Box Original Series.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/originals"
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-black text-black"
                >
                  <Play className="h-4 w-4 fill-black" /> Watch now
                </Link>
                <Link
                  href="/originals"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-6 text-sm font-black text-white hover:bg-white/[0.1]"
                >
                  Explore Original Series
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden items-center justify-end p-6 lg:flex">
              <div className="grid grid-cols-2 gap-2 opacity-80">
                {['/higgsfield/image-history.png', '/higgsfield/image-community.png', '/higgsfield/video-create.png', '/higgsfield/image-menu.png'].map((src) => (
                  <div key={src} className="h-44 w-44 overflow-hidden rounded-2xl bg-[#1c1e20]">
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] space-y-4 px-3 pb-8 sm:px-5">
        {chipGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-3xl border border-white/[0.08] bg-[#14151a] p-5 md:p-7"
          >
            <div className="mb-5 max-w-2xl">
              <h2 className="text-3xl font-black uppercase tracking-[-.04em] md:text-5xl">
                {group.title}
              </h2>
              <p className="mt-2 text-sm font-medium text-white/50 md:text-base">{group.desc}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.chips.map((chip) => (
                <Link
                  key={chip}
                  href="/apps"
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-bold text-white/70 transition hover:border-[#d1fe17]/30 hover:text-[#d1fe17]"
                >
                  {chip}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <footer className="border-t border-white/[0.08] bg-[#0f1113] px-5 py-10">
        <div className="mx-auto grid max-w-[1380px] gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <LogoMark />
              <span className="text-lg font-black">Ninja Box</span>
            </div>
            <p className="max-w-sm text-sm leading-6 text-white/50">
              AI-powered camera control, image generation, marketing studio, and video creation for
              ecommerce creators.
            </p>
          </div>
          {[
            [
              'Image',
              'AI Image',
              'Soul ID Character',
              'Draw to Edit',
              'Edit Image',
              'Image Upscale',
              'GPT Image 2',
              'Soul 2.0',
              'Soul Cinema',
            ],
            [
              'Video',
              'AI Video',
              'Create Video',
              'Lipsync Studio',
              'Motion Control',
              'Draw to Video',
              'UGC Factory',
              'Seedance 2.0',
              'Kling 3.0',
            ],
            [
              'Edit',
              'Edit Image',
              'Edit Video',
              'Product Placement',
              'Upscale',
              'Multi Reference',
            ],
            [
              'Ninja Box',
              'Pricing',
              'Apps',
              'Marketing Studio',
              'Cinema Studio',
              'Originals',
              'Community',
              'Enterprise',
              'Blog',
            ],
          ].map(([title, ...links]) => (
            <div key={title}>
              <h3 className="mb-3 text-sm font-black">{title}</h3>
              <div className="space-y-2">
                {links.map((item) => (
                  <Link
                    key={item}
                    href="/apps"
                    className="block text-sm text-white/45 hover:text-white"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </footer>
    </main>
  )
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#0f1113]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1380px] items-center gap-2 px-3 sm:px-5">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark />
          <span className="text-lg font-black">Ninja Box</span>
        </Link>
        <nav className="ml-2 hidden min-w-0 flex-1 items-center gap-0.5 overflow-hidden lg:flex">
          {['Explore', 'Image', 'Video', 'Audio', 'Collab', 'Edit', 'Character'].map(
            (item, index) => (
              <Link
                key={item}
                href={index === 0 ? '/' : '/apps'}
                className="rounded-xl px-2.5 py-2 text-[13px] font-black text-white/68 hover:bg-white/[0.06] hover:text-white"
              >
                {item}
              </Link>
            )
          )}
          <Link
            href="/studio"
            className="flex rounded-xl px-2.5 py-2 text-[13px] font-black leading-tight text-white/68 hover:bg-white/[0.06]"
          >
            Marketing Studio
            <span className="ml-1 rounded bg-[#d1fe17] px-1 text-[9px] font-black text-black">
              New
            </span>
          </Link>
          <Link
            href="/studio"
            className="flex rounded-xl px-2.5 py-2 text-[13px] font-black leading-tight text-white/68 hover:bg-white/[0.06]"
          >
            Cinema Studio
            <span className="ml-1 rounded bg-[#d1fe17] px-1 text-[9px] font-black text-black">
              3.5
            </span>
          </Link>
          <Link
            href="/originals"
            className="rounded-xl px-2.5 py-2 text-[13px] font-black text-white/68 hover:bg-white/[0.06]"
          >
            Originals
          </Link>
          <Link
            href="/apps"
            className="rounded-xl px-2.5 py-2 text-[13px] font-black text-white/68 hover:bg-white/[0.06]"
          >
            Apps
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl px-2.5 py-2 text-[13px] font-black text-white/68 hover:bg-white/[0.06]"
          >
            Assist
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl px-2.5 py-2 text-[13px] font-black text-white/68 hover:bg-white/[0.06]"
          >
            Community
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/billing"
            className="relative flex h-10 items-center gap-2 rounded-xl bg-white/[0.08] px-3 text-sm font-black text-white"
          >
            <Gem className="h-4 w-4" />
            <span>Pricing</span>
            <span className="absolute -bottom-4 left-3 rounded-full bg-[#ff005b] px-3 py-0.5 text-[10px] font-black text-white">
              30% OFF
            </span>
          </Link>
          <Link
            href="https://www.instagram.com"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.1] text-white/70"
          >
            <Instagram className="h-5 w-5" />
          </Link>
          <Link
            href="/signup"
            className="hidden h-10 items-center rounded-xl bg-white px-4 text-sm font-black text-black sm:flex"
          >
            Try Free
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white lg:hidden"
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </div>
    </header>
  )
}

function LogoMark() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
      <Wand2 className="h-5 w-5" />
    </div>
  )
}

function FeatureBlock({
  eyebrow,
  title,
  description,
  button,
  viewAll,
  variant,
  images,
  panelImage,
}: {
  eyebrow: string
  title: string
  description: string
  button: string
  viewAll?: string
  variant: 'dark' | 'pink' | 'blue'
  images: string[]
  panelImage?: string
}) {
  const panel =
    variant === 'pink'
      ? 'from-[#280013] via-[#140b12] to-[#111214] border-[#ff005b]/30'
      : variant === 'blue'
        ? 'from-[#081a2a] via-[#101820] to-[#111214] border-[#2fc7ff]/20'
        : 'from-[#050505] via-[#101010] to-[#111214] border-white/[0.08]'

  return (
    <div
      className={`grid overflow-hidden rounded-3xl border bg-gradient-to-br ${panel} lg:grid-cols-[.72fr_1.28fr]`}
    >
      <div className="relative flex min-h-[360px] flex-col items-center justify-start overflow-hidden px-8 pb-8 pt-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,rgba(255,255,255,.12),transparent_42%)]" />
        {panelImage && (
          <img
            src={panelImage}
            alt=""
            className="absolute inset-x-0 bottom-0 mx-auto h-52 max-w-[82%] rounded-2xl object-cover opacity-70"
          />
        )}
        {eyebrow && (
          <p className="relative mb-8 text-xs font-black uppercase tracking-[.32em] text-white/34">
            {eyebrow}
          </p>
        )}
        <h2 className="relative max-w-sm text-3xl font-black tracking-[-.04em] text-white md:text-4xl">
          {title}
        </h2>
        <p className="relative mt-3 max-w-xs text-base font-medium leading-7 text-white/45">
          {description}
        </p>
        <Link
          href="/signup"
          className="relative mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-black text-black"
        >
          <Sparkles className="h-4 w-4" />
          {button}
        </Link>
      </div>
      <div className="relative grid min-h-[360px] grid-cols-2 gap-1 p-1 sm:grid-cols-3">
        {images.slice(0, 6).map((src, index) => (
          <div
            key={src}
            className={`${index === 0 ? 'row-span-2' : ''} relative min-h-[160px] overflow-hidden rounded-2xl bg-[#1c1e20]`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
        ))}
        {viewAll && (
          <Link
            href="/apps"
            className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-xl bg-[#54700d]/95 px-5 py-3 text-sm font-black text-[#d1fe17] shadow-2xl"
          >
            {viewAll} <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  )
}

function PosterCard({
  title,
  subtitle,
  image,
  cta,
}: { title: string; subtitle: string; image: string; cta: string }) {
  return (
    <article className="relative min-h-[520px] overflow-hidden rounded-3xl border border-white/[0.08] bg-[#14151a]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
      <div className="relative flex h-full min-h-[520px] flex-col justify-end p-7">
        <h2 className="max-w-xl text-5xl font-black uppercase leading-[.9] tracking-[-.06em] text-white md:text-7xl">
          {title}
        </h2>
        <p className="mt-3 text-base font-bold text-white/55">{subtitle}</p>
        <Link
          href="/apps"
          className="mt-6 inline-flex h-12 w-fit items-center gap-2 rounded-xl bg-white px-5 text-sm font-black text-black"
        >
          {cta} <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}
