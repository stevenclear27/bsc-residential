"use client";

import React from "react";

// 1. Define the exact shape of the data we expect to receive
interface DossierSummaryCardProps {
  onAcknowledge: () => void;
  projectData: {
    name?: string;
    projectScope?: string;
    materialTier?: string;
    timeline?: string;
    ballparkEstimate?: string; // e.g., "$15,000 - $22,000"
  };
}

export default function DossierSummaryCard({
  onAcknowledge,
  projectData,
}: DossierSummaryCardProps) {
  // 2. Fallback check: If data hasn't loaded, don't crash the system
  if (!projectData) return null;

  return (
    <div className="bg-brand-surface border border-brand-primary/20 rounded-lg overflow-hidden mt-6">
      <div className="p-6 border-b border-brand-primary/20 bg-brand-canvas">
        <h3 className="text-xl font-bold text-brand-primary uppercase tracking-wide">
          Preliminary Project Dossier
        </h3>
        <p className="text-sm text-brand-primary/80 mt-1">
          Review the initial parameters before locking in your onsite
          verification.
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-2">
            Scope of Work
          </h4>
          <p className="text-sm text-zinc-300 leading-relaxed bg-brand-canvas/50 p-4 rounded border border-brand-primary/10">
            {projectData.projectScope || "Scope parameters pending..."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-1">
              Material Tier
            </h4>
            <p className="text-sm text-zinc-300">
              {projectData.materialTier || "TBD"}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-1">
              Target Timeline
            </h4>
            <p className="text-sm text-zinc-300">
              {projectData.timeline || "TBD"}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-brand-primary/20">
          <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-2">
            Estimated Ballpark Range
          </h4>
          <p className="text-3xl font-black text-brand-primary tracking-tighter">
            {projectData.ballparkEstimate || "Requires Onsite Diagnostic"}
          </p>
          <p className="text-xs text-zinc-500 mt-2 max-w-xl">
            *This is an algorithmic approximation based on the structural
            parameters provided. A fixed-price contract requires physical site
            verification and exact material takeoffs.
          </p>
        </div>
      </div>

      <div className="p-6 bg-brand-canvas flex justify-end border-t border-brand-primary/20">
        <button
          onClick={onAcknowledge}
          className="px-6 py-3 bg-brand-accent text-brand-primary rounded font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          Acknowledge & Schedule Onsite
        </button>
      </div>
    </div>
  );
}
