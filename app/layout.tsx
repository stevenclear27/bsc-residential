import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

// High-legibility sans-serif for body text & UI elements
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Refined architectural serif for primary headings
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BSC Residential LLC | Custom Remodeling & Master Carpentry",
  description:
    "Boutique residential construction, structural renovations, and architectural millwork built on transparency and precision engineering.",
  metadataBase: new URL("https://www.bscresidential.com"),
  openGraph: {
    title: "BSC Residential LLC | Master Carpentry",
    description: "Boutique residential construction & high-end millwork.",
    url: "https://www.bscresidential.com",
    siteName: "BSC Residential LLC",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${cormorantGaramond.variable}`}
    >
      <body className="bg-brand-canvas text-brand-primary min-h-screen flex flex-col font-sans antialiased selection:bg-brand-accent selection:text-brand-canvas">
        {/* Global Navigation Header */}
        <Navbar />

        {/* Dynamic Route Content Wrapper */}
        <main className="flex-1">{children}</main>

        {/* Global Structural Footer */}
        <Footer />
      </body>
    </html>
  );
}
