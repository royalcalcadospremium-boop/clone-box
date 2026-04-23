# CloneBox — Progress Tracker

> Atualizado ao final de cada sessão de trabalho.
> Status: ✅ Concluído | 🔄 Em andamento | ⏳ Pendente | ❌ Bloqueado

---

## FASE 0 — Setup e decisões (Dia 1)

| Item | Status | Notas |
|---|---|---|
| Ler PROMPT-MESTRE.md completo | ✅ | — |
| Criar PROGRESS.md | ✅ | Este arquivo |
| Definir nome do produto | ✅ | **CloneBox** |
| Definir domínio | ✅ | clonebox.com.br |
| Definir paleta de cores | ✅ | Bold/Agressivo: preto + laranja neon + vermelho |
| Definir política de trial | ✅ | 100 créditos + 7 dias de prazo |
| Definir política de reembolso | ✅ | 7 dias |
| Criar estrutura de pastas | ✅ | Ver `src/` |
| Criar package.json | ✅ | Next.js 15, TypeScript, todas as deps |
| Criar tsconfig.json (strict) | ✅ | strict: true habilitado |
| Criar biome.json | ✅ | Linter + formatter |
| Criar tailwind.config.ts | ✅ | Paleta CloneBox + shadcn/ui |
| Criar drizzle.config.ts | ✅ | Apontando pra DATABASE_URL |
| Criar .env.local.example | ✅ | Todas as vars documentadas |
| Criar .gitignore | ✅ | Inclui .env*.local |
| Criar ADR-001-stack-choice.md | ✅ | Em docs/decisions/ |
| Criar schema do banco (Drizzle) | ✅ | src/server/db/schema.ts |
| Criar estrutura base Next.js | ✅ | app/, components/, lib/ completos |
| Criar runbooks em docs/runbooks/ | ✅ | handle-byteplus-outage, reconcile-credits, refund-subscription |
| Inicializar Git + GitHub | ⏳ | **Requer Node.js instalado** |
| Criar projetos: Supabase | ⏳ | **Requer Fellipe** |
| Criar projetos: Vercel | ⏳ | **Requer Fellipe** |
| Criar projetos: Inngest | ⏳ | **Requer Fellipe** |
| Criar projetos: Stripe | ⏳ | **Requer Fellipe** |
| Criar projetos: Pagar.me | ⏳ | **Requer Fellipe** |
| Criar projetos: BytePlus | ⏳ | **Requer Fellipe** |
| Criar projetos: Anthropic | ⏳ | **Requer Fellipe** |
| Fellipe preenche .env.local | ⏳ | **Requer Fellipe** |

---

## FASE 1 — Fundação técnica (Semana 1-2)

| Item | Status | Notas |
|---|---|---|
| Setup Next.js 15 + TypeScript strict + Biome | ✅ | Configurado |
| Setup TailwindCSS + shadcn/ui | ✅ | Paleta CloneBox configurada |
| Setup Drizzle ORM + migrar schema | ✅ | 8 tabelas + índices em schema.ts |
| Setup Supabase Auth (email + Google OAuth) | ✅ | client/server/admin configurados |
| RLS policies em todas as tabelas | ✅ | migrations/001_initial_schema.sql |
| Layout base: landing page + /app protegido | ✅ | (marketing) + (dashboard) layout |
| Deploy preview no Vercel funcionando | ⏳ | **Requer Fellipe: npm install + Vercel** |

---

## FASE 2 — Landing page + signup (Semana 2-3)

| Item | Status | Notas |
|---|---|---|
| Landing page (headline, features, pricing, FAQ) | ✅ | (marketing)/page.tsx |
| Signup flow (email/password + Google) | ✅ | (auth)/signup + login + recuperar-senha + nova-senha |
| Email de confirmação via Resend | ⏳ | **Requer: RESEND_API_KEY no .env.local** |
| Onboarding em 4 telas | ✅ | (dashboard)/onboarding/page.tsx |
| 100 créditos creditados no signup | ✅ | Trigger SQL handle_new_user() |
| Dashboard home vazio com saldo visível | ✅ | (dashboard)/page.tsx |

---

## FASE 3 — Módulo de clonagem MVP (Semana 4-5)

| Item | Status | Notas |
|---|---|---|
| Passo 1: Upload de vídeo | ✅ | StepUpload.tsx + /api/clone/download-url |
| Passo 2: Formulário de configuração | ✅ | StepConfig.tsx |
| Passo 3: Claude análise + geração de prompt | ✅ | StepPrompt.tsx + /api/clone/generate-prompt |
| Passo 4: BytePlus Seedance + polling assíncrono | ✅ | StepResult.tsx + Inngest jobs |
| Storage dos vídeos (Supabase/R2) | ✅ | migrations/002_storage_policies.sql |
| Biblioteca de vídeos | ✅ | (dashboard)/library/page.tsx |
| Sistema de créditos + transações atômicas | ✅ | lib/credits/ (charge, refund, balance) |

---

## FASE 4 — Monetização (Semana 6-7)

| Item | Status | Notas |
|---|---|---|
| Integração Stripe | ⏳ | — |
| Integração Pagar.me (PIX, boleto) | ⏳ | — |
| Webhook handlers | ⏳ | — |
| Página /billing | ⏳ | — |
| Pacotes avulsos de créditos | ⏳ | — |
| Cron de reset mensal de créditos | ⏳ | — |

---

## FASE 5 — Diferenciais (Semana 8-9)

