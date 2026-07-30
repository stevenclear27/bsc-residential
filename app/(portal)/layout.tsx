import Link from "next/link";
import { ReactNode } from "react";

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-brand-canvas text-zinc-100">
      {/* SIDEBAR COMPONENT (Isolated Navigation) */}
      <aside className="w-64 border-r border-brand-primary/20 bg-brand-canvas/50 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-brand-primary/20">
          <h2 className="text-xl font-bold tracking-widest text-brand-primary uppercase">
            BSC Portal
          </h2>
          <span className="text-xs text-zinc-500 uppercase tracking-widest">
            Accountability Ledger
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/dashboard"
            className="block px-4 py-3 rounded-md hover:bg-brand-primary/10 hover:text-brand-primary transition-colors"
          >
            Active Projects
          </Link>
          <Link
            href="/dashboard/messages"
            className="block px-4 py-3 rounded-md hover:bg-brand-primary/10 hover:text-brand-primary transition-colors"
          >
            Direct Comm
          </Link>
          <Link
            href="/dashboard/logs"
            className="block px-4 py-3 rounded-md hover:bg-brand-primary/10 hover:text-brand-primary transition-colors"
          >
            Site Logs
          </Link>
        </nav>

        <div className="p-4 border-t border-brand-primary/20">
          {/* Logout functionality will be wired here */}
          <button className="w-full text-left px-4 py-2 text-sm text-zinc-400 hover:text-brand-primary transition-colors">
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header fallback */}
        <header className="md:hidden border-b border-brand-primary/20 p-4 flex justify-between items-center bg-brand-canvas">
          <h2 className="text-lg font-bold text-brand-primary">BSC Portal</h2>
          <button className="text-brand-primary border border-brand-primary/30 px-3 py-1 rounded text-sm">
            Menu
          </button>
        </header>

        {/* Children (Specific Pages) load here */}
        <div className="p-6 md:p-10">{children}</div>
      </main>
    </div>
  );
}
