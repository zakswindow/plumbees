import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RichText } from "@/components/RichText";
import { formatDate, getPost, getPosts, readingMinutes } from "@/lib/blog";
import { getService } from "@/lib/services";
import { breadcrumbSchema, graph, pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => getPosts().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) return {};
  const meta = pageMetadata({ title: `${post.title} | Plumbees`, description: post.metaDescription, path: `/blog/${post.slug}` });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: post.date, authors: [site.name] },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const path = `/blog/${post.slug}`;
  const related = post.related.map((s) => getService(s)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const more = getPosts().filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "BlogPosting",
            headline: post.title,
            description: post.metaDescription,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: "en-GB",
            mainEntityOfPage: absoluteUrl(path),
            image: absoluteUrl("/opengraph-image"),
            author: { "@type": "Organization", name: site.name, url: site.url },
            publisher: { "@id": `${site.url}/#organization` },
          },
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path }]),
        )}
      />
      <PageHero crumbs={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: post.category }]} title={post.title} />
      <article className="section">
        <div className="container narrow prose article">
          <p className="note">
            {formatDate(post.date)} &middot; {readingMinutes(post)} min read &middot; By the Plumbees team
          </p>
          {post.blocks.map((b, i) => {
            if (b.t === "h2") return <h2 key={i}>{b.text}</h2>;
            if (b.t === "p") return <p key={i}><RichText text={b.text} /></p>;
            if (b.t === "ul") return <ul key={i}>{b.items.map((it) => <li key={it}><RichText text={it} /></li>)}</ul>;
            return <ol key={i}>{b.items.map((it) => <li key={it}><RichText text={it} /></li>)}</ol>;
          })}
        </div>
      </article>

      {related.length > 0 && (
        <section className="section alt" aria-labelledby="rel-h">
          <div className="container">
            <h2 id="rel-h">How we can help</h2>
            <div className="grid grid-3">
              {related.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="card card-link">
                  <h3>{s.name}</h3>
                  <p>{s.short}</p>
                  <span className="more">Read more</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section className="section" aria-labelledby="more-h">
          <div className="container">
            <h2 id="more-h">More from the blog</h2>
            <div className="grid grid-3">
              {more.map((m) => (
                <Link key={m.slug} href={`/blog/${m.slug}`} className="card card-link">
                  <h3>{m.title}</h3>
                  <p>{m.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <Cta />
    </>
  );
}
