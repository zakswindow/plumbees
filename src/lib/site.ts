export const site = {
  name: "Plumbees",
  legalName: "Heatingology Limited",
  companyNumber: "13808029",
  registeredIn: "England and Wales",
  address: {
    street: "167-169 Great Portland Street, 5th Floor",
    locality: "London",
    postcode: "W1W 5PF",
    country: "GB",
  },
  url: (process.env.SITE_URL || "https://www.plumbees.co.uk").replace(/\/$/, ""),
  phone: process.env.SITE_PHONE?.trim() || "",
  email: process.env.SITE_EMAIL?.trim() || "hello@plumbees.co.uk",
  tagline: "Plumbing for London homes and businesses",
  heatingUrl: "https://www.heatingology.co.uk",
  reviewsUrl: process.env.SITE_REVIEWS_URL?.trim() || "",
  hours: { summary: "9am to 6pm, seven days a week", opens: "09:00", closes: "18:00" },
  emergency: "Emergency calls taken outside these hours",
  /** Google Tag Manager container (loads Google Analytics). Only loaded after cookie consent. */
  gtmId: "GTM-NBR28D27",
} as const;

export const phoneHref = site.phone
  ? `tel:${site.phone.replace(/[^\d+]/g, "").replace(/^0/, "+44")}`
  : "";

export type NavItem = { href: string; label: string; external?: boolean };

export const nav: readonly NavItem[] = [
  { href: "/services", label: "Services" },
  { href: "/areas", label: "Areas" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "https://www.heatingology.co.uk", label: "Boilers and heating", external: true },
];

export function absoluteUrl(path = "/") {
  return `${site.url}${path === "/" ? "" : path}`;
}
