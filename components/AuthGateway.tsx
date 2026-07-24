"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface AuthGatewayProps {
  onSuccess: () => void;
  // Optional: Pass the verified dossier payload here if you want to write it
  // to the database immediately after successful account creation.
  dossierPayload?: any;
}

export default function AuthGateway({
  onSuccess,
  dossierPayload,
}: AuthGatewayProps) {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!termsAccepted) {
      setErrorMsg("You must accept the terms of service to proceed.");
      return;
    }

    setIsProcessing(true);

    try {
      // Provision the secure user account
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // In a production environment, you would configure email verification routing here.
          emailRedirectTo: `${location.origin}/portal`,
        },
      });

      if (error) throw error;

      // Note: If you passed the dossierPayload, you would execute the database insert here,
      // now that the user is authenticated and RLS policies can bind the data to their ID.

      onSuccess();
    } catch (error: any) {
      console.error("Auth Provisioning Error:", error);
      setErrorMsg(error.message || "Failed to establish a secure connection.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-brand-surface rounded-lg shadow-2xl border border-brand-primary/20">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-brand-primary uppercase tracking-widest">
          Client Portal Activation
        </h3>
        <p className="text-xs text-brand-primary/80 mt-2">
          Establish your secure account to save your project dossier and
          schedule the Master Carpenter diagnostic visit.
        </p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-brand-primary uppercase mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-brand-canvas border-0 ring-1 ring-inset ring-brand-primary/30 focus:ring-2 focus:ring-brand-primary rounded-md px-4 py-2 text-sm text-brand-primary"
            disabled={isProcessing}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-primary uppercase mb-1">
            Secure Password
          </label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-brand-canvas border-0 ring-1 ring-inset ring-brand-primary/30 focus:ring-2 focus:ring-brand-primary rounded-md px-4 py-2 text-sm text-brand-primary"
            disabled={isProcessing}
          />
        </div>

        <div className="flex items-start gap-3 pt-4 border-t border-brand-primary/20">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-brand-primary/30 bg-brand-canvas text-brand-primary focus:ring-brand-primary"
            disabled={isProcessing}
          />
          <label
            htmlFor="terms"
            className="text-xs text-brand-primary/80 leading-relaxed"
          >
            I acknowledge that all structural work requires a paid on-site
            physical inspection to produce a binding contract. I agree that the
            initial diagnostic fee will be credited toward my final project
            deposit.
          </label>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-900/20 border border-red-500/50 rounded text-xs text-red-400">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={isProcessing || !termsAccepted || !email || !password}
          className="w-full mt-4 px-6 py-3 bg-brand-primary text-brand-canvas rounded-md font-bold text-sm uppercase shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isProcessing ? "Provisioning..." : "Activate Secure Portal"}
        </button>
      </form>
    </div>
  );
}
