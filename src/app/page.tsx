import Link from "next/link";
import { Cta } from "@/components/Cta";
import { Faqs } from "@/components/Faqs";
import { services } from "@/lib/services";
import { areas } from "@/lib/areas";
import { phoneHref, site } from "@/lib/site";
import { pageMetadata, faqSchema, graph } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { HeatingNote } from "@/components/HeatingNote";
import { TrustBar } from "@/components/TrustBar";
import { BrandBand } from "@/components/BrandBand";
import { Photo } from "@/components/Photo";
import { images } from "@/lib/images";
import { gbp, incVat, allPrices } from "@/lib/prices";

export const metadata = pageMetadata({
  title: "Plumber in London | Repairs, Emergencies and Bathrooms | Plumbees",
  description:
    "Plumbees provides plumbing repairs, emergency call-outs and bathroom plumbing for homes, landlords and businesses across London. Request a free written quote.",
  path: "/",
});

const faqs = [
  { q: "Which areas of London do you cover?", a: "We cover all of London, including Barnet, Enfield, Haringey, Tower Hamlets, Newham, Lewisham, Bromley and Havering, plus nearby areas such as Thurrock and Chigwell. If you are not sure whether we reach your postcode, send it with your request and we will tell you." },
  { q: "How much will it cost?", a: "Common jobs have a typical price in our price guide. For example, a kitchen sink unblock is £144 and fitting a kitchen mixer tap is £84. Most of the time that is the price you pay. We confirm it in writing before we start, and other jobs are quoted individually." },
  { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards. Choose Klarna at checkout. Once your price has been agreed, we will send you a secure payment link from Stripe." },
  { q: "Do you do emergency work?", a: "Yes. Mark your request as an emergency and it is flagged for priority. If water is still running, close the main stopcock while you wait." },
  { q: "Do you work on boilers and central heating?", a: "Plumbees looks after plumbing, drainage and bathrooms. Boilers and heating are handled by our heating team at Heatingology, at heatingology.co.uk, so you always reach the right specialist." },
  { q: "What are your opening hours?", a: "We are open 9am to 6pm, seven days a week. If you have an emergency outside those hours, call us and we will help." },
];

export default function Home() {
  return (
    <>
      <JsonLd data={graph(faqSchema(faqs))} />
      <section className="hero">
        <div className="container hero-grid">
          <div>
          <p className="eyebrow">Plumbers covering all of London</p>
          <h1>Plumbing that gets sorted properly</h1>
          <p className="lead">
            Leaks, blockages, bathrooms and emergencies for homeowners, landlords and businesses. Tell us what is wrong and we will send you a clear, written quote.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-light btn-lg" href="/book">Book a plumber</Link>
            {site.phone && <a className="btn btn-outline-light btn-lg" href={phoneHref}>Call {site.phone}</a>}
          </div>
          <ul className="hero-points">
            <li>Part of Heatingology, rated 5 stars on Google</li>
            <li>Open 9am to 6pm, seven days a week</li>
            <li>Emergency calls taken outside these hours</li>
          </ul>
          </div>
          <Photo img={images.skyline} priority sizes="(max-width: 960px) 100vw, 520px" />
        </div>
      </section>

      <TrustBar />

      <section className="section" aria-labelledby="services-h">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">What we do</p>
            <h2 id="services-h">Plumbing services across London</h2>
            <p className="lead">From a dripping tap to a full bathroom, we handle the plumbing and tell you plainly what is needed.</p>
          </div>
          <div className="grid grid-3">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card card-link">
                <h3>{s.name}</h3>
                <p>{s.short}</p>
                <span className="more">Find out more</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BrandBand />

      <section className="section alt" aria-labelledby="how-h">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">How it works</p>
            <h2 id="how-h">A simple, quote-first process</h2>
          </div>
          <div className="grid grid-4">
            {[
              ["01", "Tell us the problem", "Fill in the short form or call us. Include your postcode and how urgent it is."],
              ["02", "Receive a written quote", "We review the details and come back with a clear price and what it covers."],
              ["03", "Agree and book", "Approve the quote and we arrange a time that suits you."],
              ["04", "We fix it", "We do the work, test it and explain what we found before we leave."],
            ].map(([n, t, d]) => (
              <div key={n} className="card">
                <div className="step-n">{n}</div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="who-h">
        <div className="container split">
          <div>
            <p className="eyebrow">Who we work for</p>
            <h2 id="who-h">Homeowners, landlords and businesses</h2>
            <p>
              Plumbing problems look different depending on who is affected. A homeowner wants the leak fixed and the mess limited. A landlord wants the tenant looked after and the paperwork in order. A business wants minimal disruption.
            </p>
            <p>We keep each of those in mind. You tell us who you are on the quote form, and we plan the visit and the reporting around it.</p>
            <p><Link href="/about">More about Plumbees</Link></p>
          </div>
          <div className="panel">
            <h3>What you can expect</h3>
            <ul className="ticks">
              <li>Plain explanations without jargon</li>
              <li>A written quote before any work begins</li>
              <li>Respect for your home and your time</li>
              <li>Clear communication about access and timing</li>
              <li>Work tested before we leave</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="prices-h">
        <div className="container split">
          <div>
            <p className="eyebrow">Price guide</p>
            <h2 id="prices-h">Clear prices for common jobs</h2>
            <p>We publish typical prices so you know what to expect. Most of the time, the price in our guide is the price you pay, and we always confirm it in writing before we start.</p>
            <p><Link className="btn btn-primary" href="/pricing">See the price guide</Link></p>
          </div>
          <ul className="price-teaser">
            {["kitchen-tap-single", "washing-machine", "unblock-kitchen-sink", "unblock-wc"].map((id) => {
              const p = allPrices().find((x) => x.id === id)!;
              return (
                <li key={id}>
                  <strong>{gbp(incVat(p.net))}</strong>
                  <span>{p.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section alt" aria-labelledby="areas-h">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Where we work</p>
            <h2 id="areas-h">Covering all of London</h2>
            <p className="lead">We work across the capital. These are some of the areas we are asked about most often.</p>
          </div>
          <ul className="chips">
            {areas.map((a) => (
              <li key={a.slug}><Link href={`/areas/${a.slug}`}>{a.name}</Link></li>
            ))}
          </ul>
          <p style={{ marginTop: 24 }}><Link href="/areas">See all areas</Link></p>
        </div>
      </section>

      <HeatingNote />
      <Faqs faqs={faqs} />
      <Cta />
    </>
  );
}
