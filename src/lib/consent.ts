/**
 * Analytics consent, stored in one first-party cookie. Google Tag Manager (and so
 * Google Analytics) is only loaded once the visitor has accepted, as PECR requires.
 */

export type Consent = "granted" | "denied" | "unset";

export const CONSENT_COOKIE = "plumbees_consent";
/** Six months, after which we ask again. */
const CONSENT_MAX_AGE = 60 * 60 * 24 * 182;
/** Fired by the footer link to reopen the banner. */
export const OPEN_SETTINGS_EVENT = "plumbees:cookie-settings";

const listeners = new Set<() => void>();

export function readConsent(): Consent {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(granted|denied)(?:;|$)`));
  return match ? (match[1] as Consent) : "unset";
}

export function subscribeConsent(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function writeConsent(value: "granted" | "denied") {
  const previous = readConsent();
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${secure}`;

  if (previous === "granted" && value === "denied") {
    // Remove the cookies Google Analytics set, then reload so the tag is no longer running.
    clearAnalyticsCookies();
    location.reload();
    return;
  }
  listeners.forEach((l) => l());
}

function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const part of document.cookie.split("; ")) {
    const name = part.split("=")[0];
    if (name === "_ga" || name.startsWith("_ga_") || name === "_gid") {
      for (const d of domains) {
        document.cookie = `${name}=; Max-Age=0; Path=/${d ? `; Domain=${d}` : ""}`;
      }
    }
  }
}
