import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy | Plumbees",
  description: "How Plumbees, a trading name of Heatingology Limited, collects, uses and protects your personal data.",
  path: "/privacy",
});

export default function Privacy() {
  return (
    <>
      <PageHero crumbs={[{ name: "Home", href: "/" }, { name: "Privacy policy" }]} title="Privacy policy" lead="Last updated: 14 November 2026" />
      <section className="section">
        <div className="container narrow prose">
          <h2>Who we are</h2>
          <p>
            Plumbees is a trading name of {site.legalName}, registered in {site.registeredIn} No. {site.companyNumber}, with its registered office at {site.address.street}, {site.address.locality} {site.address.postcode}. We are the controller of the personal data described here.
          </p>
          <h2>What we collect</h2>
          <p>When you request a quote we collect your answers about the job and the property, the address of the job, and your name, phone number and email address. Payment details are not collected on this website. Payments are made through a secure payment link provided by Stripe, and card details are passed directly to Stripe rather than to us. If you choose Klarna, Klarna handles your details under its own privacy notice.</p>
          <h2>Why we use it and our lawful basis</h2>
          <ul>
            <li>To reply to your request and prepare a quote. This is necessary to take steps at your request before entering a contract.</li>
            <li>To carry out and keep records of work, and to meet legal and accounting duties. This is a contract and legal obligation basis.</li>
            <li>To keep our website secure and prevent abuse. This is our legitimate interest.</li>
            <li>To measure how the website is used, if you accept analytics cookies. This is your consent.</li>
          </ul>
          <p>We do not use your details for marketing unless you tell us you would like to hear from us.</p>
          <h2>Who we share it with</h2>
          <p>We use Amazon Web Services to host this website and to send email, Ideal Postcodes to suggest addresses as you type a postcode, Stripe to process payments, and Google Analytics to measure website use if you accept analytics cookies, and Cloudflare to deliver this website securely and to count visits without cookies. They process data on our instructions. We do not sell your data. We may share information with professional advisers, insurers or authorities where the law requires it.</p>
          <h2>How long we keep it</h2>
          <p>If we do not carry out work for you, we keep your enquiry for up to 12 months, then delete it. If we carry out work, we keep the relevant records for as long as needed for warranty, tax and legal purposes, which is usually six years.</p>
          <h2>Your rights</h2>
          <p>
            You can ask to see the data we hold about you, correct it, have it deleted, restrict or object to our use of it, or receive a copy in a portable format. To do so, contact us using the details on our <Link href="/contact">contact page</Link>. If you are unhappy with how we handle your data, you can complain to the Information Commissioner&rsquo;s Office at <a href="https://ico.org.uk" rel="noopener">ico.org.uk</a>.
          </p>
          <h2>Cookies and similar technologies</h2>
          <p>If you accept analytics cookies, we use Google Analytics to see how visitors use the website. It collects information such as the pages you visit, how you arrived, your device and browser type, and your approximate location. Google Analytics does not log or store IP addresses. Our lawful basis is your consent, which you can withdraw at any time using the Cookie settings link at the bottom of every page. If you do not accept, no analytics tag runs and no analytics cookies are set. We do load Google Tag Manager on every page to manage our tags. As with any file fetched from another company, Google receives technical details such as your IP address when your browser requests it. We do this on the basis of our legitimate interest in running our tags, and Google Tag Manager is set to treat you as having agreed to nothing until you choose. We keep analytics data for 14 months.</p>
          <p>Separately, and for everyone, we use Cloudflare Web Analytics to count visits. It does not use cookies or store anything on your device, and it does not track you across websites. It records technical details of each page request, such as the page, the country, and your browser and device type. We do this on the basis of our legitimate interest in understanding how many people use the website.</p>
          <p>Google may process this data in the United States. Transfers are covered by the UK&ndash;US data bridge and Google&rsquo;s standard contractual clauses. Our <Link href="/cookies">cookie policy</Link> lists every cookie we use.</p>
          <h2>Marketing and email</h2>
          <p>We use your email address and phone number to reply to your request and to send you the confirmation of it. We do not send marketing emails or texts. If that ever changes, we will only do it with your consent, as the Privacy and Electronic Communications Regulations 2003 require, and you will be able to opt out at any time.</p>
          <h2>Security</h2>
          <p>Your details are sent to us over an encrypted connection and are only available to people who need them to deal with your request.</p>
        </div>
      </section>
    </>
  );
}
