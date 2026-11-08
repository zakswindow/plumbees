import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Plumbees",
    short_name: "Plumbees",
    description: "Plumbing for London homes and businesses",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#152138",
    icons: [{ src: "/brand/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
