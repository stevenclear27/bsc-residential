import QuoteEstimator from "./QuoteEstimator";

export default function HeroSection() {
  return (
    <section className="mx-auto flex w-full flex-col items-center text-center py-24 lg:py-32 px-6 bg-brand-canvas">
      <div className="max-w-4xl">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl text-zinc-50">
          Precision in Every Detail.
        </h1>
        <p className="mt-6 mx-auto max-w-2xl text-lg leading-8 text-zinc-400">
          Uncompromising custom carpentry, architectural upgrades, and high-end
          remodeling. Built for those who demand structural integrity and
          flawless execution.
        </p>

        {/* The Isolated Client Component */}
        <QuoteEstimator />
      </div>
    </section>
  );
}
