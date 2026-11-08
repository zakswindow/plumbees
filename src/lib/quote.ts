import { z } from "zod";
import { STARTS } from "./quote-flow";

// Strips control characters (including CR/LF) so values are safe in headers and templates.
const clean = (max: number) =>
  z
    .string()
    .transform((v) => v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim())
    .pipe(z.string().max(max));

const singleLine = (min: number, max: number, msg: string) =>
  clean(max).transform((v) => v.replace(/[\r\n\t]+/g, " ")).pipe(z.string().min(min, msg));

export const POSTCODE_RE = /^[A-Za-z]{1,2}[0-9][A-Za-z0-9]?\s*[0-9][A-Za-z]{2}$/;

export const addressSchema = z.object({
  line1: singleLine(2, 120, "Please enter the first line of the address"),
  line2: singleLine(0, 120, "").optional().default(""),
  town: singleLine(2, 80, "Please enter the town or city"),
  county: singleLine(0, 80, "").optional().default(""),
  postcode: clean(10).pipe(z.string().regex(POSTCODE_RE, "Please enter a full UK postcode")),
});

export const quoteSchema = z.object({
  start: z.enum(Object.keys(STARTS) as [string, ...string[]]),
  answers: z.record(z.string().regex(/^[A-Z0-9]{1,4}$/), z.string().max(1600)).refine((a) => Object.keys(a).length <= 20),
  address: addressSchema,
  name: singleLine(2, 100, "Please tell us your name"),
  email: clean(254).pipe(z.email("Please enter a valid email address")),
  phone: clean(30).pipe(z.string().regex(/^\+?[0-9 ()-]{9,20}$/, "Please enter a valid phone number")),
  consent: z.literal(true, { error: "Please confirm you have read the privacy policy" }),
  website: z.string().max(0).optional().default(""), // honeypot
  elapsed: z.number().int().nonnegative().optional().default(0),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
export type Address = z.infer<typeof addressSchema>;
export type ContactErrors = Partial<Record<"name" | "email" | "phone" | "consent", string>>;

/** London postcode areas, used only to show a gentle note, never to block a request. */
const LONDON_AREAS = new Set(["E", "EC", "N", "NW", "SE", "SW", "W", "WC", "BR", "CR", "DA", "EN", "HA", "IG", "KT", "RM", "SM", "TW", "UB", "WD"]);
// Districts outside those areas that we also cover, such as Biggin Hill and Stanford-le-Hope.
const EXTRA_DISTRICTS = new Set(["TN16", "SS17"]);
export const looksLondon = (postcode: string) => {
  const outward = postcode.trim().toUpperCase().replace(/\s+/g, "").slice(0, -3);
  return LONDON_AREAS.has((outward.match(/^[A-Z]{1,2}/) ?? [""])[0]) || EXTRA_DISTRICTS.has(outward);
};

export const formatPostcode = (p: string) => {
  const s = p.replace(/\s+/g, "").toUpperCase();
  return s.length > 3 ? `${s.slice(0, -3)} ${s.slice(-3)}` : s;
};
