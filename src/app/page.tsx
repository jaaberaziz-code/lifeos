import Header from "@/components/Header";
import RegretFeed from "@/components/RegretFeed";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto min-h-screen max-w-2xl px-4 py-24">
        <header className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs font-medium text-zinc-400">Anonymous · Private · Free</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-100">
            Release what weighs on your heart
          </h1>
          <p className="mt-3 text-zinc-400">
            An anonymous space to share life regrets.
            <br />
            No judgement. No accounts. Just release.
          </p>
        </header>
        <RegretFeed />
      </main>
    </>
  );
}
