# CloneBox

SaaS B2B para lojistas brasileiros clonarem vídeos virais com IA.

## Pré-requisitos

- Node.js 20 LTS (https://nodejs.org)
- Conta Supabase, Vercel, Inngest, Stripe, Pagar.me, BytePlus, Anthropic

## Setup local

```bash
# 1. Instalar dependências
npm install

# 2. Copiar template de variáveis
cp .env.local.example .env.local
# Editar .env.local com suas chaves reais

# 3. Subir o banco (precisa do Supabase configurado)
npm run db:push

# 4. Rodar em dev
npm run dev
```

## Estrutura

```
src/
├── app/               # Next.js App Router
├── components/        # Componentes React
├── lib/               # Lógica de negócio e integrações
├── server/            # DB, Inngest functions, Server Actions
├── hooks/             # React hooks
├── types/             # TypeScript types
└── tests/             # Vitest + Playwright
```

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Dev server com Turbopack |
| `npm run build` | Build de produção |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | Biome linter |
| `npm run test` | Testes unitários (Vitest) |
| `npm run test:e2e` | Testes E2E (Playwright) |
| `npm run db:studio` | Drizzle Studio (UI do banco) |
| `npm run db:migrate` | Rodar migrations |
| `npm run inngest:dev` | Dev server do Inngest |

## Documentação

- [ADR-001 — Escolha de Stack](docs/decisions/ADR-001-stack-choice.md)
- [Runbook: BytePlus Outage](docs/runbooks/handle-byteplus-outage.md)
- [Runbook: Reconciliação de Créditos](docs/runbooks/reconcile-credits.md)
- [Runbook: Reembolso](docs/runbooks/refund-subscription.md)
- [PROGRESS.md](PROGRESS.md)
