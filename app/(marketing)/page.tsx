import HeroSection from "@/components/HeroSection";
import ChatEstimator from "@/components/Intake/ChatEstimator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-brand-canvas">
      <HeroSection />

      {/* 2. THE FILTER: Automated Intake & Dossier Generation */}
      <section
        id="estimate"
        className="w-full py-20 px-4 md:px-8 bg-brand-canvas"
      >
        <div className="max-w-6xl mx-auto">
          {/* Top Context: The Event Horizon */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold uppercase tracking-widest text-brand-primary">
              Project Intake & AI Consultation
            </h2>
            <p className="mt-4 text-zinc-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Interact with our AI design consultant below to establish your
              project goals, preferred materials, and scope of work. The system
              will rapidly process your parameters to generate a preliminary
              quote range for your review.
            </p>
          </div>

          {/* The Estimator Component (Interactive Client Boundary) */}
          <div className=" p-4 md:p-8 mb-16">
            <ChatEstimator />
          </div>

          {/* Bottom Context: Systems Education for the Demographic */}
          <div className="max-w-3xl mx-auto text-center border-t border-brand-primary/20 pt-12">
            <h3 className="text-xl font-semibold uppercase text-brand-primary mb-4">
              Precision Requires Process
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              Traditional contracting relies on communication gaps and opaque
              estimations. By digitizing our process, we eliminate that
              friction.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              <br />
              Once your preliminary quote is generated, this system seamlessly
              transitions you into our authenticated Client Portal to schedule
              an on-site consulatation, finalize fixed-rate contracts, track
              milestone draws, review project documents, communicate directly
              with your contractor, and monitor timestamped daily site logs.
            </p>
          </div>
        </div>
      </section>

      {/* 3. BRAND AUTHORITY: Maintain below the fold */}
    </main>
  );
}
