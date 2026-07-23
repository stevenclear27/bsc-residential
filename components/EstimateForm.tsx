"use client";

// --- Data Contracts (Easily Modifiable) ---
const TIMELINE_OPTIONS = [
  "Flexible (Standard Scheduling)",
  "Within 1-3 Months",
  "Next Year / Long Term",
];

const BUDGET_OPTIONS = [
  "Under $5,000 (Consultation Only)",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000+",
];

const SCOPE_OPTIONS = [
  "Structural Modification",
  "Custom Built-ins / Architectural Millwork",
  "Comprehensive Remodel",
  "Other (Specify below)",
];

export default function EstimateForm() {
  return (
    <form className="mt-10 border border-brand-surface bg-brand-surface/50 p-8 text-left backdrop-blur-sm max-w-3xl mx-auto rounded-lg">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        {/* Geographic Constraint */}
        <div className="sm:col-span-1">
          <label
            htmlFor="zip-code"
            className="block text-sm font-medium leading-6 opacity-90"
          >
            Project Zip Code
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="zip-code"
              name="zip-code"
              maxLength={5}
              required
              className="block w-full rounded-md border-0 bg-brand-canvas py-2.5 px-3 ring-1 ring-inset ring-brand-surface focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              placeholder="e.g., 46012"
            />
          </div>
        </div>

        {/* Timeline Constraint */}
        <div className="sm:col-span-1">
          <label
            htmlFor="timeline"
            className="block text-sm font-medium leading-6 opacity-90"
          >
            Desired Start Date
          </label>
          <div className="mt-2">
            <select
              id="timeline"
              name="timeline"
              className="block w-full rounded-md border-0 bg-brand-canvas py-2.5 px-3 ring-1 ring-inset ring-brand-surface focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
            >
              {TIMELINE_OPTIONS.map((option) => (
                <option key={option} value={option} className="bg-brand-canvas">
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Financial Floor Constraint */}
        <div className="sm:col-span-2">
          <label
            htmlFor="budget"
            className="block text-sm font-medium leading-6 opacity-90"
          >
            Anticipated Capital Allocation
          </label>
          <div className="mt-2">
            <select
              id="budget"
              name="budget"
              className="block w-full rounded-md border-0 bg-brand-canvas py-2.5 px-3 ring-1 ring-inset ring-brand-surface focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
            >
              {BUDGET_OPTIONS.map((option) => (
                <option key={option} value={option} className="bg-brand-canvas">
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scope Definition */}
        <div className="sm:col-span-2">
          <label
            htmlFor="project-type"
            className="block text-sm font-medium leading-6 opacity-90"
          >
            Project Scope
          </label>
          <div className="mt-2">
            <select
              id="project-type"
              name="project-type"
              className="block w-full rounded-md border-0 bg-brand-canvas py-2.5 px-3 ring-1 ring-inset ring-brand-surface focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
            >
              {SCOPE_OPTIONS.map((option) => (
                <option key={option} value={option} className="bg-brand-canvas">
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Narrative Definition */}
        <div className="sm:col-span-2">
          <label
            htmlFor="details"
            className="block text-sm font-medium leading-6 opacity-90"
          >
            Project Details & Current State
          </label>
          <div className="mt-2">
            <textarea
              id="details"
              name="details"
              rows={5}
              required
              className="block w-full rounded-md border-0 bg-brand-canvas py-2 px-3 ring-1 ring-inset ring-brand-surface focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
              placeholder="Detail the existing structure and your target functional outcome..."
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-brand-primary px-6 py-2.5 text-sm font-semibold text-brand-canvas shadow-sm hover:opacity-90 transition-opacity"
        >
          Submit Project Brief
        </button>
      </div>
    </form>
  );
}
