import Link from "next/link";
import type { ReactNode } from "react";

const LINK = /\[([^\]]+)\]\(((?:\/|https:\/\/)[^)\s]*)\)/g;

/** Renders plain text with [label](/path) links. Never injects raw HTML. */
export function RichText({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(LINK)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(text.slice(last, idx));
    const [, label, href] = m;
    out.push(
      href.startsWith("/") ? (
        <Link key={i++} href={href}>{label}</Link>
      ) : (
        <a key={i++} href={href} rel="noopener">{label}</a>
      ),
    );
    last = idx + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
