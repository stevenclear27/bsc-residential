import EstimateForm from "@/components/EstimateForm";

export default function EstimatePage() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-6 bg-brand-canvas">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-50 sm:text-5xl uppercase">
          Project Initiation
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-400 mb-12">
          Provide the structural baseline of your project below. A thorough
          brief allows us to determine if your requirements align with our
          operational capabilities.
        </p>

        {/* Isolated Client Component */}
        <EstimateForm />
      </div>
    </main>
  );
}
