"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";

type NavItem = { href: string; label: string; external?: boolean };

export function Header({ nav, phone, phoneHref }: { nav: readonly NavItem[]; phone: string; phoneHref: string }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Plumbees home" onClick={close}>
          <Logo height={34} />
        </Link>
        <nav id="primary-nav" className={`nav${open ? " is-open" : ""}`} aria-label="Main">
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                {n.external ? (
                  <a href={n.href} rel="noopener" onClick={close}>{n.label}<span className="sr-only"> (opens Heatingology, our heating site)</span></a>
                ) : (
                  <Link href={n.href} onClick={close}>{n.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          {phone && (
            <a className="header-phone" href={phoneHref}>{phone}</a>
          )}
          <Link className="btn btn-primary btn-sm" href="/book">Book a plumber</Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="bars" />
          </button>
        </div>
      </div>
    </header>
  );
}
