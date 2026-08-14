"use client";

import React from "react";

export interface DossierSummaryCardProps {
  dossier: {
    projectTitle: string;
    assumedScope: string;
    projectPhases: {
      phaseName: string;
      description: string;
    }[];
  };
  onAcknowledge: () => void;
  // Enforce strict typing for the new prop
  isAuthenticated?: boolean;
}

export default function DossierSummaryCard({
  dossier,
  onAcknowledge,
  isAuthenticated = false,
}: DossierSummaryCardProps) {
  return (
    <div className="bg-brand-canvas border border-brand-primary/30 p-8 rounded-lg shadow-2xl flex flex-col gap-8 max-w-3xl mx-auto">
      <header className="border-b border-zinc-800 pb-4 text-center">
        <h2 className="text-sm uppercase tracking-widest text-brand-primary mb-2">
          Design Consultation Complete
        </h2>
        <h3 className="text-3xl font-light text-white">
          {dossier.projectTitle}
        </h3>
      </header>

      <section className="bg-zinc-900/50 p-6 rounded border border-zinc-800">
        <h4 className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
          Proposed Scope of Work
        </h4>
        <p className="text-zinc-300 leading-relaxed text-lg">
          {dossier.assumedScope}
        </p>
      </section>

      <section className="bg-brand-primary/10 p-8 rounded border border-brand-primary/30 text-center">
        <h4 className="text-xl text-brand-primary mb-3 font-medium">
          {isAuthenticated
            ? "Append to Active Ledger"
            : "Secure Your Project Blueprint"}
        </h4>
        <p className="text-sm text-zinc-300 mb-8 max-w-lg mx-auto">
          {isAuthenticated
            ? "Your preliminary design data has been synthesized. Click below to save this new structural outline directly to your existing client portfolio."
            : "Your preliminary design data has been synthesized. To permanently save this dossier, unlock direct messaging with our Master Carpenter, and schedule your on-site structural consultation, initialize your secure client portal below."}
        </p>

        <button
          onClick={onAcknowledge}
          className="w-full px-8 py-5 bg-brand-primary text-brand-canvas font-bold uppercase tracking-widest hover:bg-white transition-colors rounded shadow-lg text-sm"
        >
          {isAuthenticated
            ? "Save Blueprint to Ledger"
            : "Initialize Client Portal"}
        </button>
      </section>
    </div>
  );
}
