import { randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { quoteSchema } from "@/lib/quote";
import { resolveFlow } from "@/lib/quote-flow";
import { rateLimit } from "@/lib/rate-limit";
import { businessEmail, customerEmail, type QuoteEmail } from "@/lib/email/templates";
import { sendEmail } from "@/lib/email/send";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 24_000;
const json = (body: object, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

function clientIp(req: NextRequest): string {
  if (process.env.TRUST_PROXY === "1") {
    // nginx appends the real client address last.
    const parts = (req.headers.get("x-forwarded-for") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }
  return "unknown";
}

function recipients(): string[] {
  return (process.env.QUOTE_NOTIFY_TO ?? "").split(",").map((s) => s.trim()).filter(Boolean);
}

export async function POST(req: NextRequest) {
  // CSRF: only accept same-origin browser posts with a JSON body.
  const origin = req.headers.get("origin");
  const allowed = new Set([site.url, new URL(site.url).origin]);
  if (process.env.NODE_ENV !== "production") allowed.add("http://localhost:3000");
  if (!origin || !allowed.has(origin)) return json({ ok: false, message: "Request not allowed." }, 403);
  if (!(req.headers.get("content-type") ?? "").startsWith("application/json")) {
    return json({ ok: false, message: "Unsupported request." }, 415);
  }

  const ip = clientIp(req);
  if (!rateLimit(`quote:${ip}`, 5, 60 * 60 * 1000)) {
    return json({ ok: false, message: "Too many requests. Please try again later or call us." }, 429);
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY) return json({ ok: false, message: "Request too large." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".");
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return json({ ok: false, message: "Please check the highlighted fields.", errors }, 422);
  }

  const q = parsed.data;
  // Bots: filled honeypot or impossibly fast. Reply as if it worked, send nothing.
  if (q.website || q.elapsed < 2500) return json({ ok: true, reference: "PB-PENDING" });

  const flow = resolveFlow(q.start, q.answers);
  if (!flow.ok) return json({ ok: false, message: "Some answers were missing. Please go back and check them." }, 422);

  const to = recipients();
  if (to.length === 0) {
    console.error("QUOTE_NOTIFY_TO is not configured");
    return json({ ok: false, message: "We could not send your request. Please call us instead." }, 503);
  }

  const d = new Date();
  const ref = `PB-${d.getUTCFullYear().toString().slice(2)}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}-${randomBytes(2).toString("hex").toUpperCase()}`;

  const data: QuoteEmail = {
    ref,
    serviceLabel: flow.serviceLabel,
    emergency: flow.emergency,
    kind: flow.kind,
    steps: flow.steps,
    address: q.address,
    name: q.name,
    email: q.email,
    phone: q.phone,
  };

  try {
    const b = businessEmail(data);
    await sendEmail({ to, subject: b.subject, html: b.html, text: b.text, replyTo: [q.email] });
  } catch (err) {
    console.error("Quote notification failed", ref, err instanceof Error ? err.name : "unknown");
    return json({ ok: false, message: "We could not send your request. Please call us instead." }, 502);
  }

  try {
    const c = customerEmail(data);
    const replyTo = (process.env.QUOTE_REPLY_TO || site.email).trim();
    await sendEmail({ to: [q.email], subject: c.subject, html: c.html, text: c.text, replyTo: replyTo ? [replyTo] : undefined });
  } catch (err) {
    // The business has the request, so the customer still sees success.
    console.error("Customer confirmation failed", ref, err instanceof Error ? err.name : "unknown");
  }

  return json({ ok: true, reference: ref });
}

export function GET() {
  return new NextResponse(null, { status: 405, headers: { Allow: "POST" } });
}
