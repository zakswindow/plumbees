import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";
import { CONSENT_COOKIE } from "@/lib/consent";
import { breadcrumbSchema, graph, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie Policy | Plumbees",
  description: "The cookies Plumbees uses, including Google Analytics cookies that are only set with your consent, and how to change your cookie choices.",
  path: "/cookies",
});

export default function Cookies() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Cookies", path: "/cookies" }]))} />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Cookies" }]}
        title="Cookie policy"
        lead="Last updated: 14 November 2026"
      />
      <section className="section">
        <div className="container narrow prose">
          <h2>The short version</h2>
          <p>
            We use Google Analytics to understand how people use this website, so that we can improve it. Google Analytics sets cookies, so we only switch it on if you click &ldquo;Accept analytics&rdquo; on our cookie banner. We load Google Tag Manager on every page to manage our tags, but it is told from the start that you have not agreed to anything. If you reject, or ignore the banner, no analytics tag runs and no analytics cookies are set. We do not use advertising cookies.
          </p>
          <p>
            You can change your mind at any time using the <strong>Cookie settings</strong> link at the bottom of every page. If you withdraw consent, we delete the analytics cookies from your browser.
          </p>

          <h2>What cookies are</h2>
          <p>
            Cookies are small text files that a website can store on your device. Similar technologies, such as local storage and tracking pixels, do the same sort of job. They are used to remember you, keep you signed in, measure visits or show advertising.
          </p>

          <h2>Cookies we use</h2>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr><th scope="col">Cookie</th><th scope="col">Type</th><th scope="col">Purpose</th><th scope="col">How long it lasts</th></tr>
              </thead>
              <tbody>
                <tr><th scope="row">{CONSENT_COOKIE}</th><td>Strictly necessary</td><td>Remembers whether you accepted or rejected analytics cookies, so we do not ask on every page. It is set by us and does not identify you.</td><td>6 months</td></tr>
                <tr><th scope="row">_ga</th><td>Analytics (only with consent)</td><td>Set by Google Analytics to tell visits from different browsers apart.</td><td>2 years</td></tr>
                <tr><th scope="row">_ga_&lt;ID&gt;</th><td>Analytics (only with consent)</td><td>Set by Google Analytics to keep track of the current visit.</td><td>2 years</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Google Analytics is provided by Google Ireland Limited and Google LLC. It tells us things like which pages are visited, how people arrive at the site and roughly where in the world they are. We have switched off advertising features: we tell Google that consent for advertising storage, advertising data and personalised advertising is refused. Google explains how it uses this data at <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">policies.google.com</a>. Our <Link href="/privacy">privacy policy</Link> has more about how we handle the data.
          </p>

          <h2>What we do not use</h2>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr><th scope="col">Type</th><th scope="col">Used on this website?</th></tr>
              </thead>
              <tbody>
                <tr><th scope="row">Advertising or retargeting cookies</th><td>No</td></tr>
                <tr><th scope="row">Social media pixels</th><td>No</td></tr>
                <tr><th scope="row">Embedded maps, videos or chat widgets</th><td>No</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Links to other websites</h2>
          <p>
            Some pages link to other websites, such as <a href={site.heatingUrl} rel="noopener">Heatingology</a> and Google, where you can leave a review. Those sites have their own cookie and privacy policies, and they may set cookies once you visit them. We do not control that, so please read their policies.
          </p>

          <h2>Information you send us</h2>
          <p>
            If you use our booking form, we receive the details you type in so that we can reply. That is personal data rather than a cookie, and we explain how we use it in our <Link href="/privacy">privacy policy</Link>.
          </p>

          <h2>The law that applies</h2>
          <p>
            In the UK, the use of cookies and similar technologies is governed by the Privacy and Electronic Communications Regulations 2003 (PECR), together with the UK General Data Protection Regulation, the Data Protection Act 2018 and the Data (Use and Access) Act 2025. In short, a website must tell you about the cookies it uses and ask for your consent before setting any that are not strictly necessary. That is why analytics tags and cookies are only switched on after you accept, and why rejecting is as easy as accepting. The Information Commissioner&rsquo;s Office (ICO) regulates this and publishes guidance at <a href="https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/" rel="noopener">ico.org.uk</a>.
          </p>

          <h2>If this changes</h2>
          <p>
            If we add any other cookies or similar technologies, we will update this page first, list each one with its purpose and how long it lasts, and ask for your consent again before setting anything that is not strictly necessary.
          </p>

          <h2>Controlling cookies in your browser</h2>
          <p>
            You can block or delete cookies for any website in your browser settings. The ICO and the browser makers explain how. Blocking cookies may affect how other websites work. On this website, blocking cookies means we cannot remember your cookie choice, so you may see the banner again.
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
