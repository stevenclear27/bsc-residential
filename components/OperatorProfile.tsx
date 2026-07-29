import Image from "next/image";

export default function OperatorProfile() {
  return (
    // 1. COMPONENT WRAPPER
    // Inherits background from the global cascade, maintaining semantic token alignment.
    <section className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        {/* 2. OPERATOR DOSSIER (Text Column) */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight text-brand-primary sm:text-5xl">
            The Master Craftsman Model
          </h2>
          <div className="h-1 w-20 bg-brand-primaryrounded-full"></div>
          <div className="space-y-5 text-zinc-200 text-lg leading-relaxed opacity-90">
            <p>
              The traditional general contractor model fails when communication
              breaks down across multiple specialized trades. We eliminate that
              risk by removing the variables.
            </p>
            <p>
              Every build is framed, managed, and finished by a Master Carpenter
              with over 30 years of domain expertise. Complex structural
              execution requires high autonomy, rigorous risk-mitigation, and
              trust-verification.
            </p>
            <p className="font-semibold tracking-wide text-brand-primary opacity-100">
              You are not hiring a management firm; you are hiring the operator.
              No subcontractor hand-offs. No compromised standards.
            </p>
          </div>
        </div>

        {/* 3. ASSET GRID (Image Column) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Headshot Asset */}
          <div className="relative h-80 w-full overflow-hidden rounded-xl shadow-lg border border-brand-primary/20">
            <Image
              src="/operator/operator-profile-headshot.webp"
              alt="Master Carpenter on a structural build site"
              fill
              unoptimized
              className="object-cover object-center"
            />
          </div>

          {/* Mobile Workshop Rig Asset */}
          <div className="relative h-80 w-full overflow-hidden rounded-xl shadow-lg border border-brand-primary/20 sm:mt-12">
            <Image
              src="/operator/mobile-workshop-rig.webp"
              alt="BSC Residential Mobile Workshop Rig"
              fill
              unoptimized
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
