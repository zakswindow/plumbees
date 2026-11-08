import type { NextRequest } from "next/server";
import { ideal, limited, noStore } from "@/lib/postcode";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Addr = { line_1?: string; line_2?: string; line_3?: string; post_town?: string; county?: string; postcode?: string };

export async function GET(req: NextRequest) {
  if (limited(req, "postcode-address", 120)) return noStore({ ok: false, error: "Too many lookups. Please enter your address manually." }, 429);

  const id = req.nextUrl.searchParams.get("id") ?? "";
  // The id sits in the upstream URL next to our API key, so only plain ids are accepted.
  if (!/^[A-Za-z0-9_-]{1,100}$/.test(id)) return noStore({ ok: false, error: "Invalid address." }, 400);

  try {
    const data = (await ideal(`/${encodeURIComponent(id)}/gbr`)) as { result?: Addr } | null;
    if (!data) return noStore({ ok: false, error: "Address lookup is unavailable. Please enter your address manually." }, 503);
    const a = data.result ?? {};
    return noStore({
      ok: true,
      result: {
        line1: a.line_1 ?? "",
        line2: [a.line_2, a.line_3].filter(Boolean).join(", "),
        town: a.post_town ?? "",
        county: a.county ?? "",
        postcode: a.postcode ?? "",
      },
    });
  } catch (err) {
    console.error("Address fetch failed", err instanceof Error ? err.message : "unknown");
    return noStore({ ok: false, error: "We could not load that address. Please enter it manually." }, 502);
  }
}
