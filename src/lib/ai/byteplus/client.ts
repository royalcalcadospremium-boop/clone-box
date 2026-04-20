// Cliente HTTP base para BytePlus ModelArk
// Documentação: https://www.byteplus.com/en/product/modelark

const BASE_URL = process.env.BYTEPLUS_BASE_URL ?? 'https://ark.ap-southeast.bytepluses.com/api/v3'

export async function byteplusRequest<T>(
  path: string,
  body: Record<string, unknown>
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BYTEPLUS_API_KEY}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`BytePlus API error ${response.status}: ${error}`)
  }

  return response.json() as Promise<T>
}

export async function byteplusGet<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.BYTEPLUS_API_KEY}`,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`BytePlus API error ${response.status}: ${error}`)
  }

  return response.json() as Promise<T>
}
