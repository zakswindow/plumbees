import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { TopBar } from "@/components/TopBar";
import { JsonLd } from "@/components/JsonLd";
import { nav, phoneHref, site } from "@/lib/site";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Plumbees | Plumber in London", template: "%s | Plumbees" },
  description: "Plumbing repairs, emergency call-outs and installations for homes, landlords and businesses across London.",
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  formatDetection: { telephone: false, email: false, address: false },
  icons: { icon: "/brand/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#152138",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${body.variable} ${display.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <TopBar />
        <Header nav={nav} phone={site.phone} phoneHref={phoneHref} />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
