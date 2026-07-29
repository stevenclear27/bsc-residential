import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import ChatEstimator from "@/components/Intake/ChatEstimator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-brand-canvas">
      <HeroSection />
      <IntroSection />

      {/* Automated Intake / Filter Section */}
      <section
        id="estimate"
        className="w-full py-20 px-4 md:px-8 border-t border-brand-surface"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold uppercase tracking-widest">
              INSTANT PROJECT FEASIBILITY & ESTIMATOR
            </h2>
            <p className="mt-4 text-zinc-200">
              Submit project specs and site photos to receive an immediate
              preliminary scope and target investment tier. Qualified
              submissions receive direct portal access to schedule an on-site
              structural consultation.
            </p>
          </div>

          {/* The isolated Phase 2 component is mounted here */}
          <ChatEstimator />
        </div>
      </section>
    </main>
  );
}
