import React from "react";

export default function FemaHero() {
  return (
    <section className="w-full relative py-16 md:py-32 bg-zinc-950 border-b border-yellow-500/30">
      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center flex flex-col items-center gap-8">
        <div className="inline-block bg-red-500 text-black px-4 py-1.5 font-bold text-sm uppercase tracking-widest shadow-sm">
          ALERT: Major Disaster Declaration FEMA-4933-DR Active
        </div>

        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-brand-primary leading-none">
          Emergency Repairs and <br className="hidden md:block" /> Restoration
        </h1>

        <p className="text-xl text-zinc-300 leading-relaxed font-medium max-w-3xl">
          BSC Residential LLC is actively deploying master-level carpentry
          resources to properties compromised by the August severe storms.
        </p>
      </div>
    </section>
  );
}
