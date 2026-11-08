import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta } from "@/components/Cta";
import { Faqs } from "@/components/Faqs";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { getService, services } from "@/lib/services";
import { site } from "@/lib/site";
import { Photo } from "@/components/Photo";
import { serviceImages } from "@/lib/images";
import { ServicePrices } from "@/components/PriceGuide";
import { fromPrice, gbp, pricesForService } from "@/lib/prices";
import { breadcrumbSchema, faqSchema, graph, pageMetadata, serviceSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const path = `/services/${s.slug}`;
  const related = s.related.map((r) => getService(r)).filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema(s.name, s.metaDescription, path),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.name, path }]),
          faqSchema(s.faqs),
        )}
      />
      <PageHero crumbs={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: s.name }]} title={s.h1} lead={s.short} />

      <section className="section">
        <div className="container split">
          <div className="prose">
            {serviceImages[s.slug] && <Photo img={serviceImages[s.slug]!} />}
            {s.intro.map((p) => <p key={p}>{p}</p>)}
            <h2>{s.signs.title}</h2>
            <ul className="ticks">{s.signs.items.map((i) => <li key={i}>{i}</li>)}</ul>
            <h2>What is included</h2>
            <ul className="ticks">{s.included.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
          <aside className="panel" aria-label={s.slug === "bathroom-plumbing" ? "Get a quote" : "Book a plumber"}>
            <h3>{s.slug === "bathroom-plumbing" ? "Get a written quote" : "Book online"}</h3>
            {fromPrice(s.slug) !== null && (
              <p className="aside-price">Typical prices from <strong>{gbp(fromPrice(s.slug)!)}</strong></p>
            )}
            <p>{s.slug === "bathroom-plumbing" ? "Tell us about the project and we will send you a written quote, broken down by stage." : "Tell us what is wrong and when suits you. We will call to confirm your time and price."}</p>
            <p><Link className="btn btn-primary" href={`/quote/${s.slug}`}>{s.slug === "bathroom-plumbing" ? "Get a free quote" : "Book a plumber"}</Link></p>
            <p className="note">Covering all of London. Free and without obligation.</p>
            <p className="note">Boiler or heating problem? <a href={site.heatingUrl} rel="noopener">Visit Heatingology</a>.</p>
          </aside>
        </div>
      </section>

      <ServicePrices categories={pricesForService(s.slug)} />

      <section className="section alt" aria-labelledby="process-h">
        <div className="container">
          <div className="section-head"><h2 id="process-h">How it works</h2></div>
          <div className="grid grid-4">
            {s.process.map((p, i) => (
              <div className="card" key={p.title}>
                <div className="step-n">0{i + 1}</div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faqs faqs={s.faqs} />

      <section className="section alt" aria-labelledby="related-h">
        <div className="container">
          <h2 id="related-h">Related services</h2>
          <div className="grid grid-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/services/${r.slug}`} className="card card-link">
                <h3>{r.name}</h3>
                <p>{r.short}</p>
                <span className="more">Read more</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
