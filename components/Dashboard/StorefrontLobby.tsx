import React from "react";

export default function StorefrontLobby() {
  return (
    <header className="w-full bg-zinc-900 border-b border-brand-primary/30 p-8 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-light tracking-wide text-brand-primary uppercase">
            BSC Residential
          </h1>
          <p className="text-sm text-zinc-400 uppercase tracking-widest">
            Master Carpenter: Steven Clear | Private Client Ledger
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-zinc-500 uppercase tracking-widest">
            Status
          </div>
          <div className="text-sm text-brand-primary uppercase tracking-widest font-bold">
            Intake Phase
          </div>
        </div>
      </div>
    </header>
  );
}
