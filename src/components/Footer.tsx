import Link from "next/link";
import { Logo } from "./Logo";
import { site, phoneHref } from "@/lib/site";
import { services } from "@/lib/services";
import { areas } from "@/lib/areas";

const FOOTER_AREAS = ["camden", "islington", "barnet", "haringey", "hackney", "tower-hamlets", "newham", "lewisham", "bromley", "havering"];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo variant="white" height={32} />
          <p className="footer-blurb">Plumbing repairs, emergencies and installations for homes, landlords and businesses across London.</p>
          {site.phone && <p><a href={phoneHref}>{site.phone}</a></p>}
          <p>Open {site.hours.summary}. Emergency calls taken outside these hours.</p>
          <p>Part of <a href={site.heatingUrl} rel="noopener">Heatingology</a>, rated 5 stars on Google.</p>
          {site.email && <p><a href={`mailto:${site.email}`}>{site.email}</a></p>}
        </div>
        <nav aria-label="Services">
          <h2 className="footer-h">Services</h2>
          <ul>
            {services.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Areas">
          <h2 className="footer-h">Areas</h2>
          <ul>
            {areas.filter((a) => FOOTER_AREAS.includes(a.slug)).map((a) => (
              <li key={a.slug}><Link href={`/areas/${a.slug}`}>{a.name}</Link></li>
            ))}
            <li><Link href="/areas">All areas we cover</Link></li>
          </ul>
        </nav>
        <nav aria-label="Company">
          <h2 className="footer-h">Company</h2>
          <ul>
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><a href={site.heatingUrl} rel="noopener">Boilers and heating</a></li>
            <li><Link href="/book">Book a plumber</Link></li>
            <li><Link href="/privacy">Privacy policy</Link></li>
            <li><Link href="/cookies">Cookie policy</Link></li>
            <li><Link href="/terms">Website terms</Link></li>
          </ul>
        </nav>
      </div>
      <div className="container footer-legal">
        <p>
          Plumbees is a trading name of {site.legalName}. Registered in {site.registeredIn} No. {site.companyNumber}.
          Registered office: {site.address.street}, {site.address.locality} {site.address.postcode}.
        </p>
        <p>&copy; {year} {site.legalName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
