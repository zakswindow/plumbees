import { Stars } from "./Stars";
import { site } from "@/lib/site";

export function TrustBar() {
  return (
    <section className="trustbar" aria-label="Why customers trust Plumbees">
      <div className="container trustbar-grid">
        <div>
          <strong><Stars size={15} /> Rated 5 stars on Google</strong>
          <span>Heatingology, the company behind Plumbees</span>
        </div>
        <div>
          <strong>Open {site.hours.summary}</strong>
          <span>Emergency calls taken outside these hours</span>
        </div>
        <div>
          <strong>Covering all of London</strong>
          <span>Homes, landlords and businesses</span>
        </div>
        <div>
          <strong>Price agreed first</strong>
          <span>Confirmed with you before work starts</span>
        </div>
      </div>
    </section>
  );
}
