"use client";

import { useState } from "react";

const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Regrets", href: "#app" },
  { label: "AI", href: "#ai" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="glass fixed top-0 left-0 right-0 z-30 border-b border-[var(--border-subtle)]">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-4 w-4">
              <path d="M12 2a4 4 0 014 4c0 2-2 3-4 5-2-2-4-3-4-5a4 4 0 014-4z" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">
            LifeOS
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-[var(--radius-md)] px-3 py-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#app"
            className="btn-shine ml-3 rounded-[var(--radius-md)] bg-[var(--accent)] px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-[var(--accent-hover)]"
          >
            Share a regret
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-hover)] sm:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            {menuOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
            ) : (
              <><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="animate-slide-down border-t border-[var(--border-subtle)] bg-[var(--bg-card)] px-5 py-3 sm:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
