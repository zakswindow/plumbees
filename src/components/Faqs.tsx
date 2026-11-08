import type { Faq } from "@/lib/services";

export function Faqs({ faqs, title = "Frequently asked questions" }: { faqs: Faq[]; title?: string }) {
  return (
    <section className="section" aria-labelledby="faq-h">
      <div className="container narrow">
        <h2 id="faq-h">{title}</h2>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
