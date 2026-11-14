"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import { CONSENT_COOKIE, OPEN_SETTINGS_EVENT, readConsent, subscribeConsent, writeConsent, type Consent } from "@/lib/consent";
import { site } from "@/lib/site";

// Google Consent Mode v2. Tag Manager loads on every page, but every kind of storage is DENIED by default, so no
// analytics or advertising tag may run and no cookie may be set. If the visitor has already accepted analytics
// (our own consent cookie), analytics_storage is switched on straight away, before Tag Manager starts.
// Advertising storage stays denied in all cases: we never use it.
const gtmSnippet = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',false);
if(/(?:^|; )${CONSENT_COOKIE}=granted(?:;|$)/.test(document.cookie)){gtag('consent','update',{analytics_storage:'granted'});}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.gtmId}');`;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

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
    // Tell Tag Manager first, so the analytics tag starts (or stops) straight away.
    window.gtag?.("consent", "update", { analytics_storage: value });
    writeConsent(value);
  };

  const showBanner = consent === "unset" || (reopened && consent !== "pending");

  return (
    <>
      {/^GTM-[A-Z0-9]+$/.test(site.gtmId) && (
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
