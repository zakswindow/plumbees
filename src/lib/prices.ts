/** Typical prices for common jobs. Net figures are ex VAT; VAT is added at 20% for display. */
export const VAT_RATE = 0.2;

export type PriceItem = {
  id: string;
  name: string;
  tags: string[];
  net: number; // pounds, ex VAT
  from?: boolean;
  services: string[];
};

export type PriceCategory = { id: string; name: string; items: PriceItem[] };

const TAPS = "taps-toilets-and-showers";
const BATH = "bathroom-plumbing";
const BLOCK = "blocked-drains-and-toilets";

export const PRICE_GUIDE: PriceCategory[] = [
  {
    id: "kitchen",
    name: "Kitchen",
    items: [
      { id: "sink-replace", name: "Complete sink replacement", tags: ["Labour only", "Same position"], net: 145, from: true, services: [TAPS] },
      { id: "kitchen-tap-single", name: "Kitchen mixer tap, single hole", tags: ["Labour only"], net: 70, services: [TAPS] },
      { id: "kitchen-tap-double", name: "Kitchen mixer tap, double hole", tags: ["Labour only"], net: 75, services: [TAPS] },
      { id: "washing-machine", name: "Washing machine connection", tags: ["Existing fittings only"], net: 65, services: [TAPS] },
    ],
  },
  {
    id: "bathroom",
    name: "Bathroom",
    items: [
      { id: "basin-mixer", name: "Bathroom mixer tap", tags: ["Labour only"], net: 75, services: [TAPS, BATH] },
      { id: "bath-shower", name: "External thermostatic bath shower", tags: ["Labour only"], net: 80, services: [TAPS, BATH] },
      { id: "bath-mixer", name: "Bath mixer tap", tags: ["Labour only"], net: 95, services: [TAPS, BATH] },
    ],
  },
  {
    id: "blockages",
    name: "Blockages",
    items: [
      { id: "unblock-kitchen-sink", name: "Kitchen sink unblock", tags: [], net: 120, services: [BLOCK] },
      { id: "unblock-bathroom", name: "Bathroom sink and bath unblock", tags: ["Both together"], net: 165, services: [BLOCK] },
      { id: "unblock-wc", name: "Toilet (WC) unblock", tags: [], net: 165, services: [BLOCK] },
    ],
  },
];

export const incVat = (net: number) => Math.round(net * (1 + VAT_RATE) * 100) / 100;

export const gbp = (n: number) =>
  `£${n.toLocaleString("en-GB", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`;

export const allPrices = () => PRICE_GUIDE.flatMap((c) => c.items);

/** Categories filtered to the items relevant to a service. */
export function pricesForService(slug: string): PriceCategory[] {
  return PRICE_GUIDE.map((c) => ({ ...c, items: c.items.filter((i) => i.services.includes(slug)) })).filter((c) => c.items.length);
}

/** Lowest typical price (inc VAT) for a service, or null. */
export function fromPrice(slug: string): number | null {
  const items = allPrices().filter((i) => i.services.includes(slug));
  return items.length ? Math.min(...items.map((i) => incVat(i.net))) : null;
}
