"use client";

export default function EstimateForm() {
  return (
    <form className="mt-10 border border-zinc-800 bg-zinc-900/30 p-8 text-left backdrop-blur-sm max-w-3xl mx-auto">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        {/* Geographic Constraint */}
        <div className="sm:col-span-1">
          <label
            htmlFor="zip-code"
            className="block text-sm font-medium leading-6 text-zinc-300"
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
              className="block w-full rounded-md border-0 bg-zinc-950 py-2.5 px-3 text-zinc-50 ring-1 ring-inset ring-zinc-800 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              placeholder="e.g., 46012"
            />
          </div>
        </div>

        {/* Timeline Constraint */}
        <div className="sm:col-span-1">
          <label
            htmlFor="timeline"
            className="block text-sm font-medium leading-6 text-zinc-300"
          >
            Desired Start Date
          </label>
          <div className="mt-2">
            <select
              id="timeline"
              name="timeline"
              className="block w-full rounded-md border-0 bg-zinc-950 py-2.5 px-3 text-zinc-50 ring-1 ring-inset ring-zinc-800 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            >
              <option>Flexible (Standard Scheduling)</option>
              <option>Within 1-3 Months</option>
              <option>Next Year / Long Term</option>
            </select>
          </div>
        </div>

        {/* Financial Floor Constraint */}
        <div className="sm:col-span-2">
          <label
            htmlFor="budget"
            className="block text-sm font-medium leading-6 text-zinc-300"
          >
            Anticipated Capital Allocation
          </label>
          <div className="mt-2">
            <select
              id="budget"
              name="budget"
              className="block w-full rounded-md border-0 bg-zinc-950 py-2.5 px-3 text-zinc-50 ring-1 ring-inset ring-zinc-800 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            >
              <option>Under $5,000 (Consultation Only)</option>
              <option>$5,000 - $15,000</option>
              <option>$15,000 - $50,000</option>
              <option>$50,000+</option>
            </select>
          </div>
        </div>

        {/* Scope Definition */}
        <div className="sm:col-span-2">
          <label
            htmlFor="project-type"
            className="block text-sm font-medium leading-6 text-zinc-300"
          >
            Project Scope
          </label>
          <div className="mt-2">
            <select
              id="project-type"
              name="project-type"
              className="block w-full rounded-md border-0 bg-zinc-950 py-2.5 px-3 text-zinc-50 ring-1 ring-inset ring-zinc-800 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            >
              <option>Structural Modification</option>
              <option>Custom Built-ins / Architectural Millwork</option>
              <option>Comprehensive Remodel</option>
              <option>Other (Specify below)</option>
            </select>
          </div>
        </div>

        {/* Narrative Definition */}
        <div className="sm:col-span-2">
          <label
            htmlFor="details"
            className="block text-sm font-medium leading-6 text-zinc-300"
          >
            Project Details & Current State
          </label>
          <div className="mt-2">
            <textarea
              id="details"
              name="details"
              rows={5}
              required
              className="block w-full rounded-md border-0 bg-zinc-950 py-2 px-3 text-zinc-50 ring-1 ring-inset ring-zinc-800 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              placeholder="Detail the existing structure and your target functional outcome..."
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-200 transition-colors"
        >
          Submit Project Brief
        </button>
      </div>
    </form>
  );
}
