// Sistema de créditos em memória (substitua por Supabase/DB em produção)
// Cada usuário tem um saldo. Em produção, persista no banco de dados.

export const CREDIT_COSTS = {
  image_standard: Number(process.env.CREDITS_IMAGE_STANDARD ?? 2),
  image_premium: Number(process.env.CREDITS_IMAGE_PREMIUM ?? 5),
  video_5s: Number(process.env.CREDITS_VIDEO_5S ?? 60),
  video_10s: Number(process.env.CREDITS_VIDEO_10S ?? 100),
  audio_per_1k: Number(process.env.CREDITS_AUDIO_PER_1K_CHARS ?? 10),
  chat_per_msg: Number(process.env.CREDITS_CHAT_PER_MSG ?? 1),
} as const;

export type CreditOperation = keyof typeof CREDIT_COSTS;

// Saldo demo: em produção, busque do banco de dados por userId
const DEMO_BALANCE = 1000;
const balances = new Map<string, number>();

export function getBalance(userId: string): number {
  if (!balances.has(userId)) balances.set(userId, DEMO_BALANCE);
  return balances.get(userId)!;
}

export function deduct(userId: string, amount: number): boolean {
  const balance = getBalance(userId);
  if (balance < amount) return false;
  balances.set(userId, balance - amount);
  return true;
}

export function getDemoUserId(req: Request): string {
  // Em produção: extraia do JWT/session. Por enquanto, IP ou header.
  return req.headers.get("x-user-id") ?? "demo-user";
}
