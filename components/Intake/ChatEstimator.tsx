"use client";

import React, { useState } from "react";
import ClientProfileForm from "./ClientProfileForm";
import EstimatorChatBox from "./EstimatorChatBox";
import DossierSummaryCard from "./DossierSummaryCard";

export default function ChatEstimator() {
  // 1. Establish System State (Memory)
  const [intakeStep, setIntakeStep] = useState<1 | 2 | 3>(1);
  const [clientData, setClientData] = useState<any>(null);

  // 2. Logic Handlers
  const handleProfileSubmit = (data: any) => {
    setClientData(data);
    setIntakeStep(2); // Advance to AI Chat
  };

  const handleIntakeComplete = (projectData: any) => {
    console.log("Architectural parameters locked:", projectData);
    setClientData((prev: any) => ({ ...prev, ...projectData }));
    setIntakeStep(3); // Advance to Dossier Summary
  };

  const handleDossierAcknowledge = () => {
    console.log("Dossier acknowledged by:", clientData);
    // Future logic: Push to Supabase database here
  };

  // 3. Render the correct module based on the current step
  return (
    <section className="w-full max-w-4xl mx-auto my-12 px-4">
      {/* Progress Indicator */}
      <div className="flex gap-2 mb-6">
        <div
          className={`h-2 flex-1 rounded ${intakeStep >= 1 ? "bg-brand-primary" : "bg-brand-primary/20"}`}
        />
        <div
          className={`h-2 flex-1 rounded ${intakeStep >= 2 ? "bg-brand-primary" : "bg-brand-primary/20"}`}
        />
        <div
          className={`h-2 flex-1 rounded ${intakeStep === 3 ? "bg-brand-primary" : "bg-brand-primary/20"}`}
        />
      </div>

      {/* Component Routing Floor */}
      {intakeStep === 1 && (
        <ClientProfileForm onSubmitProfile={handleProfileSubmit} />
      )}

      {/* ... previous code ... */}
      {intakeStep === 2 && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <EstimatorChatBox onIntakeComplete={handleIntakeComplete} />
        </div>
      )}

      {intakeStep === 3 && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <EstimatorChatBox />
          <DossierSummaryCard onAcknowledge={handleDossierAcknowledge} />
        </div>
      )}
    </section>
  );
}
