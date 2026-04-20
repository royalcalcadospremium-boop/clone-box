import {
  boolean,
  decimal,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core'

// ═══════════════════════════════════════════════════════
// USUÁRIOS E AUTENTICAÇÃO
// ═══════════════════════════════════════════════════════

export const profiles = pgTable(
  'profiles',
  {
    id: uuid('id').primaryKey(), // = auth.users.id
    email: text('email').notNull().unique(),
    fullName: text('full_name'),
    companyName: text('company_name'),
    phone: text('phone'),
    cpfCnpj: text('cpf_cnpj'),
    avatarUrl: text('avatar_url'),

    // Plano
    plan: text('plan').notNull().default('free'), // free, starter, growth, pro
    planStatus: text('plan_status').notNull().default('trial'), // trial, active, past_due, canceled
    trialEndsAt: timestamp('trial_ends_at'),

    // Créditos
    creditsBalance: integer('credits_balance').notNull().default(100), // 100 grátis no signup
    creditsMonthlyQuota: integer('credits_monthly_quota').notNull().default(0),
    creditsResetDate: timestamp('credits_reset_date'),
    creditsBonusBalance: integer('credits_bonus_balance').notNull().default(0),
    creditsBonusExpireAt: timestamp('credits_bonus_expire_at'),

    // Pagamento
    stripeCustomerId: text('stripe_customer_id').unique(),
    pagarmeCustomerId: text('pagarme_customer_id').unique(),
    preferredPaymentProvider: text('preferred_payment_provider'), // stripe | pagarme

    // Referral
    referralCode: text('referral_code').notNull().unique(),
    referredBy: uuid('referred_by'),

    // Onboarding
    onboardingCompleted: boolean('onboarding_completed').notNull().default(false),
    onboardingData: jsonb('onboarding_data'),

    // Metadados
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    lastActiveAt: timestamp('last_active_at'),
  },
  (t) => ({
    referredByIdx: index('profiles_referred_by_idx').on(t.referredBy),
    planIdx: index('profiles_plan_idx').on(t.plan),
  })
)

// ═══════════════════════════════════════════════════════
// ASSINATURAS E PAGAMENTOS
// ═══════════════════════════════════════════════════════

export const subscriptions = pgTable(
  'subscriptions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => profiles.id),

    plan: text('plan').notNull(),
    status: text('status').notNull(), // trialing, active, past_due, canceled, unpaid

    currentPeriodStart: timestamp('current_period_start').notNull(),
    currentPeriodEnd: timestamp('current_period_end').notNull(),
    cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
    canceledAt: timestamp('canceled_at'),

    provider: text('provider').notNull(), // stripe | pagarme
    providerSubscriptionId: text('provider_subscription_id').notNull(),

    amountCents: integer('amount_cents').notNull(),
    currency: text('currency').notNull().default('BRL'),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (t) => ({
    userIdx: index('subscriptions_user_idx').on(t.userId),
    statusIdx: index('subscriptions_status_idx').on(t.status),
    providerIdx: uniqueIndex('subscriptions_provider_idx').on(
      t.provider,
      t.providerSubscriptionId
    ),
  })
)

// ═══════════════════════════════════════════════════════
// TRANSAÇÕES DE CRÉDITO (AUDITORIA FINANCEIRA)
// ═══════════════════════════════════════════════════════

export const creditTransactions = pgTable(
  'credit_transactions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => profiles.id),

    amount: integer('amount').notNull(), // + crédito, - débito
    type: text('type').notNull(),
    // Tipos: signup_bonus, plan_renewal, plan_upgrade, topup_purchase,
    //        video_generation, prompt_generation, image_generation, analysis,
    //        refund, referral_bonus_referrer, referral_bonus_referred,
    //        admin_adjustment, expired

    referenceId: uuid('reference_id'),
    referenceType: text('reference_type'), // 'video', 'subscription', 'topup', etc

    balanceBefore: integer('balance_before').notNull(),
    balanceAfter: integer('balance_after').notNull(),

    description: text('description').notNull(),
    metadata: jsonb('metadata'),

    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => ({
    userIdx: index('credit_tx_user_idx').on(t.userId, t.createdAt),
    typeIdx: index('credit_tx_type_idx').on(t.type),
    refIdx: index('credit_tx_ref_idx').on(t.referenceType, t.referenceId),
  })
)

// ═══════════════════════════════════════════════════════
// PASTAS (declarada antes de videos pra referência)
// ═══════════════════════════════════════════════════════

export const folders = pgTable('folders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => profiles.id),
  name: text('name').notNull(),
  color: text('color').notNull().default('orange'),
  icon: text('icon'),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ═══════════════════════════════════════════════════════
// VÍDEOS GERADOS
// ═══════════════════════════════════════════════════════

export const videos = pgTable(
  'videos',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => profiles.id),
    folderId: uuid('folder_id').references(() => folders.id),

    // Input: vídeo de referência
    referenceVideoUrl: text('reference_video_url'),
    referenceVideoSourceUrl: text('reference_video_source_url'),
    referenceVideoAnalysis: jsonb('reference_video_analysis'),
    // { transcription, beats, shot_structure, narrative_arc, duration_seconds, style_tags }

    // Input: produto
    productImageUrl: text('product_image_url'),
    productDescription: text('product_description'),

    // Configuração
    style: text('style').notNull(),
    // ugc-selfie, product-solo, unboxing-asmr, lifestyle, tiktok-shop,
    // street-interview, claymation, green-screen
    duration: integer('duration').notNull(), // 5, 10, 15 segundos
    resolution: text('resolution').notNull(), // 480p, 720p, 1080p
    aspectRatio: text('aspect_ratio').notNull(), // 9:16, 16:9, 1:1
    cameraMovement: text('camera_movement'),
    language: text('language').notNull().default('pt-BR'),
    music: text('music'), // silent, ambient, reference-audio

    // Geração de prompt
    promptGenerated: text('prompt_generated'),
    promptEdited: text('prompt_edited'),
    promptFinal: text('prompt_final'),

    byteplusJobId: text('byteplus_job_id'),
    byteplusResponse: jsonb('byteplus_response'),

    // Status
    status: text('status').notNull().default('draft'),
    // draft, analyzing_reference, prompt_pending, generating_prompt,
    // prompt_ready, generating_video, polling, ready, failed, canceled

    outputVideoUrl: text('output_video_url'),
    thumbnailUrl: text('thumbnail_url'),

    creditsSpent: integer('credits_spent').notNull().default(0),
    creditsBreakdown: jsonb('credits_breakdown'), // { analysis: 5, prompt: 10, video: 40 }

    errorCode: text('error_code'),
    errorMessage: text('error_message'),

    publishedTo: jsonb('published_to'),
    // [{ platform: 'tiktok_shop', published_at, external_url, status }]

    generationStartedAt: timestamp('generation_started_at'),
    generationCompletedAt: timestamp('generation_completed_at'),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (t) => ({
    userIdx: index('videos_user_idx').on(t.userId, t.createdAt),
    statusIdx: index('videos_status_idx').on(t.status),
    folderIdx: index('videos_folder_idx').on(t.folderId),
  })
)

// ═══════════════════════════════════════════════════════
// TEMPLATES
// ═══════════════════════════════════════════════════════

export const templates = pgTable(
  'templates',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => profiles.id),
    name: text('name').notNull(),
    description: text('description'),

    sourceVideoId: uuid('source_video_id').references(() => videos.id),
    config: jsonb('config').notNull(),
    promptTemplate: text('prompt_template'), // com placeholders {{product}}, {{description}}

    thumbnailUrl: text('thumbnail_url'),
    previewVideoUrl: text('preview_video_url'),

    isPublic: boolean('is_public').notNull().default(false),
    timesUsed: integer('times_used').notNull().default(0),
    category: text('category'),

    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => ({
    userIdx: index('templates_user_idx').on(t.userId),
    publicIdx: index('templates_public_idx').on(t.isPublic, t.category),
  })
)

