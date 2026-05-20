export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-4 w-4">
              <path d="M12 2a4 4 0 014 4c0 2-2 3-4 5-2-2-4-3-4-5a4 4 0 014-4z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-zinc-100">LifeOS</span>
        </a>
        <nav className="flex items-center gap-3">
          <a href="#features" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">Features</a>
          <a href="#app" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">App</a>
          <a href="#app" className="rounded-lg bg-purple-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-purple-400 transition-colors">Share</a>
        </nav>
      </div>
    </header>
  );
}
