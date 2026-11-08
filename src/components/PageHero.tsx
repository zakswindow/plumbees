import { Breadcrumbs } from "./Breadcrumbs";

export function PageHero({ crumbs, title, lead }: { crumbs: { name: string; href?: string }[]; title: string; lead?: string }) {
  return (
    <section className="page-hero">
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
      </div>
    </section>
  );
}
