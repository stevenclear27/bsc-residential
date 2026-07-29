export default function IntroSection() {
  return (
    <section className="w-full border-t border-brand-surface bg-brand-canvas py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 text-center lg:px-8">
        {/* Primary Introduction Frame */}
        <div className="max-w-3xl">
          <h2 className="text-3xl mb-8 font-bold tracking-tight text-brand-primary sm:text-4xl uppercase">
            Building Beyond Standard
          </h2>
          <div className="space-y-4 text-lg text-zinc-100 leading-relaxed">
            <p>
              High-end residential construction demands more than premium
              materials; it requires structural integrity and absolute
              transparency.
            </p>
            <p>
              BSC Residential engineers custom home upgrades and architectural
              modifications with rigid compliance. By operating on a
              single-point accountability system, we eliminate the friction of
              subcontractor hand-offs.
            </p>
            <p>
              From initial demolition to final walkthrough, clients maintain
              full visibility through a dedicated digital portal—ensuring every
              tolerance is met, and every deadline is tracked.
            </p>
          </div>
        </div>

        {/* Feature Grid: Rough-in for future service highlights */}
        <div className="mt-16 grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-start border border-brand-surface bg-brand-surface/50 p-8 text-left backdrop-blur-sm rounded-lg">
            <h3 className="text-xl font-semibold text-brand-primary">
              Structural Mastery
            </h3>
            <p className="mt-3 text-sm text-zinc-200">
              Forged through 30+ years of domain expertise. We execute precise
              custom framing and load-bearing alterations to guarantee
              uncompromised foundational stability.
            </p>
          </div>

          <div className="flex flex-col items-start border border-brand-surface bg-brand-surface/50 p-8 text-left backdrop-blur-sm rounded-lg">
            <h3 className="text-xl font-semibold text-brand-primary">
              Custom Upgrades
            </h3>
            <p className="mt-3 text-sm text-zinc-200">
              Boutique cabinetry, architectural millwork, and high-end
              remodeling. Every aesthetic modification is built to exact
              tolerances to elevate your environment.
            </p>
          </div>

          <div className="flex flex-col items-start border border-brand-surface bg-brand-surface/50 p-8 text-left backdrop-blur-sm rounded-lg">
            <h3 className="text-xl font-semibold text-brand-primary">
              Systematic Accountability
            </h3>
            <p className="mt-3 text-sm text-zinc-200">
              Zero subcontractor hand-offs and complete project transparency.
              Track milestone progress and site updates directly through your
              dedicated client portal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
