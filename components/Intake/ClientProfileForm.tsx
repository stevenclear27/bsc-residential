"use client";

import React from "react";

interface ClientProfileFormProps {
  onSubmitProfile: (data: {
    name: string;
    email: string;
    phone: string;
    zipCode: string;
  }) => void;
  initialData?: { name: string; email: string; phone: string; zipCode: string };
}

export default function ClientProfileForm({
  onSubmitProfile,
  initialData,
}: ClientProfileFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmitProfile({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      zipCode: formData.get("zipCode") as string,
    });
  };

  return (
    <div className="bg-brand-surface p-6 rounded-lg border border-brand-primary/20 mb-6">
      <h3 className="text-xl font-bold text-brand-primary uppercase tracking-wide mb-4">
        Project Initialization
      </h3>
      <p className="text-brand-primary/80 text-sm mb-6">
        Provide your details below to anchor your project file. This enables
        auto-fill and connects your consultation directly to your property zone.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block text-xs uppercase tracking-wider text-brand-primary/70 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            required
            defaultValue={initialData?.name}
            placeholder="Steven Clear"
            autoComplete="name"
            className="w-full bg-brand-canvas border border-brand-primary/30 rounded px-3 py-2 text-brand-primary focus:outline-none focus:border-brand-primary"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-brand-primary/70 mb-1">
            Project Zip Code
          </label>
          <input
            type="text"
            name="zipCode"
            required
            defaultValue={initialData?.zipCode}
            placeholder="46017"
            autoComplete="postal-code"
            className="w-full bg-brand-canvas border border-brand-primary/30 rounded px-3 py-2 text-brand-primary focus:outline-none focus:border-brand-primary"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-brand-primary/70 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            defaultValue={initialData?.email}
            placeholder="steven@bscresidential.com"
            autoComplete="email"
            className="w-full bg-brand-canvas border border-brand-primary/30 rounded px-3 py-2 text-brand-primary focus:outline-none focus:border-brand-primary"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-brand-primary/70 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            required
            defaultValue={initialData?.phone}
            placeholder="(317) 555-0199"
            autoComplete="tel"
            className="w-full bg-brand-canvas border border-brand-primary/30 rounded px-3 py-2 text-brand-primary focus:outline-none focus:border-brand-primary"
          />
        </div>
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            className="w-full bg-brand-primary text-brand-canvas font-bold uppercase tracking-widest py-3 rounded hover:bg-brand-primary/90 transition-colors"
          >
            Lock Profile & Open Consultation Deck
          </button>
        </div>
      </form>
    </div>
  );
}
