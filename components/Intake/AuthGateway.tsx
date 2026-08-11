"use client"; // Required for form state and user interactivity

import React, { useState } from "react";

export default function AuthGateway() {
  // STATE MANAGEMENT: Toggling between Sign Up and Log In
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Placeholder for the upcoming Supabase Auth wiring
    console.log(`Executing ${isLogin ? "Login" : "Registration"} for:`, email);

    setTimeout(() => {
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="bg-brand-canvas border border-brand-primary/30 p-8 rounded-lg shadow-2xl flex flex-col gap-6 max-w-md mx-auto w-full">
      <header className="text-center mb-4">
        <h2 className="text-2xl font-light text-white mb-2">
          {isLogin ? "Access Portal" : "Initialize Portal"}
        </h2>
        <p className="text-sm text-zinc-400">
          {isLogin
            ? "Enter your credentials to view your active project."
            : "Create secure credentials to save your project dossier."}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
          disabled={isProcessing || !email || !password}
          className="mt-2 w-full py-4 bg-brand-primary text-brand-canvas font-bold uppercase tracking-widest hover:bg-white transition-colors rounded disabled:opacity-50"
        >
          {isProcessing
            ? "Authenticating..."
            : isLogin
              ? "Secure Login"
              : "Create Account"}
        </button>
      </form>

      <div className="text-center mt-4 border-t border-zinc-800 pt-6">
        <p className="text-sm text-zinc-400">
          {isLogin
            ? "Need to create an account?"
            : "Already have a project portal?"}
        </p>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-2 text-brand-primary text-sm uppercase tracking-widest hover:text-white transition-colors"
        >
          {isLogin ? "Initialize New Portal" : "Log In to Existing"}
        </button>
      </div>
    </div>
  );
}
