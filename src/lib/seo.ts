import type { Metadata } from "next";
import { absoluteUrl, phoneHref, site } from "./site";
import type { Faq } from "./services";

type PageMeta = { title: string; description: string; path: string; noindex?: boolean };

export function pageMetadata({ title, description, path, noindex }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "en_GB", siteName: site.name, title, description, url },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

const orgId = `${site.url}/#organization`;

export function organizationSchema() {
  return {
    "@type": "Plumber",
    "@id": orgId,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl("/brand/logo.svg"),
    image: absoluteUrl("/opengraph-image"),
    description: "Plumbing repairs, emergency call-outs and installations for homes, landlords and businesses across London.",
    ...(site.phone ? { telephone: site.phone } : {}),
    ...(site.email ? { email: site.email } : {}),
    identifier: site.companyNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postcode,
      addressCountry: site.address.country,
    },
    priceRange: "Quote on request",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
    sameAs: [site.heatingUrl],
    areaServed: { "@type": "AdministrativeArea", name: "London" },
    ...(phoneHref ? { contactPoint: { "@type": "ContactPoint", contactType: "customer service", telephone: site.phone, areaServed: "GB", availableLanguage: "English" } } : {}),
  };
}

export const graph = (...items: object[]) => ({ "@context": "https://schema.org", "@graph": items });

export const websiteSchema = () => ({
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  inLanguage: "en-GB",
  publisher: { "@id": orgId },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const faqSchema = (faqs: Faq[]) => ({
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const serviceSchema = (name: string, description: string, path: string) => ({
  "@type": "Service",
  name,
  description,
  url: absoluteUrl(path),
  provider: { "@id": orgId },
  areaServed: { "@type": "AdministrativeArea", name: "Greater London" },
});
