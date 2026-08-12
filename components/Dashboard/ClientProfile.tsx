"use client"; // Required for local UI toggle state

import React, { useState } from "react";

export default function ClientProfile() {
  const [isEditing, setIsEditing] = useState(true);
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [siteAddress, setSiteAddress] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <section className="bg-brand-canvas border border-zinc-800 rounded-lg shadow-xl overflow-hidden">
      <header className="bg-zinc-900/80 border-b border-zinc-800 p-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg uppercase tracking-widest text-brand-primary">
            Client Profile
          </h2>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
            Identity & Site Parameters
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs text-zinc-400 hover:text-brand-primary uppercase tracking-widest transition-colors border border-zinc-700 hover:border-brand-primary px-4 py-2 rounded"
          >
            Edit Data
          </button>
        )}
      </header>

      <div className="p-6">
        {isEditing ? (
          <form
            onSubmit={handleSave}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in"
          >
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500">
                Authorized Client
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="bg-zinc-900/50 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-brand-primary text-sm"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500">
                Contact Number (Optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-zinc-900/50 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-brand-primary text-sm"
                placeholder="(555) 555-5555"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500">
                Site Location
              </label>
              <input
                type="text"
                value={siteAddress}
                onChange={(e) => setSiteAddress(e.target.value)}
                className="bg-zinc-900/50 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-brand-primary text-sm"
                placeholder="Property Address"
                required
              />
            </div>
            <button
              type="submit"
              className="md:col-span-2 bg-brand-primary text-brand-canvas px-6 py-3 text-sm font-bold uppercase tracking-widest rounded hover:bg-white transition-colors"
            >
              Lock Profile
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
            <div>
              <span className="text-zinc-500 uppercase text-xs tracking-widest block mb-1">
                Authorized Client
              </span>
              <span className="text-white text-lg font-light tracking-wide">
                {clientName || "Pending..."}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 uppercase text-xs tracking-widest block mb-1">
                Contact Number
              </span>
              <span className="text-white text-lg font-light tracking-wide">
                {phone || "Not Provided"}
              </span>
            </div>
            <div className="md:col-span-3 pt-4 border-t border-zinc-800/50">
              <span className="text-zinc-500 uppercase text-xs tracking-widest block mb-1">
                Site Location
              </span>
              <span className="text-white text-lg font-light tracking-wide">
                {siteAddress || "Pending..."}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
