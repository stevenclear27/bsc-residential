import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import AdminWorkspace from "@/components/Dashboard/AdminWorkspace";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) redirect("/portal-login");

  // 1. REVERSE INTERCEPT: Verify Operator Clearance
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "operator") {
    redirect("/dashboard");
  }

  // 2. THE GLOBAL PULL: Fetch all active projects via RLS bypass
  // Corrected Load Path: projects -> properties -> clients
  const { data: activeProjects, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      properties (
        site_address,
        clients (
          full_name,
          phone
        )
      )
    `,
    )
    .order("created_at", { ascending: false });

  // 3. TRUST-VERIFICATION: Do not allow silent failures
  if (error) {
    console.error(
      "[SYSTEM FAULT] Operations Command Relational Join Failed:",
      error,
    );
  }

  return (
    <div className="min-h-screen bg-brand-canvas text-white p-8">
      <header className="mb-12 border-b border-brand-primary/30 pb-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-light uppercase tracking-widest text-brand-primary mb-2">
          Operations Command
        </h1>
        <p className="text-xs text-zinc-400 uppercase tracking-widest">
          Active Client Ledgers & Project Management
        </p>
      </header>

      {/* Mount the modular client component and pass the payload */}
      <AdminWorkspace projects={activeProjects || []} />
    </div>
  );
}
