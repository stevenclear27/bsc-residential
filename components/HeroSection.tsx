export default function HeroSection() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center text-center">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
        Precision in Every Detail.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
        Uncompromising custom carpentry, architectural upgrades, and high-end
        remodeling. Built for those who demand structural integrity and flawless
        execution.
      </p>

      {/* Future Component Anchor: Primary CTA */}
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <button className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-200 transition-colors">
          Request an Estimate
        </button>
        <button className="text-sm font-semibold leading-6 text-white hover:text-zinc-300 transition-colors">
          View the Portfolio <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
