"use client";

import React, { useState } from "react";

interface ZipCodeGateProps {
  onVerified: (zipCode: string) => void;
}

// Operational Radius locked to the active service area
const VALID_ZIP_CODES = ["46011", "46012", "46013", "46016", "46017", "47356"];

export default function ZipCodeGate({ onVerified }: ZipCodeGateProps) {
  const [inputZip, setInputZip] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanZip = inputZip.trim();

    if (!cleanZip || cleanZip.length !== 5) {
      setError("Please enter a valid 5-digit zip code.");
      return;
    }

    if (VALID_ZIP_CODES.includes(cleanZip)) {
      onVerified(cleanZip);
    } else {
      setError(
        "We currently do not operate in this zone. Thank you for your interest in BSC Residential.",
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-brand-surface border border-brand-primary/20 rounded-lg shadow-xl">
      <div className="mb-6 border-b border-brand-primary/20 pb-4">
        <h2 className="text-xl font-bold tracking-widest text-brand-primary uppercase mb-2">
          Service Area Verification
        </h2>
        <p className="text-sm text-zinc-400">
          Please enter your project's zip code to verify you are within our
          operational radius before initiating the estimator.
        </p>
      </div>

      <form onSubmit={handleVerification} className="space-y-4">
        <div>
          <label
            htmlFor="zipCode"
            className="block text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-2"
          >
            Zip Code
          </label>
          <input
            type="text"
            id="zipCode"
            value={inputZip}
            onChange={(e) => setInputZip(e.target.value)}
            maxLength={5}
            placeholder="e.g. 46012"
            className="w-full px-4 py-3 bg-brand-canvas border border-brand-primary/30 text-zinc-100 rounded focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>

        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-500/30 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-4 bg-brand-accent text-brand-primary font-bold uppercase tracking-widest rounded hover:bg-brand-accent/90 transition-colors shadow-lg mt-4"
        >
          Verify Location
        </button>
      </form>
    </div>
  );
}
