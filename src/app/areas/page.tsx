import Link from "next/link";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { REGIONS, areas } from "@/lib/areas";
import { breadcrumbSchema, graph, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Plumber Areas Covered Across London | Plumbees",
  description: "Plumbees covers all of London, including Barnet, Haringey, Tower Hamlets, Newham, Lewisham, Bromley and Havering. Check your area.",
  path: "/areas",
});

export default function AreasPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Areas", path: "/areas" }]))} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Areas" }]}
        title="Areas we cover"
        lead="We cover the whole of London. Here are the areas we are asked about most."
      />
      <section className="section">
        <div className="container">
          {REGIONS.map(([region, label]) => (
            <div key={region} style={{ marginBottom: 40 }}>
              <h2>{label}</h2>
              <div className="grid grid-3">
                {areas.filter((a) => a.region === region).map((a) => (
                  <Link key={a.slug} href={`/areas/${a.slug}`} className="card card-link">
                    <h3>{a.name}</h3>
                    <p>{a.intro}</p>
                    <span className="note">{a.postcodes}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="prose narrow" style={{ marginTop: 48 }}>
            <h2>Somewhere else in London?</h2>
            <p>
              The list above is not the whole map. We cover every London borough. If you are unsure whether we reach you, start a booking with your postcode and we will tell you.
            </p>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
