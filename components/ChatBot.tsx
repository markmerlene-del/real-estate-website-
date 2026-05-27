"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function ToniaAvatar({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="50" fill="#D4A574" />
      {/* Hair - top/back */}
      <ellipse cx="50" cy="35" rx="26" ry="28" fill="#5C3317" />
      {/* Hair sides */}
      <ellipse cx="26" cy="52" rx="10" ry="18" fill="#5C3317" />
      <ellipse cx="74" cy="52" rx="10" ry="18" fill="#5C3317" />
      {/* Hair top highlights */}
      <ellipse cx="44" cy="22" rx="8" ry="5" fill="#7A4520" />
      {/* Neck */}
      <rect x="42" y="68" width="16" height="14" rx="4" fill="#F0C5A0" />
      {/* Face */}
      <ellipse cx="50" cy="52" rx="22" ry="24" fill="#F0C5A0" />
      {/* Eyebrows */}
      <path d="M36 42 Q40 39 44 41" stroke="#5C3317" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M56 41 Q60 39 64 42" stroke="#5C3317" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Eyes */}
      <ellipse cx="40" cy="46" rx="4" ry="4.5" fill="white" />
      <ellipse cx="60" cy="46" rx="4" ry="4.5" fill="white" />
      <circle cx="41" cy="46" r="2.5" fill="#3D2B1F" />
      <circle cx="61" cy="46" r="2.5" fill="#3D2B1F" />
      <circle cx="42" cy="45" r="0.8" fill="white" />
      <circle cx="62" cy="45" r="0.8" fill="white" />
      {/* Nose */}
      <path d="M49 53 Q47 57 49 58 Q51 57 51 58" stroke="#C8956A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Smile */}
      <path d="M41 63 Q50 70 59 63" stroke="#C8956A" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Lips */}
      <path d="M43 64 Q50 68 57 64" stroke="#D4776A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Hair fringe/bangs */}
      <path d="M28 38 Q34 28 50 26 Q66 28 72 38" fill="#5C3317" />
      {/* Shoulders / top of shirt */}
      <path d="M20 100 Q28 80 42 76 Q50 74 58 76 Q72 80 80 100 Z" fill="#1B3A5C" />
      {/* Collar / pearl necklace hint */}
      <ellipse cx="50" cy="80" rx="10" ry="3" fill="#2A5A8C" opacity="0.5" />
    </svg>
  );
}

function cleanMessage(text: string) {
  return text.replace(/<lead_data>[\s\S]*?<\/lead_data>/g, "").trim();
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hi! I'm Tonia, your Texas Platinum Group assistant. Whether you're buying, selling, or just exploring — I'm here to help. What brings you in today?",
        },
      ]);
    }
    if (open) {
      setShowBadge(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
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
        body: JSON.stringify({
          // Strip the initial greeting (first assistant msg) — Anthropic requires first message to be from user
          messages: newMessages
            .filter((m, i) => !(i === 0 && m.role === "assistant"))
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.type === "text") {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: updated[updated.length - 1].content + parsed.content,
                };
                return updated;
              });
            } else if (parsed.type === "lead_saved") {
              setLeadSaved(true);
            } else if (parsed.type === "error") {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: "Sorry, I ran into an issue. Please try again.",
                };
                return updated;
              });
            }
          } catch {
            // skip malformed events
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, I ran into a connection issue. Please try again.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating bubble */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 rounded-full shadow-xl hover:scale-105 transition-transform focus-visible:ring-4 focus-visible:ring-gold focus-visible:outline-none"
        aria-label={open ? "Close Tonia chat" : "Chat with Tonia"}
      >
        <ToniaAvatar size={64} />
        {showBadge && !open && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gold animate-pulse" />
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          style={{ height: "520px" }}
        >
          {/* Header */}
          <div className="bg-navy flex items-center gap-3 px-4 py-3">
            <ToniaAvatar size={40} />
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Tonia</p>
              <p className="text-cream/70 text-xs">Texas Platinum Group</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-cream/60 hover:text-cream transition-colors p-1 rounded"
              aria-label="Close chat"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Lead saved banner */}
          {leadSaved && (
            <div className="bg-green-50 border-b border-green-100 px-4 py-2 text-xs text-green-700 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <circle cx="7" cy="7" r="6.5" stroke="#16a34a" />
                <path d="M4 7l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Your info has been saved — an agent will follow up soon!
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex-shrink-0 mt-1">
                    <ToniaAvatar size={28} />
                  </div>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-navy text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
                  }`}
                >
                  {msg.role === "assistant" ? cleanMessage(msg.content) : msg.content}
                  {msg.role === "assistant" && loading && i === messages.length - 1 && msg.content === "" && (
                    <span className="inline-flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="border-t border-gray-100 px-3 py-3 flex gap-2 bg-white">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              disabled={loading}
              className="flex-1 text-sm rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navy/30 disabled:opacity-60 bg-gray-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-navy text-white rounded-xl px-3 py-2 hover:bg-navy/90 disabled:opacity-40 transition-colors"
              aria-label="Send"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M2 9h14M9 2l7 7-7 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
