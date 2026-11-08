import Link from "next/link";
import { gbp, incVat, type PriceCategory } from "@/lib/prices";
import { site } from "@/lib/site";

export function PriceAssurance() {
  return (
    <div className="price-assure">
      <h2 className="price-assure-title">What most customers pay</h2>
      <p>
        These are our typical prices for common jobs. <strong>Most of the time, the price in this guide is the price you pay.</strong>
      </p>
      <p>
        We always confirm the price in writing before we start. It only changes if we find something nobody could have seen beforehand, such as hidden damage, corroded pipework or difficult access. If that happens, we stop and talk to you first. Nothing extra is done without your agreement.
      </p>
    </div>
  );
}

export function PriceTable({ categories, compact = false }: { categories: PriceCategory[]; compact?: boolean }) {
  return (
    <div className={`price-grid${compact ? " compact" : ""}`}>
      {categories.map((c) => (
        <section key={c.id} className="price-card" aria-labelledby={`price-${c.id}`}>
          <header className="price-card-head">
            <h3 id={`price-${c.id}`}>{c.name}</h3>
            <span>Typical price</span>
          </header>
          <ul>
            {c.items.map((i) => (
              <li key={i.id} className="price-row">
                <div>
                  <span className="price-name">{i.name}</span>
                  {i.tags.length > 0 && (
                    <span className="price-tags">
                      {i.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                    </span>
                  )}
                </div>
                <div className="price-amount">
                  <span className="price-inc">
                    {i.from && <span className="price-from">from </span>}
                    {gbp(incVat(i.net))}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function PriceNotes() {
  return (
    <ul className="price-notes">
      <li>&ldquo;Labour only&rdquo; means the price covers fitting, not the tap or part itself.</li>
      <li>We accept all major credit and debit cards. Pay with Klarna. A secure payment link from Stripe is sent once your price has been agreed.</li>
      <li>Prices are for standard jobs during our normal hours, {site.hours.summary}. Out-of-hours emergency work is priced when you call.</li>
      <li>Not listed? Most other jobs are quoted individually. <Link href="/book">Tell us about the job</Link>.</li>
    </ul>
  );
}

/** Compact block for service pages. */
export function ServicePrices({ categories }: { categories: PriceCategory[] }) {
  if (!categories.length) return null;
  return (
    <section className="section" aria-labelledby="svc-prices-h">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Price guide</p>
          <h2 id="svc-prices-h">Typical prices</h2>
          <p>Most of the time, this is the price you pay. We confirm it in writing before we start, and we always ask before doing anything extra.</p>
        </div>
        <PriceTable categories={categories} compact />
        <p className="note" style={{ marginTop: 16 }}><Link href="/pricing">See the full price guide and how our pricing works</Link>.</p>
      </div>
    </section>
  );
}
