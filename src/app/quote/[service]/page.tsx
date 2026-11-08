import { notFound } from "next/navigation";
import { QuotePage } from "@/components/quote/QuotePage";
import { STARTS } from "@/lib/quote-flow";
import { getService } from "@/lib/services";
import { absoluteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ service: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(STARTS).filter((k) => k !== "general").map((service) => ({ service }));

export async function generateMetadata({ params }: Props) {
  const s = getService((await params).service);
  if (!s) return {};
  const meta = pageMetadata({
    title: `${s.name} Quote | Plumbees`,
    description: `Answer a few quick questions to get a free, written quote for ${s.name.toLowerCase()} in London.`,
    path: `/quote/${s.slug}`,
    noindex: true,
  });
  // The service page is the one we want in search results.
  return { ...meta, alternates: { canonical: absoluteUrl(`/services/${s.slug}`) } };
}

export default async function Page({ params }: Props) {
  const { service } = await params;
  if (!STARTS[service] || service === "general") notFound();
  return <QuotePage start={service} path={`/quote/${service}`} />;
}
