"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function PortalLogin() {
  const router = useRouter();
  const supabase = createClient();

  // INJECT THE PROBE HERE (Logic Phase)
  console.log("System Audit - URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. STANDARD LOGIN FLOW
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh(); // Forces the middleware to recognize the new session
    }
  };

  // 2. DEVELOPER BYPASS FLOW
  const handleDevBypass = async () => {
    setLoading(true);
    setError(null);

    // Operator Authentication Payload
    const { error } = await supabase.auth.signInWithPassword({
      email: "stevenclear27@gmail.com",
      password: "&znBbcGxZ*2xK44", // Insert your exact Supabase Auth password here
    });

    if (error) {
      setError(
        `Dev Auth Failed: ${error.message}. Ensure credentials match your Supabase Auth panel.`,
      );
      setLoading(false);
    } else {
      // Force route the operator directly to the Command Center
      router.push("/operator");
      router.refresh();
    }
  };

  return (
    <section className="w-full py-24 border-t border-brand-surface bg-brand-canvas flex justify-center">
      <div className="max-w-md w-full px-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-brand-primary uppercase">
          Client Gateway
        </h1>
        <p className="mt-4 text-sm text-zinc-200">
          Secure access to your project ledger, daily site logs, and financial
          milestones.
        </p>
        {/* Authentication Lockbox */}
        <div className="mt-10 border border-brand-surface bg-brand-surface/50 p-8 text-left backdrop-blur-sm rounded-lg">
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            {/* Error Ledger */}
            {error && (
              <div className="p-3 border border-red-500/50 bg-red-500/10 rounded-md text-red-400 text-sm">
                {error}
              </div>
            )}

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 block w-full rounded-md border-0 bg-brand-canvas py-2 px-3 text-zinc-50 ring-1 ring-inset ring-brand-surface focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                placeholder="client@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-300"
              >
                Secure PIN
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 block w-full rounded-md border-0 bg-brand-canvas py-2 px-3 text-zinc-50 ring-1 ring-inset ring-brand-surface focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-md bg-brand-primary px-3 py-2 text-sm font-semibold text-brand-canvas shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Access Ledger"}
            </button>
          </form>

          {/* ISOLATED DEV ENVIRONMENT RENDER */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 border-t border-brand-surface pt-6">
              <button
                type="button"
                onClick={handleDevBypass}
                disabled={loading}
                className="flex w-full justify-center rounded-md border border-brand-primary/30 px-3 py-1.5 text-sm font-semibold text-brand-primary hover:bg-brand-primary/10 transition-colors disabled:opacity-50"
              >
                [DEV] Auto-Inject Credentials
              </button>
              <p className="mt-2 text-center text-xs text-zinc-500">
                Bypasses standard entry for local dashboard engineering.
              </p>
            </div>
          )}
        </div>
        <p className="mt-6 text-xs text-brand-primary">
          Access is strictly limited to active clients.
        </p>
      </div>
    </section>
  );
}
