export type Block =
  | { t: "h2"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  category: "Emergencies" | "Home advice" | "Bathrooms" | "Landlords" | "Business";
  date: string; // ISO date. Posts dated in the future stay hidden until a rebuild on or after that date.
  related: string[]; // service slugs
  blocks: Block[];
};

export const h2 = (text: string): Block => ({ t: "h2", text });
export const p = (text: string): Block => ({ t: "p", text });
export const ul = (...items: string[]): Block => ({ t: "ul", items });
export const ol = (...items: string[]): Block => ({ t: "ol", items });
