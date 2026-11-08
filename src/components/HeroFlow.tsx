/**
 * Animated booking diagram for the homepage hero.
 * Pure SVG and CSS: water runs along the pipes from the request, through Plumbees,
 * to the three outcomes. All motion stops when the visitor prefers reduced motion.
 */

const PIPES = {
  top: "M260 88 L260 157",
  left: "M260 273 C260 318 95 306 95 352",
  middle: "M260 273 L260 352",
  right: "M260 273 C260 318 425 306 425 352",
};

const STEPS = ["Time confirmed", "Price agreed", "Plumber at your door"];

export function HeroFlow() {
  return (
    <div
      className="flow"
      role="img"
      aria-label="How booking works: you send your request, we confirm the time and agree the price, and a plumber comes to your door."
    >
      <div className="flow-glow" aria-hidden="true" />

      <svg className="flow-pipes" viewBox="0 0 520 460" aria-hidden="true" focusable="false">
        {Object.entries(PIPES).map(([k, d]) => (
          <path key={`p-${k}`} d={d} className="pipe" />
        ))}
        {Object.entries(PIPES).map(([k, d]) => (
          <path key={`w-${k}`} d={d} className={`water water-${k}`} />
        ))}
        <circle cx="95" cy="352" r="4" className="joint" />
        <circle cx="260" cy="352" r="4" className="joint" />
        <circle cx="425" cy="352" r="4" className="joint" />
      </svg>

      <div className="flow-card flow-request" aria-hidden="true">
        <span className="flow-label">New booking</span>
        <span className="flow-title">Leak under the kitchen sink</span>
        <span className="flow-chip">Tomorrow, morning</span>
      </div>

      <div className="flow-node" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="44" height="44">
          <path
            fill="#fff"
            d="M12.62,4.53A1.91,1.91,0,0,0,11,3.61H3.11v8.78H4.7V8.79h8.19V5.39a2.58,2.58,0,0,0,0-.29A1.92,1.92,0,0,0,12.62,4.53ZM11.3,7.2H4.7v-2h6.6Z"
          />
        </svg>
      </div>

      {STEPS.map((s, i) => (
        <div key={s} className={`flow-card flow-step flow-step-${i}`} aria-hidden="true">
          <span className="flow-tick" />
          <span>{s}</span>
        </div>
      ))}

      <p className="flow-caption" aria-hidden="true">How a booking works</p>
    </div>
  );
}
