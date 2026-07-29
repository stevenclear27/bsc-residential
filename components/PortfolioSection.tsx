import Image from "next/image";

// 1. STRICT DATA CONTRACT
// Defines the exact shape of a project and its associated image array.
interface PortfolioImage {
  src: string;
  alt: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  images: PortfolioImage[];
}

// 2. THE LEDGER (Database Placeholder)
// You can stack additional projects into this array as your portfolio grows.
const projects: PortfolioItem[] = [
  {
    id: "prj-gibson",
    title: "Structural Patio Enclosure",
    category: "Architectural Upgrade",
    description:
      "Complete structural enclosure engineered to exact tolerances. Progression from initial vapor barrier and sheathing to final window and trim installation.",
    images: [
      {
        src: "/portfolio/projects/gibson/patio-enclosure-vapor-barrier.webp",
        alt: "Gibson project vapor barrier installation",
      },
      {
        src: "/portfolio/projects/gibson/patio-enclosure-sheathing.webp",
        alt: "Gibson project exterior sheathing",
      },
      {
        src: "/portfolio/projects/gibson/patio-enclosure-trim-windows.webp",
        alt: "Gibson project window and trim integration",
      },
      {
        src: "/portfolio/projects/gibson/patio-enclosure-doors.webp",
        alt: "Gibson project final door installation",
      },
    ],
  },
  // Add future projects here...
];

export default function PortfolioSection() {
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

        {/* PROJECT STACK */}
        <div className="space-y-20">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col border border-brand-primary/10 rounded-2xl overflow-hidden bg-brand-canvas shadow-xl"
            >
              {/* IMAGE GALLERY (CSS Scroll Snap) */}
              {/* 'overflow-x-auto' enables horizontal scrolling. 'snap-x' forces the swipe to lock onto the next image perfectly. */}
              <div className="flex w-full overflow-x-auto snap-x snap-mandatory custom-scrollbar pb-4 border-b border-brand-primary/10">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative flex-none w-full sm:w-[85%] md:w-[70%] lg:w-[60%] aspect-[4/3] snap-center sm:snap-start first:ml-0"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    {/* Image Counter Overlay */}
                    <div className="absolute bottom-4 right-4 bg-brand-canvas/80 backdrop-blur-md px-3 py-1 rounded-full border border-brand-primary/30">
                      <span className="text-xs font-bold text-brand-primary">
                        {index + 1} / {project.images.length}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* PROJECT DOSSIER */}
              <div className="p-8 md:p-10">
                <span className="text-xs font-black uppercase tracking-widest text-brand-primary/80 mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4">
                  {project.title}
                </h3>
                <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-4xl">
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
