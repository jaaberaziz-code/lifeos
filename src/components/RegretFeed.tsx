"use client";

import { useState, useEffect, useCallback } from "react";
import RegretCard from "./RegretCard";
import RegretForm from "./RegretForm";
import type { RegretRecord } from "@/lib/storage";

export default function RegretFeed() {
  const [regrets, setRegrets] = useState<RegretRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRegrets = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/regrets");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setRegrets(data);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load regrets");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegrets();
  }, [fetchRegrets]);

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider">
          {loading ? "Loading..." : `${regrets.length} regrets shared`}
        </h2>
        {regrets.length > 0 && (
          <button
            onClick={fetchRegrets}
            className="rounded-lg p-1.5 text-[var(--muted)] transition-colors hover:bg-[var(--muted-bg)] hover:text-[var(--foreground)]"
            title="Refresh"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
          </button>
        )}
      </div>

      {loading && regrets.length === 0 ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5"
            >
              <div className="mb-3 h-4 w-16 rounded bg-[var(--muted-bg)]" />
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-[var(--muted-bg)]" />
                <div className="h-3 w-3/4 rounded bg-[var(--muted-bg)]" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
          <p className="text-sm text-red-400">{error}</p>
          <button
            onClick={fetchRegrets}
            className="mt-3 text-xs text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-hover)]"
          >
            Try again
          </button>
        </div>
      ) : regrets.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--border)] p-12 text-center">
          <p className="text-[var(--muted)]">
            No regrets shared yet.
            <br />
            <span className="text-sm">
              Tap the + button to share yours anonymously.
            </span>
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {regrets.map((regret, i) => (
            <RegretCard key={regret.id || i} regret={regret} index={i} />
          ))}
        </div>
      )}

      <RegretForm onSubmitted={fetchRegrets} />
    </section>
  );
}
