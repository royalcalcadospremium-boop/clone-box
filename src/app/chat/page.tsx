"use client";
import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Send, ChevronDown, Bot } from "lucide-react";

const MODELS = ["ChatGPT 5", "ChatGPT 5 Mini", "ChatGPT 4.1", "ChatGPT 4o"];

const quickActions = [
  { label: "Explore Ninja Box features", prompt: "Tell me about the AI features available for image and video generation." },
  { label: "How Can I Create Stunning Content?", prompt: "How can I create stunning cinematic content with AI video generation?" },
  { label: "Best prompts for video generation", prompt: "What are the best prompts for generating cinematic AI videos?" },
  { label: "Compare AI video models", prompt: "Compare Kling 3.0, Seedance 2.0, and Veo 3 for video generation quality." },
];

type Message = { role: "user" | "assistant"; content: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState(MODELS[0]);
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(content: string) {
    if (!content.trim() || loading) return;
    const userMsg: Message = { role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, model }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Chat failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));
        for (const line of lines) {
          const json = line.replace("data: ", "").trim();
          if (json === "[DONE]") continue;
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content ?? "";
            fullText += delta;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: "assistant", content: fullText };
              return updated;
            });
          } catch { /* skip malformed chunks */ }
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: `Error: ${msg}` };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-hf-bg">
      <Navbar />
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Model picker bar */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2">
          <span className="text-[12px] text-white/40">Model:</span>
          <div className="relative">
            <button type="button" onClick={() => setShowModelPicker(!showModelPicker)}
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[12px] font-semibold text-hf-text hover:border-white/20">
              {model} <ChevronDown size={12} className="text-white/40" />
            </button>
            {showModelPicker && (
              <div className="absolute top-full left-0 mt-1 z-10 rounded-xl border border-white/[0.1] bg-[#1a1c20] shadow-xl overflow-hidden">
                {MODELS.map((m) => (
                  <button key={m} type="button"
                    onClick={() => { setModel(m); setShowModelPicker(false); }}
                    className={`block w-full px-4 py-2.5 text-left text-[13px] hover:bg-white/[0.05] ${m === model ? "text-hf-neon" : "text-hf-text"}`}>
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex flex-1 flex-col overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-hf-neon/10 border border-hf-neon/20">
                <Bot size={24} className="text-hf-neon" />
              </div>
              <div className="text-center">
                <h2 className="text-[20px] font-black text-hf-text mb-1">Ninja Box Assist</h2>
                <p className="text-[13px] text-white/40">Your AI creative partner for cinematic video & image generation</p>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full max-w-[480px]">
                {quickActions.map(({ label, prompt }) => (
                  <button key={label} type="button" onClick={() => sendMessage(prompt)}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 text-left text-[12px] text-white/60 hover:border-white/20 hover:text-white/80 transition-colors">
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mx-auto w-full max-w-[720px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "assistant" ? "bg-hf-neon/10 border border-hf-neon/20" : "bg-white/[0.08]"
                  }`}>
                    {msg.role === "assistant" ? (
                      <Bot size={14} className="text-hf-neon" />
                    ) : (
                      <span className="text-[11px] font-bold text-white/60">U</span>
                    )}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-[14px] ${
                    msg.role === "user"
                      ? "bg-white/[0.08] text-hf-text"
                      : "bg-transparent text-hf-text"
                  }`}>
                    {msg.content || (loading && i === messages.length - 1 ? (
                      <span className="inline-flex gap-1">
                        <span className="animate-bounce">·</span>
                        <span className="animate-bounce [animation-delay:0.1s]">·</span>
                        <span className="animate-bounce [animation-delay:0.2s]">·</span>
                      </span>
                    ) : null)}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="border-t border-white/[0.06] p-4">
          <div className="mx-auto flex max-w-[720px] items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="Ask anything about AI video, image generation, or creative storytelling..."
              className="flex-1 resize-none rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[14px] text-hf-text placeholder:text-white/25 focus:border-hf-neon/40 focus:outline-none"
              rows={1}
              disabled={loading}
            />
            <button type="button" onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-hf-neon text-black hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed">
              <Send size={15} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
