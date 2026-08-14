import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import StorefrontLobby from "@/components/Dashboard/StorefrontLobby";
import ClientProfile from "@/components/Dashboard/ClientProfile";
import ProjectProposal from "@/components/Dashboard/ProjectProposal";
import AccountabilityLedger from "@/components/Dashboard/AccountabilityLedger";
import LedgerSync from "@/components/Dashboard/LedgerSync";

export default async function ClientDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/portal-login");
  }

  // 1. SECURITY INTERCEPT: Verify Operator Clearance
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role === "operator") {
    redirect("/admin-dashboard");
  }

  // 2. RELATIONAL HYDRATION: Fetch project, linked property, and client data
  const { data: projectData } = await supabase
    .from("projects")
    .select(
      `
      *,
      properties (
        id,
        site_address,
        clients (
          id,
          full_name,
          phone
        )
      )
    `,
    )
    .eq("user_id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-brand-canvas text-white flex flex-col">
      {!projectData && <LedgerSync userId={user.id} />}
      <StorefrontLobby />
      <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 flex flex-col gap-12">
        {/* Pass the fully hydrated payload down the tree */}
        <ClientProfile project={projectData} />
        <ProjectProposal project={projectData} />
        <AccountabilityLedger project={projectData} />
      </main>
    </div>
  );
}
