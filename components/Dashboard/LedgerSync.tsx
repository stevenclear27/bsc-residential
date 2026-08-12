"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LedgerSync() {
  const supabase = createClient();
  const syncAttempted = useRef(false);

  useEffect(() => {
    const synchronizeLedger = async () => {
      if (syncAttempted.current) return;
      syncAttempted.current = true;

      const cachedDossier = sessionStorage.getItem("bsc_pending_dossier");
      if (!cachedDossier) return;

      try {
        const payload = JSON.parse(cachedDossier);

        // 1. Verify Authentication Clearance
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();
        if (authError || !user)
          throw new Error("Authentication barrier failed.");

        // 2. Generate a structural placeholder for the required property_id
        // In a production environment, this triggers a dedicated property intake sequence.
        const { data: propertyData, error: propertyError } = await supabase
          .from("properties")
          .insert({
            client_id: user.id,
            site_address: "Address Pending Consultation",
          })
          .select("id")
          .single();

        if (propertyError) throw propertyError;

        // 3. Execute the strictly typed Project Insert
        const { error: dbError } = await supabase.from("projects").insert({
          user_id: user.id, // The newly added column satisfying RLS
          property_id: propertyData.id, // Satisfying the schema constraint
          project_title: payload.projectTitle,
          assumed_scope: payload.assumedScope,
          project_phases: payload.projectPhases,
          investment_floor: payload.rawInvestment?.floor,
          investment_ceiling: payload.rawInvestment?.ceiling,
          status: "Intake Phase",
        });

        if (dbError) throw dbError;

        // 4. Purge the volatile cache
        sessionStorage.removeItem("bsc_pending_dossier");
        console.log("Ledger synchronized. Volatile cache destroyed.");
      } catch (error) {
        console.error("System Fault during Ledger Sync:", error);
      }
    };

    synchronizeLedger();
  }, [supabase]);

  return null;
}
