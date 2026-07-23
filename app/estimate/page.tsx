import EstimateForm from "@/components/EstimateForm";

export default function EstimatePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start w-full py-24 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl uppercase">
          Project Initiation
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto">
          Provide the structural baseline of your project below. A thorough
          brief allows us to determine if your requirements align with our
          operational capabilities.
        </p>

        <EstimateForm />
      </div>
    </main>
  );
}
