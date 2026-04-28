import { NextRequest, NextResponse } from "next/server";
import { CREDIT_COSTS, deduct, getDemoUserId } from "@/lib/credits";
import crypto from "crypto";

const MODEL_PROVIDER: Record<string, string> = {
  seedance_2_0: "byteplus",
  kling3_0: "kling",
  "nano-banana-pro": "fal",
  "sora-2": "openai",
  "veo-3": "fal",       // via FAL proxy
  "wan-2-6": "fal",
  hailuo: "minimax",
};

const FAL_VIDEO_MAP: Record<string, string> = {
  "nano-banana-pro": "fal-ai/kling-video/v1.6/pro/text-to-video",
  "veo-3": "fal-ai/veo2",
  "wan-2-6": "fal-ai/wan-i2v-14b",
};

// ── Kling AI ────────────────────────────────────────────────────────────────
function klingSign(accessKey: string, secretKey: string) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = crypto.randomBytes(8).toString("hex");
  const message = `${accessKey}${timestamp}${nonce}`;
  const sign = crypto.createHmac("sha256", secretKey).update(message).digest("base64");
  return { Authorization: `Bearer ${sign}`, "X-Timestamp": timestamp, "X-Nonce": nonce };
}

async function generateKling(prompt: string, duration: number) {
  const headers = {
    ...klingSign(process.env.KLING_ACCESS_KEY!, process.env.KLING_SECRET_KEY!),
    "Content-Type": "application/json",
  };
  const res = await fetch("https://api.klingai.com/v1/videos/text2video", {
    method: "POST",
    headers,
    body: JSON.stringify({ model: "kling-v1-6-pro", prompt, duration }),
  });
  if (!res.ok) throw new Error(`Kling error: ${await res.text()}`);
  const { data } = await res.json();
  const taskId = data.task_id;

  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 5000));
    const poll = await fetch(`https://api.klingai.com/v1/videos/text2video/${taskId}`, { headers });
    const result = await poll.json();
    if (result.data?.task_status === "succeed") {
      return result.data.task_result?.videos?.[0]?.url ?? null;
    }
    if (result.data?.task_status === "failed") throw new Error("Kling failed");
  }
  throw new Error("Kling timeout");
}

// ── BytePlus / Seedance ──────────────────────────────────────────────────────
async function generateByteplus(prompt: string, duration: number) {
  const res = await fetch("https://api.byteplus.com/api/v3/contents/generate/video", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.BYTEPLUS_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: "seedance-1-lite", prompt, duration }),
  });
  if (!res.ok) throw new Error(`BytePlus error: ${await res.text()}`);
  const { data } = await res.json();
  return data?.video_url ?? null;
}

// ── MiniMax / Hailuo ─────────────────────────────────────────────────────────
async function generateMinimax(prompt: string) {
  const res = await fetch(`https://api.minimaxi.chat/v1/video_generation`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MINIMAX_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: "video-01", prompt }),
  });
  if (!res.ok) throw new Error(`MiniMax error: ${await res.text()}`);
  const { task_id } = await res.json();

  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 5000));
    const poll = await fetch(`https://api.minimaxi.chat/v1/query/video_generation?task_id=${task_id}`, {
      headers: { Authorization: `Bearer ${process.env.MINIMAX_API_KEY}` },
    });
    const result = await poll.json();
    if (result.status === "Success") return result.file_id ? `https://api.minimaxi.chat/v1/files/retrieve?GroupId=${process.env.MINIMAX_GROUP_ID}&file_id=${result.file_id}` : null;
    if (result.status === "Fail") throw new Error("MiniMax failed");
  }
  throw new Error("MiniMax timeout");
}

// ── FAL.ai ───────────────────────────────────────────────────────────────────
async function generateFalVideo(prompt: string, modelId: string) {
  const falModel = FAL_VIDEO_MAP[modelId] ?? "fal-ai/kling-video/v1.6/pro/text-to-video";
  const res = await fetch(`https://fal.run/${falModel}`, {
    method: "POST",
    headers: {
      Authorization: `Key ${process.env.FAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error(`FAL video error: ${await res.text()}`);
  const data = await res.json();
  return data.video?.url ?? null;
}

// ── Main handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const { prompt, model = "seedance_2_0", duration = "5s" } = await req.json();

  if (!prompt?.trim()) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  const userId = getDemoUserId(req);
  const durationSec = parseInt(duration) || 5;
  const cost = durationSec >= 10 ? CREDIT_COSTS.video_10s : CREDIT_COSTS.video_5s;

  if (!deduct(userId, cost)) {
    return NextResponse.json({ error: "Insufficient credits" }, { status: 402 });
  }

  try {
    const provider = MODEL_PROVIDER[model] ?? "fal";
    let videoUrl: string | null = null;

    if (provider === "kling") {
      videoUrl = await generateKling(prompt, durationSec);
    } else if (provider === "byteplus") {
      videoUrl = await generateByteplus(prompt, durationSec);
    } else if (provider === "minimax") {
      videoUrl = await generateMinimax(prompt);
    } else {
      videoUrl = await generateFalVideo(prompt, model);
    }

    return NextResponse.json({ url: videoUrl, credits_used: cost });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
