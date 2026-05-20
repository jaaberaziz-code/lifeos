const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M12 2a4 4 0 014 4c0 2-2 3-4 5-2-2-4-3-4-5a4 4 0 014-4z" />
        <path d="M6 17c0-2 2-3 6-3s6 1 6 3" />
      </svg>
    ),
    title: "Anonymous Sharing",
    desc: "Share your regrets freely — no accounts, no tracking, no judgement. Pure catharsis.",
    color: "var(--accent)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: "AI Reflection",
    desc: "Get compassionate AI-powered insights on your regrets. A wise friend who listens at 2am.",
    color: "var(--sky)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: "Organized by Category",
    desc: "Love, career, family, health — regrets sorted into meaningful categories for clarity.",
    color: "var(--rose)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: "You're Not Alone",
    desc: "Browse regrets shared by others and realize your feelings are universal.",
    color: "var(--green)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: "Dark & Safe Space",
    desc: "Designed with care — melancholic aesthetic that respects the weight of your words.",
    color: "var(--rose)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
      </svg>
    ),
    title: "Realtime Updates",
    desc: "New regrets appear instantly. Built on modern infrastructure ready for scale.",
    color: "var(--amber)",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="scroll-mt-16 border-t border-[var(--border-subtle)] px-4 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1 text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
            Why LifeOS
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">
            Built for release, not retention
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">
            Every feature exists to make sharing and reflecting easier.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="animate-fade-up group rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 transition-all duration-[var(--transition-base)] hover:border-[var(--accent)]/20 hover:shadow-[var(--shadow-elevated)]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)]"
                style={{ background: `color-mix(in srgb, ${f.color} 12%, transparent)` }}
              >
                <span style={{ color: f.color }}>{f.icon}</span>
              </div>
              <h3 className="mb-2 text-sm font-semibold text-[var(--text-primary)]">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Tech stack bar */}
        <div className="mt-14 text-center">
          <p className="mb-4 text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
            Powered by
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Next.js", "TypeScript", "Tailwind CSS", "OpenRouter", "Vercel", "Superpowers"].map(
              (tech) => (
                <span
                  key={tech}
                  className="inline-block rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
