"use client";

import { useEffect, useId, useRef, useState } from "react";
import { addressSchema, formatPostcode, looksLondon, type Address } from "@/lib/quote";

type Hit = { id: string; address: string };
type Props = { value: Address | null; onChange: (a: Address | null) => void };

const empty: Address = { line1: "", line2: "", town: "", county: "", postcode: "" };

export function AddressFinder({ value, onChange }: Props) {
  const [term, setTerm] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [manual, setManual] = useState(false);
  const [draft, setDraft] = useState<Address>(empty);
  const [draftErrors, setDraftErrors] = useState<Partial<Record<keyof Address, string>>>({});
  const listId = useId();
  const ctrl = useRef<AbortController | null>(null);

  useEffect(() => {
    const q = term.trim();
    if (manual || value || q.length < 3) return;
    const t = setTimeout(async () => {
      ctrl.current?.abort();
      const c = new AbortController();
      ctrl.current = c;
      setSearching(true);
      try {
        const res = await fetch(`/api/postcode/search?term=${encodeURIComponent(q)}`, { signal: c.signal });
        const data = await res.json();
        if (!data.ok) {
          setError(data.error ?? "Address lookup is unavailable. Please enter your address manually.");
          setHits([]);
        } else {
          setError("");
          setHits(data.result);
        }
      } catch (e) {
        if ((e as Error).name !== "AbortError") setError("We could not look up addresses. Please enter your address manually.");
      } finally {
        if (ctrl.current === c) setSearching(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [term, manual, value]);

  async function pick(hit: Hit) {
    setSearching(true);
    try {
      const res = await fetch(`/api/postcode/address?id=${encodeURIComponent(hit.id)}`);
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      const parsed = addressSchema.safeParse(data.result);
      if (!parsed.success) throw new Error("incomplete");
      onChange(parsed.data);
      setHits([]);
    } catch {
      setError("We could not load that address. Please enter it manually.");
      setManual(true);
    } finally {
      setSearching(false);
    }
  }

  function saveManual() {
    const parsed = addressSchema.safeParse(draft);
    if (!parsed.success) {
      const errs: Partial<Record<keyof Address, string>> = {};
      for (const i of parsed.error.issues) {
        const k = i.path[0] as keyof Address;
        if (!errs[k]) errs[k] = i.message;
      }
      setDraftErrors(errs);
      return;
    }
    setDraftErrors({});
    onChange(parsed.data);
  }

  // Results only apply while a search term is active.
  const shown = !manual && !value && term.trim().length >= 3 ? hits : [];

  if (value) {
    return (
      <div className="qj-address-card">
        <p className="qj-address-label">We will come to:</p>
        <p className="qj-address">
          {[value.line1, value.line2, value.town, value.county, formatPostcode(value.postcode)].filter(Boolean).map((l) => (
            <span key={l}>{l}<br /></span>
          ))}
        </p>
        {!looksLondon(value.postcode) && (
          <p className="qj-note">This postcode looks to be outside the areas we usually cover. You can still send your request and we will confirm whether we can help.</p>
        )}
        <button type="button" className="link-btn" onClick={() => { onChange(null); setDraft(value); }}>Change address</button>
      </div>
    );
  }

  if (manual) {
    const f = (k: keyof Address, label: string, auto: string, optional = false) => (
      <div className="field">
        <label htmlFor={`addr-${k}`}>{label}{optional && <span className="optional"> (optional)</span>}</label>
        <input
          id={`addr-${k}`}
          autoComplete={auto}
          value={draft[k] ?? ""}
          maxLength={k === "postcode" ? 10 : 120}
          aria-invalid={draftErrors[k] ? true : undefined}
          aria-describedby={draftErrors[k] ? `addr-${k}-err` : undefined}
          onChange={(e) => setDraft({ ...draft, [k]: e.target.value })}
        />
        {draftErrors[k] && <span className="field-error" id={`addr-${k}-err`}>{draftErrors[k]}</span>}
      </div>
    );
    return (
      <div className="form">
        {error && <p className="qj-note" role="status">{error}</p>}
        {f("line1", "Address line 1", "address-line1")}
        {f("line2", "Address line 2", "address-line2", true)}
        <div className="form-row">
          {f("town", "Town or city", "address-level2")}
          {f("postcode", "Postcode", "postal-code")}
        </div>
        <div className="qj-actions">
          <button type="button" className="btn btn-primary btn-lg" onClick={saveManual}>Use this address</button>
          <button type="button" className="link-btn" onClick={() => { setManual(false); setError(""); }}>Search by postcode instead</button>
        </div>
      </div>
    );
  }

  return (
    <div className="qj-finder">
      <div className="field">
        <label htmlFor="addr-search">Postcode</label>
        <input
          id="addr-search"
          type="text"
          inputMode="text"
          autoComplete="postal-code"
          placeholder="For example W1W 5PF"
          value={term}
          maxLength={100}
          aria-controls={listId}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      <p className="sr-only" aria-live="polite">
        {searching ? "Searching" : shown.length ? `${shown.length} addresses found` : ""}
      </p>
      {error && <p className="qj-note" role="status">{error}</p>}
      {shown.length > 0 && (
        <ul className="qj-results" id={listId}>
          {shown.map((h) => (
            <li key={h.id}>
              <button type="button" onClick={() => pick(h)}>{h.address}</button>
            </li>
          ))}
        </ul>
      )}
      {searching && shown.length === 0 && <p className="hint">Searching...</p>}
      <button type="button" className="link-btn" onClick={() => setManual(true)}>Can't find it? Enter your address manually</button>
    </div>
  );
}
