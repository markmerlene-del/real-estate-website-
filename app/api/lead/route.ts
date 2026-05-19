import { NextRequest, NextResponse } from "next/server";
import type { LeadFormData } from "@/types";

// Simple in-memory rate limiter (resets on server restart; sufficient for single-instance Vercel hobby deploys)
// TODO: Replace with Redis-backed rate limiting (e.g., @upstash/ratelimit) for production scale
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimits.get(ip);

  if (!record || now > record.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT) return false;

  record.count++;
  return true;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(req);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute before trying again." },
      { status: 429 }
    );
  }

  let body: Partial<LeadFormData>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot check — bots fill this field
  if (body.website) {
    // Return 200 to not tip off bots
    return NextResponse.json({ ok: true });
  }

  // Server-side validation
  const { name, email, propertyType, budgetRange, timeline, message } = body;

  if (!name?.trim() || !email?.trim() || !propertyType || !budgetRange || !timeline || !message?.trim()) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const payload = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: body.phone?.trim() ?? "",
    propertyType,
    budgetRange,
    timeline,
    message: message.trim(),
    submittedAt: new Date().toISOString(),
    ip,
  };

  // Log the payload — replace this block with your email service integration
  console.log("[lead]", JSON.stringify(payload, null, 2));

  // TODO: Send notification email via Resend or SendGrid
  // Example with Resend:
  //
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "leads@yourdomain.com",
  //   to: process.env.LEAD_NOTIFICATION_EMAIL!,
  //   subject: `New lead: ${payload.name}`,
  //   text: JSON.stringify(payload, null, 2),
  // });

  return NextResponse.json({ ok: true }, { status: 200 });
}
