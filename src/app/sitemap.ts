import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { services } from "@/lib/services";
import { areas } from "@/lib/areas";
import { getPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const core = ["/", "/services", "/areas", "/blog", "/pricing", "/about", "/contact", "/book"];
  const legal = ["/privacy", "/cookies", "/terms"];
  return [
    ...core.map((p) => ({ url: absoluteUrl(p), lastModified: now, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...areas.map((a) => ({ url: absoluteUrl(`/areas/${a.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...getPosts().map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.6 })),
    ...legal.map((p) => ({ url: absoluteUrl(p), lastModified: now, changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
