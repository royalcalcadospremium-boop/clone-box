"use client";

import { useRef } from "react";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

type ToolCard = {
  title: string;
  subtitle: string;
  href: string;
  video: string;
  isNew?: boolean;
};

const tools: ToolCard[] = [
  {
    title: "Criar imagem",
    subtitle: "Gerar imagens com IA",
    href: "/ai/image?model=soul",
    video: "https://static.higgsfield.ai/explore/create-image.mp4",
  },
  {
    title: "Criar vídeo",
    subtitle: "Gere vídeos com IA",
    href: "/ai/video",
    video: "https://static.higgsfield.ai/explore/create-video.mp4",
  },
  {
    title: "Controle de movimento",
    subtitle: "Controle ações e expressões por até 30 segundos",
    href: "/kling-3-motion-control",
    video: "https://static.higgsfield.ai/kling-motion-control-square.mp4",
  },
  {
    title: "Alma 2.0",
    subtitle: "Visuais de moda ultrarrealistas",
    href: "/ai/image?model=soul-v2",
    video: "https://static.higgsfield.ai/soul2/soul2.mp4",
    isNew: true,
  },
  {
    title: "Identificação da Alma",
    subtitle: "Crie um personagem único",
    href: "/character",
    video: "https://static.higgsfield.ai/soul/soul-id.mp4",
  },
  {
    title: "Sofisticado",
    subtitle: "Melhore a qualidade da mídia",
    href: "/upscale",
    video: "https://static.higgsfield.ai/explore/upscale.mp4",
  },
  {
    title: "Editar imagem",
    subtitle: "Aplique pinceladas para editar imagens",
    href: "/edit?model=soul_inpaint",
    video: "https://static.higgsfield.ai/explore/Edit-image-video-inpaint.mp4",
  },
  {
    title: "Editar vídeo",
    subtitle: "Edição de vídeo avançada",
    href: "/ai/video/edit",
    video: "https://static.higgsfield.ai/explore/edit-video.mp4",
  },
  {
    title: "Explore todas as ferramentas",
    subtitle: "Veja a lista completa de recursos",
    href: "/apps",
    video: "https://static.higgsfield.ai/explore/create-video.mp4",
  },
];

function ToolTile({ tool }: { tool: ToolCard }) {
  return (
    <li className="grid w-[10.5rem] shrink-0 md:w-[12.5rem]">
      <Link
        href={tool.href}
        className="group/item block size-full rounded-2xl bg-gradient-to-br from-white/15 via-white/[0.035] to-white/15 p-px"
      >
        <div className="relative z-0 grid size-full grid-rows-[1fr_auto] rounded-2xl bg-[#111315] p-0.5 transition group-hover/item:bg-[#1c1e20] group-active/item:bg-[#17191b] md:p-1">
          <figure className="relative aspect-video overflow-hidden rounded-xl bg-black/40 md:aspect-square">
            <video
              loop
              muted
              autoPlay
              playsInline
              disablePictureInPicture
              preload="metadata"
              src={tool.video}
              aria-label={`${tool.title}: ${tool.subtitle}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </figure>
          {tool.isNew ? (
            <p className="absolute left-3 top-3 inline-block -skew-x-12 rounded-sm bg-hf-neon px-1.5 font-grotesk text-xs font-bold uppercase text-black">
              novo
            </p>
          ) : null}
          <div className="grid grid-cols-1 grid-rows-[auto_auto] p-2 text-left md:grid-rows-1 md:p-3">
            <div className="grid grid-cols-[1fr_auto] items-center gap-1">
              <p className="truncate text-sm font-semibold md:text-md">{tool.title}</p>
              <ArrowRight className="size-4 text-white/42 md:size-5" />
            </div>
            <p className="self-end truncate text-xs text-white/45 md:hidden">{tool.subtitle}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export function CreateTodayTools() {
  const railRef = useRef<HTMLUListElement>(null);

  function scrollForward() {
    railRef.current?.scrollBy({ left: 680, behavior: "smooth" });
  }

  return (
    <section className="group relative mb-6 overflow-hidden rounded-[20px] bg-[#111415] shadow-[0_10px_30px_rgba(0,0,0,0.22)] md:rounded-3xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(20,95,82,0.42),transparent_34%),linear-gradient(90deg,rgba(18,21,22,0.96)_0%,rgba(18,21,22,0.94)_42%,rgba(20,23,24,0.9)_100%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/[0.04]" />
      <div className="relative z-10 flex min-h-[304px] flex-col md:flex-row">
        <header className="flex w-full shrink-0 flex-col items-start justify-between gap-6 px-4 pb-3 pt-5 md:w-[360px] md:p-8 lg:w-[370px]">
          <div>
            <h2 className="mb-1 font-grotesk text-xl font-bold uppercase leading-[1.05] tracking-normal md:mb-3 md:text-4xl">
              O que você vai
              <br className="hidden md:block" />
              <span className="text-hf-neon"> criar hoje?</span>
            </h2>
            <p className="hidden max-w-[300px] text-sm leading-6 text-white/60 md:block md:text-md">
              Crie imagens e vídeos autênticos com textura natural e estilo descomplicado.
            </p>
          </div>
          <Link
            href="/apps"
            className="hidden h-14 grid-flow-col-dense items-center gap-2 rounded-xl bg-[radial-gradient(circle_at_42%_42%,#EFFE17_0%,#D1FE17_42%,#B4E000_100%)] px-6 pb-0.5 text-md font-semibold text-black shadow-[inset_0px_-3px_rgba(0,0,0,0.43)] transition hover:opacity-80 active:opacity-60 md:grid"
          >
            Explore todas as ferramentas
            <Sparkles className="size-5" />
          </Link>
        </header>

        <div className="relative min-w-0 flex-1 py-3 md:py-7">
          <div className="hide-scrollbar min-w-0 overflow-x-auto md:rounded-l-2xl">
            <ul
              ref={railRef}
              className="grid w-full min-w-0 grid-flow-col-dense gap-3 overflow-x-auto px-4 md:gap-5 md:pl-0"
            >
              {tools.map((tool) => (
                <ToolTile key={tool.title} tool={tool} />
              ))}
              <li className="w-px shrink-0" />
            </ul>
          </div>
          <button
            type="button"
            aria-label="Avancar ferramentas"
            onClick={scrollForward}
            className="absolute right-1 top-[calc(50%-1.5rem)] z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/[0.08] text-white/80 opacity-0 backdrop-blur-2xl transition hover:bg-white/[0.14] group-hover:opacity-100 lg:grid"
          >
            <ChevronRight className="size-9" />
          </button>
        </div>
      </div>
    </section>
  );
}
