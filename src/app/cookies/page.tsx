import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema, graph, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie Policy | Plumbees",
  description: "Plumbees does not set cookies or use tracking on this website. Read what that means, what we may change in future and how to control cookies in your browser.",
  path: "/cookies",
});

export default function Cookies() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Cookies", path: "/cookies" }]))} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Cookies" }]}
        title="Cookie policy"
        lead="Last updated: 8 November 2026"
      />
      <section className="section">
        <div className="container narrow prose">
          <h2>The short version</h2>
          <p>
            This website does not set any cookies on your device, and it does not use analytics, advertising or tracking tools. Because of that, you will not see a cookie banner here. There is nothing to accept or reject.
          </p>

          <h2>What cookies are</h2>
          <p>
            Cookies are small text files that a website can store on your device. Similar technologies, such as local storage and tracking pixels, do the same sort of job. They are used to remember you, keep you signed in, measure visits or show advertising.
          </p>

          <h2>What this website uses</h2>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr><th scope="col">Type</th><th scope="col">Used on this website?</th><th scope="col">Notes</th></tr>
              </thead>
              <tbody>
                <tr><th scope="row">Strictly necessary cookies</th><td>No</td><td>The site works without them, including the quote form.</td></tr>
                <tr><th scope="row">Analytics or performance cookies</th><td>No</td><td>We do not measure visits with cookies or third-party tools.</td></tr>
                <tr><th scope="row">Advertising or tracking cookies</th><td>No</td><td>We do not use them, and we do not share data with advertisers.</td></tr>
                <tr><th scope="row">Local storage or similar</th><td>No</td><td>We do not store data in your browser.</td></tr>
                <tr><th scope="row">Third-party scripts, maps or embedded media</th><td>No</td><td>Fonts and images are served from our own website.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Links to other websites</h2>
          <p>
            Some pages link to other websites, such as <a href={site.heatingUrl} rel="noopener">Heatingology</a> and Google, where you can leave a review. Those sites have their own cookie and privacy policies, and they may set cookies once you visit them. We do not control that, so please read their policies.
          </p>

          <h2>Information you send us</h2>
          <p>
            If you use our quote form, we receive the details you type in so that we can reply. That is personal data rather than a cookie, and we explain how we use it in our <Link href="/privacy">privacy policy</Link>.
          </p>

          <h2>The law that applies</h2>
          <p>
            In the UK, the use of cookies and similar technologies is governed by the Privacy and Electronic Communications Regulations 2003 (PECR), together with the UK General Data Protection Regulation and the Data Protection Act 2018. In short, a website must tell you about the cookies it uses and ask for your consent before setting any that are not strictly necessary. As we set none, there is nothing to ask consent for. The Information Commissioner&rsquo;s Office (ICO) regulates this and publishes guidance at <a href="https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/" rel="noopener">ico.org.uk</a>.
          </p>

          <h2>If this changes</h2>
          <p>
            If we add anything in future that uses cookies or similar technologies, such as analytics, we will do three things first. We will update this page with a clear list of each cookie, what it does and how long it lasts. We will show a cookie notice that lets you accept or reject non-essential cookies with equal ease. And we will not set those cookies until you have agreed.
          </p>

          <h2>Controlling cookies in your browser</h2>
          <p>
            You can block or delete cookies for any website in your browser settings. The ICO and the browser makers explain how. Blocking cookies may affect how other websites work, though it makes no difference to this one.
          </p>

          <h2>Questions</h2>
          <p>
            If you have a question about this policy, or want to know how we handle your personal data, contact {site.legalName} using the details on our <Link href="/contact">contact page</Link>. Our registered office is {site.address.street}, {site.address.locality} {site.address.postcode}. If you are unhappy with how we handle your data, you can complain to the ICO at <a href="https://ico.org.uk/make-a-complaint/" rel="noopener">ico.org.uk/make-a-complaint</a>.
          </p>
        </div>
      </section>
    </>
  );
}
