import type { NextRequest } from "next/server";
import { ideal, limited, noStore } from "@/lib/postcode";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Hit = { id: string; suggestion: string };

export async function GET(req: NextRequest) {
  if (limited(req, "postcode-search", 300)) return noStore({ ok: false, error: "Too many lookups. Please enter your address manually." }, 429);

  const term = (req.nextUrl.searchParams.get("term") ?? "").trim().slice(0, 100);
  if (term.length < 3) return noStore({ ok: true, result: [] });
  if (!/^[A-Za-z0-9 ,.'&/-]+$/.test(term)) return noStore({ ok: true, result: [] });

  try {
    const data = (await ideal("", { query: term })) as { result?: { hits?: Hit[] } } | null;
    if (!data) return noStore({ ok: false, error: "Address lookup is unavailable. Please enter your address manually." }, 503);
    const result = (data.result?.hits ?? []).slice(0, 20).map((h) => ({ id: String(h.id), address: String(h.suggestion) }));
    return noStore({ ok: true, result });
  } catch (err) {
    console.error("Postcode search failed", err instanceof Error ? err.message : "unknown");
    return noStore({ ok: false, error: "We could not look up that address. Please enter it manually." }, 502);
  }
}
