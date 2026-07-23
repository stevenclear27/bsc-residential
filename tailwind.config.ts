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
          gold: "#C5A059",
          blue: "#4A6FA5",
          dark: "#09090B",
          panel: "#18181B",
        },
      },
    },
  },
  plugins: [],
};
export default config;
