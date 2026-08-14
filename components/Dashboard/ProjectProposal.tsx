// components/Dashboard/ProjectProposal.tsx
"use client";

import React from "react";
// Assuming you have a types file, otherwise use 'any' temporarily while testing
interface ProjectProposalProps {
  project: any;
}

export default function ProjectProposal({ project }: ProjectProposalProps) {
  // If the server hasn't hydrated the project yet (LedgerSync is running), show a loading/draft state
  if (!project) {
    return (
      <div className="bg-zinc-50 border border-zinc-300 p-8 md:p-12 animate-pulse text-center">
        <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">
          Synthesizing Structural Dossier...
        </p>
      </div>
    );
  }

  // Parse the JSON phases safely from the database payload
  const phases = project.project_phases || [];

  // Logic to determine active tier based on the database ceiling/floor
  let activeTier = null;
  const floor = project.investment_floor;
  if (floor) {
    if (floor < 5000) activeTier = 1;
    else if (floor < 15000) activeTier = 2;
    else if (floor < 30000) activeTier = 3;
    else if (floor < 60000) activeTier = 4;
    else activeTier = 5;
  }

  const investmentTiers = [
    { id: 1, label: "< $5k" },
    { id: 2, label: "$5k — $15k" },
    { id: 3, label: "$15k — $30k" },
    { id: 4, label: "$30k — $60k" },
    { id: 5, label: "$60k+" },
  ];

  return (
    <div className="bg-zinc-50 rounded-sm shadow-md border border-zinc-300 p-8 md:p-12 text-zinc-900">
      <header className="border-b-2 border-zinc-800 pb-6 mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold uppercase tracking-widest text-zinc-900">
            {project.project_title || "Preliminary Dossier"}
          </h2>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-2 font-semibold">
            BSC Residential LLC | Structural Outline
          </p>
        </div>
      </header>

      <div className="mb-10">
        <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-3 border-b border-zinc-300 pb-2">
          Executive Summary
        </h3>
        <p className="text-zinc-800 leading-relaxed text-base font-medium">
          {project.assumed_scope || "Scope pending formal verification."}
        </p>
      </div>

      <div className="mb-12">
        <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4 border-b border-zinc-300 pb-2">
          Proposed Phased Execution
        </h3>
        <div className="flex flex-col space-y-6">
          {phases.map((phase: any, idx: number) => (
            <div
              key={idx}
              className="pl-5 border-l-4 border-brand-primary py-1"
            >
              <h4 className="text-zinc-900 text-sm font-bold tracking-widest uppercase mb-1">
                {phase.phaseName}
              </h4>
              <p className="text-zinc-700 text-sm leading-relaxed font-medium">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-sm p-6 shadow-sm mt-8">
        <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4 flex justify-between items-end">
          <span>Target Investment Tier</span>
        </h3>
        <div className="w-full flex rounded-sm overflow-hidden border border-zinc-300 bg-zinc-100 shadow-inner h-12">
          {investmentTiers.map((tier) => {
            const isActive = activeTier === tier.id;
            return (
              <div
                key={tier.id}
                className={`flex-1 flex items-center justify-center border-r border-zinc-300 transition-all duration-500 ${
                  isActive
                    ? "bg-brand-primary text-zinc-900 font-bold shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]"
                    : "text-zinc-500 font-medium opacity-70"
                }`}
              >
                <span className="text-[10px] md:text-xs tracking-widest uppercase whitespace-nowrap px-1">
                  {tier.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
