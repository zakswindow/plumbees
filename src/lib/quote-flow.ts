/**
 * The quote journey. One question per screen, shared by the browser (to render)
 * and the server (to validate every answer against the same definitions).
 */

export type Option = { value: string; label: string; hint?: string; next: string };

export type ChoiceNode = {
  kind: "choice";
  id: string;
  title: string;
  summary: string;
  help?: string;
  info?: string;
  options: Option[];
};

export type TextNode = {
  kind: "text";
  id: string;
  title: string;
  summary: string;
  help?: string;
  label: string;
  optional?: boolean;
  multiline?: boolean;
  max: number;
  next: string;
};

export type FlowNode = ChoiceNode | TextNode;

export const ADDRESS = "ADDRESS";
export const CONTACT = "CONTACT";

const o = (value: string, label: string, next: string, hint?: string): Option => ({ value, label, next, hint });

const nodes: FlowNode[] = [
  // ---- General entry ----
  {
    kind: "choice", id: "S1", title: "What do you need help with?", summary: "Type of job",
    options: [
      o("emergency", "Emergency", "E1", "Burst pipe, flooding or no water"),
      o("leak", "Leak or burst pipe", "L1", "Dripping, damp or running water"),
      o("blocked", "Blocked drain or toilet", "B1", "Slow, blocked or smelly"),
      o("bathroom", "Bathroom plumbing", "BA1", "New, refit or changes"),
      o("fittings", "Taps, toilets or showers", "T1", "Repair or replace"),
      o("landlord", "Landlord or agent", "LA1", "Rented homes and portfolios"),
      o("commercial", "Business premises", "C1", "Offices, shops and venues"),
      o("other", "Something else", "S2"),
    ],
  },
  {
    kind: "text", id: "S2", title: "Tell us what you need", summary: "Job description", label: "Describe the job",
    help: "A sentence or two is plenty.", multiline: true, max: 1500, next: "U1",
  },

  // ---- Emergency ----
  {
    kind: "choice", id: "E1", title: "What is happening?", summary: "Emergency",
    options: [
      o("burst", "A burst or leaking pipe", "E2"),
      o("flood", "Flooding or water through a ceiling", "E2"),
      o("no-water", "No water supply", "E2"),
      o("toilet", "An overflowing toilet", "E2"),
      o("sewage", "Sewage backing up", "E2"),
      o("other", "Something else", "E2"),
    ],
  },
  {
    kind: "choice", id: "E2", title: "Have you been able to turn the water off?", summary: "Water turned off",
    info: "Your main stopcock is usually under the kitchen sink. Turn it clockwise to close it, and switch off electrics near any water.",
    options: [o("yes", "Yes", "P1"), o("no", "No", "P1"), o("unsure", "I am not sure where it is", "P1")],
  },

  // ---- Leaks ----
  {
    kind: "choice", id: "L1", title: "Where is the leak?", summary: "Leak location",
    options: [
      o("kitchen", "Kitchen", "L2"), o("bathroom", "Bathroom", "L2"), o("toilet", "Toilet", "L2"),
      o("ceiling", "Ceiling or wall", "L2"), o("pipework", "Pipework in a loft, floor or outside", "L2"), o("unsure", "I am not sure", "L2"),
    ],
  },
  {
    kind: "choice", id: "L2", title: "Is water still escaping?", summary: "Water still escaping",
    options: [
      o("running", "Yes, it is running steadily", "L3"),
      o("dripping", "It is a slow drip or damp patch", "U1"),
      o("stopped", "No, it has stopped", "U1"),
    ],
  },
  {
    kind: "choice", id: "L3", title: "Have you turned the water off?", summary: "Water turned off",
    info: "Close the main stopcock, usually under the kitchen sink, to limit the damage while you wait.",
    options: [o("yes", "Yes", "U1"), o("no", "No", "U1"), o("unsure", "I am not sure where it is", "U1")],
  },

  // ---- Blocked drains ----
  {
    kind: "choice", id: "B1", title: "What is blocked?", summary: "What is blocked",
    options: [
      o("toilet", "Toilet", "B2"), o("kitchen-sink", "Kitchen sink", "B2"), o("basin", "Basin", "B2"),
      o("bath-shower", "Bath or shower", "B2"), o("outside", "Outside drain or manhole", "B2"), o("several", "More than one thing", "B2"),
    ],
  },
  {
    kind: "choice", id: "B2", title: "How bad is it?", summary: "Severity",
    options: [
      o("overflowing", "It is overflowing now", "U1"),
      o("blocked", "Completely blocked", "U1"),
      o("slow", "Draining slowly", "U1"),
      o("smell", "Smells or gurgles", "U1"),
    ],
  },

  // ---- Bathrooms ----
  {
    kind: "choice", id: "BA1", title: "What would you like done?", summary: "Bathroom work",
    options: [
      o("full", "A full bathroom refit", "BA2"), o("suite", "Replace the suite or some fittings", "BA2"),
      o("shower", "Add or change a shower", "BA2"), o("layout", "Move the layout", "BA2"),
      o("wetroom", "A wet room", "BA2"), o("other", "Something else", "BA2"),
    ],
  },
  {
    kind: "choice", id: "BA2", title: "Where are you with the project?", summary: "Project stage",
    options: [
      o("planning", "Just planning", "BA3"), o("ready", "Ready to book a plumber", "BA3"), o("builder", "A builder is already working on it", "BA3"),
    ],
  },
  {
    kind: "choice", id: "BA3", title: "Have you chosen your fittings?", summary: "Fittings",
    options: [
      o("bought", "Yes, and I have bought them", "U1"), o("chosen", "Chosen, but not bought yet", "U1"), o("advice", "No, I would like advice", "U1"),
    ],
  },

  // ---- Taps, toilets and showers ----
  {
    kind: "choice", id: "T1", title: "What is the job?", summary: "Fitting job",
    options: [
      o("drip", "A dripping or leaking tap", "U1"), o("replace-tap", "Replace a tap", "T2"),
      o("toilet", "A toilet that will not flush or keeps running", "U1"), o("shower", "A shower problem", "U1"),
      o("under-sink", "A leak under a sink or basin", "U1"), o("other", "Something else", "U1"),
    ],
  },
  {
    kind: "choice", id: "T2", title: "Do you already have the new tap?", summary: "New tap supplied",
    options: [o("yes", "Yes", "U1"), o("no", "No, please advise", "U1")],
  },

  // ---- Landlords and agents (skips the property question) ----
  {
    kind: "choice", id: "LA1", title: "What do you need?", summary: "Landlord job",
    options: [
      o("repair", "A repair reported by a tenant", "LA2"), o("leak", "A leak or damp", "LA2"), o("blocked", "A blocked drain or toilet", "LA2"),
      o("pre-tenancy", "A pre-tenancy plumbing check", "LA2"), o("maintenance", "Routine maintenance", "LA2"), o("other", "Something else", "LA2"),
    ],
  },
  {
    kind: "choice", id: "LA2", title: "Is a tenant living there now?", summary: "Tenant in property",
    options: [o("yes", "Yes", "LA3"), o("no", "No, it is empty", "LA3")],
  },
  {
    kind: "choice", id: "LA3", title: "Who are you?", summary: "Your role",
    options: [o("landlord", "The landlord", "U2"), o("agent", "A letting or managing agent", "U2")],
  },

  // ---- Commercial (skips the property question) ----
  {
    kind: "choice", id: "C1", title: "What kind of premises is it?", summary: "Premises",
    options: [
      o("office", "Office", "C2"), o("shop", "Shop, salon or clinic", "C2"), o("food", "Cafe, restaurant or takeaway", "C2"),
      o("block", "Managed residential block", "C2"), o("unit", "Industrial or trade unit", "C2"), o("other", "Something else", "C2"),
    ],
  },
  {
    kind: "choice", id: "C2", title: "What is the problem?", summary: "Problem",
    options: [
      o("washroom", "A toilet or washroom fault", "C3"), o("leak", "A leak", "C3"), o("blocked", "A blocked drain or waste", "C3"),
      o("taps", "Taps or sinks", "C3"), o("install", "An installation or refit", "C3"), o("other", "Something else", "C3"),
    ],
  },
  {
    kind: "choice", id: "C3", title: "When can we have access?", summary: "Access",
    options: [
      o("open", "During opening hours", "U2"), o("outside", "Before opening or after closing", "U2"),
      o("weekend", "Evenings or weekends", "U2"), o("any", "Any time", "U2"),
    ],
  },

  // ---- Shared tail ----
  {
    kind: "choice", id: "U1", title: "When would you like us to come?", summary: "Preferred day",
    help: "We will call to confirm a time that works for you.",
    options: [
      o("emergency", "It is an emergency, as soon as possible", "P1"),
      o("today", "Today, if possible", "W1"),
      o("tomorrow", "Tomorrow", "W1"),
      o("week", "Later this week", "W1"),
      o("next-week", "Next week", "W1"),
      o("flexible", "I am flexible", "W1"),
    ],
  },
  {
    kind: "choice", id: "W1", title: "What time of day suits you?", summary: "Preferred time",
    help: "We are open 9am to 6pm, seven days a week.",
    options: [o("morning", "Morning, 9am to 12pm", "P1"), o("afternoon", "Afternoon, 12pm to 6pm", "P1"), o("any", "Any time", "P1")],
  },
  {
    kind: "choice", id: "U2", title: "When would you like us to come?", summary: "Preferred day",
    help: "We will call to confirm a time that works for you.",
    options: [
      o("emergency", "It is an emergency, as soon as possible", "D1"),
      o("today", "Today, if possible", "W2"),
      o("tomorrow", "Tomorrow", "W2"),
      o("week", "Later this week", "W2"),
      o("next-week", "Next week", "W2"),
      o("flexible", "I am flexible", "W2"),
    ],
  },
  {
    kind: "choice", id: "W2", title: "What time of day suits you?", summary: "Preferred time",
    help: "We are open 9am to 6pm, seven days a week.",
    options: [o("morning", "Morning, 9am to 12pm", "D1"), o("afternoon", "Afternoon, 12pm to 6pm", "D1"), o("any", "Any time", "D1")],
  },
  {
    kind: "choice", id: "P1", title: "What kind of property is it?", summary: "Property",
    options: [
      o("home", "My own home", "D1"), o("tenant", "A home I rent", "D1"), o("landlord", "A property I let out", "D1"),
      o("agent", "I am a letting or managing agent", "D1"), o("business", "A business premises", "D1"),
    ],
  },
  {
    kind: "text", id: "D1", title: "Anything else we should know?", summary: "Extra details", label: "Extra details (optional)",
    help: "For example access, parking, how long it has been happening, or the make of a fitting. You can skip this.",
    optional: true, multiline: true, max: 1500, next: ADDRESS,
  },
];

