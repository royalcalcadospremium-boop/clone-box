# Runbook: BytePlus ModelArk Outage

## Sintomas
- Taxa de erro em `/api/clone/generate` > 10% em 15 minutos
- Jobs Inngest `generate-video` falhando com HTTP 5xx
- Alerta Sentry: `VideoGenerationFailedError` com provider=BytePlus

## Diagnóstico
1. Checar status da API BytePlus: https://status.byteplus.com
2. Testar endpoint manualmente:
   ```bash
   curl -X POST https://ark.ap-southeast.bytepluses.com/api/v3/videos/generations \
     -H "Authorization: Bearer $BYTEPLUS_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"model": "seedance-2-0-fast", "prompt": "test"}'
   ```
3. Checar logs Sentry filtrados por `VideoGenerationFailedError`
4. Checar painel Inngest: falhas recentes em `generate-video`

## Ação imediata
1. **Comunicar usuários**: banner no dashboard — "Geração de vídeo temporariamente indisponível. Seus créditos estão preservados."
2. **Suspender novos jobs**: adicionar feature flag `VIDEO_GENERATION_ENABLED=false` no `.env`
3. **Estornos automáticos**: o sistema já estorna 100% dos créditos em timeout/5xx. Confirmar que está funcionando via `credit_transactions` com `type = 'refund'`.

## Recovery
1. Quando BytePlus voltar, testar com job de smoke test (prompt simples, produto de teste)
2. Remover banner e feature flag
3. Comunicar usuários que o serviço voltou (email via Resend)
4. Documentar duração e impacto em `docs/incidents/YYYY-MM-DD-byteplus-outage.md`

## Contatos
- Suporte BytePlus: https://www.byteplus.com/en/contact
- Slack interno: #incidents
