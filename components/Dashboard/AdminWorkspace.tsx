"use client";

import React, { useState } from "react";
// You can import the existing AccountabilityLedger here later to reuse the chat component for the admin side

interface AdminWorkspaceProps {
  projects: any[];
}

export default function AdminWorkspace({ projects }: AdminWorkspaceProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  // Find the full project object based on the active selection
  const activeProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* COLUMN 1: THE INBOX (Project List) */}
      <div className="md:col-span-1 bg-brand-surface border border-brand-primary/20 p-6 rounded shadow-xl flex flex-col h-[700px]">
        <h2 className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-4 border-b border-zinc-800 pb-2">
          Active Deployments
        </h2>
        <p className="text-xs text-zinc-400 mb-4">
          Total Projects: {projects.length}
        </p>

        <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-2">
          {projects.length === 0 ? (
            <div className="text-xs text-zinc-500 uppercase tracking-widest text-center mt-10">
              No active ledgers detected.
            </div>
          ) : (
            projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProjectId(project.id)}
                className={`p-4 border rounded text-left transition-colors flex flex-col gap-1 ${
                  selectedProjectId === project.id
                    ? "bg-brand-primary/10 border-brand-primary text-white"
                    : "bg-zinc-900/50 border-zinc-800 hover:border-brand-primary/50 text-zinc-300"
                }`}
              >
                <span className="text-sm font-medium truncate w-full">
                  {project.project_title}
                </span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                  Client: {project.profiles?.first_name || "Pending"}{" "}
                  {project.profiles?.last_name || ""}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* COLUMN 2 & 3: THE DOSSIER (Project Details) */}
      <div className="md:col-span-2 bg-brand-surface border border-brand-primary/20 p-6 rounded shadow-xl h-[700px] overflow-y-auto custom-scrollbar">
        {!activeProject ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <p className="text-zinc-600 uppercase tracking-widest text-sm font-bold">
              Select a project to load structural parameters
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8 animate-in fade-in duration-300">
            <header className="border-b border-zinc-800 pb-4">
              <h3 className="text-2xl font-light text-brand-primary uppercase tracking-wide">
                {activeProject.project_title}
              </h3>
              <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">
                Phase: {activeProject.status || "Intake Phase"}
              </p>
            </header>

            <section className="bg-zinc-900/50 border border-zinc-800 p-6 rounded">
              <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-4 font-bold border-b border-zinc-800 pb-2">
                Assumed Scope
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {activeProject.assumed_scope}
              </p>
            </section>

            {/* We will eventually mount the Admin version of the AccountabilityLedger here to reply to chats */}
            <section className="bg-brand-primary/5 border border-brand-primary/20 p-6 rounded flex items-center justify-center h-48">
              <span className="text-xs text-brand-primary/50 uppercase tracking-widest font-bold">
                [Communications Link Pending]
              </span>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
