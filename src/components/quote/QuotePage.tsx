import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { QuoteJourney } from "./QuoteJourney";
import { STARTS } from "@/lib/quote-flow";
import { INTROS } from "@/lib/quote-intro";
import { phoneHref, site } from "@/lib/site";
import { fromPrice, gbp } from "@/lib/prices";
import { breadcrumbSchema, graph } from "@/lib/seo";

export function QuotePage({ start, path }: { start: string; path: string }) {
  const base = INTROS[start] ?? INTROS.general;
  const from = fromPrice(start);
  const intro = from !== null ? { ...base, benefits: [`Typical prices from ${gbp(from)}`, ...base.benefits] } : base;
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Home", path: "/" }, { name: STARTS[start]?.node === "BA1" ? "Get a quote" : "Book a plumber", path }]))} />
      <QuoteJourney
        key={start}
        start={start}
        intro={intro}
        phone={site.phone}
        phoneHref={phoneHref}
        aside={<Photo img={intro.image} priority sizes="(max-width: 960px) 100vw, 520px" />}
      />
    </>
  );
}
