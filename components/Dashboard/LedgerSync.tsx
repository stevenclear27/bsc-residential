"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LedgerSync({ userId }: { userId: string }) {
  const router = useRouter();
  const supabase = createClient();

  // Mechanical lock to prevent React Strict Mode from double-firing the database insert
  const syncAttempted = useRef(false);

  useEffect(() => {
    const synchronizeLedger = async () => {
      // 1. Guard Clauses (Early Returns)
      if (syncAttempted.current) return;

      const cachedDossier = sessionStorage.getItem("bsc_pending_dossier");
      if (!cachedDossier) return;

      // Engage the mechanical lock only after verifying there is data to process
      syncAttempted.current = true;

      try {
        const payload = JSON.parse(cachedDossier);

        // 2. Security Verification
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();
        if (authError || !user)
          throw new Error("Authentication barrier failed.");

        // Strict verification: Ensure the logged-in user matches the intended ID
        if (user.id !== userId) throw new Error("User identity mismatch.");

        // 3. Sequential Database Execution
        const { data: propertyData, error: propertyError } = await supabase
          .from("properties")
          .insert({
            client_id: user.id,
            site_address: "Address Pending Consultation",
          })
          .select("id")
          .single();

        if (propertyError) throw propertyError;

        // Execute the strictly typed Project Insert enforcing Data Contracts
        const { error: dbError } = await supabase.from("projects").insert({
          user_id: user.id,
          property_id: propertyData.id,
          project_title: payload.projectTitle,
          assumed_scope: payload.assumedScope,
          project_phases: payload.projectPhases,
          investment_floor: payload.rawInvestment?.floor,
          investment_ceiling: payload.rawInvestment?.ceiling,
          status: "Intake Phase",
        });

        if (dbError) throw dbError;

        // 4. Volatile Cache Destruction
        sessionStorage.removeItem("bsc_pending_dossier");
        console.log("[SYSTEM] Ledger synchronized. Volatile cache destroyed.");

        // 5. The Feedback Loop (Hydration Trigger)
        router.refresh();
      } catch (error) {
        console.error("[SYSTEM FAULT] Ledger Sync Failure:", error);
        // Release the mechanical lock so the system can attempt synchronization again upon a manual page refresh
        syncAttempted.current = false;
      }
    };

    synchronizeLedger();
  }, [userId, router, supabase]); // Syntax corrected: userId matches the defined prop

  return null; // Component Isolation: This is a pure logic node; it renders no UI
}
