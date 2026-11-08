import Link from "next/link";
import { Stars } from "./Stars";
import { site } from "@/lib/site";

export function BrandBand() {
  return (
    <section className="section" aria-labelledby="brand-h">
      <div className="container split">
        <div>
          <p className="eyebrow">Who is behind Plumbees</p>
          <h2 id="brand-h">Part of Heatingology</h2>
          <p>
            Plumbees is the plumbing side of {site.legalName}, the company behind <a href={site.heatingUrl} rel="noopener">Heatingology</a>. Customers already know us for careful, honest heating work and a 5 star rating on Google. Plumbees brings the same standards to plumbing, drainage and bathrooms.
          </p>
          <p>
            We are a registered company in {site.registeredIn}, number {site.companyNumber}. You are dealing with an established business, not a one-off tradesperson who may not answer next week.
          </p>
          <p><Link href="/about">More about who we are</Link></p>
        </div>
        <div className="panel">
          <p className="rating-line"><Stars size={22} /> <strong>5 stars on Google</strong></p>
          <p>Customers rate Heatingology 5 stars for the way we work, and that is the standard we hold Plumbees to.</p>
          {site.reviewsUrl && <p><a className="btn btn-outline" href={site.reviewsUrl} rel="noopener">Leave us a Google review</a></p>}
        </div>
      </div>
    </section>
  );
}
