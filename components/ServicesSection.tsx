import React from "react";

interface ServiceItem {
  title: string;
  description: string;
  features: string[];
}

const services: ServiceItem[] = [
  {
    title: "Structural Modifications",
    description:
      "Precision framing, load-bearing alterations, and foundational adjustments designed for long-term stability and architectural integrity.",
    features: [
      "Load-Bearing Wall Removal",
      "Custom Framing",
      "Subfloor Leveling",
    ],
  },
  {
    title: "Boutique Carpentry",
    description:
      "High-end custom builds and finish work that elevate the aesthetic and functional standard of the environment.",
    features: [
      "Custom Cabinetry",
      "Architectural Millwork",
      "Hardwood Installations",
    ],
  },
  {
    title: "Systematic Remodeling",
    description:
      "Comprehensive space transformations managed with rigid accountability, from initial demolition to final walkthrough.",
    features: ["Kitchen Overhauls", "Bathroom Upgrades", "Basement Finishing"],
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full py-24 border-t border-brand-surface bg-brand-canvas">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl uppercase">
            Core Capabilities
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Executed with the precision of a Master Carpenter and the rigorous
            oversight of a dedicated project manager. We do not compromise on
            structural tolerances.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex flex-col items-start border border-brand-surface bg-brand-surface/50 p-8 text-left backdrop-blur-sm rounded-lg"
              >
                <dt className="text-xl font-semibold leading-7 text-zinc-100 uppercase">
                  {service.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
                  <p className="flex-auto">{service.description}</p>
                  <ul className="mt-6 space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-x-3 text-sm text-zinc-300"
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
      </div>
    </section>
  );
}
