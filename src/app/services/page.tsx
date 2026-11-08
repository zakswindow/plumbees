import Link from "next/link";
import { Cta } from "@/components/Cta";
import { HeatingNote } from "@/components/HeatingNote";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { services } from "@/lib/services";
import { breadcrumbSchema, graph, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Plumbing Services in London | Plumbees",
  description: "Emergency plumbing, leak repairs, blocked drains, bathroom plumbing, landlord and commercial services across London. Request a free quote.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]))} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
        title="Plumbing services"
        lead="Repairs, emergencies and installations for homes, landlords and businesses across London."
      />
      <section className="section">
        <div className="container grid grid-3">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="card card-link">
              <h2 style={{ fontSize: "1.3rem" }}>{s.name}</h2>
              <p>{s.short}</p>
              <span className="more">Read more</span>
            </Link>
          ))}
        </div>
      </section>
      <HeatingNote />
      <Cta />
    </>
  );
}
