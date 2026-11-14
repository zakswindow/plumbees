"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import { OPEN_SETTINGS_EVENT, readConsent, subscribeConsent, writeConsent, type Consent } from "@/lib/consent";
import { site } from "@/lib/site";

// Consent Mode defaults: the visitor agreed to analytics only, never advertising.
const gtmSnippet = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.gtmId}');`;

export function CookieConsent() {
  // "pending" on the server and during hydration, so nothing flashes before the cookie is read.
  const consent = useSyncExternalStore<Consent | "pending">(subscribeConsent, readConsent, () => "pending");
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  const choose = (value: "granted" | "denied") => {
    setReopened(false);
    writeConsent(value);
  };

  const showBanner = consent === "unset" || (reopened && consent !== "pending");

  return (
    <>
      {consent === "granted" && /^GTM-[A-Z0-9]+$/.test(site.gtmId) && (
        <Script id="gtm" strategy="afterInteractive">{gtmSnippet}</Script>
      )}
      {showBanner && (
        <section className="cookie-banner" aria-label="Cookie choices">
          <div className="container cookie-banner-inner">
            <p>
              We would like to use Google Analytics cookies to see how people use this site, so we can improve it.
              They are only set if you accept. <Link href="/cookies">Read our cookie policy</Link>.
            </p>
            <div className="cookie-banner-actions">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => choose("granted")}>Accept analytics</button>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => choose("denied")}>Reject analytics</button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export function CookieSettingsButton() {
  return (
    <button type="button" className="link-button" onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}>
      Cookie settings
    </button>
  );
}
