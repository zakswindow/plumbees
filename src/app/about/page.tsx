import Link from "next/link";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Stars } from "@/components/Stars";
import { Photo } from "@/components/Photo";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { breadcrumbSchema, graph, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Plumbees | Part of Heatingology, London Plumbers",
  description: "Plumbees is the plumbing business of Heatingology Limited, rated 5 stars on Google. Open seven days a week and covering all of London.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]))} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
        title="About Plumbees"
        lead="A London plumbing business built on the same standards that earned Heatingology its 5 star reputation."
      />
      <section className="section">
        <div className="container split">
          <div className="prose">
            <Photo img={images.shower} />
            <h2>Who we are</h2>
            <p>
              Plumbees is the plumbing business of {site.legalName}, the company behind <a href={site.heatingUrl} rel="noopener">Heatingology</a>. Heatingology is rated 5 stars on Google, and customers come to us because they trust the way we work. Plumbees applies those same standards to leaks, blockages, bathrooms and emergency plumbing across London.
            </p>
            <p>
              We look after homeowners, landlords, letting agents and businesses. We are a registered company with a registered office, a company number and a team that answers the phone. When you ask us for help, we want to be the people who actually turn up and do what we said.
            </p>
            <h2>When we are available</h2>
            <p>
              We are open {site.hours.summary}. If something goes wrong outside those hours, call us. We take emergency calls, because a burst pipe does not wait for the morning.
            </p>
            <h2>How we work</h2>
            <ul className="ticks">
              <li>We ask questions before we quote, so the price is realistic.</li>
              <li>We give you a written quote and agree it with you before work begins.</li>
              <li>We explain what went wrong in plain English.</li>
              <li>We treat your home or premises with care and leave it tidy.</li>
              <li>We keep to our specialism. Plumbees does plumbing and drainage. Boilers and heating are handled by our heating team at <a href={site.heatingUrl} rel="noopener">Heatingology</a>.</li>
            </ul>
            <h2>Where we work</h2>
            <p>
              We cover the whole of London, from Barnet, Enfield and Haringey in the north to Lewisham, Bromley and Chessington in the south, and east to Newham, Havering and Thurrock. See our <Link href="/areas">areas page</Link> for more.
            </p>
            <h2>Company details</h2>
            <p>
              Plumbees is a trading name of {site.legalName}, a company registered in {site.registeredIn} under number {site.companyNumber}. Our registered office is {site.address.street}, {site.address.locality} {site.address.postcode}.
            </p>
          </div>
          <aside className="panel">
            <p className="rating-line"><Stars size={22} /> <strong>5 stars on Google</strong></p>
            <p>Heatingology customers rate us 5 stars. We aim to earn the same from every Plumbees customer.</p>
            {site.reviewsUrl && <p><a href={site.reviewsUrl} rel="noopener">Leave us a Google review</a></p>}
            <h3 style={{ marginTop: 24 }}>Work with us</h3>
            <p>Send us the details of your plumbing problem and we will reply with a clear quote.</p>
            <p><a className="btn btn-primary" href="/book">Book a plumber</a></p>
          </aside>
        </div>
      </section>
      <Cta />
    </>
  );
}