export const NODES: Record<string, FlowNode> = Object.fromEntries(nodes.map((n) => [n.id, n]));

/** Entry points. "general" asks what you need first. */
export const STARTS: Record<string, { node: string; label: string }> = {
  general: { node: "S1", label: "Plumbing" },
  "emergency-plumber": { node: "E1", label: "Emergency plumbing" },
  "leaks-and-burst-pipes": { node: "L1", label: "Leak or burst pipe" },
  "blocked-drains-and-toilets": { node: "B1", label: "Blocked drain or toilet" },
  "bathroom-plumbing": { node: "BA1", label: "Bathroom plumbing" },
  "taps-toilets-and-showers": { node: "T1", label: "Taps, toilets or showers" },
  "landlord-plumbing": { node: "LA1", label: "Landlord plumbing" },
  "commercial-plumbing": { node: "C1", label: "Commercial plumbing" },
};

const S1_LABELS: Record<string, string> = {
  emergency: "Emergency plumbing", leak: "Leak or burst pipe", blocked: "Blocked drain or toilet", bathroom: "Bathroom plumbing",
  fittings: "Taps, toilets or showers", landlord: "Landlord plumbing", commercial: "Commercial plumbing", other: "Something else",
};

/** Bathroom projects are quoted; everything else is a booking request. */
export type JobKind = "booking" | "quote";

