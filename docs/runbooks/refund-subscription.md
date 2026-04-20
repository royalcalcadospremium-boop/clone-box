# Runbook: Reembolso de Assinatura

## Política
- Prazo: 7 dias a partir da data de cobrança
- Reembolso total para cancelamentos dentro do prazo
- Fora do prazo: avaliar caso a caso

## Processo Stripe
```bash
# Listar cobranças do usuário
stripe charges list --customer=cus_XXXXX

# Criar reembolso
stripe refunds create --charge=ch_XXXXX
```

## Processo Pagar.me
1. Acessar dashboard.pagar.me
2. Localizar transação pelo email do cliente
3. Clicar em "Estornar"
4. Confirmar o valor total

## Pós-reembolso
```sql
-- Cancelar a assinatura no banco
UPDATE subscriptions
SET status = 'canceled', canceled_at = NOW(), cancel_at_period_end = false
WHERE user_id = 'USER_UUID' AND status = 'active';

-- Reverter o plano do usuário
UPDATE profiles
SET plan = 'free', plan_status = 'canceled', credits_monthly_quota = 0
WHERE id = 'USER_UUID';

-- Zerar créditos mensais (não os bônus de pacotes avulsos)
UPDATE profiles
SET credits_balance = 0
WHERE id = 'USER_UUID';

-- Registrar o estorno de créditos
INSERT INTO credit_transactions (user_id, amount, type, balance_before, balance_after, description)
VALUES ('USER_UUID', -CREDITOS_USADOS, 'admin_adjustment', SALDO_ATUAL, 0,
        'Reembolso de assinatura — downgrade para free');
```

## Email ao cliente
Enviar via Resend confirmando:
- Valor reembolsado
- Prazo de 5-10 dias úteis para crédito no cartão
- Acesso continua até fim do período (se aplicável)
