"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";

// The Single Source of Truth: Strict Data Contracts
interface ProjectDocument {
  id: string;
  file_name: string;
  file_url: string;
  created_at: string;
}

interface DocumentListProps {
  documents: ProjectDocument[];
}

export default function DocumentList({ documents }: DocumentListProps) {
  const supabase = createClient();
  const [activeDownload, setActiveDownload] = useState<string | null>(null);

  // Component Isolation: Render nothing if the vault is empty
  if (!documents || documents.length === 0) return null;

  const handleSecureDownload = async (fileUrl: string, docId: string) => {
    setActiveDownload(docId);

    try {
      // Generate a temporary 60-second secure link to bypass the private bucket RLS
      const { data, error } = await supabase.storage
        .from("project-vault")
        .createSignedUrl(fileUrl, 60);

      if (error) throw error;

      // Execute programmatic download
      window.open(data.signedUrl, "_blank");
    } catch (err) {
      console.error("[SYSTEM FAULT] Secure link generation failed:", err);
      alert("System failed to generate secure access link. Contact Operator.");
    } finally {
      setActiveDownload(null);
    }
  };

  return (
    <div className="bg-brand-surface/30 border border-zinc-800 p-6 rounded-lg mt-4">
      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 border-b border-zinc-800 pb-2">
        Active Vault Records
      </h3>

      <ul className="flex flex-col gap-2">
        {documents.map((doc) => (
          <li
            key={doc.id}
            className="flex justify-between items-center bg-zinc-900/50 p-3 border border-zinc-800 rounded-sm hover:border-brand-primary/50 transition-colors"
          >
            <span className="text-sm text-zinc-200 truncate pr-4">
              {doc.file_name}
            </span>
            <button
              onClick={() => handleSecureDownload(doc.file_url, doc.id)}
              disabled={activeDownload === doc.id}
              className="text-[10px] font-bold uppercase tracking-widest bg-brand-primary text-black px-4 py-2 rounded-sm hover:bg-white transition-colors flex-shrink-0 disabled:opacity-50"
            >
              {activeDownload === doc.id ? "Decrypting..." : "Access"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
