"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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

export function CookieConsent({ phone, phoneHref }: { phone: string; phoneHref: string }) {
  // "pending" on the server and during hydration, so nothing flashes before the cookie is read.
  const consent = useSyncExternalStore<Consent | "pending">(subscribeConsent, readConsent, () => "pending");
  const [reopened, setReopened] = useState(false);
  const [panel, setPanel] = useState(false); // false: the first view, true: the settings view
  const [analytics, setAnalytics] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const open = () => {
      setPanel(false);
      setAnalytics(readConsent() === "granted");
      setReopened(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  const choose = (value: "granted" | "denied") => {
    setReopened(false);
    setPanel(false);
    // Tell Tag Manager first, so the analytics tag starts (or stops) straight away.
    window.gtag?.("consent", "update", { analytics_storage: value });
    writeConsent(value);
  };

  const showBanner = consent === "unset" || (reopened && consent !== "pending");

  // Move keyboard and screen reader focus into the dialog when it opens, and let Escape say no.
  useEffect(() => {
    if (!showBanner) return;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") choose("denied"); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showBanner]);

  return (
    <>
      {/^GTM-[A-Z0-9]+$/.test(site.gtmId) && (
        <Script id="gtm" strategy="afterInteractive">{gtmSnippet}</Script>
      )}
      {showBanner && (
        <div className="cookie-overlay">
          <section ref={dialogRef} tabIndex={-1} role="dialog" aria-labelledby="cookie-h" className="cookie-dialog">
            <h2 id="cookie-h">Your cookie choices</h2>
            {!panel ? (
              <>
                <p>
                  We use Google Analytics cookies to see how people use this site, so we can improve it. They are only set if you
                  accept. We do not use advertising cookies. <Link href="/cookies">Read our cookie policy</Link>.
                </p>
                <div className="cookie-actions">
                  <button type="button" className="btn btn-outline cookie-settings" onClick={() => { setAnalytics(readConsent() === "granted"); setPanel(true); }}>Cookie settings</button>
                  <button type="button" className="btn btn-primary" onClick={() => choose("denied")}>Reject all</button>
                  <button type="button" className="btn btn-primary" onClick={() => choose("granted")}>Accept all</button>
                </div>
              </>
            ) : (
              <>
                <ul className="cookie-list">
                  <li>
                    <div>
                      <strong>Strictly necessary</strong>
                      <span>Remembers your cookie choice so we do not ask on every page. Always on.</span>
                    </div>
                    <span className="cookie-always">Always on</span>
                  </li>
                  <li>
                    <div>
                      <strong>Analytics</strong>
                      <span>Google Analytics shows us which pages people use. Off unless you switch it on.</span>
                    </div>
                    <label className="cookie-switch">
                      <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
                      <span className="sr-only">Allow analytics cookies</span>
                      <span aria-hidden="true" className="cookie-slider" />
                    </label>
                  </li>
                </ul>
                <div className="cookie-actions">
                  <button type="button" className="btn btn-outline cookie-settings" onClick={() => setPanel(false)}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={() => choose(analytics ? "granted" : "denied")}>Save my choice</button>
                </div>
              </>
            )}
            {phone && <p className="cookie-call">Emergency? <a href={phoneHref}>Call {phone}</a> at any time.</p>}
          </section>
        </div>
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
