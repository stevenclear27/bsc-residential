import React from "react";

export default async function ClientDashboardPage() {
  return (
    <div className="min-h-screen bg-brand-canvas text-white flex flex-col">
      <header className="w-full bg-zinc-900 border-b border-brand-primary/30 p-8 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col gap-2">
          <h1 className="text-3xl font-light tracking-wide text-brand-primary uppercase">
            BSC Residential
          </h1>
          <p className="text-sm text-zinc-400 uppercase tracking-widest">
            Master Carpenter: Steven Clear | Private Client Ledger
          </p>
        </div>
      </header>
      <main className="flex-1 w-full max-w-6xl mx-auto p-8 flex flex-col gap-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-zinc-800 rounded-lg p-8 bg-zinc-900/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary"></div>
          <div className="flex flex-col gap-4">
            <h2 className="text-lg uppercase tracking-widest text-brand-primary">
              Project Parameters
            </h2>
            <p className="text-sm text-zinc-400">
              Client details and site specifications will be securely captured
              here via dynamic input.
            </p>
          </div>
          <div className="flex flex-col gap-4 border-l border-zinc-800 pl-8">
            <h2 className="text-lg uppercase tracking-widest text-brand-primary">
              Preliminary Scope
            </h2>
            <p className="text-sm text-zinc-400">
              The synthesized dossier will be rendered here as a formal
              statement of work.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
