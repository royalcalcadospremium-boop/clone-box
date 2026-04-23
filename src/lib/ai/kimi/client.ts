import OpenAI from 'openai'

// Singleton — reutiliza conexão entre requests
let client: OpenAI | null = null

export function getKimiClient(): OpenAI {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.KIMI_API_KEY!,
      baseURL: 'https://api.moonshot.ai/v1',
    })
  }
  return client
}
