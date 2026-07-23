import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="flex items-center justify-between p-6 lg:px-8 border-b border-brand-surface bg-brand-canvas w-full"
      aria-label="Global Navigation"
    >
      {/* Brand Identity */}
      <div className="flex lg:flex-1">
        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
          <span className="sr-only">BSC Residential LLC</span>
          {/* Reconstructed Logo Type */}
          <span className="text-xl font-bold tracking-widest text-zinc-50 uppercase group-hover:text-zinc-300 transition-colors">
            BSC Residential LLC
          </span>
        </Link>
      </div>

      {/* Structural Navigation Links */}
      <div className="hidden lg:flex lg:gap-x-12">
        <Link
          href="/"
          className="text-sm font-semibold leading-6 text-zinc-300 hover:text-brand-primary transition-colors"
        >
          Home
        </Link>
        <Link
          href="/portfolio"
          className="text-sm font-semibold leading-6 text-zinc-300 hover:text-brand-primary transition-colors"
        >
          Portfolio
        </Link>
        <Link
          href="/services"
          className="text-sm font-semibold leading-6 text-zinc-300 hover:text-brand-primary transition-colors"
        >
          Services
        </Link>
        <Link
          href="/portal"
          className="text-sm font-semibold leading-6 text-zinc-300 hover:text-brand-primary transition-colors"
        >
          Client Portal
        </Link>
      </div>

      {/* Primary Action Button */}
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <Link
          href="/estimate"
          className="rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-brand-canvas shadow-sm hover:opacity-90 transition-opacity"
        >
          Request Estimate
        </Link>
      </div>
    </nav>
  );
}