export function jobKind(start: string, answers: Record<string, string>): JobKind {
  return STARTS[start]?.node === "BA1" || answers.S1 === "bathroom" ? "quote" : "booking";
}

export type Step = { id: string; question: string; summary: string; answer: string };
export type Resolved =
  | { ok: true; steps: Step[]; serviceLabel: string; emergency: boolean; kind: JobKind }
  | { ok: false; error: string };

/** Next node after answering `node` with `value`. */
export function nextNodeId(node: FlowNode, value: string): string | null {
  if (node.kind === "text") return node.next;
  return node.options.find((x) => x.value === value)?.next ?? null;
}

/**
 * Walks the journey from a start point using the supplied answers.
 * Rejects unknown answers, missing answers and answers that are not on the path.
 */
export function resolveFlow(start: string, answers: Record<string, string>): Resolved {
  const entry = STARTS[start];
  if (!entry) return { ok: false, error: "Unknown journey" };

  const steps: Step[] = [];
  const used = new Set<string>();
  let id: string | null = entry.node;
  let guard = 0;

  while (id && id !== ADDRESS) {
    if (++guard > 20) return { ok: false, error: "Journey too long" };
    const node: FlowNode | undefined = NODES[id];
    if (!node) return { ok: false, error: "Broken journey" };
    const raw = answers[id];
    if (raw === undefined) return { ok: false, error: `Missing answer for ${id}` };
    used.add(id);

    if (node.kind === "choice") {
      const opt = node.options.find((x) => x.value === raw);
      if (!opt) return { ok: false, error: `Invalid answer for ${id}` };
      steps.push({ id, question: node.title, summary: node.summary, answer: opt.label });
    } else {
      const text = raw.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
      if (text.length > node.max) return { ok: false, error: `Answer too long for ${id}` };
      if (!node.optional && text.length < 3) return { ok: false, error: `Answer too short for ${id}` };
      if (text) steps.push({ id, question: node.title, summary: node.summary, answer: text });
    }
    id = nextNodeId(node, raw);
  }

  if (Object.keys(answers).some((k) => !used.has(k))) return { ok: false, error: "Unexpected answers" };

  const u = answers["U1"] ?? answers["U2"];
  const emergency = entry.node === "E1" || answers["S1"] === "emergency" || u === "emergency";
  const serviceLabel = start === "general" ? (S1_LABELS[answers["S1"]] ?? "Plumbing") : entry.label;
  return { ok: true, steps, serviceLabel, emergency, kind: jobKind(start, answers) };
}

/** Longest remaining path from a node, used for the progress bar. */
export function remainingDepth(id: string | null, seen = 0): number {
  if (!id || id === ADDRESS) return 2; // address and contact
  if (seen > 20) return 0;
  const node = NODES[id];
  if (!node) return 0;
  const nexts = node.kind === "text" ? [node.next] : node.options.map((x) => x.next);
  return 1 + Math.max(...nexts.map((n) => remainingDepth(n, seen + 1)));
}
