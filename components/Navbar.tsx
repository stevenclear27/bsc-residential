"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className="relative flex items-center justify-between p-6 lg:px-8 border-b border-brand-surface bg-brand-canvas w-full z-50"
      aria-label="Global Navigation"
    >
      {/* Brand Identity */}
      <div className="flex lg:flex-1">
        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
          <span className="sr-only ">BSC Residential LLC</span>
          <span className="text-xl font-bold tracking-widest text-zinc-100 uppercase group-hover:text-brand-primary transition-colors">
            BSC Residential LLC
          </span>
        </Link>
      </div>

      {/* Mobile Hamburger Button */}
      <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-400 hover:text-zinc-50 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="sr-only">Toggle main menu</span>
          {/* SVG Icon for Hamburger/Close */}
          {isMobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Desktop Navigation Links */}
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

      {/* Mobile Dropdown Panel */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-brand-surface border-b border-brand-surface lg:hidden flex flex-col px-6 py-8 gap-6 shadow-2xl">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-semibold text-zinc-50 hover:text-brand-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/portfolio"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-semibold text-zinc-50 hover:text-brand-primary transition-colors"
          >
            Portfolio
          </Link>
          <Link
            href="/services"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-semibold text-zinc-50 hover:text-brand-primary transition-colors"
          >
            Services
          </Link>
          <Link
            href="/portal"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-semibold text-zinc-50 hover:text-brand-primary transition-colors"
          >
            Client Portal
          </Link>
        </div>
      )}
    </nav>
  );
}
