"use client";

import React from "react";

interface DossierSummaryCardProps {
  onAcknowledge: () => void;
}

export default function DossierSummaryCard({
  onAcknowledge,
}: DossierSummaryCardProps) {
  return (
    <div className="p-6 border-t border-brand-primary/20 bg-brand-surface/50 flex flex-col md:flex-row items-center justify-between gap-4 mt-6 rounded-b-lg">
      <div>
        <h4 className="text-sm font-bold text-brand-primary uppercase tracking-wider">
          Project Dossier Compiled
        </h4>
        <p className="text-xs text-brand-primary/80">
          Ready for Master Carpenter physical verification.
        </p>
      </div>
      <button
        onClick={onAcknowledge}
        className="px-6 py-3 bg-brand-primary text-brand-canvas rounded hover:bg-brand-primary/90 font-bold uppercase tracking-widest transition-colors"
      >
        Acknowledge Terms & Schedule
      </button>
    </div>
  );
}
