"use client";

import React, { useState } from "react";

export default function LiveContract() {
  // STATE MANAGEMENT: Data bindings and UI toggle switch
  const [isEditing, setIsEditing] = useState(true);
  const [clientName, setClientName] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [projectNotes, setProjectNotes] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false); // Flip the switch to lock the document
  };

  return (
    <section className="border border-zinc-800 rounded-lg bg-zinc-900/20 relative overflow-hidden shadow-xl max-w-4xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary"></div>

      <div className="p-8 flex flex-col gap-6">
        <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-xl uppercase tracking-widest text-brand-primary mb-1">
              Preliminary Scope
            </h2>
            <p className="text-xs text-zinc-400 uppercase tracking-widest">
              Statement of Work & Parameters
            </p>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-zinc-400 hover:text-brand-primary uppercase tracking-widest transition-colors border border-zinc-700 hover:border-brand-primary px-4 py-2 rounded"
            >
              Edit Parameters
            </button>
          )}
        </div>

        {/* CONDITION 1: The Input Phase (isEditing === true) */}
        {isEditing ? (
          <form
            onSubmit={handleSave}
            className="flex flex-col gap-6 animate-in fade-in duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-zinc-500">
                  Authorized Client
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g., John Doe"
                  className="bg-zinc-900/50 border border-zinc-700 rounded p-4 text-white focus:outline-none focus:border-brand-primary transition-colors text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-zinc-500">
                  Site Location
                </label>
                <input
                  type="text"
                  required
                  value={siteAddress}
                  onChange={(e) => setSiteAddress(e.target.value)}
                  placeholder="e.g., 123 Main St, Anderson, IN"
                  className="bg-zinc-900/50 border border-zinc-700 rounded p-4 text-white focus:outline-none focus:border-brand-primary transition-colors text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500">
                Structural Objective
              </label>
              <textarea
                required
                value={projectNotes}
                onChange={(e) => setProjectNotes(e.target.value)}
                placeholder="Describe the desired outcome and design specifications..."
                rows={4}
                className="bg-zinc-900/50 border border-zinc-700 rounded p-4 text-white focus:outline-none focus:border-brand-primary transition-colors text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="self-end bg-brand-primary text-brand-canvas px-8 py-3 text-sm font-bold uppercase tracking-widest rounded hover:bg-white transition-colors"
            >
              Lock Parameters
            </button>
          </form>
        ) : (
          /* CONDITION 2: The Locked Contract Phase (isEditing === false) */
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="bg-zinc-900/40 border border-zinc-800 rounded p-6 shadow-inner space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-zinc-800/50 pb-6">
                <div>
                  <span className="text-zinc-500 uppercase text-xs tracking-widest block mb-1">
                    Client Authorization
                  </span>
                  <span className="text-white text-lg font-light tracking-wide">
                    {clientName}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase text-xs tracking-widest block mb-1">
                    Site Location
                  </span>
                  <span className="text-white text-lg font-light tracking-wide">
                    {siteAddress}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-zinc-500 uppercase text-xs tracking-widest block mb-2">
                  Project Directive
                </span>
                <p className="text-zinc-300 leading-relaxed font-light">
                  {projectNotes}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">
                This document serves as a preliminary outline. Final
                specifications, structural variables, and investment tiers are
                subject to change. Details to be discussed with Master
                Carpenter, Steven Clear.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
