export default function HeroSection() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 pt-14">
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 60%, rgba(167,139,250,0.12), transparent 70%), radial-gradient(ellipse 40% 30% at 20% 30%, rgba(14,165,233,0.08), transparent 60%)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-[var(--accent)] opacity-[0.04] blur-[120px] animate-float" />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-[var(--sky)] opacity-[0.03] blur-[100px] animate-float"
        style={{ animationDelay: "-1.5s" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-[var(--green)]" />
          <span className="text-xs font-medium text-[var(--text-secondary)]">
            Anonymous · Private · Free
          </span>
        </div>

        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Release what
          <br />
          <span className="gradient-text">weighs on your heart</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-secondary)] leading-relaxed">
          LifeOS is an anonymous space to share your regrets, reflect with AI,
          and find peace in knowing you&apos;re not alone.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#app"
            className="btn-shine inline-flex h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--accent)] px-6 text-sm font-medium text-white transition-all hover:bg-[var(--accent-hover)] shadow-lg shadow-[var(--accent-glow)]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M12 2a4 4 0 014 4c0 2-2 3-4 5-2-2-4-3-4-5a4 4 0 014-4z" />
              <path d="M6 17c0-2 2-3 6-3s6 1 6 3" />
            </svg>
            Share a regret
          </a>
          <a
            href="#features"
            className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-card)] px-6 text-sm font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Learn more
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 flex items-center justify-center gap-10 text-center">
          <div>
            <p className="text-2xl font-bold text-[var(--text-primary)]">100%</p>
            <p className="text-xs text-[var(--text-tertiary)]">Anonymous</p>
          </div>
          <div className="h-8 w-px bg-[var(--border-subtle)]" />
          <div>
            <p className="text-2xl font-bold text-[var(--text-primary)]">No&nbsp;Account</p>
            <p className="text-xs text-[var(--text-tertiary)]">Required</p>
          </div>
          <div className="h-8 w-px bg-[var(--border-subtle)]" />
          <div>
            <p className="text-2xl font-bold text-[var(--text-primary)]">AI&nbsp;Powered</p>
            <p className="text-xs text-[var(--text-tertiary)]">Reflection</p>
          </div>
        </div>
      </div>
    </section>
  );
}