// ═══════════════════════════════════════════════════════
// INTEGRAÇÕES DE PUBLICAÇÃO
// ═══════════════════════════════════════════════════════

export const integrations = pgTable(
  'integrations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => profiles.id),

    platform: text('platform').notNull(),
    // tiktok_shop, shopee, mercado_livre, shopify, instagram

    accessTokenEncrypted: text('access_token_encrypted'),
    refreshTokenEncrypted: text('refresh_token_encrypted'),
    tokenExpiresAt: timestamp('token_expires_at'),

    shopId: text('shop_id'),
    shopName: text('shop_name'),
    shopAvatarUrl: text('shop_avatar_url'),

    status: text('status').notNull().default('active'),
    // active, expired, revoked, error

    lastPublishAt: timestamp('last_publish_at'),
    publishCount: integer('publish_count').notNull().default(0),

    connectedAt: timestamp('connected_at').notNull().defaultNow(),
  },
  (t) => ({
    userPlatformIdx: uniqueIndex('integrations_user_platform_idx').on(
      t.userId,
      t.platform,
      t.shopId
    ),
  })
)

// ═══════════════════════════════════════════════════════
// AUDITORIA DE USO DE API
// ═══════════════════════════════════════════════════════

export const apiUsageLog = pgTable(
  'api_usage_log',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => profiles.id),
    videoId: uuid('video_id').references(() => videos.id),

    provider: text('provider').notNull(), // byteplus, anthropic, fal
    endpoint: text('endpoint').notNull(),
    model: text('model'),

    inputTokens: integer('input_tokens'),
    outputTokens: integer('output_tokens'),
    durationSeconds: decimal('duration_seconds', { precision: 10, scale: 3 }),

    costUsd: decimal('cost_usd', { precision: 10, scale: 6 }).notNull(),
    costBrl: decimal('cost_brl', { precision: 10, scale: 4 }).notNull(),

    httpStatus: integer('http_status').notNull(),
    responseTimeMs: integer('response_time_ms'),

    requestId: text('request_id'),
    error: text('error'),

    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => ({
    userIdx: index('api_usage_user_idx').on(t.userId, t.createdAt),
    providerIdx: index('api_usage_provider_idx').on(t.provider, t.createdAt),
    videoIdx: index('api_usage_video_idx').on(t.videoId),
  })
)

