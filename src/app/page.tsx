import RegretFeed from "@/components/RegretFeed";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-4 py-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)]">
          Regrets of a Lifetime
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          An anonymous space to share what weighs on your heart.
          <br />
          No judgement. No accounts. Just release.
        </p>
      </header>

      {/* Feed */}
      <RegretFeed />
    </main>
  );
}
