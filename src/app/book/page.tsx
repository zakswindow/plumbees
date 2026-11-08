import { QuotePage } from "@/components/quote/QuotePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Book a Plumber in London | Plumbees",
  description: "Book a plumber in London online. Answer a few quick questions, choose a time that suits you and we will call to confirm. Open seven days a week.",
  path: "/book",
});

export default function Page() {
  return <QuotePage start="general" path="/book" />;
}
