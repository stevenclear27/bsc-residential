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
              Automated Quote Generator
            </h2>
            <p className="mt-4">
              Submit your project goals for an immediate scope of work and
              ballpark price range.
            </p>
          </div>

          {/* The isolated Phase 2 component is mounted here */}
          <ChatEstimator />
        </div>
      </section>
    </main>
  );
}
