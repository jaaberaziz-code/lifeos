"use client";

import { useState, useRef, useEffect } from "react";

interface RegretFormProps {
  onSubmitted: () => void;
}

const CATEGORIES = [
  "love",
  "career",
  "family",
  "health",
  "education",
  "finance",
  "friendship",
  "other",
];

export default function RegretForm({ onSubmitted }: RegretFormProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("other");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && textRef.current) textRef.current.focus();
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/regrets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed, category }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit");
      }

      setText("");
      setCategory("other");
      setOpen(false);
      onSubmitted();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const charCount = text.length;
  const maxChars = 500;

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg transition-all duration-300 hover:bg-[var(--accent-hover)] hover:scale-105 active:scale-95"
        aria-label="Add regret"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          {/* Dialog */}
          <div
            className="animate-slide-up w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                What do you regret?
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-[var(--muted)] transition-colors hover:bg-[var(--muted-bg)] hover:text-[var(--foreground)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category select */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--muted-bg)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent)]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="capitalize">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Text area */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
                  Your regret
                </label>
                <textarea
                  ref={textRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="I wish I had..."
                  rows={4}
                  maxLength={maxChars}
                  className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--muted-bg)] px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--accent)]"
                />
                <div className="mt-1 flex justify-end">
                  <span
                    className={`text-xs ${
                      charCount > maxChars * 0.9
                        ? "text-[var(--danger)]"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    {charCount}/{maxChars}
                  </span>
                </div>
              </div>

              {error && (
                <p className="text-xs text-[var(--danger)]">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={!text.trim() || submitting}
                className="w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
