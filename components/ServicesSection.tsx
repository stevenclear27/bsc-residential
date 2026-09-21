import React from "react";
import OperatorProfile from "./OperatorProfile";

// Strict typing mandatory to prevent runtime failures[cite: 7, 8]
interface ServiceItem {
  title: string;
  description: string;
  features: string[];
}

// Extracted data structure allows for frictionless future copy modifications
const services: ServiceItem[] = [
  {
    title: "Exterior Stabilization",
    description: "Securing properties against harsh winter conditions.",
    features: [
      "Architectural Siding Replacement",
      "Window & Door Installation",
      "Four-Season Patio Enclosures",
    ],
  },
  {
    title: "Boutique Carpentry",
    description: "High-end custom builds and finish work.",
    features: [
      "Custom Architectural Millwork",
      "Engineered Decking Systems",
      "Perimeter Fencing Solutions",
    ],
  },
  {
    title: "Systematic Remodeling",
    description:
      "Comprehensive space transformations managed with rigid accountability.",
    features: [
      "Kitchen & Bath Renovation",
      "Load-Bearing Wall Removal",
      "Flooring Replacement",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full py-24 border-t border-brand-surface bg-brand-canvas">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Block */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl uppercase">
            Core Capabilities
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-200">
            Executed with the precision of a Master Carpenter and the rigorous
            oversight of a dedicated project manager.
          </p>
        </div>

        {/* Primary Services Grid */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex flex-col items-start border border-brand-surface bg-brand-surface/50 p-8 text-left backdrop-blur-sm rounded-lg"
              >
                <dt className="text-xl font-semibold leading-7 text-brand-primary uppercase">
                  {service.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-200">
                  <p className="flex-auto">{service.description}</p>
                  <ul className="mt-6 space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-x-3 text-sm text-zinc-200"
                      >
                        <span aria-hidden="true" className="text-brand-primary">
                          ▹
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Strategic Addition: Aging-in-Place Architecture */}
        <div className="mx-auto mt-20 max-w-4xl border border-brand-surface bg-brand-surface/30 p-8 rounded-lg text-center backdrop-blur-sm">
          <h2 className="text-2xl font-semibold leading-7 text-brand-primary uppercase mb-4">
            Custom Aging-in-Place Solutions
          </h2>
          <p className="text-base leading-7 text-zinc-200">
            Structural modifications should not compromise the aesthetic
            standard of a high-end residence.
          </p>
          <p className="text-base leading-7 text-zinc-200">
            <br />
            We engineer and execute discreet, compliant architectural
            adjustments—from reinforced structural blocking to long-term
            accessibility solutions without sacrificing premium design.
          </p>
        </div>

        {/* Operator Profile Routing */}
        <div className="mt-24 border-t border-brand-primary/20 pt-8">
          <OperatorProfile />
        </div>
      </div>
    </section>
  );
}
