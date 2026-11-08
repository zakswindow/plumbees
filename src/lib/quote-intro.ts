import type { Img } from "./images";
import { images } from "./images";

type Intro = { headline: string; lead: string; benefits: string[]; image: Img };

const benefits = ["Takes about two minutes", "Choose a day and time that suits you", "We call to confirm your time and price"];

export const INTROS: Record<string, Intro> = {
  general: {
    headline: "Book a plumber",
    lead: "Answer a few quick questions about the job, choose when suits you, and we will call to confirm your time and price.",
    benefits, image: images.skyline,
  },
  "emergency-plumber": {
    headline: "Emergency plumbing, let's get you help",
    lead: "Tell us what is happening and we will flag your request for priority. If water is running now, close your main stopcock and call us.",
    benefits: ["Flagged for priority as soon as it arrives", "Takes about a minute", "We take emergency calls outside normal hours"],
    image: images.skyline,
  },
  "leaks-and-burst-pipes": {
    headline: "Let's get that leak sorted",
    lead: "A few questions about where the water is coming from help us arrive prepared. Choose when suits you and we will call to confirm.",
    benefits, image: images.kitchen,
  },
  "blocked-drains-and-toilets": {
    headline: "Let's clear that blockage",
    lead: "Tell us what is blocked and how bad it is, choose when suits you, and we will call to confirm your time and price.",
    benefits, image: images.drain,
  },
  "bathroom-plumbing": {
    headline: "Plan the plumbing for your bathroom",
    lead: "Tell us about the project and where you are with it. We will reply with a written quote broken down by stage.",
    benefits: ["Takes about two minutes", "Written quote broken down by stage", "Free and without obligation"], image: images.shower,
  },
  "taps-toilets-and-showers": {
    headline: "Fix or replace taps, toilets and showers",
    lead: "Tell us which fitting is causing trouble, choose when suits you, and we will call to confirm your time and price.",
    benefits, image: images.shower,
  },
  "landlord-plumbing": {
    headline: "Plumbing for landlords and agents",
    lead: "Tell us about the property and the job. We confirm the time and price with you, and can arrange access with the tenant.",
    benefits: ["Takes about two minutes", "Price confirmed with you, not the tenant", "Written job summary for your records"],
    image: images.kitchen,
  },
  "commercial-plumbing": {
    headline: "Plumbing for your business premises",
    lead: "Tell us about the premises, the problem and when we can get in. We will plan around your opening hours where we can.",
    benefits: ["Takes about two minutes", "Visits planned around your trading hours", "Price confirmed before we start"],
    image: images.skyline,
  },
};
