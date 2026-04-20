# Runbook: Reconciliação de Créditos

## Quando usar
- Usuário reporta saldo incorreto
- Alerta: saldo de créditos ficou negativo (bug crítico)
- Discrepância entre `profiles.credits_balance` e soma de `credit_transactions`

## Query de diagnóstico
```sql
-- Verifica se o saldo bate com o histórico de transações
SELECT
  p.id,
  p.email,
  p.credits_balance AS saldo_atual,
  SUM(ct.amount) AS soma_transacoes,
  p.credits_balance - SUM(ct.amount) AS divergencia
FROM profiles p
LEFT JOIN credit_transactions ct ON ct.user_id = p.id
GROUP BY p.id, p.email, p.credits_balance
HAVING p.credits_balance != SUM(ct.amount);
```

## Correção manual
```sql
-- ATENÇÃO: Sempre criar uma transação de ajuste, nunca UPDATE direto no saldo
INSERT INTO credit_transactions (
  user_id, amount, type, balance_before, balance_after, description, metadata
) VALUES (
  'USER_UUID',
  DIFERENCA, -- positivo ou negativo
  'admin_adjustment',
  SALDO_ANTES,
  SALDO_DEPOIS,
  'Ajuste manual de reconciliação — [motivo]',
  '{"reconciled_by": "admin", "ticket": "TICKET_ID"}'
);

-- Depois, atualizar o saldo
UPDATE profiles
SET credits_balance = NOVO_SALDO, updated_at = NOW()
WHERE id = 'USER_UUID';
```

## Saldo negativo (bug crítico)
1. Alertar imediatamente via Slack #incidents
2. Identificar a transação que causou o negativo via `credit_transactions`
3. Corrigir o saldo com transação de ajuste
4. Investigar a race condition no código `lib/credits/charge.ts`
5. Escrever postmortem em `docs/incidents/`
