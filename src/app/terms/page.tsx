import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Website Terms | Plumbees",
  description: "Terms of use for the Plumbees website.",
  path: "/terms",
});

export default function Terms() {
  return (
    <>
      <PageHero crumbs={[{ name: "Home", href: "/" }, { name: "Website terms" }]} title="Website terms" />
      <section className="section">
        <div className="container narrow prose">
          <p>This website is operated by {site.legalName}, trading as Plumbees, registered in {site.registeredIn} No. {site.companyNumber}.</p>
          <h2>Use of this website</h2>
          <p>You may use this website to find out about our services and to request a quote. Please do not misuse it, attempt to interfere with its operation or submit false or abusive requests.</p>
          <h2>Quotes and information</h2>
          <p>Information on this website is general guidance and is not a quote. A quote only becomes binding once we have sent it to you in writing and you have accepted it. Work is carried out under the terms agreed with you at that point.</p>
          <h2>Liability</h2>
          <p>We take care to keep this website accurate, but we cannot guarantee it is free of errors or always available. Nothing here limits any liability that cannot be limited by law, including your statutory rights as a consumer.</p>
          <h2>Intellectual property</h2>
          <p>The Plumbees name, logo and the content of this website belong to {site.legalName} unless stated otherwise. Please ask before reproducing them.</p>
          <h2>Governing law</h2>
          <p>These terms are governed by the law of England and Wales, and the courts of England and Wales have jurisdiction over any dispute.</p>
        </div>
      </section>
    </>
  );
}
