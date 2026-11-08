export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  signs: { title: string; items: string[] };
  included: string[];
  process: { title: string; text: string }[];
  faqs: Faq[];
  related: string[];
};

export const services: Service[] = [
  {
    slug: "emergency-plumber",
    name: "Emergency plumber",
    short: "Burst pipes, major leaks and no water. Tell us it is urgent and we will treat it that way.",
    metaTitle: "Emergency Plumber London | Burst Pipes and Leaks",
    metaDescription:
      "Burst pipe or flooding in London? Plumbees attends urgent plumbing emergencies across London. Request an emergency call-out now.",
    h1: "Emergency plumber in London",
    intro: [
      "A burst pipe at eleven at night is not the moment to compare ten websites. If water is coming through a ceiling or you cannot turn it off, you need someone who will pick up the request, understand the problem and get to you.",
      "Plumbees covers all of London. We are open 9am to 6pm, seven days a week, and we also take emergency calls outside those hours. When you send an emergency request, it is flagged ahead of routine work so it is seen first. The sooner you tell us what is happening, the sooner we can plan the visit.",
    ],
    signs: {
      title: "What counts as an emergency",
      items: [
        "A burst or split pipe that you cannot isolate",
        "Water coming through a ceiling, light fitting or wall",
        "No cold water supply to the property",
        "A toilet that is overflowing and will not stop",
        "A leaking stopcock or tank that is causing damage",
        "Sewage backing up into a bath, shower or floor drain",
      ],
    },
    included: [
      "Making the water safe and stopping further damage first",
      "A clear explanation of what failed and why",
      "A permanent repair where we can, or a safe temporary fix with a follow-up plan",
      "Advice on what to tell your insurer and what to photograph",
      "A written summary of the work for your records",
    ],
    process: [
      { title: "Turn the water off", text: "If you can, close the main stopcock (often under the kitchen sink) and open the cold taps to drain the system. Switch off electrics near any water." },
      { title: "Send the request", text: "Choose emergency on the quote form or call us. Give an address, a postcode and a short description." },
      { title: "We confirm the plan", text: "We contact you to confirm access, the likely cause and what the visit will involve." },
      { title: "Fixed and explained", text: "We stop the problem, repair what we can and tell you plainly what is left to do." },
    ],
    faqs: [
      { q: "Can I call outside your normal hours?", a: "Yes. Our normal hours are 9am to 6pm, seven days a week, and we take emergency calls outside those hours. Call us and tell us it is an emergency." },
      { q: "Do you charge a call-out fee for emergencies?", a: "We quote for every job and tell you the cost before work begins. For emergencies we will explain any out-of-hours rate when we confirm the visit, so there are no surprises on the day." },
      { q: "Where is my main stopcock?", a: "Usually under the kitchen sink, in a utility room or near the front door. In flats it may be in a communal cupboard. If you cannot find it, tell us and we will talk you through it." },
      { q: "Should I call my insurer first?", a: "Report the damage to your insurer as soon as you reasonably can, and take photographs before anything is moved. We can give you a written account of the cause and the repair." },
      { q: "Can you help if I rent my home?", a: "Yes, but please tell your landlord or agent too. Some tenancies require the landlord to approve repairs, and we are happy to speak to them directly." },
    ],
    related: ["leaks-and-burst-pipes", "blocked-drains-and-toilets", "landlord-plumbing"],
  },
  {
    slug: "leaks-and-burst-pipes",
    name: "Leaks and burst pipes",
    short: "Finding the source, stopping the damage and repairing the pipework properly.",
    metaTitle: "Leak and Burst Pipe Repairs in London | Plumbees",
    metaDescription:
      "Leaking pipe, damp patch or burst pipe in London? Plumbees finds the source and repairs it properly. Request a free, written quote.",
    h1: "Leak and burst pipe repairs",
    intro: [
      "Most leaks start small. A damp patch on a ceiling, a stain behind the toilet or a water bill that has crept up without explanation are all common first signs. Left alone, they tend to turn into bigger repairs.",
      "We trace the source before we cut anything open, so you are not paying for guesswork. Once we know where the water is coming from, we repair the pipe, joint or fitting and make good the immediate area.",
    ],
    signs: {
      title: "Common signs of a leak",
      items: [
        "Damp or discoloured patches on walls and ceilings",
        "The sound of running water when everything is off",
        "A water meter that keeps moving when nothing is in use",
        "Mould, peeling paint or a musty smell",
        "Low water pressure that has appeared without warning",
        "Floorboards or laminate that have started to lift or warp",
      ],
    },
    included: [
      "Visual inspection and moisture checks to locate the leak",
      "Repair or replacement of damaged pipe, joints and valves",
      "Isolation valves fitted where they are missing, so future problems are easier to contain",
      "Pressure testing before we leave",
      "Clear advice on any damage that needs a builder or decorator",
    ],
    process: [
      { title: "Tell us what you see", text: "Describe where the damp or water is appearing and when you first noticed it. Photographs help." },
      { title: "Locate the source", text: "We inspect the pipework and surrounding areas and test to confirm exactly where the leak is." },
      { title: "Quote and agree", text: "You receive a written quote covering the repair and any access work required." },
      { title: "Repair and test", text: "We make the repair, pressure test the system and check the area is dry and secure." },
    ],
    faqs: [
      { q: "Can you find a leak without lifting floors?", a: "Often, yes. We start with visual checks, listening and moisture readings. We only open up floors or walls once we are confident where the problem is, and we will talk to you first." },
      { q: "Will you fix the damaged plaster or flooring?", a: "We repair the plumbing and leave the area tidy. Decorating and plastering are specialist trades, and we can advise on what is needed so you can brief a builder." },
      { q: "How long does a leak repair take?", a: "A simple joint or fitting can take an hour or two. Hidden pipework or access problems take longer. We will give you a realistic estimate when we quote." },
      { q: "My water bill has gone up. Could it be a leak?", a: "It is a common cause, particularly if you have a meter. Check whether the meter moves when everything is off, then send us the details." },
    ],
    related: ["emergency-plumber", "bathroom-plumbing", "taps-toilets-and-showers"],
  },
  {
    slug: "blocked-drains-and-toilets",
    name: "Blocked drains and toilets",
    short: "Slow sinks, blocked toilets and drains that smell. Cleared and explained.",
    metaTitle: "Blocked Drain and Toilet Plumber London | Plumbees",
    metaDescription:
      "Blocked sink, toilet or drain in London? Plumbees clears blockages and finds the cause so they do not come back. Get a written quote today.",
    h1: "Blocked drains and toilets",
    intro: [
      "A blocked toilet or sink is unpleasant and rarely convenient. The quick fix is to clear it, but the better outcome is knowing why it blocked so it does not happen again in a month.",
      "We clear blockages in sinks, baths, showers, toilets and accessible internal drains, and we tell you what we find. Where the problem is further along the drainage run or involves shared pipes, we will explain who is responsible and what the next step should be.",
    ],
    signs: {
      title: "When to get in touch",
      items: [
        "Water that drains slowly or gurgles when it goes",
        "A toilet that will not flush or fills almost to the rim",
        "Unpleasant smells from a sink, shower or floor drain",
        "More than one fitting backing up at the same time",
        "Water rising in a bath or shower when you flush the toilet",
        "Repeated blockages in the same place",
      ],
    },
    included: [
      "Clearing the blockage using the least invasive method that will work",
      "Checking that the fitting drains freely afterwards",
      "Identifying likely causes such as grease, wipes or damaged pipework",
      "Advice on whether a camera survey is worthwhile",
      "Guidance on shared drains and who to contact",
    ],
    process: [
      { title: "Describe the problem", text: "Tell us which fittings are affected and whether more than one is slow. That helps us work out where the blockage sits." },
      { title: "Agree the approach", text: "We confirm what is likely to be needed and give you a written quote." },
      { title: "Clear and test", text: "We clear the blockage and run water through to confirm normal flow." },
      { title: "Prevent a repeat", text: "We explain what caused it and what you can change to avoid it." },
    ],
    faqs: [
      { q: "Can I use drain cleaner first?", a: "We would advise against strong chemical cleaners. They can damage older pipes, and they make a manual clearance unpleasant and less safe for the engineer. Plunging gently is fine." },
      { q: "Who is responsible for a shared drain?", a: "It depends on the layout, but the water company normally looks after shared sewers outside the property boundary. We will tell you what we find so you know who to contact." },
      { q: "Do you do CCTV drain surveys?", a: "If a blockage keeps returning, a camera survey is the right way to see the pipe. We will recommend one when it is worth it and arrange it with you." },
      { q: "Is a flushed wipe really a problem?", a: "Yes. Wipes sold as flushable often do not break down, and they are one of the most common causes of blocked toilets and drains." },
    ],
    related: ["emergency-plumber", "taps-toilets-and-showers", "landlord-plumbing"],
  },
  {
    slug: "bathroom-plumbing",
    name: "Bathroom plumbing",
    short: "Plumbing for new and refurbished bathrooms, from first fix to final connection.",
    metaTitle: "Bathroom Plumber London | Installations and Refits",
    metaDescription:
      "Plumbing for bathroom installations and refits across London. First fix, second fix and final connections. Request a written quote from Plumbees.",
    h1: "Bathroom plumbing and installations",
    intro: [
      "A good bathroom depends on the plumbing behind the tiles. Pipe runs, waste falls, water pressure and isolation valves are decisions made early and lived with for years.",
      "We provide the plumbing side of bathroom projects, whether you are replacing a single suite or taking a room back to bare walls. We work with your builder, tiler or designer, and we can also work directly with homeowners and landlords.",
    ],
    signs: {
      title: "Typical bathroom plumbing jobs",
      items: [
        "Removing an old suite and capping off safely",
        "New pipework and waste runs for a changed layout",
        "Fitting baths, basins, toilets and showers",
        "Concealed cisterns and wall-hung toilets",
        "Wet rooms and walk-in showers, working with your tiler",
        "Replacing shut-off valves and tidying visible pipework",
      ],
    },
    included: [
      "A site visit to check access, existing pipework and water pressure",
      "First fix pipework before tiling and boarding",
      "Second fix connections once the room is finished",
      "Isolation valves on every fitting where practical",
      "Testing for leaks and checking waste flows before we sign off",
    ],
    process: [
      { title: "Share your plans", text: "Send a sketch, the supplier's drawings or a description of what you want. Tell us who else is working on site." },
      { title: "Survey and quote", text: "We check the existing system and provide a written quote broken down by stage." },
      { title: "First fix", text: "We install the hidden pipework and waste, then pressure test before it is covered up." },
      { title: "Second fix and handover", text: "Once tiling is complete we connect the fittings, test everything and show you the isolation valves." },
    ],
    faqs: [
      { q: "Do you supply the bathroom suite?", a: "We focus on the plumbing. If you have chosen your suite, we fit it. We can advise on fittings that are reliable and easy to service, but we do not run a bathroom showroom." },
      { q: "Can you work with my builder?", a: "Yes. Plumbing is sequenced around other trades, so we agree the order of work and dates with whoever is running the project." },
      { q: "Will my water pressure be enough for a power shower?", a: "It depends on the existing system. We check pressure and flow at the survey and tell you honestly if the shower you have chosen needs a pump or a different system." },
      { q: "How long does the plumbing take?", a: "A standard like-for-like bathroom is typically a few days of plumbing spread across first and second fix. A full layout change takes longer. We give you a schedule with the quote." },
    ],
    related: ["taps-toilets-and-showers", "leaks-and-burst-pipes", "landlord-plumbing"],
  },
  {
    slug: "taps-toilets-and-showers",
    name: "Taps, toilets and showers",
    short: "Repairing and replacing dripping taps, running toilets and weak showers.",
    metaTitle: "Tap, Toilet and Shower Repairs London | Plumbees",
    metaDescription:
      "Dripping tap, running toilet or weak shower? Plumbees repairs and replaces fittings across London. Request a clear, written quote.",
    h1: "Tap, toilet and shower repairs",
    intro: [
      "Small plumbing faults are easy to put up with, which is why they usually get worse. A dripping tap wastes water, a running cistern raises your bill and a weak shower makes every morning slightly worse.",
      "We repair what can sensibly be repaired and replace what cannot, and we tell you which is which. If a new part will fix the problem for a few pounds, we will not suggest a whole new fitting.",
    ],
    signs: {
      title: "Common jobs",
      items: [
        "Dripping or stiff taps and worn washers or cartridges",
        "Toilets that keep running, fill slowly or flush weakly",
        "Replacing kitchen and bathroom taps",
        "Mixer shower faults and low flow",
        "Leaks around the base of a toilet or under a basin",
        "Replacing flexible hoses, valves and traps",
      ],
    },
    included: [
      "Diagnosing the fault and explaining the options",
      "Repair using the right parts, not a temporary patch",
      "Fitting new taps, toilets, showers and valves that you supply or that we recommend",
      "Disposal of the old fitting on request",
      "A final test and a check that nothing is dripping",
    ],
    process: [
      { title: "Tell us the fault", text: "Name the fitting, the make if you know it, and what it is doing." },
      { title: "Quote", text: "You receive a written price for the repair or replacement." },
      { title: "Fix", text: "We carry out the work, usually in a single visit." },
      { title: "Check", text: "We test for leaks and flow, then leave the area clean and dry." },
    ],
    faqs: [
      { q: "Can I buy the tap or toilet myself?", a: "Yes, many customers do. Please send us the make and model beforehand so we can check the fitting suits the pipework and arrive with the right connectors." },
      { q: "Is it worth repairing an old toilet cistern?", a: "Often, yes. A new fill valve or flush mechanism is inexpensive and can stop water being wasted. If the cistern is cracked or obsolete, we will say so." },
      { q: "Why is my shower pressure poor?", a: "It could be limescale, a failing cartridge, a blocked hose or a wider supply issue. We check the simple causes first and explain what we find." },
      { q: "Do you fit outside taps?", a: "Yes. We recommend a double check valve and an isolation valve inside the property so the tap can be shut off over winter." },
    ],
    related: ["bathroom-plumbing", "leaks-and-burst-pipes", "blocked-drains-and-toilets"],
  },
  {
    slug: "landlord-plumbing",
    name: "Landlord plumbing",
    short: "Dependable plumbing for rented homes, with clear reporting for landlords and agents.",
    metaTitle: "Landlord Plumber London | Rental Property Repairs",
    metaDescription:
      "Plumbing repairs and maintenance for landlords and letting agents across London. Clear quotes, tenant liaison and written job reports.",
    h1: "Plumbing for landlords and letting agents",
    intro: [
      "Managing a rental property means dealing with repairs from a distance. You want the tenant to be looked after, the cost to be clear and the paperwork to be tidy.",
      "We work with landlords, letting agents and managing agents. We can speak directly to the tenant to arrange access, send you a written quote before work starts and give you a summary of what was done afterwards.",
    ],
    signs: {
      title: "How we support landlords",
      items: [
        "Repairs raised by tenants, such as leaks, blockages and faulty fittings",
        "Planned maintenance between tenancies",
        "Pre-tenancy plumbing checks",
        "Dealing with damp, leaks and water damage reports",
        "Multiple properties handled through a single contact",
        "Out-of-hours emergencies where a tenant needs help quickly",
      ],
    },
    included: [
      "Quote sent to you, not the tenant, before work begins",
      "Direct contact with the tenant to arrange access",
      "Written job summary with a description of the fault and the repair",
      "Photographs where they help your records",
      "Advice on repairs that are urgent and those that can wait",
    ],
    process: [
      { title: "Send the details", text: "Provide the property address, the issue and the tenant's contact details if you want us to arrange access." },
      { title: "Quote to you", text: "We send you the quote and wait for your approval unless it is an emergency." },
      { title: "Visit and repair", text: "We attend, fix the fault and keep the tenant informed." },
      { title: "Report back", text: "You receive a summary you can keep with the property file." },
    ],
    faqs: [
      { q: "Can you invoice a managing agent?", a: "Yes. Tell us who should receive the quote and the invoice and we will address them accordingly, including any purchase order reference." },
      { q: "Do you handle several properties?", a: "Yes. If you have a portfolio, tell us when you request your first quote and we will keep your properties and contacts together." },
      { q: "What if the tenant caused the damage?", a: "We describe what we find as factually as we can. How costs are recovered is a matter between you and the tenant, and we can supply a written account to support that." },
      { q: "Do you check for Legionella risk?", a: "We can point out obvious risks such as dead legs and stagnant pipework, but a formal Legionella risk assessment is a separate service that we do not currently offer." },
    ],
    related: ["emergency-plumber", "commercial-plumbing", "leaks-and-burst-pipes"],
  },
  {
    slug: "commercial-plumbing",
    name: "Commercial plumbing",
    short: "Plumbing support for offices, shops, restaurants and managed buildings.",
    metaTitle: "Commercial Plumber London | Offices, Shops and Venues",
    metaDescription:
      "Commercial plumbing repairs and maintenance for London offices, shops, restaurants and managed buildings. Request a quote from Plumbees.",
    h1: "Commercial plumbing",
    intro: [
      "When a toilet fails in an office or a sink leaks in a kitchen, the cost is more than the repair. It is lost trade, unhappy staff and sometimes a legal duty to provide proper facilities.",
      "We support small and medium-sized businesses across London with reactive repairs and planned plumbing work. We keep disruption low, work around opening hours where we can and explain the problem in plain terms.",
    ],
    signs: {
      title: "Who we work with",
      items: [
        "Offices and serviced workspaces",
        "Shops, salons and clinics",
        "Cafes, restaurants and takeaways",
        "Managed residential blocks and common parts",
        "Landlords of mixed-use buildings",
        "Facilities managers who need a responsive local contact",
      ],
    },
    included: [
      "Repairs to taps, toilets, urinals, sinks and washrooms",
      "Leak investigation and pipework repairs",
      "Blockage clearance in sanitary and kitchen waste",
      "Out-of-hours visits where the business cannot trade or the building is at risk",
      "Written reports and quotes suitable for facilities and finance teams",
    ],
    process: [
      { title: "Tell us about the site", text: "Share the address, the problem and the best person to speak to on site." },
      { title: "Plan the visit", text: "We agree a time that suits your opening hours and any access needs, such as inductions or permits." },
      { title: "Fix the fault", text: "We repair the problem and test the system before we leave." },
      { title: "Report", text: "You receive a clear summary with the work done and any follow-up recommended." },
    ],
    faqs: [
      { q: "Can you work out of hours?", a: "Often, yes. If you need work done before opening or after closing, tell us on the quote form and we will confirm what is possible." },
      { q: "Do you provide planned maintenance contracts?", a: "Not as a standard package at the moment. We are happy to discuss a regular visit schedule if that suits your site." },
      { q: "Do you need access to the building manager?", a: "For managed buildings we will usually need confirmation from the managing agent. Give us their details and we will liaise with them." },
      { q: "Can you quote for a one-off project?", a: "Yes. Send a description or a plan, and we will visit where needed before giving you a fixed written quote." },
    ],
    related: ["landlord-plumbing", "emergency-plumber", "blocked-drains-and-toilets"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
