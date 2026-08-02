"use client";

import React, { useState } from "react";
import ZipCodeGate from "./ZipCodeGate";
import EstimatorChatBox from "./EstimatorChatBox";
import DossierSummaryCard from "./DossierSummaryCard";
import AuthGateway from "./AuthGateway";

export default function ChatEstimator() {
  // 1. Establish System State (Memory)
  // Step 0: Zip Verification | Step 1: Chat | Step 2: Summary | Step 3: Auth
  const [intakeStep, setIntakeStep] = useState<0 | 1 | 2 | 3>(0);

  const [projectPayload, setProjectPayload] = useState<any>({
    projectData: null,
    clientData: null,
    verifiedZip: null,
  });

  // 2. Logic Handlers for the State Machine
  const handleZipVerification = (zip: string) => {
    setProjectPayload((prev: any) => ({ ...prev, verifiedZip: zip }));
    setIntakeStep(1); // Unlock the Chatbot
  };

  const handleIntakeComplete = (data: any) => {
    setProjectPayload((prev: any) => ({ ...prev, projectData: data }));
    setIntakeStep(2);
  };

  const handleDossierAcknowledge = () => {
    setIntakeStep(3);
  };

  return (
    <section className="w-full max-w-4xl mx-auto my-12 px-4">
      {/* Progress Indicator */}
      {intakeStep > 0 && (
        <div className="flex gap-2 mb-6">
          <div
            className={`h-2 flex-1 rounded transition-colors duration-500 ${intakeStep >= 1 ? "bg-brand-primary" : "bg-brand-primary/20"}`}
          />
          <div
            className={`h-2 flex-1 rounded transition-colors duration-500 ${intakeStep >= 2 ? "bg-brand-primary" : "bg-brand-primary/20"}`}
          />
          <div
            className={`h-2 flex-1 rounded transition-colors duration-500 ${intakeStep === 3 ? "bg-brand-primary" : "bg-brand-primary/20"}`}
          />
        </div>
      )}

      {/* Component Routing Floor */}
      {intakeStep === 0 && (
        <div className="animate-in fade-in duration-500">
          <ZipCodeGate onVerified={handleZipVerification} />
        </div>
      )}

      {intakeStep === 1 && (
        <div className="animate-in fade-in duration-500">
          <EstimatorChatBox
            zipCode={projectPayload.verifiedZip}
            onIntakeComplete={handleIntakeComplete}
          />
        </div>
      )}

      {intakeStep === 2 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <DossierSummaryCard
            projectData={projectPayload.projectData}
            onAcknowledge={handleDossierAcknowledge}
          />
        </div>
      )}

      {intakeStep === 3 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <AuthGateway projectPayload={projectPayload} />
        </div>
      )}
    </section>
  );
}
