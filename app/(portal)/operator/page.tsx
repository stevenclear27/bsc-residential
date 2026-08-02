import { createClient } from "@/utils/supabase/server";
import { Project } from "@/lib/types/database";

// 1. SERVER-FIRST BASELINE: This component runs entirely on the server.
export default async function OperatorDashboard() {
  const supabase = await createClient();

  // 2. FETCH THE LEDGER: Your RLS bypass allows this to pull all projects.
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Database Error:", error.message);
  }

  // 3. STRICT TYPING: Cast the raw database output to our verified contract.
  const verifiedProjects: Project[] = projects || [];

  return (
    <div className="space-y-8">
      <div className="border-b border-brand-primary/20 pb-4">
        <h1 className="text-3xl font-bold text-brand-primary uppercase tracking-widest">
          Command Center
        </h1>
        <p className="text-zinc-400 mt-2">
          Global Operator Access. Monitoring {verifiedProjects.length} active
          ledgers.
        </p>
      </div>

      {/* 4. COMPONENT ISOLATION: We will map the data to an isolated UI component here later */}
      <div className="grid grid-cols-1 gap-6">
        {verifiedProjects.length === 0 ? (
          <div className="p-8 border border-brand-primary/20 bg-brand-surface rounded text-center text-zinc-500">
            No active projects detected in the master ledger.
          </div>
        ) : (
          verifiedProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 border border-brand-primary/20 bg-brand-surface rounded"
            >
              <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
                {project.status}
              </span>
              <h2 className="text-xl font-bold text-zinc-100 mt-1">
                {project.title}
              </h2>
              <p className="text-sm text-zinc-400 mt-2">
                {project.project_type}
              </p>

              <div className="mt-4 pt-4 border-t border-brand-primary/10 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase">
                    Budget
                  </span>
                  <p className="text-sm text-zinc-300">
                    {project.budget_range}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase">
                    Timeline
                  </span>
                  <p className="text-sm text-zinc-300">
                    {project.timeline_expectation}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
