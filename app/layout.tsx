import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BSC Residential LLC",
  description: "Precision in Every Detail.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-canvas text-brand-primary min-h-screen flex flex-col antialiased">
        <Navbar />
        {/* flex-1 ensures this container expands to fill available space */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
