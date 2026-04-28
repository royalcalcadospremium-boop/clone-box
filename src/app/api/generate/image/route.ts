import { NextRequest, NextResponse } from "next/server";
import { CREDIT_COSTS, deduct, getDemoUserId } from "@/lib/credits";

// Supported models and which provider handles each
const MODEL_PROVIDER: Record<string, string> = {
  "nano-banana-pro": "fal",
  "nano-banana-2": "fal",
  "soul-v2": "fal",
  "soul-cinema": "fal",
  "gpt-image-2": "openai",
  "flux-2": "bfl",
  "imagegen_2_0": "fal",
};

// FAL.ai model IDs
const FAL_MODEL_MAP: Record<string, string> = {
  "nano-banana-pro": "fal-ai/flux-pro/v1.1-ultra",
  "nano-banana-2": "fal-ai/flux-pro/v1.1",
  "soul-v2": "fal-ai/flux/dev",
  "soul-cinema": "fal-ai/flux-realism",
  "imagegen_2_0": "fal-ai/stable-diffusion-v3-medium",
};

async function generateWithFal(prompt: string, modelId: string, aspectRatio: string) {
  const falModelId = FAL_MODEL_MAP[modelId] ?? "fal-ai/flux-pro/v1.1";
  const res = await fetch(`https://fal.run/${falModelId}`, {
    method: "POST",
    headers: {
      Authorization: `Key ${process.env.FAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      image_size: aspectRatio === "1:1" ? "square_hd" : aspectRatio === "16:9" ? "landscape_16_9" : "portrait_4_3",
      num_images: 1,
      enable_safety_checker: true,
    }),
  });
  if (!res.ok) throw new Error(`FAL error: ${await res.text()}`);
  const data = await res.json();
  return data.images?.[0]?.url ?? null;
}

async function generateWithOpenAI(prompt: string, quality: string) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: quality === "4K" ? "high" : quality === "2K" ? "medium" : "low",
    }),
  });
  if (!res.ok) throw new Error(`OpenAI error: ${await res.text()}`);
  const data = await res.json();
  return data.data?.[0]?.url ?? null;
}

async function generateWithBFL(prompt: string) {
  const res = await fetch("https://api.bfl.ai/v1/flux-pro-1.1", {
    method: "POST",
    headers: {
      "x-key": process.env.BFL_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, width: 1024, height: 1024 }),
  });
  if (!res.ok) throw new Error(`BFL error: ${await res.text()}`);
  const { id } = await res.json();

  // Poll for result
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    const poll = await fetch(`https://api.bfl.ai/v1/get_result?id=${id}`, {
      headers: { "x-key": process.env.BFL_API_KEY! },
    });
    const result = await poll.json();
    if (result.status === "Ready") return result.result?.sample ?? null;
  }
  throw new Error("BFL timeout");
}

export async function POST(req: NextRequest) {
  const { prompt, model = "nano-banana-pro", aspect = "1:1", quality = "1K" } = await req.json();

  if (!prompt?.trim()) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  const userId = getDemoUserId(req);
  const isPremium = model === "gpt-image-2" || model === "flux-2";
  const cost = isPremium ? CREDIT_COSTS.image_premium : CREDIT_COSTS.image_standard;

  if (!deduct(userId, cost)) {
    return NextResponse.json({ error: "Insufficient credits" }, { status: 402 });
  }

  try {
    const provider = MODEL_PROVIDER[model] ?? "fal";
    let imageUrl: string | null = null;

    if (provider === "openai") {
      imageUrl = await generateWithOpenAI(prompt, quality);
    } else if (provider === "bfl") {
      imageUrl = await generateWithBFL(prompt);
    } else {
      imageUrl = await generateWithFal(prompt, model, aspect);
    }

    return NextResponse.json({ url: imageUrl, credits_used: cost });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
