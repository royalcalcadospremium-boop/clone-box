"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Send, ChevronDown, Bot } from "lucide-react";

const MODELS = ["ChatGPT 5", "ChatGPT 5 Mini", "ChatGPT 4.1", "ChatGPT 4o"];

const quickActions = [
  { label: "Explore Higgsfield AI features", prompt: "Tell me about Higgsfield AI features" },
  { label: "How Can I Create Stunning Content?", prompt: "How can I create stunning content with Higgsfield?" },
  { label: "Generate Soul Image Prompt", prompt: "Write a prompt for high-aesthetic images using Soul model" },
  { label: "Generate Video Prompt", prompt: "Write a prompt for cinematic videos" },
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [model, setModel] = useState("ChatGPT 5 Mini");
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  function handleSend(text?: string) {
    const content = text ?? input;
    if (!content.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content },
      { role: "assistant", content: "I'm Higgsfield Assist — your AI creative copilot. I can help you generate image prompts, video scripts, and storyboards. What would you like to create today?" },
    ]);
    setInput("");
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-hf-bg">
      <Navbar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Chat area */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {messages.length === 0 ? (
            /* Empty state */
            <div className="mx-auto flex max-w-[560px] flex-col items-center gap-6 pt-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-hf-surface">
                <Bot size={32} className="text-hf-neon" />
              </div>
              <div>
                <h2 className="text-[22px] font-black text-hf-text">Higgsfield Assist</h2>
                <p className="mt-1 text-[14px] text-hf-text-muted">
                  A team of PhDs in your pocket, built for creators.
                </p>
              </div>

              <div className="w-full">
                <p className="mb-3 text-[13px] font-semibold text-hf-text-muted">What You Can Do?</p>
                <div className="flex flex-col gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      type="button"
                      onClick={() => handleSend(action.prompt)}
                      className="rounded-xl border border-white/[0.08] bg-hf-surface px-4 py-3 text-left text-[13px] font-semibold text-hf-text hover:border-hf-neon/40 hover:bg-hf-surface-2 transition-colors"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto flex max-w-[760px] flex-col gap-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="mr-3 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-hf-surface">
                      <Bot size={16} className="text-hf-neon" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-hf-neon text-black"
                        : "bg-hf-surface text-hf-text"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-white/[0.06] p-4">
          <div className="mx-auto max-w-[760px]">
            <div className="flex items-end gap-2 rounded-2xl border border-white/[0.1] bg-hf-surface p-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Ask Higgsfield Assist anything..."
                className="flex-1 resize-none bg-transparent text-[14px] text-hf-text placeholder:text-white/30 outline-none"
                rows={1}
              />
              <div className="flex items-center gap-2">
                {/* Model selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowModelPicker(!showModelPicker)}
                    className="flex items-center gap-1 rounded-lg border border-white/[0.1] px-2.5 py-1.5 text-[11px] font-semibold text-white/60 hover:border-white/20"
                  >
                    {model} <ChevronDown size={11} />
                  </button>
                  {showModelPicker && (
                    <div className="absolute bottom-full mb-2 right-0 rounded-xl border border-white/[0.1] bg-hf-surface p-1 min-w-[160px] z-10">
                      {MODELS.map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => { setModel(m); setShowModelPicker(false); }}
                          className={`flex w-full rounded-lg px-3 py-2 text-[12px] font-semibold text-left hover:bg-white/[0.06] ${m === model ? "text-hf-neon" : "text-hf-text"}`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleSend()}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-hf-neon text-black hover:opacity-90 disabled:opacity-40"
                  disabled={!input.trim()}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
