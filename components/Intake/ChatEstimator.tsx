"use client";

import React, { useState } from "react";
import ZipCodeGate from "./ZipCodeGate";
import ConsultationFeed from "./ConsultationFeed";
import DossierSummaryCard from "./DossierSummaryCard";
import AuthGateway from "./AuthGateway";

export interface DraftedScopePayload {
  projectTitle: string;
  assumedScope: string;
}

export default function ChatEstimator() {
  const [intakeStep, setIntakeStep] = useState<number>(0);
  const [verifiedZip, setVerifiedZip] = useState<string>("");
  const [draftedScope, setDraftedScope] = useState<DraftedScopePayload | null>(
    null,
  );

  const handleZipVerification = (zip: string) => {
    setVerifiedZip(zip);
    setIntakeStep(1);
  };

  const handleVisionComplete = (scopeData: DraftedScopePayload) => {
    setDraftedScope(scopeData);
    setIntakeStep(2);
  };

  const handleDossierAcknowledge = () => {
    setIntakeStep(3);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      {intakeStep === 0 && <ZipCodeGate onVerified={handleZipVerification} />}

      {/* STEP 1: The dynamic consultation feed replacing the static form */}
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
          <DossierSummaryCard
            dossier={draftedScope}
            onAcknowledge={handleDossierAcknowledge}
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
