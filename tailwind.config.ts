import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          canvas: "#09090B", // Deep background canvas
          surface: "#18181B", // Card / structural surface panels
          primary: "#C5A559", // High-end custom carpentry gold accent
          muted: "#4A6AFA", // Secondary functional / interactive highlight
        },
      },
    },
  },
  plugins: [],
};

export default config;
