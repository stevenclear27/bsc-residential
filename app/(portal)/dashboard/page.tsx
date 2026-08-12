import React from "react";
import StorefrontLobby from "@/components/Dashboard/StorefrontLobby";
import ClientProfile from "@/components/Dashboard/ClientProfile";
import ProjectProposal from "@/components/Dashboard/ProjectProposal";
import AccountabilityLedger from "@/components/Dashboard/AccountabilityLedger";
import LedgerSync from "@/components/Dashboard/LedgerSync"; // <-- Import the new module

export default async function ClientDashboardPage() {
  return (
    <div className="min-h-screen bg-brand-canvas text-white flex flex-col">
      {/* The silent sync module executes on mount */}
      <LedgerSync />

      <StorefrontLobby />

      <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 flex flex-col gap-8">
        <ClientProfile />
        <ProjectProposal />
        <AccountabilityLedger />
      </main>
    </div>
  );
}
