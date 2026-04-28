import { NextRequest, NextResponse } from "next/server";
import { CREDIT_COSTS, deduct, getDemoUserId } from "@/lib/credits";

// ElevenLabs voice IDs
const VOICE_IDS: Record<string, string> = {
  Rachel: "21m00Tcm4TlvDq8ikWAM",
  Antoni: "ErXwobaYiN019PkySvjV",
  Bella: "EXAVITQu4vr4xnSDxMaL",
  Josh: "TxGEqnHWrfWFTfGW9XjX",
  Elli: "MF3mGyEYCl7XYWbV9V6O",
  Arnold: "VR6AewLTigWG4xSOukaG",
};

const DEFAULT_VOICE = "21m00Tcm4TlvDq8ikWAM"; // Rachel

export async function POST(req: NextRequest) {
  const { text, voice = "Rachel", model_id = "eleven_multilingual_v2" } = await req.json();

  if (!text?.trim()) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  const userId = getDemoUserId(req);
  const charCount = text.length;
  const cost = Math.ceil((charCount / 1000) * CREDIT_COSTS.audio_per_1k);

  if (!deduct(userId, cost)) {
    return NextResponse.json({ error: "Insufficient credits" }, { status: 402 });
  }

  const voiceId = VOICE_IDS[voice] ?? DEFAULT_VOICE;

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": process.env.ELEVENLABS_API_KEY!,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id,
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: `ElevenLabs error: ${await res.text()}` }, { status: 500 });
  }

  const audioBuffer = await res.arrayBuffer();
  return new NextResponse(audioBuffer, {
    headers: {
      "Content-Type": "audio/mpeg",
      "X-Credits-Used": cost.toString(),
    },
  });
}

// Voice listing endpoint
export async function GET() {
  return NextResponse.json({
    voices: Object.keys(VOICE_IDS).map((name) => ({ name, id: VOICE_IDS[name] })),
  });
}
