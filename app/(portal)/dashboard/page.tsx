import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import SignOutButton from "@/components/Dashboard/SignOutButton";
import ClientProfile from "@/components/Dashboard/ClientProfile";
import ProjectProposal from "@/components/Dashboard/ProjectProposal";
import AccountabilityLedger from "@/components/Dashboard/AccountabilityLedger";
import LedgerSync from "@/components/Dashboard/LedgerSync";
import DocumentVault from "@/components/Dashboard/DocumentVault";
import DocumentList from "@/components/Dashboard/DocumentList";

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

  // 2. RELATIONAL HYDRATION: Fetch project, linked property, client data, and vault index
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
      ),
      project_documents (
        id,
        file_name,
        file_url,
        created_at
      )
    `,
    )
    .eq("user_id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-brand-canvas text-white flex flex-col">
      {!projectData && <LedgerSync userId={user.id} />}

      <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 flex flex-col gap-12">
        {/* Pass the fully hydrated payload down the tree */}
        <ClientProfile project={projectData} />
        <ProjectProposal project={projectData} />

        <div className="flex flex-col gap-2">
          <DocumentVault projectId={projectData.id} />
          <DocumentList documents={projectData.project_documents} />
        </div>

        <AccountabilityLedger project={projectData} />
        <SignOutButton />
      </main>
    </div>
  );
}
