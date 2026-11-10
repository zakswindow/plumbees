import Link from "next/link";

/**
 * "How it works" band. A pipe runs through four steps and the water fills along it as the
 * section scrolls into view (CSS scroll-driven animation, no JavaScript). Browsers without
 * support, and visitors who prefer reduced motion, simply see the finished state.
 */

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {children}
  </svg>
);

const STEPS = [
  {
    title: "Tell us the problem",
    text: "Answer a few quick questions, add your postcode and choose a time that suits you.",
    icon: (
      <Icon>
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12Z" />
        <path d="M8.5 11h7M8.5 14.5h4" />
      </Icon>
    ),
  },
  {
    title: "We confirm your price",
    text: "We call to confirm your time and agree the price in writing before any work begins.",
    icon: (
      <Icon>
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
      </Icon>
    ),
  },
  {
    title: "Your plumber arrives",
    text: "A Plumbees plumber comes at the agreed time, finds the cause and puts it right.",
    icon: (
      <Icon>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3.5 17.2a2 2 0 0 0 2.8 2.8l5.8-5.8a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z" />
      </Icon>
    ),
  },
  {
    title: "Fixed and tested",
    text: "We test the work and explain what we found. You pay by card or Klarna through a secure link.",
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12.3 2.8 2.8L16.2 9.5" />
      </Icon>
    ),
  },
];

export function HowItWorks() {
  return (
    <section className="how" aria-labelledby="how-h">
      <div className="container">
        <div className="how-head">
          <p className="eyebrow">How it works</p>
          <h2 id="how-h">From problem to fixed in four steps</h2>
          <p className="lead">No chasing and no surprises. You know the time and the price before anyone turns up.</p>
        </div>

        <div className="how-track">
          <div className="how-line" aria-hidden="true">
            <span className="how-rail" />
            <span className="how-fill" />
          </div>
          <ol className="how-steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="how-step">
                <span className="how-node" aria-hidden="true">{s.icon}</span>
                <div className="how-card">
                  <span className="how-n">Step {String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="how-cta">
          <Link className="btn btn-light btn-lg" href="/book">Book a plumber</Link>
        </p>
      </div>
    </section>
  );
}
