"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function SignOutButton() {
  const supabase = createClient();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const executeSignOut = async () => {
    setIsSigningOut(true);

    try {
      // 1. Terminate the Supabase Auth Session (Clears local tokens)
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // 2. Purge volatile memory
      sessionStorage.clear();
      localStorage.clear();

      // 3. THE MECHANICAL OVERRIDE
      // Bypassing Next.js router.push() to force a hard request to the server.
      // This forces the server-side secure circuit breaker to re-evaluate the missing cookies.
      window.location.href = "/portal-login";
    } catch (error) {
      console.error("[SYSTEM FAULT] Sign out sequence failed:", error);
      setIsSigningOut(false);
    }
  };

  return (
    <button
      onClick={executeSignOut}
      disabled={isSigningOut}
      className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-400 border border-zinc-800 rounded hover:text-white hover:border-brand-primary transition-colors disabled:opacity-50 w-max"
    >
      {isSigningOut ? "Severing Link..." : "Sign Out"}
    </button>
  );
}
