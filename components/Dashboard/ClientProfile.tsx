"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface ClientProfileProps {
  project: any;
}

export default function ClientProfile({ project }: ClientProfileProps) {
  const supabase = createClient();
  const router = useRouter();

  // Determine initial state from the database payload
  const initialName = project?.properties?.clients?.full_name || "";
  const initialPhone = project?.properties?.clients?.phone || "";
  const initialAddress = project?.properties?.site_address || "";

  // If the data is empty or contains the placeholder, open in edit mode
  const needsConfiguration =
    !initialName || initialAddress === "Address Pending Consultation";

  const [isEditing, setIsEditing] = useState(needsConfiguration);
  const [clientName, setClientName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [siteAddress, setSiteAddress] = useState(initialAddress);
  const [isTransmitting, setIsTransmitting] = useState(false);

  // Sync state if the server prop updates
  useEffect(() => {
    setClientName(project?.properties?.clients?.full_name || "");
    setPhone(project?.properties?.clients?.phone || "");
    setSiteAddress(project?.properties?.site_address || "");
  }, [project]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    setIsTransmitting(true);

    try {
      // 1. Update the Clients Table with strict return verification
      const { data: updatedClient, error: clientError } = await supabase
        .from("clients")
        .update({ full_name: clientName, phone: phone })
        .eq("id", project.user_id)
        .select()
        .single();

      if (clientError) throw clientError;
      if (!updatedClient) throw new Error("Client mutation blocked by RLS.");

      // 2. Update the Properties Table with strict return verification
      const { data: updatedProperty, error: propertyError } = await supabase
        .from("properties")
        .update({ site_address: siteAddress })
        .eq("id", project.property_id)
        .select()
        .single();

      if (propertyError) throw propertyError;
      if (!updatedProperty)
        throw new Error("Property mutation blocked by RLS.");

      // Lock the UI and trigger a server refresh to hydrate the global state
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error("[DATABASE FAULT] Failed to lock profile data:", error);
      // Optional: Add a UI error state here later to alert the client
    } finally {
      setIsTransmitting(false);
    }
  };

  return (
    <section className="bg-brand-surface border border-zinc-800 rounded-lg shadow-xl overflow-hidden">
      <header className="bg-zinc-900/80 border-b border-zinc-800 p-6 flex justify-between items-center">
        <h2 className="text-sm font-bold uppercase tracking-widest text-brand-primary">
          Site & Client Logistics
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-[10px] text-zinc-400 hover:text-brand-primary uppercase tracking-widest transition-colors border border-zinc-700 hover:border-brand-primary px-3 py-1.5 rounded"
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
                Contact Number
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
              disabled={isTransmitting}
              className="md:col-span-2 bg-brand-primary text-brand-canvas px-6 py-3 text-sm font-bold uppercase tracking-widest rounded hover:bg-white transition-colors disabled:opacity-50"
            >
              {isTransmitting ? "Locking Data..." : "Lock Profile"}
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
