import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const limiterCache = new Map<string, Ratelimit>()

function getLimiter(requests: number, windowSeconds: number, prefix: string): Ratelimit {
  const key = `${prefix}:${requests}:${windowSeconds}`
  if (!limiterCache.has(key)) {
    limiterCache.set(key, new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(requests, `${windowSeconds} s`),
      prefix: `rl:${prefix}`,
    }))
  }
  return limiterCache.get(key)!
}

// Retorna true se deve bloquear a requisição
export async function rateLimit(
  identifier: string,
  requests: number,
  windowSeconds: number
): Promise<boolean> {
  const prefix = identifier.split(':')[0]
  const limiter = getLimiter(requests, windowSeconds, prefix)
  const { success } = await limiter.limit(identifier)
  return !success
}

export const rateLimitClone = getLimiter(10, 60, 'clone')
export const rateLimitTopup = getLimiter(5, 60, 'topup')
export const rateLimitUpload = getLimiter(20, 3600, 'upload')

export async function checkRateLimit(
  limiter: Ratelimit,
  identifier: string
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const { success, remaining, reset } = await limiter.limit(identifier)
  return { success, remaining, reset }
}
