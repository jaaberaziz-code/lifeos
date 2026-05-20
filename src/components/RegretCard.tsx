"use client";

import type { RegretRecord } from "@/lib/superpowers";

const CATEGORY_COLORS: Record<string, string> = {
  love:        "bg-rose-500/10 text-rose-400 border-rose-500/20",
  career:      "bg-amber-500/10 text-amber-400 border-amber-500/20",
  family:      "bg-sky-500/10 text-sky-400 border-sky-500/20",
  health:      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  education:   "bg-violet-500/10 text-violet-400 border-violet-500/20",
  finance:     "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  friendship:  "bg-pink-500/10 text-pink-400 border-pink-500/20",
  other:       "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
};

function formatTimeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function RegretCard({
  regret,
  index,
}: {
  regret: RegretRecord;
  index: number;
}) {
  const colorClass =
    CATEGORY_COLORS[regret.category?.toLowerCase()] ?? CATEGORY_COLORS.other;

  return (
    <article
      className="animate-fade-in group rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5 transition-all duration-300 hover:border-[var(--accent)]/30 hover:shadow-[0_0_20px_rgba(167,139,250,0.06)]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className={`inline-block rounded-full border px-3 py-0.5 text-xs font-medium capitalize ${colorClass}`}
        >
          {regret.category || "other"}
        </span>
        <time className="text-xs text-[var(--muted)]">
          {formatTimeAgo(regret.timestamp)}
        </time>
      </div>

      <p className="leading-relaxed text-[var(--foreground)]">
        {regret.text}
      </p>
    </article>
  );
}
