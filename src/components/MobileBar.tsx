import Link from "next/link";
import { phoneHref, site } from "@/lib/site";

export function MobileBar() {
  return (
    <div className="mobile-bar" role="region" aria-label="Quick actions">
      {site.phone && <a className="btn btn-outline" href={phoneHref}>Call</a>}
      <Link className="btn btn-primary" href="/book">Book a plumber</Link>
    </div>
  );
}
