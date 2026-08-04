// src/components/PortfolioSection.tsx
import { projects } from "@/lib/data/portfolio";
import ProjectGallery from "./ProjectGallery";

export default function PortfolioSection() {
  // Filter the data at the server level
  const customBuilds = projects.filter(
    (p) => p.projectScale === "custom-build",
  );
  const serviceAgreements = projects.filter(
    (p) => p.projectScale === "service-agreement",
  );

  return (
    <section className="w-full bg-brand-canvas py-24" id="portfolio">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-brand-primary sm:text-5xl">
            THE PORTFOLIO
          </h2>
          <div className="mt-4 mx-auto h-1 w-24 bg-brand-primary rounded-full"></div>
          <p className="mt-6 text-lg text-zinc-300 max-w-2xl mx-auto">
            A verified ledger of uncompromising custom carpentry and high-end
            remodeling. Built for structural integrity.
          </p>
        </div>

        {/* CUSTOM BUILDS SECTION */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-zinc-100 mb-8 border-l-4 border-brand-primary pl-4">
            Custom Builds & Enclosures
          </h3>
          <ProjectGallery projects={customBuilds} />
        </div>

        {/* SERVICE AGREEMENTS SECTION */}
        {serviceAgreements.length > 0 && (
          <div>
            <h3 className="text-3xl font-bold text-zinc-100 mb-8 border-l-4 border-brand-primary pl-4">
              Service Agreements & Short-Duration Builds
            </h3>
            <p className="text-zinc-400 mb-8 max-w-3xl">
              High-velocity structural repairs, architectural upgrades, and
              precision custom work executed as independent short-duration
              contracts.
            </p>
            <ProjectGallery projects={serviceAgreements} />
          </div>
        )}
      </div>
    </section>
  );
}
