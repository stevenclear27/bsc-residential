"use client";

import React, { useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface DocumentVaultProps {
  projectId: string;
}

export default function DocumentVault({ projectId }: DocumentVaultProps) {
  const supabase = createClient();
  const router = useRouter();

  const [isUploading, setIsUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setStatusMsg(null);

    try {
      // 1. Verify Identity
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("Authentication barrier failed.");

      // 2. Construct the Secure File Path (Bucket Strategy)
      // We isolate files in folders named by the Project ID
      const fileExt = file.name.split(".").pop();
      const safeFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_"); // Sanitize filename
      const filePath = `${projectId}/${Date.now()}_${safeFileName}`;

      // 3. Upload Binary File to Storage Vault
      const { error: uploadError } = await supabase.storage
        .from("project-vault")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 4. Write the Index Record to PostgreSQL
      const { error: dbError } = await supabase
        .from("project_documents")
        .insert({
          project_id: projectId,
          uploaded_by: user.id,
          file_name: file.name,
          file_url: filePath,
          file_type: file.type || "unknown",
        });

      if (dbError) throw dbError;

      // 5. Success Feedback & State Reset
      setStatusMsg({ type: "success", text: "Document securely vaulted." });
      if (fileInputRef.current) fileInputRef.current.value = "";

      // 6. Hydrate the UI to show the new document
      router.refresh();
    } catch (error: any) {
      console.error("[SYSTEM FAULT] Vault Upload Error:", error);
      setStatusMsg({
        type: "error",
        text: error.message || "Upload sequence failed.",
      });
    } finally {
      setIsUploading(false);
      // Clear success message after 4 seconds
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  return (
    <div className="bg-brand-surface/50 border border-zinc-800 p-6 rounded-lg">
      <h3 className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-4">
        Project Document Vault
      </h3>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <label className="cursor-pointer bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-4 py-3 rounded transition-colors text-white text-xs font-bold uppercase tracking-widest shadow-sm">
            {isUploading ? "Transmitting..." : "+ Upload File"}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
              accept="image/*,application/pdf" // Restrict to photos and PDFs
            />
          </label>
          <span className="text-xs text-zinc-500 uppercase tracking-wider">
            PDF & Image Files Authorized
          </span>
        </div>

        {statusMsg && (
          <div
            className={`p-3 text-xs font-bold uppercase tracking-widest rounded ${
              statusMsg.type === "success"
                ? "bg-green-900/20 text-green-400 border border-green-500/30"
                : "bg-red-900/20 text-red-400 border border-red-500/30"
            }`}
          >
            {statusMsg.text}
          </div>
        )}
      </div>
    </div>
  );
}
