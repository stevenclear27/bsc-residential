import React from "react";

export default function AccountabilityLedger() {
  return (
    <section className="flex-1 min-h-100 border border-zinc-800 rounded-lg flex flex-col bg-zinc-900/20 overflow-hidden shadow-xl">
      <header className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
        <div>
          <h2 className="text-sm uppercase tracking-widest text-brand-primary">
            Accountability Ledger
          </h2>
          <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">
            Secure Communications Feed
          </p>
        </div>
        <div className="h-2 w-2 bg-brand-primary rounded-full animate-pulse"></div>
      </header>
      <div className="flex-1 p-8 flex items-center justify-center text-zinc-600 uppercase tracking-widest text-xs">
        Ledger initialization pending database architecture...
      </div>
    </section>
  );
}
