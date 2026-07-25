interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
}

const projects: PortfolioItem[] = [
  {
    id: "prj-01",
    title: "8' x 18' Custom Wood-Overlay Garage Door",
    category: "Structural Installation",
    description:
      "Solo structural installation featuring custom wood overlays. Executed precision balancing and high-torque duplex torsion spring winding to ensure flawless mechanical operation.",
  },
  {
    id: "prj-02",
    title: "Bespoke Architectural Built-ins",
    category: "Custom Carpentry",
    description:
      "High-end interior cabinetry designed, milled, and installed to exact room specifications, elevating the functional living space.",
  },
  {
    id: "prj-03",
    title: "Load-Bearing Wall Reconfiguration",
    category: "Structural Modification",
    description:
      "Complete engineered removal of a central load-bearing wall, replaced with a flush-mounted steel I-beam to modernize the foundational layout.",
  },
];

export default function PortfolioSection() {
  return (
    <section className="w-full py-24 border-t border-brand-surface bg-brand-canvas">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl uppercase">
            The Portfolio
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            A verified ledger of uncompromising custom carpentry and high-end
            remodeling. Built for structural integrity.
          </p>
        </div>

        {/* Project Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col border border-brand-surface bg-brand-surface/50 overflow-hidden backdrop-blur-sm group rounded-lg"
            >
              {/* Image Placeholder Frame */}
              <div className="h-64 w-full bg-brand-surface flex items-center justify-center border-b border-brand-surface transition-colors group-hover:bg-zinc-800">
                <span className="text-zinc-400 text-sm tracking-widest uppercase">
                  [ Image Frame ]
                </span>
              </div>

              <div className="flex flex-1 flex-col p-8 text-left">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
                  {project.category}
                </span>
                <h3 className="mt-2 text-xl font-semibold leading-7 text-zinc-100">
                  {project.title}
                </h3>
                <p className="mt-4 flex-auto text-sm leading-6 text-zinc-400">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
