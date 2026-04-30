"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

interface ToolCard {
  name: string;
  description: string;
  video: string;
  href: string;
  badge?: string;
}

const tools: ToolCard[] = [
  {
    name: "Nano Banana Pro",
    description: "O melhor modelo de imagem 4K de todos os tempos",
    video: "https://static.higgsfield.ai/explore/nano-banana-pro-2.mp4",
    href: "/nano-banana-pro",
  },
  {
    name: "Controle de movimento",
    description: "Controle preciso das ações e expressões do personagem por até 30 segundos.",
    video: "https://static.higgsfield.ai/kling-motion-control-square.mp4",
    href: "/kling-3-motion-control",
  },
  {
    name: "Melhorador de Pele",
    description: "Texturas de pele naturais e realistas",
    video: "https://cdn.higgsfield.ai/application_main/fb84f803-64b0-4259-b9a3-b2fc57073da4.mp4",
    href: "/app/skin-enhancer",
    badge: "Pró",
  },
  {
    name: "Tiros",
    description: "9 fotos exclusivas de uma única imagem",
    video: "https://cdn.higgsfield.ai/application_main/3ca44a57-7d68-4956-9ae9-d05dd6d233b7.mp4",
    href: "/app/shots",
  },
  {
    name: "Ângulos 2.0",
    description: "Gere qualquer ângulo de visão para qualquer imagem em segundos.",
    video: "https://cdn.higgsfield.ai/application_main/29dc499c-84a0-43c3-8c6b-1e278a6cc474.mp4",
    href: "/app/angles",
    badge: "Pró",
  },
  {
    name: "Kling 3.0",
    description: "Vídeos de 15 segundos com consistência de personagens",
    video: "https://static.higgsfield.ai/kling-3/kling-3.mp4",
    href: "/kling-3",
  },
  {
    name: "Seedream 5.0 Lite",
    description: "Raciocínio visual inteligente",
    video: "https://static.higgsfield.ai/seedream-5-lite/seedream-5-lite.mp4",
    href: "/seedream-5",
  },
  {
    name: "Painel de inspiração da alma",
    description: "Defina seu estilo com imagens de referência.",
    video: "https://static.higgsfield.ai/Banner_notext_moodboard_paywall.mp4",
    href: "/moodboard",
  },
];

export function TopChoice() {
  const railRef = useRef<HTMLDivElement>(null);

  function scrollForward() {
    railRef.current?.scrollBy({ left: 528, behavior: "smooth" });
  }

  return (
    <section className="group relative mb-8 md:mb-16">
      <header className="mb-5 grid grid-cols-[1fr_auto] items-end gap-6 px-1 md:px-4">
        <div className="grid min-w-0 grid-rows-[auto_auto] gap-1">
          <h2 className="font-grotesk text-[26px] font-bold uppercase leading-none text-white md:text-[30px]">
            Melhor escolha
          </h2>
          <p className="truncate self-end text-sm text-white/58">
            Ferramentas recomendadas pelo criador, feitas sob medida para você.
          </p>
        </div>
        <Link
          href="/apps"
          className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.02] px-4 text-sm font-bold text-white transition hover:bg-white/[0.07] md:h-12 md:px-5"
        >
          Veja tudo
          <ChevronRight className="size-4" />
        </Link>
      </header>

      <div className="relative">
        <div
          ref={railRef}
          className="hide-scrollbar min-w-0 overflow-x-auto px-1 scroll-smooth md:px-4"
        >
          <ul className="grid grid-flow-col auto-cols-[15rem] gap-3 md:auto-cols-[15rem] md:gap-6">
            {tools.map((tool) => (
              <li key={tool.name} className="min-w-0">
                <Link
                  href={tool.href}
                  className="grid grid-rows-[auto_1fr] items-start gap-1 rounded-2xl border border-white/[0.08] bg-[#111315] p-1 transition hover:bg-[#1c1e20] active:bg-[#17191b]"
                >
                  <figure className="relative aspect-square overflow-hidden rounded-xl bg-black">
                    <video
                      loop
                      muted
                      autoPlay
                      playsInline
                      disablePictureInPicture
                      preload="metadata"
                      src={tool.video}
                      aria-label={tool.name}
                      className="size-full object-cover"
                    >
                      Seu navegador não é compatível com o vídeo.
                    </video>
                    {tool.badge ? (
                      <p className="absolute left-3 top-3 inline-block -skew-x-12 rounded-sm bg-[#9D4EDD] px-1.5 font-grotesk text-xs font-bold uppercase text-white">
                        {tool.badge}
                      </p>
                    ) : null}
                  </figure>
                  <div className="grid grid-rows-[auto_auto] p-2">
                    <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                      <p className="truncate text-[19px] font-semibold leading-tight text-white">
                        {tool.name}
                      </p>
                      <ChevronRight className="hidden size-5 text-white/42 md:block" />
                    </div>
                    <p className="truncate text-sm text-white/50">{tool.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="pointer-events-none absolute -right-px top-0 hidden h-full w-36 bg-gradient-to-l from-[#0f1113] to-transparent opacity-100 2xl:block" />
        <button
          type="button"
          aria-label="Próximas ferramentas"
          onClick={scrollForward}
          className="absolute right-1 top-[calc(50%-2rem)] z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/75 text-black opacity-0 backdrop-blur-2xl transition hover:bg-white group-hover:opacity-100 lg:grid"
        >
          <ChevronRight className="size-9" />
        </button>
      </div>
    </section>
  );
}
