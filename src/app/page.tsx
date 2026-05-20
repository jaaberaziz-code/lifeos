import Header from "@/components/Header";
import RegretFeed from "@/components/RegretFeed";
import AIAssistant from "@/components/AIAssistant";
import { isAiEnabled } from "@/lib/openrouter";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";

export default function HomePage() {
  const aiEnabled = isAiEnabled();

  return (
    <>
      <Header />

      <main>
        {/* ── Hero ──────────────────────────────────────────────── */}
        <HeroSection />

        {/* ── Features ──────────────────────────────────────────── */}
        <FeaturesSection />

        {/* ── The App ───────────────────────────────────────────── */}
        <section
          id="app"
          className="scroll-mt-16 border-t border-[var(--border-subtle)] px-4 py-20"
        >
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <span className="inline-block rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1 text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                The App
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">
                Regrets of a Lifetime
              </h2>
              <p className="mt-3 text-[var(--text-secondary)]">
                An anonymous space to share what weighs on your heart.
                <br />
                No judgement. No accounts. Just release.
              </p>
            </div>

            <RegretFeed />
          </div>
        </section>

        {/* ── AI Section ────────────────────────────────────────── */}
        <section
          id="ai"
          className="scroll-mt-16 border-t border-[var(--border-subtle)] px-4 py-20"
        >
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1 text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              AI-Powered
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              Your Reflection Assistant
            </h2>
            <p className="mt-3 text-[var(--text-secondary)]">
              {aiEnabled
                ? "Tap the brain icon to talk with LifeOS AI — a compassionate listener that helps you process and reflect."
                : "AI reflection coming soon. Add your OpenRouter API key to unlock it."}
            </p>

            {!aiEnabled && (
              <div className="mt-6 inline-block rounded-[var(--radius-lg)] border border-[var(--amber-muted)] bg-[var(--amber-muted)] px-5 py-3 text-sm text-[var(--amber)]">
                Set{" "}
                <code className="rounded bg-[var(--bg-hover)] px-1.5 py-0.5 font-mono text-xs">
                  OPENROUTER_API_KEY
                </code>{" "}
                in Vercel env vars to enable AI
              </div>
            )}
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────────── */}
        <footer className="border-t border-[var(--border-subtle)] px-4 py-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between text-xs text-[var(--text-tertiary)]">
            <p>LifeOS — Regrets of a Lifetime</p>
            <p>
              Built with Next.js ·{" "}
              <a
                href="https://github.com/jaaberaziz-code/lifeos"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)]"
              >
                GitHub
              </a>
            </p>
          </div>
        </footer>
      </main>

      {/* AI Assistant FAB — always visible (only functional if AI is enabled) */}
      <AIAssistant />
    </>
  );
}
