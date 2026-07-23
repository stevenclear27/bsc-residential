"use client";

export default function PortalLogin() {
  return (
    <section className="w-full py-24 border-t border-brand-surface bg-brand-canvas flex justify-center">
      <div className="max-w-md w-full px-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 uppercase">
          Client Gateway
        </h1>
        <p className="mt-4 text-sm text-zinc-400">
          Secure access to your project ledger, daily site logs, and financial
          milestones.
        </p>

        {/* Authentication Lockbox */}
        <div className="mt-10 border border-brand-surface bg-brand-surface/50 p-8 text-left backdrop-blur-sm rounded-lg">
          <form className="flex flex-col gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-2 block w-full rounded-md border-0 bg-brand-canvas py-2 px-3 text-zinc-50 ring-1 ring-inset ring-brand-surface focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                placeholder="client@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="pin"
                className="block text-sm font-medium text-zinc-300"
              >
                Secure PIN
              </label>
              <input
                type="password"
                id="pin"
                className="mt-2 block w-full rounded-md border-0 bg-brand-canvas py-2 px-3 text-zinc-50 ring-1 ring-inset ring-brand-surface focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                placeholder="••••••••"
              />
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-md bg-brand-primary px-3 py-2 text-sm font-semibold text-brand-canvas shadow-sm hover:opacity-90 transition-opacity"
            >
              Access Ledger
            </button>
          </form>
        </div>

        <p className="mt-6 text-xs text-zinc-500">
          Access is strictly limited to active clients. Unauthorized attempts
          are logged.
        </p>
      </div>
    </section>
  );
}
