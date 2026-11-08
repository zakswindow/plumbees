const base = "https://assets.heatingology.com/plumbees";

export type Img = { src: string; alt: string; width: number; height: number };

const make = (n: number, alt: string): Img => ({ src: `${base}/plumbees-${n}.png`, alt, width: 800, height: 533 });

export const images = {
  skyline: make(1, "Plumber in a Plumbees polo shirt repairing the waste pipe under a sink in a London flat"),
  kitchen: make(2, "Plumber in a Plumbees polo shirt tightening the waste pipe under a kitchen sink"),
  shower: make(3, "Plumber in a Plumbees polo shirt fitting a shower valve in a tiled bathroom"),
  drain: make(4, "Plumber in a Plumbees polo shirt clearing a blocked sink waste pipe with a drain machine"),
};

export const serviceImages: Record<string, Img | undefined> = {
  "emergency-plumber": images.skyline,
  "leaks-and-burst-pipes": images.kitchen,
  "blocked-drains-and-toilets": images.drain,
  "bathroom-plumbing": images.shower,
  "taps-toilets-and-showers": images.shower,
  "landlord-plumbing": images.kitchen,
};
