import React from "react";
import AuthGateway from "@/components/AuthGateway"; // The unified component

export default function PortalLoginPage() {
  return (
    <main className="flex-1 w-full flex items-center justify-center p-8 min-h-screen">
      <AuthGateway />
    </main>
  );
}
