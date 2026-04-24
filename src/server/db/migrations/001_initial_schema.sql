-- ============================================================
-- Ninja Box — Migração Inicial
-- Execute no Supabase SQL Editor
-- ============================================================

-- ============================================================
-- EXTENSÕES
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABELAS
-- ============================================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  cpf_cnpj TEXT,
  avatar_url TEXT,

  -- Plano
  plan TEXT NOT NULL DEFAULT 'free',
  plan_status TEXT NOT NULL DEFAULT 'trial',
  trial_ends_at TIMESTAMPTZ,

  -- Créditos
  credits_balance INTEGER NOT NULL DEFAULT 100,
  credits_monthly_quota INTEGER NOT NULL DEFAULT 0,
  credits_reset_date TIMESTAMPTZ,
  credits_bonus_balance INTEGER NOT NULL DEFAULT 0,
  credits_bonus_expire_at TIMESTAMPTZ,

  -- Pagamentos
  stripe_customer_id TEXT UNIQUE,
  pagarme_customer_id TEXT UNIQUE,
  preferred_payment_provider TEXT,

  -- Referral
  referral_code TEXT NOT NULL UNIQUE DEFAULT gen_random_uuid()::TEXT,
  referred_by UUID,

  -- Onboarding
  onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
  onboarding_data JSONB,

  -- Metadados
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_active_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS profiles_referred_by_idx ON profiles(referred_by);
CREATE INDEX IF NOT EXISTS profiles_plan_idx ON profiles(plan);

-- ============================================================

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  plan TEXT NOT NULL,
  status TEXT NOT NULL,

  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  canceled_at TIMESTAMPTZ,

  provider TEXT NOT NULL,
  provider_subscription_id TEXT NOT NULL,

  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'BRL',

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS subscriptions_user_idx ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS subscriptions_status_idx ON subscriptions(status);
CREATE UNIQUE INDEX IF NOT EXISTS subscriptions_provider_idx ON subscriptions(provider, provider_subscription_id);

-- ============================================================

CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  amount INTEGER NOT NULL,
  type TEXT NOT NULL,

  reference_id UUID,
  reference_type TEXT,

  balance_before INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,

  description TEXT NOT NULL,
  metadata JSONB,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS credit_tx_user_idx ON credit_transactions(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS credit_tx_type_idx ON credit_transactions(type);
CREATE INDEX IF NOT EXISTS credit_tx_ref_idx ON credit_transactions(reference_type, reference_id);

-- ============================================================

CREATE TABLE IF NOT EXISTS folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'blue',
  icon TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================

CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  folder_id UUID REFERENCES folders(id) ON DELETE SET NULL,

  reference_video_url TEXT,
  reference_video_source_url TEXT,
  reference_video_analysis JSONB,

  product_image_url TEXT,
  product_description TEXT,

  style TEXT NOT NULL DEFAULT 'ugc-selfie',
  duration INTEGER NOT NULL DEFAULT 5,
  resolution TEXT NOT NULL DEFAULT '720p',
  aspect_ratio TEXT NOT NULL DEFAULT '9:16',
  camera_movement TEXT,
  language TEXT NOT NULL DEFAULT 'pt-BR',
  music TEXT,

  prompt_generated TEXT,
  prompt_edited TEXT,
  prompt_final TEXT,

  byteplus_job_id TEXT,
  byteplus_response JSONB,

  status TEXT NOT NULL DEFAULT 'draft',

  output_video_url TEXT,
  thumbnail_url TEXT,

  credits_spent INTEGER NOT NULL DEFAULT 0,
  credits_breakdown JSONB,

  error_code TEXT,
  error_message TEXT,

  published_to JSONB,

  generation_started_at TIMESTAMPTZ,
  generation_completed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS videos_user_idx ON videos(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS videos_status_idx ON videos(status);
CREATE INDEX IF NOT EXISTS videos_folder_idx ON videos(folder_id);

-- ============================================================

CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,

  source_video_id UUID REFERENCES videos(id) ON DELETE SET NULL,
  config JSONB NOT NULL,
  prompt_template TEXT,

  thumbnail_url TEXT,
  preview_video_url TEXT,

  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  times_used INTEGER NOT NULL DEFAULT 0,
  category TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS templates_user_idx ON templates(user_id);
CREATE INDEX IF NOT EXISTS templates_public_idx ON templates(is_public, category);

-- ============================================================

CREATE TABLE IF NOT EXISTS integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  platform TEXT NOT NULL,

  access_token_encrypted TEXT,
  refresh_token_encrypted TEXT,
  token_expires_at TIMESTAMPTZ,

  shop_id TEXT,
  shop_name TEXT,
  shop_avatar_url TEXT,

  status TEXT NOT NULL DEFAULT 'active',

  last_publish_at TIMESTAMPTZ,
  publish_count INTEGER NOT NULL DEFAULT 0,

  connected_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS integrations_user_platform_idx ON integrations(user_id, platform, shop_id);

-- ============================================================

CREATE TABLE IF NOT EXISTS api_usage_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  video_id UUID REFERENCES videos(id) ON DELETE SET NULL,

  provider TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  model TEXT,

  input_tokens INTEGER,
  output_tokens INTEGER,
  duration_seconds NUMERIC(10, 3),

  cost_usd NUMERIC(10, 6) NOT NULL,
  cost_brl NUMERIC(10, 4) NOT NULL,

  http_status INTEGER NOT NULL,
  response_time_ms INTEGER,

  request_id TEXT,
  error TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS api_usage_user_idx ON api_usage_log(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS api_usage_provider_idx ON api_usage_log(provider, created_at DESC);
CREATE INDEX IF NOT EXISTS api_usage_video_idx ON api_usage_log(video_id);

-- ============================================================

CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  status TEXT NOT NULL DEFAULT 'pending',

  referrer_bonus_credits INTEGER NOT NULL DEFAULT 100,
  referred_bonus_credits INTEGER NOT NULL DEFAULT 50,

  rewarded_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS referrals_referrer_idx ON referrals(referrer_id);
CREATE UNIQUE INDEX IF NOT EXISTS referrals_referred_idx ON referrals(referred_id);

-- ============================================================
-- RLS — ROW LEVEL SECURITY
-- ============================================================

-- profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- subscriptions
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "subscriptions_select_own" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- credit_transactions — somente leitura para o usuário
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "credit_tx_select_own" ON credit_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- videos
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "videos_select_own" ON videos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "videos_insert_own" ON videos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "videos_update_own" ON videos
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "videos_delete_own" ON videos
  FOR DELETE USING (auth.uid() = user_id);

-- folders
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "folders_select_own" ON folders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "folders_insert_own" ON folders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "folders_update_own" ON folders
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "folders_delete_own" ON folders
  FOR DELETE USING (auth.uid() = user_id);

-- templates
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "templates_select_own_or_public" ON templates
  FOR SELECT USING (auth.uid() = user_id OR is_public = TRUE);

CREATE POLICY "templates_insert_own" ON templates
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "templates_update_own" ON templates
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "templates_delete_own" ON templates
  FOR DELETE USING (auth.uid() = user_id);

-- integrations
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "integrations_select_own" ON integrations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "integrations_insert_own" ON integrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "integrations_update_own" ON integrations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "integrations_delete_own" ON integrations
  FOR DELETE USING (auth.uid() = user_id);

-- referrals
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "referrals_select_own" ON referrals
  FOR SELECT USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

-- api_usage_log — somente leitura
ALTER TABLE api_usage_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "api_usage_select_own" ON api_usage_log
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- TRIGGER: Criar perfil automaticamente ao criar usuário
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  referrer_id UUID;
  referral_code_param TEXT;
BEGIN
  -- Verifica se veio de referral
  referral_code_param := NEW.raw_user_meta_data->>'referral_code';

  IF referral_code_param IS NOT NULL THEN
    SELECT id INTO referrer_id
    FROM profiles
    WHERE referral_code = referral_code_param
    LIMIT 1;
  END IF;

  -- Cria o perfil com 100 créditos grátis
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    avatar_url,
    plan,
    plan_status,
    trial_ends_at,
    credits_balance,
    credits_monthly_quota,
    referral_code,
    referred_by
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url',
    'free',
    'trial',
    NOW() + INTERVAL '7 days',
    100,
    0,
    SUBSTRING(gen_random_uuid()::TEXT FROM 1 FOR 8),
    referrer_id
  );

  -- Registra a transação de crédito inicial
  INSERT INTO public.credit_transactions (
    user_id,
    amount,
    type,
    balance_before,
    balance_after,
    description
  ) VALUES (
    NEW.id,
    100,
    'signup_bonus',
    0,
    100,
    'Bônus de boas-vindas — 100 créditos grátis'
  );

  -- Se veio de referral, cria o registro
  IF referrer_id IS NOT NULL THEN
    INSERT INTO public.referrals (referrer_id, referred_id, status)
    VALUES (referrer_id, NEW.id, 'pending');
  END IF;

  RETURN NEW;
END;
$$;

-- Apaga o trigger anterior se existir
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- TRIGGER: updated_at automático
-- ============================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER videos_updated_at
  BEFORE UPDATE ON videos
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- FUNÇÃO: Recompensar referral após primeiro pagamento
-- ============================================================

CREATE OR REPLACE FUNCTION public.reward_referral(p_referred_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_referral RECORD;
BEGIN
  SELECT * INTO v_referral
  FROM referrals
  WHERE referred_id = p_referred_id AND status = 'pending'
  LIMIT 1;

  IF NOT FOUND THEN RETURN; END IF;

  -- Bônus para o indicador: +100 créditos
  UPDATE profiles
  SET credits_bonus_balance = credits_bonus_balance + v_referral.referrer_bonus_credits,
      credits_bonus_expire_at = GREATEST(credits_bonus_expire_at, NOW() + INTERVAL '90 days'),
      updated_at = NOW()
  WHERE id = v_referral.referrer_id;

  INSERT INTO credit_transactions (user_id, amount, type, reference_id, reference_type, balance_before, balance_after, description)
  SELECT
    v_referral.referrer_id,
    v_referral.referrer_bonus_credits,
    'referral_bonus_referrer',
    v_referral.id,
    'referral',
    credits_bonus_balance,
    credits_bonus_balance + v_referral.referrer_bonus_credits,
    'Bônus de referral — indicação convertida'
  FROM profiles WHERE id = v_referral.referrer_id;

  -- Bônus para o indicado: +50 créditos
  UPDATE profiles
  SET credits_bonus_balance = credits_bonus_balance + v_referral.referred_bonus_credits,
      credits_bonus_expire_at = GREATEST(credits_bonus_expire_at, NOW() + INTERVAL '90 days'),
      updated_at = NOW()
  WHERE id = v_referral.referred_id;

  INSERT INTO credit_transactions (user_id, amount, type, reference_id, reference_type, balance_before, balance_after, description)
  SELECT
    v_referral.referred_id,
    v_referral.referred_bonus_credits,
    'referral_bonus_referred',
    v_referral.id,
    'referral',
    credits_bonus_balance,
    credits_bonus_balance + v_referral.referred_bonus_credits,
    'Bônus de boas-vindas — indicado por parceiro'
  FROM profiles WHERE id = v_referral.referred_id;

  -- Marca o referral como recompensado
  UPDATE referrals
  SET status = 'rewarded', rewarded_at = NOW()
  WHERE id = v_referral.id;
END;
$$;

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
-- Execute separadamente no Supabase Storage ou via dashboard:
--
-- INSERT INTO storage.buckets (id, name, public) VALUES
--   ('reference-videos', 'reference-videos', true),
--   ('product-images', 'product-images', true),
--   ('generated-videos', 'generated-videos', true);
--
-- Policies de storage:
-- Usuários podem fazer upload apenas no próprio prefixo (user_id/)
-- Leitura pública para reference-videos e generated-videos

-- ============================================================
-- FIM DA MIGRAÇÃO
-- ============================================================

-- referrals
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "referrals_select_own" ON referrals
  FOR SELECT USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

CREATE POLICY "referrals_insert_trigger" ON referrals
  FOR INSERT WITH CHECK (true);  -- Inserido pela trigger de signup

