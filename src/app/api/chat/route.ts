import { NextRequest, NextResponse } from "next/server";
import { CREDIT_COSTS, deduct, getDemoUserId } from "@/lib/credits";

const MODEL_MAP: Record<string, string> = {
  "ChatGPT 5": "gpt-4o",
  "ChatGPT 5 Mini": "gpt-4o-mini",
  "ChatGPT 4.1": "gpt-4-turbo",
  "ChatGPT 4o": "gpt-4o",
};

export async function POST(req: NextRequest) {
  const { messages, model = "ChatGPT 5" } = await req.json();

  if (!messages?.length) {
    return NextResponse.json({ error: "Messages are required" }, { status: 400 });
  }

  const userId = getDemoUserId(req);
  if (!deduct(userId, CREDIT_COSTS.chat_per_msg)) {
    return NextResponse.json({ error: "Insufficient credits" }, { status: 402 });
  }

  const openaiModel = MODEL_MAP[model] ?? "gpt-4o";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: openaiModel,
      messages: [
        {
          role: "system",
          content:
            "You are Higgsfield Assist, an AI creative assistant specialized in AI-generated video, images, and cinematic storytelling. Help users craft prompts, suggest creative directions, and answer questions about AI media generation.",
        },
        ...messages,
      ],
      stream: true,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: `OpenAI error: ${await res.text()}` }, { status: 500 });
  }

  // Stream response directly to client
  return new NextResponse(res.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Credits-Used": CREDIT_COSTS.chat_per_msg.toString(),
    },
  });
}
