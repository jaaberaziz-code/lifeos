"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey. I'm here to listen. Share what's on your mind — a regret, a thought, or just... anything.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "AI request failed");
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FAB trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 left-8 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] text-[var(--text-secondary)] shadow-[var(--shadow-elevated)] transition-all duration-[var(--transition-base)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[var(--shadow-glow)] active:scale-95"
        aria-label="AI Assistant"
        title="Talk to AI"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M12 2a4 4 0 014 4c0 2-2 3-4 5-2-2-4-3-4-5a4 4 0 014-4z" />
          <path d="M6 17c0-2 2-3 6-3s6 1 6 3" />
          <circle cx="12" cy="7" r="2" fill="currentColor" opacity="0.3" />
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="glass animate-scale-in flex h-[520px] w-full max-w-md flex-col rounded-[var(--radius-xl)] shadow-[var(--shadow-elevated)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-muted)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-[var(--accent)]">
                    <path d="M12 2a4 4 0 014 4c0 2-2 3-4 5-2-2-4-3-4-5a4 4 0 014-4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">LifeOS AI</p>
                  <p className="text-xs text-[var(--text-tertiary)]">Reflection Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--text-tertiary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[var(--radius-lg)] px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[var(--accent)] text-[var(--text-inverse)]"
                        : "bg-[var(--bg-elevated)] text-[var(--text-primary)]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-[var(--radius-lg)] bg-[var(--bg-elevated)] px-4 py-3">
                    <span className="h-2 w-2 rounded-full bg-[var(--text-tertiary)] animate-[pulse-dot_1.4s_ease-in-out_infinite_0ms]" />
                    <span className="h-2 w-2 rounded-full bg-[var(--text-tertiary)] animate-[pulse-dot_1.4s_ease-in-out_infinite_200ms]" />
                    <span className="h-2 w-2 rounded-full bg-[var(--text-tertiary)] animate-[pulse-dot_1.4s_ease-in-out_infinite_400ms]" />
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-[var(--radius-lg)] border border-[var(--rose-muted)] bg-[var(--rose-muted)] px-4 py-2">
                  <p className="text-xs text-[var(--rose)]">{error}</p>
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-[var(--border-subtle)] px-5 py-3">
              <div className="flex items-center gap-2 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-secondary)] px-3 transition-colors focus-within:border-[var(--accent)]">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent py-2.5 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--accent)] transition-colors hover:bg-[var(--accent-muted)] disabled:opacity-30"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