| Item | Status | Notas |
|---|---|---|
| Pastas e organização | ⏳ | — |
| Templates salvos + galeria pública | ⏳ | — |
| Sistema referral | ⏳ | — |
| Notificações in-app + email | ⏳ | — |
| Times (plano Pro) | ⏳ | — |

---

## FASE 6 — Integrações (Semana 10-11)

| Item | Status | Notas |
|---|---|---|
| TikTok Shop OAuth + publicação | ⏳ | — |
| Shopee OAuth + publicação | ⏳ | — |
| Mercado Livre OAuth | ⏳ | — |
| Export ZIP Shopify | ⏳ | — |

---

## FASE 7 — Polimento e lançamento (Semana 12)

| Item | Status | Notas |
|---|---|---|
| PostHog configurado | ⏳ | — |
| Sentry com sourcemaps | ⏳ | — |
| Testes E2E críticos passando | ⏳ | — |
| Runbooks escritos | ⏳ | — |
| Domínio custom + DNS | ⏳ | — |
| Beta testers (10 da rede do Fellipe) | ⏳ | — |

---

## Sessão 2026-04-23 (Kimi Code)

**O que foi feito:**
- **Migração Anthropic Claude → Kimi API (Moonshot AI)**
  - Substituído `@anthropic-ai/sdk` por `openai` SDK apontando para `https://api.moonshot.ai/v1`
  - Novo cliente Kimi em `src/lib/ai/kimi/client.ts`
  - `video-analyzer.ts` adaptado para usar modelo `kimi-k2.5` com vision support via OpenAI-compatible format
  - Todos os imports atualizados: `anthropic/` → `kimi/`
  - Todos os textos de UI atualizados: "Claude" → "Kimi"
  - `.env.local.example` atualizado: `ANTHROPIC_API_KEY` → `KIMI_API_KEY`
  - Pasta `src/lib/ai/anthropic/` removida completamente
- **Build validado**: TypeScript passou sem erros, Next.js build gerou 30 páginas com sucesso
- **Design Higgsfield.ai**: Landing page e dashboard já alinhados com estilo dark/roxo/cards do Higgsfield

**Próximos passos:**
- Fase 4 — Monetização (Stripe webhooks, checkout, billing page)
- Fase 5 — Pastas, templates, referral, notificações
- Fase 6 — Integrações TikTok Shop, Shopee, Mercado Livre

---

## Sessão 2026-04-23

**O que foi feito:**
- `/api/clone/download-url` — rota de download de vídeos via yt-dlp (TikTok, Instagram, YouTube)
- `(dashboard)/library/page.tsx` — Biblioteca de vídeos com grid, status badges e stats
- `(dashboard)/onboarding/page.tsx` — Fluxo de onboarding em 4 telas (plataformas, volume, dores, empresa)
- `(auth)/recuperar-senha/page.tsx` — Página de recuperação de senha com Supabase
- `(auth)/nova-senha/page.tsx` — Página de redefinição de senha
- `(dashboard)/templates/page.tsx` — Galeria de templates (próprios + comunidade)
- `(dashboard)/integrations/page.tsx` — Página de integrações (TikTok Shop, Shopee, ML, Shopify)
- `(dashboard)/settings/page.tsx` — Configurações de perfil + link de referral
- `migrations/001_initial_schema.sql` — Schema completo, RLS policies, trigger de signup, updated_at, função reward_referral
- `migrations/002_storage_policies.sql` — Buckets + policies de storage do Supabase
- PROGRESS.md atualizado refletindo Fases 1, 2 e 3 como ✅

**Bloqueadores remanescentes (precisam de ação do Fellipe):**
1. Instalar Node.js 20 LTS e rodar `npm install` na pasta `clonebox/`
2. Criar projeto no Supabase e executar as migrations SQL (001 + 002)
3. Criar contas: BytePlus, Anthropic, Inngest, Stripe, Pagar.me, Resend, Upstash
4. Preencher `.env.local` com todas as credenciais reais
5. Criar projeto no Vercel e fazer o primeiro deploy

**Próximos passos (após desbloqueio):**
- Integração Stripe (Fase 4) — webhooks de assinatura, checkout session
- Integração Pagar.me (PIX/boleto) — Fase 4
- Cron job de reset mensal via Inngest (já implementado, só precisa do INNGEST_EVENT_KEY)
- Publicação TikTok Shop OAuth (Fase 6)

## Sessão 2026-04-20

**O que foi feito:**
- FASE 0 iniciada: decisões de produto definidas (nome, domínio, paleta, trial, reembolso)
- Estrutura completa de pastas criada
- package.json com todas as dependências
- Configs: tsconfig.json, next.config.mjs, biome.json, tailwind.config.ts, drizzle.config.ts
- .env.local.example com todas as variáveis documentadas
- .gitignore configurado
- ADR-001 criado
- Schema do banco Drizzle completo
- Estrutura base Next.js iniciada

**Bloqueadores:**
- Node.js não instalado na máquina → instalar antes da próxima sessão
- Contas externas (Supabase, Stripe, BytePlus, etc.) precisam ser criadas pelo Fellipe

**Próximos passos:**
1. Fellipe instala Node.js 20 LTS (nodejs.org)
2. Fellipe cria contas nas plataformas e preenche `.env.local`
3. Rodar `npm install` na pasta `clonebox/`
4. Continuar FASE 1: setup shadcn/ui, Auth, RLS
