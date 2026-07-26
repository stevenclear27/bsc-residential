"use client"; // Required for state management at this leaf node

import React, { useState } from "react";
import EstimatorChatBox from "./EstimatorChatBox";
import DossierSummaryCard from "./DossierSummaryCard";
import AuthGateway from "./AuthGateway";

export default function ChatEstimator() {
  // 1. Establish System State (Memory)
  const [intakeStep, setIntakeStep] = useState<1 | 2 | 3>(1);

  // We use a unified state object to hold all data across the pipeline
  const [projectPayload, setProjectPayload] = useState<any>({
    projectData: null,
    clientData: null,
  });

  // 2. Logic Handlers for the State Machine

  // Fires when the AI finishes the scope
  const handleIntakeComplete = (data: any) => {
    setProjectPayload((prev: any) => ({ ...prev, projectData: data }));
    setIntakeStep(2); // Advance to Dossier Summary
  };

  // Fires when the user reviews the dossier and wants to proceed
  const handleDossierAcknowledge = () => {
    setIntakeStep(3); // Advance to Lead Capture
  };

  // Fires when the user submits their contact info
  const handleProfileSubmit = (data: any) => {
    const finalPayload = {
      ...projectPayload,
      clientData: data,
    };
    setProjectPayload(finalPayload);

    // Future Execution: This is where we will fire the Supabase mutation
    // to anchor the dossier to the client in the database.
    console.log("FINAL PIPELINE PAYLOAD READY FOR DATABASE:", finalPayload);
    alert("Dossier Locked. Redirecting to scheduling matrix...");
  };

  // 3. Render the correct module based on the current step
  return (
    <section className="w-full max-w-4xl mx-auto my-12 px-4">
      {/* Progress Indicator */}
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

      {/* Component Routing Floor */}
      {intakeStep === 1 && (
        <div className="animate-in fade-in duration-500">
          <EstimatorChatBox onIntakeComplete={handleIntakeComplete} />
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
