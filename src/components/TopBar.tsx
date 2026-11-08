import { Stars } from "./Stars";
import { phoneHref, site } from "@/lib/site";

export function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <p>
          Open {site.hours.summary}.{" "}
          <span className="topbar-em">
            {site.phone ? (
              <>Emergency? <a href={phoneHref}>Call {site.phone}</a> at any time.</>
            ) : (
              <>Emergency calls taken outside these hours.</>
            )}
          </span>
        </p>
        <p className="topbar-right">
          <a href={site.heatingUrl} rel="noopener">Part of Heatingology</a>
          <span className="topbar-rating"><Stars size={14} /> 5 stars on Google</span>
        </p>
      </div>
    </div>
  );
}
