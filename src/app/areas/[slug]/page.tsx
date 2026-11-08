import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RichText } from "@/components/RichText";
import { areas, getArea } from "@/lib/areas";
import { services } from "@/lib/services";
import { breadcrumbSchema, graph, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => areas.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: Props) {
  const a = getArea((await params).slug);
  if (!a) return {};
  return pageMetadata({ title: `Plumber in ${a.name} | Plumbees`, description: a.metaDescription, path: `/areas/${a.slug}` });
}

export default async function AreaPage({ params }: Props) {
  const a = getArea((await params).slug);
  if (!a) notFound();
  const path = `/areas/${a.slug}`;

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Areas", path: "/areas" }, { name: a.name, path }]))} />
      <PageHero crumbs={[{ name: "Home", href: "/" }, { name: "Areas", href: "/areas" }, { name: a.name }]} title={`Plumber in ${a.name}`} lead={a.intro} />
      <section className="section">
        <div className="container split">
          <div className="prose">
            <h2>Plumbing in {a.name}</h2>
            {a.paragraphs.map((p) => <p key={p}><RichText text={p} /></p>)}
            <h2>Jobs we are often asked about here</h2>
            <ul className="ticks">{a.commonJobs.map((j) => <li key={j}>{j}</li>)}</ul>
            <p>Postcodes include {a.postcodes}. If yours is not listed, send it with your request and we will confirm.</p>
          </div>
          <aside className="panel">
            <h3>Book a plumber in {a.name}</h3>
            <p>Tell us the problem and your postcode. We will come back with a clear written price.</p>
            <p><Link className="btn btn-primary" href="/book">Book a plumber</Link></p>
          </aside>
        </div>
      </section>
      <section className="section alt" aria-labelledby="svc-h">
        <div className="container">
          <h2 id="svc-h">Our services in {a.name}</h2>
          <div className="grid grid-3">
            {services.slice(0, 6).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card card-link">
                <h3>{s.name}</h3>
                <p>{s.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Cta title={`Plumbing help in ${a.name}`} />
    </>
  );
}
