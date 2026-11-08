import "server-only";
import { NextResponse, type NextRequest } from "next/server";
import { rateLimit } from "./rate-limit";

const API = "https://api.ideal-postcodes.co.uk/v1/autocomplete/addresses";

export const noStore = (body: object, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export function clientIp(req: NextRequest): string {
  if (process.env.TRUST_PROXY === "1") {
    const parts = (req.headers.get("x-forwarded-for") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }
  return "unknown";
}

/** Limits per IP so nobody can spend our lookup credits with a script. */
export function limited(req: NextRequest, name: string, limit: number) {
  return !rateLimit(`${name}:${clientIp(req)}`, limit, 10 * 60 * 1000);
}

export async function ideal(path: string, params: Record<string, string> = {}): Promise<unknown | null> {
  const key = process.env.IDEALPOSTCODES_API_KEY;
  if (!key) return null;
  const url = new URL(`${API}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  url.searchParams.set("api_key", key);
  const res = await fetch(url, { signal: AbortSignal.timeout(5000), cache: "no-store" });
  if (!res.ok) throw new Error(`Address lookup failed with ${res.status}`);
  return res.json();
}
