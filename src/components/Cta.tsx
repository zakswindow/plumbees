import Link from "next/link";
import { phoneHref, site } from "@/lib/site";

export function Cta({ title = "Need a plumber in London?", text = "Tell us what is wrong and when suits you. We will call to confirm your time and price." }: { title?: string; text?: string }) {
  return (
    <section className="cta" aria-labelledby="cta-h">
      <div className="container cta-inner">
        <div>
          <h2 id="cta-h">{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-actions">
          <Link className="btn btn-light" href="/book">Book a plumber</Link>
          {site.phone && <a className="btn btn-outline-light" href={phoneHref}>Call {site.phone}</a>}
        </div>
      </div>
    </section>
  );
}
