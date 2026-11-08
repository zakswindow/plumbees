import Link from "next/link";

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={it.name}>
            {it.href && i < items.length - 1 ? <Link href={it.href}>{it.name}</Link> : <span aria-current="page">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
