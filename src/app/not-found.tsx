import Link from "next/link";

export const metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="section">
      <div className="container narrow">
        <p className="eyebrow">Error 404</p>
        <h1>We could not find that page</h1>
        <p className="lead">It may have moved or the address may be mistyped.</p>
        <p style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btn btn-primary" href="/">Go to the homepage</Link>
          <Link className="btn btn-outline" href="/book">Book a plumber</Link>
        </p>
      </div>
    </section>
  );
}
