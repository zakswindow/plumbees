import { getPosts } from "@/lib/blog";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

const x = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = getPosts()
    .map(
      (p) => `<item><title>${x(p.title)}</title><link>${absoluteUrl(`/blog/${p.slug}`)}</link><guid>${absoluteUrl(`/blog/${p.slug}`)}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${x(p.excerpt)}</description></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${x(site.name)} blog</title><link>${absoluteUrl("/blog")}</link><description>Plumbing advice and guides for London homes and businesses.</description><language>en-gb</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
