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
| Criar estrutura base Next.js | 🔄 | app/, components/, lib/ |
| Criar runbooks em docs/runbooks/ | ⏳ | — |
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
| Setup Next.js 15 + TypeScript strict + Biome | ⏳ | — |
| Setup TailwindCSS + shadcn/ui | ⏳ | — |
| Setup Drizzle ORM + migrar schema | ⏳ | — |
| Setup Supabase Auth (email + Google OAuth) | ⏳ | — |
| RLS policies em todas as tabelas | ⏳ | — |
| Layout base: landing page + /app protegido | ⏳ | — |
| Deploy preview no Vercel funcionando | ⏳ | — |

---

## FASE 2 — Landing page + signup (Semana 2-3)

| Item | Status | Notas |
|---|---|---|
| Landing page (headline, features, pricing, FAQ) | ⏳ | — |
| Signup flow (email/password + Google) | ⏳ | — |
| Email de confirmação via Resend | ⏳ | — |
| Onboarding em 4 telas | ⏳ | — |
| 100 créditos creditados no signup | ⏳ | — |
| Dashboard home vazio com saldo visível | ⏳ | — |

---

## FASE 3 — Módulo de clonagem MVP (Semana 4-5)

| Item | Status | Notas |
|---|---|---|
| Passo 1: Upload de vídeo | ⏳ | — |
| Passo 2: Formulário de configuração | ⏳ | — |
| Passo 3: Claude análise + geração de prompt | ⏳ | — |
| Passo 4: BytePlus Seedance + polling assíncrono | ⏳ | — |
| Storage dos vídeos (Cloudflare R2) | ⏳ | — |
| Biblioteca de vídeos | ⏳ | — |
| Sistema de créditos + transações atômicas | ⏳ | — |

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
