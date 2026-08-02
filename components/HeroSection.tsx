import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    // 1. PARENT CONTAINER
    // Maintained the widescreen 45vh constraints.
    <section className="relative mx-auto flex w-full min-h-[45vh] flex-col overflow-hidden">
      {/* 2. BACKGROUND IMAGE LAYER */}
      <Image
        src="/portfolio/remodels/hero-patio.webp"
        alt="Custom carpentry and architectural remodeling"
        fill
        priority
        unoptimized
        className="object-cover object-[center_65%] z-0"
      />

      {/* 3. CLIENT PORTAL ACTION (Isolated & Anchored) 
          Using absolute positioning to pin the button to the bottom-right corner.
      */}
      <div className="absolute bottom-6 right-6 z-20">
        <Link
          href="/portal-login"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold tracking-wide uppercase transition-colors duration-200 shadow-lg bg-brand-accent/90 text-brand-primary border border-brand-primary hover:bg-brand-canvas hover:border-brand-primary backdrop-blur-md"
        >
          Client Portal
        </Link>
      </div>
    </section>
  );
}