// ═══════════════════════════════════════════════════════
// REFERRALS
// ═══════════════════════════════════════════════════════

export const referrals = pgTable(
  'referrals',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    referrerId: uuid('referrer_id')
      .notNull()
      .references(() => profiles.id),
    referredId: uuid('referred_id')
      .notNull()
      .references(() => profiles.id),

    status: text('status').notNull().default('pending'),
    // pending, rewarded, expired

    referrerBonusCredits: integer('referrer_bonus_credits').notNull().default(100),
    referredBonusCredits: integer('referred_bonus_credits').notNull().default(50),

    rewardedAt: timestamp('rewarded_at'),

    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => ({
    referrerIdx: index('referrals_referrer_idx').on(t.referrerId),
    referredIdx: uniqueIndex('referrals_referred_idx').on(t.referredId),
  })
)

// ═══════════════════════════════════════════════════════
// TIPOS INFERIDOS
// ═══════════════════════════════════════════════════════

export type Profile = typeof profiles.$inferSelect
export type NewProfile = typeof profiles.$inferInsert

export type Subscription = typeof subscriptions.$inferSelect
export type NewSubscription = typeof subscriptions.$inferInsert

export type CreditTransaction = typeof creditTransactions.$inferSelect
export type NewCreditTransaction = typeof creditTransactions.$inferInsert

export type Video = typeof videos.$inferSelect
export type NewVideo = typeof videos.$inferInsert

export type Folder = typeof folders.$inferSelect
export type NewFolder = typeof folders.$inferInsert

export type Template = typeof templates.$inferSelect
export type NewTemplate = typeof templates.$inferInsert

export type Integration = typeof integrations.$inferSelect
export type NewIntegration = typeof integrations.$inferInsert

export type ApiUsageLog = typeof apiUsageLog.$inferSelect
export type NewApiUsageLog = typeof apiUsageLog.$inferInsert

export type Referral = typeof referrals.$inferSelect
export type NewReferral = typeof referrals.$inferInsert
