"use client";

import React, { useState } from "react";

export default function QuoteEstimator() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-10 flex flex-col items-center w-full max-w-2xl mx-auto">
      {/* Primary Action Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md bg-brand-primary px-8 py-4 text-base font-bold text-brand-canvas shadow-lg hover:opacity-90 transition-opacity uppercase tracking-wide"
      >
        {isOpen ? "Close Estimator" : "Online Quote"}
      </button>

      {/* Slide-Down Estimator Panel */}
      <div
        className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100 mt-8" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="border border-brand-surface bg-brand-surface/50 p-8 rounded-lg backdrop-blur-sm text-left shadow-xl">
          <h3 className="text-xl font-bold text-zinc-50 uppercase border-b border-brand-surface pb-4 mb-6">
            Project Dossier Initiation
          </h3>

          <form className="flex flex-col gap-6">
            {/* Scope Narrative */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Scope of Work & Current State
              </label>
              <textarea
                rows={4}
                className="w-full rounded-md border-0 bg-brand-canvas py-3 px-4 text-zinc-50 ring-1 ring-inset ring-brand-surface focus:ring-2 focus:ring-brand-primary sm:text-sm"
                placeholder="Describe the existing structure and your functional requirements..."
              />
            </div>

            {/* Visual Data (Photo Upload Placeholder) */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Visual Data (Upload Site Photos)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-brand-surface border-dashed rounded-lg cursor-pointer bg-brand-canvas hover:bg-brand-surface/30 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <span className="text-brand-primary text-2xl mb-2">↑</span>
                    <p className="mb-2 text-sm text-zinc-400">
                      <span className="font-semibold text-zinc-300">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-zinc-500">PNG, JPG up to 10MB</p>
                  </div>
                  <input type="file" className="hidden" multiple />
                </label>
              </div>
            </div>

            {/* Execution Button */}
            <button
              type="button"
              className="mt-4 w-full rounded-md bg-brand-secondary px-4 py-3 text-sm font-semibold text-brand-canvas shadow-sm hover:opacity-90 transition-opacity"
            >
              Generate Ballpark Estimate
            </button>
          </form>

          <p className="mt-4 text-xs text-zinc-500 text-center leading-relaxed">
            *Estimates generated are operational baselines. Final fixed-rate
            contracts require a physical site verification to confirm structural
            tolerances and material logistics.
          </p>
        </div>
      </div>
    </div>
  );
}
