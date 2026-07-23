export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-brand-surface bg-brand-canvas py-8 mt-auto">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-6 text-center">
        <p className="text-sm text-zinc-400">
          &copy; {currentYear} BSC Residential LLC. All rights reserved.
        </p>
        <p className="text-xs text-zinc-500 tracking-wide uppercase mt-2">
          System Architecture by{" "}
          <span className="font-semibold text-brand-primary">BSC Builds</span>
        </p>
      </div>
    </footer>
  );
}
