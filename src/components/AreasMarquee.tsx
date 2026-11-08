import Link from "next/link";
import { areas } from "@/lib/areas";

/** Slow scrolling strip of the areas we cover. Pauses on hover or focus; static when motion is reduced. */
export function AreasMarquee() {
  const list = (dup: boolean) => (
    <ul className={`marquee-list${dup ? " marquee-dup" : ""}`} aria-hidden={dup || undefined}>
      {areas.map((a) => (
        <li key={a.slug}>
          {dup ? <span>{a.name}</span> : <Link href={`/areas/${a.slug}`}>{a.name}</Link>}
        </li>
      ))}
    </ul>
  );
  return (
    <section className="marquee" aria-labelledby="marquee-h">
      <p id="marquee-h" className="marquee-title">Plumbers across London</p>
      <div className="marquee-mask">
        <div className="marquee-track">
          {list(false)}
          {list(true)}
        </div>
      </div>
    </section>
  );
}
