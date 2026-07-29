export default function IntroSection() {
  return (
    <section className="w-full border-t border-brand-surface bg-brand-canvas py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 text-center lg:px-8">
        {/* Primary Introduction Frame */}
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-brand-primary sm:text-4xl uppercase">
            Building Beyond Standard
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-200">
            High-end construction fails when communication breaks down and
            tolerances are ignored. BSC Residential operates as a single-point
            master craftsman model: zero sub-contractor hand-offs, rigid
            structural compliance, and full client portal visibility.
          </p>
        </div>

        {/* Feature Grid: Rough-in for future service highlights */}
        <div className="mt-16 grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-start border border-brand-surface bg-brand-surface/50 p-8 text-left backdrop-blur-sm rounded-lg">
            <h3 className="text-xl font-semibold text-brand-primary">
              Structural Mastery
            </h3>
            <p className="mt-3 text-sm text-zinc-200">
              [Placeholder: Detail on framing, foundation, and 30+ years of
              domain expertise.]
            </p>
          </div>

          <div className="flex flex-col items-start border border-brand-surface bg-brand-surface/50 p-8 text-left backdrop-blur-sm rounded-lg">
            <h3 className="text-xl font-semibold text-brand-primary">
              Custom Upgrades
            </h3>
            <p className="mt-3 text-sm text-zinc-200">
              [Placeholder: Detail on boutique cabinetry, trim, and aesthetic
              modifications.]
            </p>
          </div>

          <div className="flex flex-col items-start border border-brand-surface bg-brand-surface/50 p-8 text-left backdrop-blur-sm rounded-lg">
            <h3 className="text-xl font-semibold text-brand-primary">
              Systematic Accountability
            </h3>
            <p className="mt-3 text-sm text-zinc-200">
              [Placeholder: Detail on project transparency, client portals, and
              milestone tracking.]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
