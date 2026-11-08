import { site, absoluteUrl } from "../site";
import { esc, nl2br } from "./escape";
import type { JobKind, Step } from "../quote-flow";
import { formatPostcode, type Address } from "../quote";

const NAVY = "#152138";
const BLUE = "#3981c3";
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export type QuoteEmail = {
  ref: string;
  serviceLabel: string;
  emergency: boolean;
  kind: JobKind;
  steps: Step[];
  address: Address;
  name: string;
  email: string;
  phone: string;
};

function layout(opts: { preheader: string; heading: string; body: string }) {
  const logo = absoluteUrl("/email/logo.png");
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(opts.heading)}</title>
</head>
<body style="margin:0;padding:0;background:#f2f4f8;font-family:${FONT};color:${NAVY};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(opts.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f8;">
<tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;">
    <tr><td style="padding:28px 32px;border-bottom:4px solid ${BLUE};">
      <img src="${logo}" width="200" alt="Plumbees" style="display:block;border:0;height:auto;width:200px;">
    </td></tr>
    <tr><td style="padding:32px;font-size:16px;line-height:1.6;">
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:${NAVY};">${esc(opts.heading)}</h1>
      ${opts.body}
    </td></tr>
    <tr><td style="padding:20px 32px;background:${NAVY};color:#c9d3e6;font-size:12px;line-height:1.6;">
      Plumbees is part of Heatingology. Open ${esc(site.hours.summary)}.<br>
      Plumbees is a trading name of ${esc(site.legalName)}. Registered in ${esc(site.registeredIn)} No. ${esc(site.companyNumber)}.<br>
      Registered office: ${esc(site.address.street)}, ${esc(site.address.locality)} ${esc(site.address.postcode)}.
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

const row = (k: string, v: string) =>
  `<tr><td style="padding:8px 14px 8px 0;color:#5b6780;font-size:14px;vertical-align:top;width:38%;">${esc(k)}</td><td style="padding:8px 0;font-size:15px;vertical-align:top;">${v}</td></tr>`;

const table = (rows: string) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 20px;border-top:1px solid #e3e8f0;">${rows}</table>`;

const addressLines = (a: Address) =>
  [a.line1, a.line2, a.town, a.county, formatPostcode(a.postcode)].filter(Boolean);

const answersRows = (steps: Step[]) => steps.map((s) => row(s.summary, nl2br(s.answer))).join("");

export function customerEmail(q: QuoteEmail) {
  const first = q.name.split(" ")[0];
  const booking = q.kind === "booking";
  const subject = booking ? `We have your booking request (${q.ref})` : `We have your quote request (${q.ref})`;
  const html = layout({
    preheader: "Thanks for getting in touch. Here is a copy of what you sent us.",
    heading: booking ? `Thanks, ${first}. We have your booking request.` : `Thanks, ${first}. We have your request.`,
    body: `
      <p style="margin:0 0 16px;">${
        q.emergency
          ? "You told us this is an emergency, so it has been flagged for priority. Please keep your phone close, as we may ring to confirm details."
          : booking
            ? "We will check availability for the time you asked for and call you to confirm your time and price. Nothing is booked until we have agreed it with you."
            : "We will review your plans and come back to you with a written quote, broken down by stage. If we need anything else, we will phone or email you."
      }</p>
      ${q.emergency && site.phone ? `<p style="margin:0 0 16px;">If water is still running, close your main stopcock and call us on <strong>${esc(site.phone)}</strong>.</p>` : ""}
      <p style="margin:0 0 4px;"><strong>Your reference:</strong> ${esc(q.ref)}</p>
      <p style="margin:0 0 4px;"><strong>Job:</strong> ${esc(q.serviceLabel)}</p>
      <h2 style="margin:24px 0 4px;font-size:16px;color:${NAVY};">Your answers</h2>
      ${table(answersRows(q.steps))}
      <h2 style="margin:0 0 4px;font-size:16px;color:${NAVY};">Address</h2>
      <p style="margin:0 0 20px;">${addressLines(q.address).map(esc).join("<br>")}</p>
      <p style="margin:0 0 16px;">We are open ${esc(site.hours.summary)}, and we take emergency calls outside those hours.${site.phone ? ` Call us on ${esc(site.phone)} and quote your reference.` : " Reply to this email and quote your reference."}</p>
      <p style="margin:0;">Kind regards,<br>The Plumbees team</p>`,
  });
  const text = [
    `Thanks, ${first}. We have your request.`,
    "",
    q.emergency
      ? "You told us this is an emergency, so it has been flagged for priority."
      : booking
        ? "We will call you to confirm your time and price."
        : "We will come back to you with a written quote.",
    `Reference: ${q.ref}`,
    `Job: ${q.serviceLabel}`,
    "",
    ...q.steps.map((s) => `${s.summary}: ${s.answer}`),
    "",
    `Address: ${addressLines(q.address).join(", ")}`,
    "",
    site.phone ? `Questions? Call ${site.phone} (${site.hours.summary}).` : "",
    "Kind regards,",
    "The Plumbees team",
    "",
    `Plumbees is a trading name of ${site.legalName}. Registered in ${site.registeredIn} No. ${site.companyNumber}.`,
  ].join("\n");
  return { subject, html, text };
}

export function businessEmail(q: QuoteEmail) {
  const pc = formatPostcode(q.address.postcode);
  const label = q.kind === "booking" ? "New booking request" : "New quote request";
  const subject = `${q.emergency ? "[EMERGENCY] " : ""}${label} ${q.ref}: ${q.serviceLabel}, ${pc}`;
  const html = layout({
    preheader: `${q.name}, ${pc}, ${q.serviceLabel}`,
    heading: q.emergency ? "Emergency request" : label,
    body: `
      ${q.emergency ? `<p style="margin:0 0 16px;padding:12px 16px;background:#fdecec;border-left:4px solid #c62828;color:#7a1313;"><strong>Customer marked this as an emergency.</strong> Call them straight away.</p>` : ""}
      ${table(
        row("Reference", esc(q.ref)) +
        row("Job", esc(q.serviceLabel)) +
        row("Name", esc(q.name)) +
        row("Phone", `<a href="tel:${esc(q.phone.replace(/[^\d+]/g, ""))}" style="color:${BLUE};">${esc(q.phone)}</a>`) +
        row("Email", `<a href="mailto:${esc(q.email)}" style="color:${BLUE};">${esc(q.email)}</a>`) +
        row("Address", addressLines(q.address).map(esc).join("<br>")),
      )}
      <h2 style="margin:0 0 4px;font-size:16px;color:${NAVY};">Answers</h2>
      ${table(answersRows(q.steps))}
      ${q.kind === "booking" ? `<p style="margin:0 0 12px;font-size:14px;"><strong>Next step:</strong> call the customer to confirm the time and price.</p>` : ""}
      <p style="margin:0;font-size:13px;color:#5b6780;">The customer consented to be contacted about this request. Reply to this email to answer them directly.</p>`,
  });
  const text = [
    q.emergency ? "EMERGENCY: call the customer straight away." : label,
    `Reference: ${q.ref}`,
    `Job: ${q.serviceLabel}`,
    `Name: ${q.name}`,
    `Phone: ${q.phone}`,
    `Email: ${q.email}`,
    `Address: ${addressLines(q.address).join(", ")}`,
    "",
    ...q.steps.map((s) => `${s.summary}: ${s.answer}`),
  ].join("\n");
  return { subject, html, text };
}
