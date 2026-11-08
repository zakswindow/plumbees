import { Cta } from "@/components/Cta";
import { Faqs } from "@/components/Faqs";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PriceAssurance, PriceNotes, PriceTable } from "@/components/PriceGuide";
import { PRICE_GUIDE } from "@/lib/prices";
import { breadcrumbSchema, faqSchema, graph, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Plumbing Prices in London | Price Guide | Plumbees",
  description: "Typical prices for common plumbing jobs in London, including tap fitting, sink replacement and unblocking. Most of the time, it is the price you pay.",
  path: "/pricing",
});

const faqs = [
  { q: "Are these prices fixed?", a: "They are our typical prices, and most of the time they are exactly what you pay. We confirm the price in writing before we start. It only changes if we find something nobody could have seen beforehand, such as hidden damage or difficult access, and we always ask you before doing anything extra." },
  { q: "What does labour only mean?", a: "It means the price covers fitting the item, but not the tap or part itself. If you would like us to supply it, tell us when you request a quote and we will include it." },
  { q: "What if my job is not on the list?", a: "Most other jobs are quoted individually. Answer a few questions online and we will send you a free, written quote." },
  { q: "Do you charge for quotes?", a: "No. Quotes are free and without obligation." },
  { q: "How do I pay?", a: "Once your price has been agreed, we will send you a secure payment link from Stripe. We accept all major credit and debit cards. Choose Klarna at checkout. Card details are never entered on this website." },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]), faqSchema(faqs))} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Pricing" }]}
        title="Price guide"
        lead="Clear, typical prices for common plumbing jobs, so you know roughly what to expect before you ask us for a quote."
      />
      <section className="section">
        <div className="container">
          <PriceAssurance />
          <PriceTable categories={PRICE_GUIDE} />
          <PriceNotes />
        </div>
      </section>

      <section className="section alt">
        <div className="container narrow prose">
          <h2>How our pricing works</h2>
          <ol>
            <li>Check the guide for a typical price. For anything else, we quote individually.</li>
            <li>Tell us about the job. A few answers, and sometimes a photograph, help us get it right.</li>
            <li>We confirm the price in writing before any work begins.</li>
            <li>If we find something unexpected on the day, we stop and talk to you before going any further.</li>
          </ol>
          <h2>What can change a price</h2>
          <p>Most jobs go exactly to plan. Occasionally we find something that could not be seen beforehand, for example:</p>
          <ul className="ticks">
            <li>Corroded or damaged pipework behind the fitting</li>
            <li>Seized valves or fixings that have to be cut out</li>
            <li>Very difficult access, such as boxed-in or tiled-over pipes</li>
            <li>A blockage that turns out to be further down the drain</li>
          </ul>
          <p>When that happens, we explain what we have found, what it will cost and what your options are. You decide whether we go ahead.</p>
        </div>
      </section>

      <Faqs faqs={faqs} />
      <Cta title="Ready to book?" text="Answer a few quick questions, choose a time that suits you and we will call to confirm." />
    </>
  );
}
