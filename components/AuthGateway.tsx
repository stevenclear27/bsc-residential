"use client"; // Interactivity required for auth state[cite: 1]

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AuthGateway() {
  const router = useRouter();
  const supabase = createClient();

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // DIAGNOSTIC PROBE 1: Firing the sequence
    console.log("[AUTH PROBE] 1. Initialization started for:", email);

    try {
      if (isLogin) {
        console.log("[AUTH PROBE] 2. Executing Login...");
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        console.log("[AUTH PROBE] 3. Login Response:", { data, error });
        if (error) throw error;
      } else {
        console.log("[AUTH PROBE] 2. Executing Registration...");
        const { data, error } = await supabase.auth.signUp({ email, password });
        console.log("[AUTH PROBE] 3. Registration Response:", { data, error });
        if (error) throw error;
      }

      console.log(
        "[AUTH PROBE] 4. Auth successful. Triggering router redirect...",
      );
      router.push("/dashboard");
    } catch (err: any) {
      console.error("[AUTH FAULT] Caught Error:", err);
      setError(
        err.message || "An unknown network fault occurred. Check console.",
      );
    } finally {
      console.log("[AUTH PROBE] 5. Resetting load state.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-canvas border border-brand-primary/30 p-8 rounded-lg shadow-2xl flex flex-col gap-6 max-w-md mx-auto w-full">
      <header className="text-center mb-4">
        <h2 className="text-2xl font-light text-white mb-2">
          {isLogin ? "Access Portal" : "Initialize Portal"}
        </h2>
        <p className="text-sm text-zinc-400">
          {isLogin
            ? "Enter your credentials to view your active project ledger."
            : "Create secure credentials to save your project dossier."}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && (
          <div className="p-3 bg-red-900/30 border border-red-500/50 text-red-400 text-xs uppercase tracking-widest rounded">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-zinc-500">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-900/50 border border-zinc-700 rounded p-4 text-white focus:outline-none focus:border-brand-primary transition-colors"
            placeholder="client@example.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-zinc-500">
            Secure Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-900/50 border border-zinc-700 rounded p-4 text-white focus:outline-none focus:border-brand-primary transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !email || !password}
          className="mt-2 w-full py-4 bg-brand-primary text-brand-canvas font-bold uppercase tracking-widest hover:bg-white transition-colors rounded disabled:opacity-50"
        >
          {loading
            ? "Authenticating..."
            : isLogin
              ? "Secure Login"
              : "Create Account"}
        </button>
      </form>

      <div className="text-center mt-4 border-t border-zinc-800 pt-6">
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError(null);
          }}
          className="text-brand-primary text-sm uppercase tracking-widest hover:text-white transition-colors"
        >
          {isLogin
            ? "Need to initialize a new portal?"
            : "Already have an active ledger?"}
        </button>
      </div>
    </div>
  );
}
