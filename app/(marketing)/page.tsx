import FemaHero from "@/components/DisasterRelief/FemaHero";
import ChatEstimator from "@/components/Intake/ChatEstimator";

// PEACETIME COMPONENTS PRESERVED FOR FAST REVERSION
// import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-brand-canvas">
      {/* 1. THE HOOK: FEMA Interceptor */}
      <FemaHero />

      {/* 2. THE FILTER: Automated Intake & Dossier Generation */}
      <section
        id="estimate"
        className="w-full py-20 px-4 md:px-8 bg-brand-canvas"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold uppercase tracking-widest text-brand-primary">
              SYSTEM INTAKE & DAMAGE ASSESSMENT{" "}
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
              Submit property damage parameters and visual evidence below. Our
              automated triage system will process your data to generate a
              preliminary scope of work, aligning your structural baseline with
              insurance carrier requirements and standard repair protocols.
            </p>
          </div>

          {/* Your existing complex intake logic remains untouched */}
          <ChatEstimator />
        </div>
      </section>

      {/* 3. BRAND AUTHORITY: Maintain below the fold */}
    </main>
  );
}
