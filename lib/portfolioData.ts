export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  category:
    | "Architectural Upgrade"
    | "Custom Carpentry"
    | "High-End Remodeling";
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "patio-enclosure-01",
    title: "Structural Patio Enclosure",
    description:
      "Precision framing and finishing for a seamless indoor-outdoor architectural transition.",
    imagePath: "/portfolio/remodels/hero-patio.webp",
    category: "Architectural Upgrade",
  },
  {
    id: "custom-garage-01",
    title: "Custom Wood-Overlay Garage Door",
    description:
      "8' x 18' structural installation featuring high-torque duplex torsion spring calibration and custom wood facing.",
    imagePath: "/portfolio/carpentry/wood-garage.webp", // Ensure this file exists in your public folder
    category: "Custom Carpentry",
  },
];
