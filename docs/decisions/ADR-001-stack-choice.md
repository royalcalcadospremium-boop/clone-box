# ADR-001 — Escolha de Stack Técnica

**Data:** 2026-04-20
**Status:** Aceito
**Decisor:** Fellipe (fundador) + Claude Code (CTO técnico)

---

## Contexto

Ninja Box é um SaaS B2B para lojistas brasileiros que precisam de vídeos UGC virais com IA. O produto precisa:
- Processar vídeos de forma assíncrona (60–120s por geração)
- Gerenciar sistema de créditos com alta integridade transacional
- Suportar pagamentos via PIX, boleto e cartão (mercado BR)
- Ser lançado em 12 semanas por um time enxuto
- Ter custo de infra baixo no início (foco em ROI rápido)

---

## Decisões e Justificativas

### Frontend: Next.js 15 (App Router)

**Decisão:** Next.js 15 com App Router e Server Components.

**Por quê:**
- Server Components reduzem JS enviado ao cliente (performance em dispositivos mobile BR)
- App Router permite layouts aninhados sem re-render, ideal pro dashboard multi-passo
- Integração nativa com Vercel (deploy zero-config)
- TypeScript first class
- Comunidade maior que Remix, Nuxt, ou SvelteKit para contratação futura

**Alternativas descartadas:**
- Remix: menos maduro no ecossistema, menos componentes shadcn prontos
- SvelteKit: menor comunidade, contratação mais difícil no Brasil

---

### Backend: Next.js API Routes (Route Handlers)

**Decisão:** Sem backend separado. API Routes do Next.js.

**Por quê:**
- Elimina complexidade de infra separada no MVP
- Server Actions simplificam mutações (sem API Layer para operações simples)
- Fácil escalar para microserviços depois se necessário

**Alternativas descartadas:**
- FastAPI (Python): segunda linguagem, complexidade de deploy
- Express separado: overhead de infra desnecessário no MVP

---

### Banco de dados: Supabase (Postgres) + Drizzle ORM

**Decisão:** Supabase como BaaS com Drizzle como ORM type-safe.

**Por quê:**
- Supabase oferece Postgres + Auth + Storage + Realtime em um único produto
- RLS nativo do Postgres é a camada de segurança mais robusta para dados multi-tenant
- Drizzle é type-safe sem geração de código, migrations explícitas, queries legíveis
- Realtime do Supabase resolve o polling de status de geração de vídeo sem WebSockets customizados
- Tier gratuito generoso para early stage

**Alternativas descartadas:**
- PlanetScale: sem suporte a RLS, sem Realtime, mais caro
- Prisma: geração de código, migrations mais pesadas, menos performático
- Firebase: sem SQL, difícil auditoria financeira, sem RLS

---

### Jobs assíncronos: Inngest

**Decisão:** Inngest para workflows assíncronos (geração de vídeo, polling BytePlus, reset de créditos).

**Por quê:**
- Geração de vídeo leva 60–120s — precisa de job fora do ciclo de request/response
- Inngest tem retry automático, backoff exponencial, e observabilidade embutida
- Deploy junto com Next.js no Vercel sem infraestrutura adicional
- Tier gratuito cobre 50k runs/mês

**Alternativas descartadas:**
- BullMQ: requer Redis self-hosted, mais complexidade operacional
- AWS Lambda + SQS: complexidade de infra, custo de setup
- Vercel Cron: não suporta workflows encadeados

---

### Rate Limiting: Upstash Redis

**Decisão:** Upstash Redis serverless para rate limiting.

**Por quê:**
- Serverless (sem servidor Redis pra gerenciar)
- `@upstash/ratelimit` funciona nativamente em Edge Functions e API Routes
- Preço por request (escala bem no início)

---

### APIs de IA

| API | Uso | Custo estimado |
|---|---|---|
| BytePlus ModelArk (Seedance 2.0 Fast) | Geração de vídeo | ~$0.022/s |
| BytePlus ModelArk (Nano Banana 2) | Geração de imagem fundo branco | ~$0.019/imagem |
| Anthropic Claude Sonnet 4.6 | Análise de vídeo + geração de prompt | ~$0.003/1k tokens |
| fal.ai (Whisper large-v3) | Transcrição de áudio | ~$0.006/min |

**Por quê BytePlus sobre Runway/Kling/Sora:**
- Seedance 2.0 Fast é o melhor custo-benefício para vídeo UGC curto (5-10s)
- API estável com SLA comercial
- Image-to-video nativo (essencial para o produto)

**Por quê Claude sobre GPT-4o:**
- Anthropic API com prompt caching reduz custos em ~80% para análises repetitivas
- Claude tem melhor compreensão de contexto cultural BR para geração de scripts

---

### Pagamentos: Stripe + Pagar.me

**Decisão:** Dual provider — Stripe para internacional, Pagar.me para BR.

**Por quê:**
- Pagar.me é essencial: PIX e boleto são >60% dos pagamentos de e-commerce BR
- Stripe é o padrão para cartão internacional e gestão de assinaturas
- Separar por provider permite fallback se um cair

**Alternativas descartadas:**
- Apenas Stripe: não suporta PIX nativamente no Brasil
- Apenas Pagar.me: experiência de assinatura inferior, menos documentação
- Hotmart: take rate alto (9.9%), menos controle sobre dados

---

### Storage: Cloudflare R2

**Decisão:** Cloudflare R2 para vídeos gerados, Supabase Storage para uploads de usuário.

**Por quê:**
- R2: zero egress fees (crítico — vídeos são grandes e trafegam muito)
- Supabase Storage: integrado com Auth e RLS para uploads temporários
- Separar entrada (Supabase) de saída (R2) otimiza custo

---

### Deploy: Vercel

**Decisão:** Vercel para frontend + API Routes.

**Por quê:**
- Zero-config com Next.js
- Preview URLs por PR (essencial para review de UI)
- Edge Functions para rate limiting
- Tier Hobby é gratuito para começar

---

### Monitoramento

| Ferramenta | Uso |
|---|---|
| Sentry | Error tracking + alertas críticos |
| PostHog | Analytics de produto (funil, churn, MRR) |
| Plausible | Analytics da landing page (GDPR-friendly, sem cookie banner) |

---

## Consequências

**Positivas:**
- Stack toda TypeScript (menos context switch)
- Infraestrutura gerenciada (menos ops no MVP)
- Todos os serviços têm tiers gratuitos generosos

**Riscos:**
- BytePlus: provedor menos conhecido no mercado BR. Mitigação: runbook de outage em `docs/runbooks/handle-byteplus-outage.md`
- Dual payment provider: mais código de webhook para manter. Mitigação: abstração `lib/payments/` unificada
- Inngest vendor lock-in: Mitigação: interface agnóstica de jobs, Inngest pode ser substituído por BullMQ

---

*Decisão tomada por: Fellipe + Claude Code — 2026-04-20*
