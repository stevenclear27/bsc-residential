// src/components/ProjectGallery.tsx
import Image from "next/image";
import { PortfolioItem } from "@/lib/data/portfolio";

interface ProjectGalleryProps {
  projects: PortfolioItem[];
}

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
  return (
    <div className="space-y-20">
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex flex-col border border-brand-primary/10 rounded-2xl overflow-hidden bg-brand-surface shadow-xl"
        >
          {/* IMAGE GALLERY (CSS Scroll Snap) */}
          <div className="flex w-full overflow-x-auto snap-x snap-mandatory custom-scrollbar pb-4 border-b border-brand-primary/10 gap-6 px-2">
            {project.images.map((image, index) => (
              <div
                key={index}
                className="relative flex-none w-full sm:w-[85%] md:w-[70%] lg:w-[60%] aspect-[4/3] snap-center sm:snap-start first:ml-0 border border-brand-primary/30 rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  unoptimized
                  className="object-cover"
                />
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
  );
}
