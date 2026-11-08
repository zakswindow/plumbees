import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { phoneHref, site } from "@/lib/site";
import { breadcrumbSchema, graph, organizationSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Plumbees | Plumber in London",
  description: "Contact Plumbees for plumbing repairs, emergencies and quotes across London. Send a request online or get in touch by phone or email.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={graph(organizationSchema(), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]))} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
        title="Contact us"
        lead="The quickest way to start is the quote form. We will reply with a clear, written price."
      />
      <section className="section">
        <div className="container grid grid-3">
          <div className="card">
            <h2 style={{ fontSize: "1.3rem" }}>Book online</h2>
            <p>Describe the problem, add your postcode and tell us how urgent it is.</p>
            <Link className="btn btn-primary" href="/book">Book a plumber</Link>
          </div>
          {(site.phone || site.email) && (
            <div className="card">
              <h2 style={{ fontSize: "1.3rem" }}>Phone and email</h2>
              {site.phone && <p>Phone: <a href={phoneHref}>{site.phone}</a></p>}
              {site.email && <p>Email: <a href={`mailto:${site.email}`}>{site.email}</a></p>}
            </div>
          )}
          <div className="card">
            <h2 style={{ fontSize: "1.3rem" }}>Opening hours</h2>
            <p>{site.hours.summary.charAt(0).toUpperCase() + site.hours.summary.slice(1)}.</p>
            <p>{site.emergency}. Call us and tell us it is an emergency.</p>
          </div>
          <div className="card">
            <h2 style={{ fontSize: "1.3rem" }}>Registered office</h2>
            <p>
              {site.legalName}<br />
              {site.address.street}<br />
              {site.address.locality} {site.address.postcode}
            </p>
            <p className="note">This is our registered office for company purposes, not a walk-in location. We attend customers at their address.</p>
          </div>
        </div>
      </section>
    </>
  );
}
