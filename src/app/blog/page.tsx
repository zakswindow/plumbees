import Link from "next/link";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { formatDate, getPosts, readingMinutes } from "@/lib/blog";
import { breadcrumbSchema, graph, pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Plumbing Advice and Guides | Plumbees Blog",
    description: "Practical plumbing advice for London homeowners, landlords and businesses. Guides on leaks, blockages, bathrooms, winter prep and more.",
    path: "/blog",
  }),
  alternates: { canonical: "https://www.plumbees.co.uk/blog", types: { "application/rss+xml": "/blog/feed.xml" } },
};

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]))} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Blog" }]}
        title="Plumbing advice and guides"
        lead="Straightforward help for homeowners, landlords and businesses, written by the Plumbees team."
      />
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card card-link">
                <p className="eyebrow" style={{ marginBottom: 8 }}>{post.category}</p>
                <h2 style={{ fontSize: "1.25rem" }}>{post.title}</h2>
                <p>{post.excerpt}</p>
                <span className="note">{formatDate(post.date)} &middot; {readingMinutes(post)} min read</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
