"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ADDRESS, CONTACT, NODES, STARTS, jobKind, nextNodeId, remainingDepth, type FlowNode } from "@/lib/quote-flow";
import type { Address, ContactErrors } from "@/lib/quote";
import { AddressFinder } from "./AddressFinder";

type Intro = { headline: string; lead: string; benefits: string[] };
type Props = { start: string; intro: Intro; phone: string; phoneHref: string; aside?: ReactNode };
type Status = { kind: "idle" } | { kind: "sending" } | { kind: "error"; message: string; errors?: ContactErrors } | { kind: "sent"; reference: string };

export function QuoteJourney({ start, intro, phone, phoneHref, aside }: Props) {
  const first = STARTS[start].node;
  const [started, setStarted] = useState(false);
  const [history, setHistory] = useState<string[]>([first]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [address, setAddress] = useState<Address | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const headingRef = useRef<HTMLHeadingElement>(null);
  const opened = useRef(0);

  const current = history[history.length - 1];
  const node: FlowNode | undefined = NODES[current];
  const done = history.length - 1;
  const remaining = current === CONTACT ? 1 : remainingDepth(current);
  const progress = Math.round((done / (done + remaining)) * 100);
  const quote = jobKind(start, answers) === "quote";
  const emergency =
    first === "E1" || answers.S1 === "emergency" || answers.U1 === "emergency" || answers.U2 === "emergency" || answers.L2 === "running" || answers.B2 === "overflowing";

  // Browser Back moves one step back through the journey.
  useEffect(() => {
    const onPop = () => {
      setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
      setStatus((s) => (s.kind === "sent" ? s : { kind: "idle" }));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (started) headingRef.current?.focus();
  }, [current, started]);

  const go = useCallback((next: string) => {
    window.history.pushState({ pb: true }, "");
    setHistory((h) => [...h, next]);
  }, []);

  const back = () => window.history.back();

  function begin() {
    opened.current = Date.now();
    setStarted(true);
  }

  function restart() {
    const steps = history.length - 1;
    setHistory([first]);
    setAnswers({});
    setAddress(null);
    setStatus({ kind: "idle" });
    if (steps > 0) window.history.go(-steps);
  }

  function choose(n: FlowNode, value: string) {
    setAnswers((a) => ({ ...a, [n.id]: value }));
    const next = nextNodeId(n, value);
    if (next) go(next);
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!address) return;
    const fd = new FormData(e.currentTarget);
    const onPath = Object.fromEntries(history.filter((id) => NODES[id]).map((id) => [id, answers[id] ?? ""]));
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start,
          answers: onPath,
          address,
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          consent: fd.get("consent") === "on",
          website: String(fd.get("website") ?? ""),
          elapsed: Date.now() - opened.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus({ kind: "sent", reference: data.reference });
        return;
      }
      setStatus({ kind: "error", message: data.message ?? "Something went wrong. Please try again.", errors: data.errors });
    } catch {
      setStatus({ kind: "error", message: "We could not reach the server. Please check your connection and try again." });
    }
  }

  const callLine = phone ? (
    <p className="qj-call">
      Water running right now? Call us on <a href={phoneHref}>{phone}</a>
    </p>
  ) : null;

  // ---------- Intro ----------
  if (!started) {
    return (
      <section className="qj-intro">
        <div className="container qj-intro-grid">
          <div>
            <p className="eyebrow">{first === "BA1" ? "Free quote" : "Book online"}</p>
            <h1>{intro.headline}</h1>
            <p className="lead">{intro.lead}</p>
            <ul className="ticks">
              {intro.benefits.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <p><button type="button" className="btn btn-primary btn-lg" onClick={begin}>Get started</button></p>
            {callLine}
          </div>
          {aside}
        </div>
      </section>
    );
  }

  // ---------- Sent ----------
  if (status.kind === "sent") {
    return (
      <section className="qj">
        <div className="container qj-wrap">
          <div className="qj-card qj-done" role="status">
            <p className="eyebrow">{quote ? "Request sent" : "Booking request sent"}</p>
            <h1 ref={headingRef} tabIndex={-1}>{quote ? "Thank you, we have your request" : "Thank you, we have your booking request"}</h1>
            <p>Your reference is <strong>{status.reference}</strong>. We have emailed you a copy of your answers.</p>
            {quote ? (
              <ol>
                <li>We review your plans and may arrange a short visit.</li>
                <li>You receive a written quote, broken down by stage.</li>
                <li>Nothing starts until you agree it.</li>
              </ol>
            ) : (
              <ol>
                <li>We check availability for the time you asked for.</li>
                <li>We call you to confirm your time and price.</li>
                <li>Nothing starts until you agree the price.</li>
              </ol>
            )}
            {emergency && phone && <p className="qj-info">As this is urgent, please keep your phone close. If water is still running, close your main stopcock and call us on <a href={phoneHref}>{phone}</a>.</p>}
            <p><Link href="/" className="btn btn-outline">Back to the homepage</Link></p>
          </div>
        </div>
      </section>
    );
  }

  // ---------- Steps ----------
  const errors = status.kind === "error" ? (status.errors ?? {}) : {};
  const err = (k: keyof ContactErrors) => (errors[k] ? <span className="field-error" id={`${k}-err`}>{errors[k]}</span> : null);
  const aria = (k: keyof ContactErrors) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined });

  let body: ReactNode;
  let title: string;
  let help: string | undefined;

  if (current === ADDRESS) {
    title = "Where is the job?";
    help = "Start typing your postcode and choose your address from the list.";
    body = (
      <>
        <AddressFinder value={address} onChange={setAddress} />
        <div className="qj-actions">
          <button type="button" className="btn btn-primary btn-lg" disabled={!address} onClick={() => go(CONTACT)}>Continue</button>
        </div>
      </>
    );
  } else if (current === CONTACT) {
    title = quote ? "Where should we send your quote?" : "Who should we call to confirm?";
    help = quote ? "We only use these details to reply to this request." : "We will call to confirm your time and price. We only use these details for this booking.";
    body = (
      <form className="form" onSubmit={submit} noValidate>
        {status.kind === "error" && <p className="form-alert" role="alert">{status.message}</p>}
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" autoComplete="name" required maxLength={100} {...aria("name")} />
          {err("name")}
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={30} {...aria("phone")} />
            {err("phone")}
          </div>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} {...aria("email")} />
            {err("email")}
          </div>
        </div>
        <div className="hp" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="field check">
          <input id="consent" name="consent" type="checkbox" required {...aria("consent")} />
          <label htmlFor="consent">
            I have read the <a href="/privacy" target="_blank" rel="noopener">privacy policy</a> and agree to Plumbees contacting me about this request.
          </label>
          {err("consent")}
        </div>
        <div className="qj-actions">
          <button className="btn btn-primary btn-lg" type="submit" disabled={status.kind === "sending"}>
            {status.kind === "sending" ? "Sending..." : quote ? "Request my quote" : "Request my booking"}
          </button>
        </div>
        <p className="hint">{quote ? "Free and without obligation." : "No payment needed now. Nothing is confirmed until we agree a time and price with you."}</p>
      </form>
    );
  } else if (node?.kind === "choice") {
    title = node.title;
    help = node.help;
    body = (
      <>
        <div className="qj-tiles" role="group" aria-label={node.title}>
          {node.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className="qj-tile"
              aria-pressed={answers[node.id] === opt.value}
              onClick={() => choose(node, opt.value)}
            >
              <span className="qj-tile-label">{opt.label}</span>
              {opt.hint && <span className="qj-tile-hint">{opt.hint}</span>}
            </button>
          ))}
        </div>
        {node.info && <p className="qj-info">{node.info}</p>}
      </>
    );
  } else if (node?.kind === "text") {
    title = node.title;
    help = node.help;
    const n = node;
    const value = answers[n.id] ?? "";
    const valid = n.optional || value.trim().length >= 3;
    body = (
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) choose(n, value);
        }}
      >
        <div className="field">
          <label htmlFor={`t-${n.id}`}>{n.label}</label>
          <textarea id={`t-${n.id}`} rows={5} maxLength={n.max} value={value} onChange={(e) => setAnswers((a) => ({ ...a, [n.id]: e.target.value }))} />
        </div>
        <div className="qj-actions">
          <button type="submit" className="btn btn-primary btn-lg" disabled={!valid}>{n.optional && !value.trim() ? "Skip" : "Continue"}</button>
        </div>
      </form>
    );
  } else {
    title = "Something went wrong";
    body = <button type="button" className="btn btn-outline" onClick={restart}>Start again</button>;
  }

  return (
    <section className="qj">
      <div className="container qj-wrap">
        <div className="qj-top">
          <button type="button" className="link-btn" onClick={back} disabled={history.length < 2} aria-label="Back to the previous question">
            &larr; Back
          </button>
          <div className="qj-progress" role="progressbar" aria-label="Quote progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <span style={{ width: `${Math.max(progress, 4)}%` }} />
          </div>
          <button type="button" className="link-btn" onClick={restart}>Start again</button>
        </div>
        {emergency && phone && (
          <p className="qj-emergency">
            This sounds urgent. For the fastest help, call <a href={phoneHref}>{phone}</a>. You can also carry on here.
          </p>
        )}
        <div className="qj-card">
          <h1 ref={headingRef} tabIndex={-1} className="qj-title">{title}</h1>
          {help && <p className="qj-help">{help}</p>}
          {body}
        </div>
        {!emergency && callLine}
      </div>
    </section>
  );
}
