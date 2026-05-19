"use client";

import { useState, useRef, useId } from "react";
import type { LeadFormData, LeadFormErrors } from "@/types";

const PROPERTY_TYPES = [
  "Residential – Buy",
  "Residential – Sell",
  "Commercial – Buy",
  "Commercial – Sell",
  "Land",
  "Multi-Family",
  "Investment / Portfolio",
  "Other",
];

const BUDGET_RANGES = [
  "Under $250k",
  "$250k – $500k",
  "$500k – $750k",
  "$750k – $1M",
  "$1M – $2M",
  "$2M – $5M",
  "$5M+",
  "Not sure yet",
];

const TIMELINES = [
  "Immediately (0–30 days)",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "Just exploring",
];

const empty: LeadFormData = {
  name: "",
  email: "",
  phone: "",
  propertyType: "",
  budgetRange: "",
  timeline: "",
  message: "",
  website: "",
};

function validate(data: LeadFormData): LeadFormErrors {
  const errors: LeadFormErrors = {};
  if (!data.name.trim()) errors.name = "Please enter your name.";
  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (data.phone && !/^[\d\s\-()+.]{7,20}$/.test(data.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!data.propertyType) errors.propertyType = "Please select a property type.";
  if (!data.budgetRange) errors.budgetRange = "Please select a budget range.";
  if (!data.timeline) errors.timeline = "Please select a timeline.";
  if (!data.message.trim()) errors.message = "Please include a brief message.";
  return errors;
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ id, label, error, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-charcoal">
        {label}
        {required && <span className="text-gold ml-0.5" aria-hidden>*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 bg-white border border-border rounded text-charcoal text-sm placeholder:text-stone/60 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-colors";

const errorInputClass = "border-red-400 focus:border-red-500 focus:ring-red-500";

export default function LeadForm() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [data, setData] = useState<LeadFormData>(empty);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const firstErrorRef = useRef<HTMLFormElement>(null);

  function set(field: keyof LeadFormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setData((d) => ({ ...d, [field]: e.target.value }));
      if (errors[field as keyof LeadFormErrors]) {
        setErrors((er) => ({ ...er, [field]: undefined }));
      }
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot check (client-side fast path)
    if (data.website) return;

    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Move focus to first error
      setTimeout(() => {
        const first = document.querySelector("[role='alert']") as HTMLElement;
        first?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("success");
      setData(empty);
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-gold/40 bg-gold/5 px-8 py-10 text-center space-y-3">
        <svg className="mx-auto text-gold" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
          <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 20.5l5.5 5.5 10.5-11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="font-serif text-xl text-navy font-semibold">Thank you — we'll be in touch.</h3>
        <p className="text-sm text-stone">
          We received your inquiry and will reach out within one business day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-navy underline underline-offset-2 hover:text-gold transition-colors"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact inquiry form"
      className="space-y-6"
      ref={firstErrorRef}
    >
      {status === "error" && (
        <div className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field id={id("name")} label="Full Name" error={errors.name} required>
          <input
            id={id("name")}
            type="text"
            autoComplete="name"
            value={data.name}
            onChange={set("name")}
            aria-describedby={errors.name ? `${id("name")}-error` : undefined}
            aria-invalid={!!errors.name}
            className={`${inputClass} ${errors.name ? errorInputClass : ""}`}
            placeholder="Jane Smith"
          />
        </Field>

        <Field id={id("email")} label="Email Address" error={errors.email} required>
          <input
            id={id("email")}
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={set("email")}
            aria-describedby={errors.email ? `${id("email")}-error` : undefined}
            aria-invalid={!!errors.email}
            className={`${inputClass} ${errors.email ? errorInputClass : ""}`}
            placeholder="jane@example.com"
          />
        </Field>

        <Field id={id("phone")} label="Phone Number" error={errors.phone}>
          <input
            id={id("phone")}
            type="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={set("phone")}
            aria-describedby={errors.phone ? `${id("phone")}-error` : undefined}
            aria-invalid={!!errors.phone}
            className={`${inputClass} ${errors.phone ? errorInputClass : ""}`}
            placeholder="(214) 555-0100"
          />
        </Field>

        <Field id={id("propertyType")} label="Property Type Interest" error={errors.propertyType} required>
          <select
            id={id("propertyType")}
            value={data.propertyType}
            onChange={set("propertyType")}
            aria-describedby={errors.propertyType ? `${id("propertyType")}-error` : undefined}
            aria-invalid={!!errors.propertyType}
            className={`${inputClass} ${errors.propertyType ? errorInputClass : ""}`}
          >
            <option value="" disabled>Select type…</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>

        <Field id={id("budgetRange")} label="Budget Range" error={errors.budgetRange} required>
          <select
            id={id("budgetRange")}
            value={data.budgetRange}
            onChange={set("budgetRange")}
            aria-describedby={errors.budgetRange ? `${id("budgetRange")}-error` : undefined}
            aria-invalid={!!errors.budgetRange}
            className={`${inputClass} ${errors.budgetRange ? errorInputClass : ""}`}
          >
            <option value="" disabled>Select range…</option>
            {BUDGET_RANGES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </Field>

        <Field id={id("timeline")} label="Timeline" error={errors.timeline} required>
          <select
            id={id("timeline")}
            value={data.timeline}
            onChange={set("timeline")}
            aria-describedby={errors.timeline ? `${id("timeline")}-error` : undefined}
            aria-invalid={!!errors.timeline}
            className={`${inputClass} ${errors.timeline ? errorInputClass : ""}`}
          >
            <option value="" disabled>Select timeline…</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id={id("message")} label="Message" error={errors.message} required>
        <textarea
          id={id("message")}
          rows={5}
          value={data.message}
          onChange={set("message")}
          aria-describedby={errors.message ? `${id("message")}-error` : undefined}
          aria-invalid={!!errors.message}
          className={`${inputClass} resize-none ${errors.message ? errorInputClass : ""}`}
          placeholder="Tell us about what you're looking for, any specific requirements, or questions you have…"
        />
      </Field>

      {/* Honeypot — hidden from real users, filled by bots */}
      <div className="hidden" aria-hidden>
        <label htmlFor={id("website")}>Website</label>
        <input
          id={id("website")}
          type="text"
          name="website"
          value={data.website}
          onChange={set("website")}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p className="text-xs text-stone">
        Fields marked <span className="text-gold" aria-label="required">*</span> are required.
        Your information is never shared with third parties.
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto px-8 py-4 bg-navy text-cream text-sm font-medium rounded hover:bg-navy-light disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:ring-2 focus-visible:ring-gold"
      >
        {status === "submitting" ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}
