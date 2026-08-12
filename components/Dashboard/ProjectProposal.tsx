"use client";

import React, { useEffect, useState } from "react";

interface PhaseProp {
  phaseName: string;
  description: string;
}

interface ProjectProposalProps {
  investmentRange?: {
    floor: string;
    ceiling: string;
  };
}

export default function ProjectProposal({
  investmentRange: initialRange,
}: ProjectProposalProps) {
  // 1. Establish State
  const [range, setRange] = useState(initialRange);
  const [phases, setPhases] = useState<PhaseProp[]>([
    {
      phaseName: "1. Site Prep & Protection",
      description:
        "Establishment of dust barriers, floor protection, and material staging zones.",
    },
    {
      phaseName: "2. Demolition",
      description:
        "Selective removal of existing assemblies to expose structural framework.",
    },
    {
      phaseName: "3. The Build",
      description:
        "Core structural framing, mechanical rough-ins, and substrate installation.",
    },
    {
      phaseName: "4. The Finish",
      description:
        "Installation of architectural millwork, paint, and final mechanical trims.",
    },
  ]);

  // 2. Hydrate from Cache on Component Mount
  useEffect(() => {
    const cachedDossier = sessionStorage.getItem("bsc_pending_dossier");
    if (cachedDossier) {
      try {
        const parsedData = JSON.parse(cachedDossier);

        // Inject the cached AI calculations into the UI
        if (parsedData.investmentRange) {
          setRange(parsedData.investmentRange);
        }
        if (parsedData.projectPhases && parsedData.projectPhases.length > 0) {
          setPhases(parsedData.projectPhases);
        }
      } catch (error) {
        console.error("Failed to parse cached dossier:", error);
      }
    }
  }, []);

  return (
    <section className="bg-brand-canvas border border-zinc-800 rounded-lg shadow-xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary"></div>

      <header className="bg-zinc-900/40 border-b border-zinc-800 p-6">
        <h2 className="text-xl uppercase tracking-widest text-brand-primary">
          Initial Project Proposal
        </h2>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mt-2">
          Statement of Work & Phased Execution
        </p>
      </header>

      <div className="p-6 space-y-8">
        <div>
          <h3 className="text-sm uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-800 pb-2">
            Executive Summary
          </h3>
          <p className="text-zinc-300 font-light leading-relaxed">
            This proposal synthesizes the initial design consultation into
            actionable structural parameters. The following phases outline the
            anticipated load path for executing the build, subject to formal
            site verification.
          </p>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest text-zinc-400 mb-4 border-b border-zinc-800 pb-2">
            Project Phasing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phases.map((phase, idx) => (
              <div
                key={idx}
                className="bg-zinc-900/50 border border-zinc-800 p-4 rounded shadow-inner"
              >
                <h4 className="text-brand-primary text-sm font-bold tracking-widest uppercase mb-2">
                  {phase.phaseName}
                </h4>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-brand-primary/5 border border-brand-primary/20 rounded p-6 mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-brand-primary uppercase tracking-widest font-bold">
              Target Investment Tier
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Based on assumed linear footage and material specifications.
            </p>
          </div>

          <div className="text-2xl font-light text-white tracking-wider">
            {range ? `${range.floor} — ${range.ceiling}` : "$ Calculating..."}
          </div>
        </div>
      </div>
    </section>
  );
}
