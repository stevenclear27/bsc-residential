export default function IntroSection() {
  return (
    <section className="w-full border-t border-brand-surface bg-brand-canvas py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 text-center lg:px-8">
        {/* Primary Introduction Frame */}
        <div className="max-w-3xl">
          <h2 className="text-3xl mb-8 font-bold tracking-tight text-brand-primary sm:text-4xl uppercase">
            Structural Integrity & Premium Restoration
          </h2>
          <div className="space-y-4 text-lg text-zinc-100 leading-relaxed">
            <p>
              High-end residential construction demands more than premium
              materials; it requires uncompromising structural precision.
            </p>
            <p>
              Whether executing boutique custom upgrades or rebuilding
              compromised structural envelopes, BSC Residential engineers every
              modification to rigid compliance.
            </p>
            <p>
              From emergency exterior stabilization to final custom interior
              finish work, your property is restored to an exacting master-level
              standard.
            </p>
          </div>
        </div>

        {/* Feature Grid: High-Scannability Service Modules */}
        <div className="mt-16 grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Node 1: Exterior / Envelope */}
          <div className="flex flex-col items-start border border-brand-surface bg-brand-surface/50 p-8 text-left backdrop-blur-sm rounded-lg">
            <h3 className="text-xl font-semibold text-brand-primary mb-4 uppercase tracking-widest text-sm">
              Exterior & Envelope Systems
            </h3>
            <ul className="text-sm text-zinc-200 space-y-3 w-full">
              <li className="flex gap-2">
                <span className="text-brand-primary">▹</span> Dimensional roof
                replacement
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary">▹</span> Architectural
                siding repair & installation
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary">▹</span> Load-bearing
                structural stabilization
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary">▹</span> Secondary water
                intrusion mitigation
              </li>
            </ul>
          </div>

          {/* Node 2: Interior / Trim */}
          <div className="flex flex-col items-start border border-brand-surface bg-brand-surface/50 p-8 text-left backdrop-blur-sm rounded-lg">
            <h3 className="text-xl font-semibold text-brand-primary mb-4 uppercase tracking-widest text-sm">
              Interior Rebuilds & Finish
            </h3>
            <ul className="text-sm text-zinc-200 space-y-3 w-full">
              <li className="flex gap-2">
                <span className="text-brand-primary">▹</span> Custom
                architectural millwork & trim
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary">▹</span> Hardwood & premium
                flooring replacement
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary">▹</span> Drywall
                replacement & paint matching
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary">▹</span> Water-damage
                structural framing
              </li>
            </ul>
          </div>

          {/* Node 3: Custom / Decks (Maintaining Core Brand) */}
          <div className="flex flex-col items-start border border-brand-surface bg-brand-surface/50 p-8 text-left backdrop-blur-sm rounded-lg">
            <h3 className="text-xl font-semibold text-brand-primary mb-4 uppercase tracking-widest text-sm">
              Custom Builds & Decking
            </h3>
            <ul className="text-sm text-zinc-200 space-y-3 w-full">
              <li className="flex gap-2">
                <span className="text-brand-primary">▹</span> Premium composite
                & wood deck replacement
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary">▹</span> High-end cabinetry
                & remodeling
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary">▹</span> Boutique outdoor
                living structures
              </li>
              <li className="flex gap-2">
                <span className="text-brand-primary">▹</span> Code-compliant
                structural upgrades
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
