// src/lib/data/portfolio.ts

export interface PortfolioImage {
  src: string;
  alt: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  projectScale: "custom-build" | "service-agreement";
  description: string;
  images: PortfolioImage[];
}

export const projects: PortfolioItem[] = [
  {
    id: "prj-gibson",
    title: "Structural Patio Enclosure",
    category: "Architectural Upgrade",
    projectScale: "custom-build",
    description:
      "Complete structural enclosure engineered to exact tolerances focused on matching the existing aesthetic. Progression from initial framing to final interior and exterior finish, trim, and paint.",
    images: [
      {
        src: "/portfolio/projects/gibson/patio-enclosure-before-north.webp",
        alt: "Gibson before modifications",
      },
      {
        src: "/portfolio/projects/gibson/patio-enclosure-framing.webp",
        alt: "Gibson structural framing",
      },
      {
        src: "/portfolio/projects/gibson/patio-enclosure-vapor-barrier.webp",
        alt: "Gibson project vapor barrier application",
      },
      {
        src: "/portfolio/projects/gibson/patio-enclosure-sheathing.webp",
        alt: "Gibson project exterior sheathing installation",
      },
      {
        src: "/portfolio/projects/gibson/patio-enclosure-trim-windows.webp",
        alt: "Gibson project window and trim integration",
      },
      {
        src: "/portfolio/projects/gibson/patio-enclosure-before-south.webp",
        alt: "Gibson project before structural modifications south view",
      },
      {
        src: "/portfolio/projects/gibson/patio-enclosure-doors.webp",
        alt: "Gibson project final door installation",
      },
      {
        src: "/portfolio/projects/gibson/patio-enclosure-insulation.webp",
        alt: "Gibson project internal insulation phase",
      },
      {
        src: "/portfolio/projects/gibson/patio-enclosure-drywall.webp",
        alt: "Gibson project drywall hanging and finishing",
      },
      {
        src: "/portfolio/projects/gibson/patio-enclosure-interior-north.webp",
        alt: "Gibson project finished interior north view",
      },
      {
        src: "/portfolio/projects/gibson/patio-enclosure-interior-south.webp",
        alt: "Gibson project finished interior south view",
      },
      {
        src: "/portfolio/projects/gibson/patio-enclosure-interior-furnished.webp",
        alt: "Gibson project completed and furnished interior",
      },
    ],
  },
  {
    id: "prj-pope",
    title: "Architectural Metal Siding Installation",
    category: "New Construction",
    projectScale: "custom-build",
    description:
      "Comprehensive structural and aesthetic residential metal siding installation, documenting progress from naked structure to final finish.",
    images: [
      {
        src: "/portfolio/projects/pope/southwest-before.webp",
        alt: "Pope project southwest before",
      },
      {
        src: "/portfolio/projects/pope/northwest-during.webp",
        alt: "Pope project northwest framing during",
      },

      {
        src: "/portfolio/projects/pope/southeast-during.webp",
        alt: "Pope project southeast during phase",
      },
      {
        src: "/portfolio/projects/pope/southeast-after.webp",
        alt: "Pope project southeast finished",
      },
      {
        src: "/portfolio/projects/pope/southwest-after.webp",
        alt: "Pope project southwest finished",
      },
      {
        src: "/portfolio/projects/pope/on-the-job.webp",
        alt: "Pope project on the job active construction",
      },
    ],
  },
  {
    id: "prj-ideal-garage-door",
    title: "Custom Ideal Overhead Garage Door",
    category: "Small Projects",
    projectScale: "service-agreement",
    description:
      "Manual installation and precision balance of a high-torque duplex torsion spring system on a custom 8' x 18' Ideal overhead garage door. Executed as an independent short-duration contract to ensure exact mechanical tolerances.",
    images: [
      {
        src: "/portfolio/projects/garage-door/overhead-garage-door-opening.webp",
        alt: "Custom overhead garage door track and opening mechanism",
      },
      {
        src: "/portfolio/projects/garage-door/overhead-garage-door-interior.webp",
        alt: "Custom overhead garage door interior high-torque torsion spring system",
      },
      {
        src: "/portfolio/projects/garage-door/overhead-garage-door-exterior.webp",
        alt: "Custom overhead garage door exterior installation view",
      },
      {
        src: "/portfolio/projects/garage-door/overhead-garage-door-after.webp",
        alt: "Custom overhead garage door finished installation and mechanical balance",
      },
    ],
  },
  {
    id: "prj-pope-shed",
    title: "Outbuilding Restoration",
    category: "Small Projects",
    projectScale: "service-agreement",
    description:
      "High-velocity aesthetic and structural restoration of a residence outbuilding. Executed as an independent short-duration contract to protect exterior integrity.",
    images: [
      {
        src: "/portfolio/projects/pope/shed-paint-before.webp",
        alt: "Shed exterior condition prior to restoration",
      },
      {
        src: "/portfolio/projects/pope/shed-paint-after.webp",
        alt: "Shed exterior finished restoration",
      },
    ],
  },
  {
    id: "prj-pope-shed-siding",
    title: "Outbuilding Siding & Doors",
    category: "Small Projects",
    projectScale: "service-agreement",
    description:
      "High-velocity exterior siding replacement and door installation. Executed as a short-duration independent contract to restore structural integrity.",
    images: [
      {
        src: "/portfolio/projects/shed/siding-before.webp",
        alt: "Outbuilding siding condition prior to construction",
      },
      {
        src: "/portfolio/projects/shed/siding-after.webp",
        alt: "Outbuilding siding finished installation",
      },
      {
        src: "/portfolio/projects/shed/siding-rear-after.webp",
        alt: "Outbuilding rear siding finished installation",
      },
      {
        src: "/portfolio/projects/shed/siding-doors-after.webp",
        alt: "Outbuilding doors finished installation",
      },
    ],
  },
];
