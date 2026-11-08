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
      <PageHero crumbs={[{ name: "Home", href: "/" }, { name: "Privacy policy" }]} title="Privacy policy" lead="Last updated: 8 November 2026" />
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
          </ul>
          <p>We do not use your details for marketing unless you tell us you would like to hear from us.</p>
          <h2>Who we share it with</h2>
          <p>We use Amazon Web Services to host this website and to send email, Ideal Postcodes to suggest addresses as you type a postcode, and Stripe to process payments. They process data on our instructions. We do not sell your data. We may share information with professional advisers, insurers or authorities where the law requires it.</p>
          <h2>How long we keep it</h2>
          <p>If we do not carry out work for you, we keep your enquiry for up to 12 months, then delete it. If we carry out work, we keep the relevant records for as long as needed for warranty, tax and legal purposes, which is usually six years.</p>
          <h2>Your rights</h2>
          <p>
            You can ask to see the data we hold about you, correct it, have it deleted, restrict or object to our use of it, or receive a copy in a portable format. To do so, contact us using the details on our <Link href="/contact">contact page</Link>. If you are unhappy with how we handle your data, you can complain to the Information Commissioner&rsquo;s Office at <a href="https://ico.org.uk" rel="noopener">ico.org.uk</a>.
          </p>
          <h2>Cookies and similar technologies</h2>
          <p>This website does not set cookies or use analytics, advertising or tracking tools. Our <Link href="/cookies">cookie policy</Link> explains this in full, and what we will do if that changes.</p>
          <h2>Marketing and email</h2>
          <p>We use your email address and phone number to reply to your request and to send you the confirmation of it. We do not send marketing emails or texts. If that ever changes, we will only do it with your consent, as the Privacy and Electronic Communications Regulations 2003 require, and you will be able to opt out at any time.</p>
          <h2>Security</h2>
          <p>Your details are sent to us over an encrypted connection and are only available to people who need them to deal with your request.</p>
        </div>
      </section>
    </>
  );
}
