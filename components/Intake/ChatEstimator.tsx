"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import ZipCodeGate from "./ZipCodeGate";
import ConsultationFeed from "./ConsultationFeed";
import DossierSummaryCard from "./DossierSummaryCard";
import AuthGateway from "../AuthGateway";
import { useRouter } from "next/navigation";

export interface DraftedScopePayload {
  projectTitle: string;
  assumedScope: string;
  projectPhases: {
    phaseName: string;
    description: string;
  }[];
}

export default function ChatEstimator() {
  const router = useRouter();
  const [intakeStep, setIntakeStep] = useState<number>(0);
  const [verifiedZip, setVerifiedZip] = useState<string>("");
  const [draftedScope, setDraftedScope] = useState<DraftedScopePayload | null>(
    null,
  );

  // 1. ADD STATE FOR SESSION DETECTION
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // 2. THE SESSION SENSOR
  useEffect(() => {
    const verifyIdentity = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
      }
    };
    verifyIdentity();
  }, []);

  const handleZipVerification = (zip: string) => {
    setVerifiedZip(zip);
    setIntakeStep(1);
  };

  const handleVisionComplete = (scopeData: DraftedScopePayload) => {
    setDraftedScope(scopeData);
    setIntakeStep(2);
  };

  const handleDossierAcknowledge = () => {
    if (draftedScope) {
      sessionStorage.setItem(
        "bsc_pending_dossier",
        JSON.stringify(draftedScope),
      );
    }

    // 3. THE ROUTING BYPASS
    // If the user is already authenticated, bypass the gateway and inject them straight into the ledger.
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      setIntakeStep(3);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      {intakeStep === 0 && <ZipCodeGate onVerified={handleZipVerification} />}

      {intakeStep === 1 && (
        <div className="animate-in fade-in duration-500">
          <ConsultationFeed
            zipCode={verifiedZip}
            onIntakeComplete={handleVisionComplete}
          />
        </div>
      )}

      {intakeStep === 2 && draftedScope && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* 4. PASS THE AUTH FLAG TO THE CARD */}
          <DossierSummaryCard
            dossier={draftedScope}
            onAcknowledge={handleDossierAcknowledge}
            isAuthenticated={isAuthenticated}
          />
        </div>
      )}

      {intakeStep === 3 && (
        <div className="animate-in fade-in duration-500">
          <AuthGateway />
        </div>
      )}
    </div>
  );
}
