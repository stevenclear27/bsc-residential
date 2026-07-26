"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

interface AuthGatewayProps {
  // We pass the dossier payload into this component so we can write it
  // to the database the exact moment the account is successfully created.
  projectPayload: any;
}

export default function AuthGateway({ projectPayload }: AuthGatewayProps) {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAccountProvisioning = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      // 1. Provision the secure user account via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name, // Store the name in the Auth metadata
          },
        },
      });

      if (authError) throw authError;

      // 2. Future Execution: Anchor the projectPayload to the new user's UUID in your database tables here.
      // Database Security: All Supabase tables must have Row Level Security (RLS) enabled. A user must only ever be able to read/write their own project data[cite: 3].
      console.log("Payload ready for database injection:", projectPayload);

      // 3. Redirect the user to the Client Portal
      router.push("/portal");
    } catch (error: any) {
      console.error("Auth Provisioning Error:", error);
      setErrorMsg(error.message || "Failed to establish a secure connection.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-brand-surface p-8 rounded-lg border border-brand-primary/20 mb-6 shadow-xl">
      <div className="mb-8 border-b border-brand-primary/20 pb-6">
        <h3 className="text-2xl font-bold text-brand-primary uppercase tracking-wide mb-3">
          Secure Portal Activation
        </h3>
        <p className="text-zinc-300 text-sm leading-relaxed mb-4">
          Your preliminary project dossier is ready. To save your structural
          parameters and schedule an onsite verification, you must establish a
          secure account.
        </p>
        <p className="text-zinc-400 text-xs leading-relaxed">
          This account provisions your Client Portal. Once your build commences,
          this portal serves as your single source of truth for scheduling,
          daily site logs, and milestone tracking.
        </p>
      </div>

      <form
        onSubmit={handleAccountProvisioning}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-2">
            Full Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Steven Clear"
            className="w-full bg-brand-canvas border border-brand-primary/30 rounded px-4 py-3 text-zinc-100 focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="client@example.com"
            className="w-full bg-brand-canvas border border-brand-primary/30 rounded px-4 py-3 text-zinc-100 focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-2">
            Secure Password
          </label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-brand-canvas border border-brand-primary/30 rounded px-4 py-3 text-zinc-100 focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>

        {errorMsg && (
          <div className="md:col-span-2 p-3 bg-red-900/20 border border-red-500/50 rounded text-xs text-red-400">
            {errorMsg}
          </div>
        )}

        <div className="md:col-span-2 mt-4 pt-4 border-t border-brand-primary/10">
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-brand-accent text-brand-primary font-bold uppercase tracking-widest py-4 rounded hover:bg-brand-accent/90 disabled:opacity-50 transition-colors shadow-lg"
          >
            {isProcessing
              ? "Provisioning Ledger..."
              : "Create Account & Save Dossier"}
          </button>
        </div>
      </form>
    </div>
  );
}
