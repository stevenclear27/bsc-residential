import Link from "next/link";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "Client Portal", href: "/portal" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="-m-1.5 p-1.5 text-lg font-bold tracking-widest text-zinc-50 uppercase"
          >
            BSC Residential LLC
          </Link>
        </div>

        <div className="hidden lg:flex gap-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold leading-6 text-zinc-300 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-1 justify-end">
          <Link
            href="/estimate"
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-200 transition-colors"
          >
            Request Estimate
          </Link>
        </div>
      </nav>
    </header>
  );
}
