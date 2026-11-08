export type Area = {
  slug: string;
  name: string;
  region: "central" | "north" | "east" | "south";
  postcodes: string;
  metaDescription: string;
  intro: string;
  paragraphs: string[];
  commonJobs: string[];
};

export const areas: Area[] = [
  {
    slug: "westminster",
    region: "central",
    name: "Westminster",
    postcodes: "W1, SW1, WC2, NW8, W2, W9",
    metaDescription:
      "Plumber in Westminster. Plumbees covers Marylebone, Mayfair, Soho, Pimlico, Paddington and Maida Vale for repairs, emergencies and bathrooms.",
    intro:
      "Westminster mixes grand Georgian townhouses, Victorian terraces, mansion blocks and a large number of offices. The plumbing varies as much as the buildings.",
    paragraphs: [
      "Many homes here have been converted into flats over the years, so pipework often runs through shared walls, ceilings and risers. A leak can affect neighbours quickly, which is why we aim to isolate and contain the problem first.",
      "Leasehold flats usually need approval from a freeholder or managing agent before significant work. If that applies to you, we can provide the written details they ask for. Controlled parking and access rules are part of daily life in the borough, and we plan visits around them.",
    ],
    commonJobs: ["Leaks between flats", "Bathroom refits in period buildings", "Office washroom repairs", "Blocked toilets and waste pipes"],
  },
  {
    slug: "camden",
    region: "north",
    name: "Camden",
    postcodes: "NW1, NW3, NW5, NW6, WC1",
    metaDescription:
      "Plumber in Camden. Plumbees covers Kentish Town, Belsize Park, Hampstead and Bloomsbury for repairs, emergencies and landlord work.",
    intro:
      "From the terraces of Kentish Town to the larger houses around Hampstead and Belsize Park, Camden has a lot of older property with older pipework.",
    paragraphs: [
      "Victorian and Edwardian houses often have a mix of original and replaced plumbing. Over time, repairs by different people leave pipes of different materials joined together, and those joints are a common place for leaks to begin.",
      "Camden also has a high proportion of rented homes and small businesses, including shops and hospitality around the markets. We work with landlords, agents and business owners as well as homeowners.",
    ],
    commonJobs: ["Leaks from older pipework", "Landlord repairs between tenancies", "Cafe and shop plumbing", "Taps, toilets and showers"],
  },
  {
    slug: "islington",
    region: "north",
    name: "Islington",
    postcodes: "N1, N5, N7, N19, EC1",
    metaDescription:
      "Plumber in Islington. Plumbees covers Angel, Barnsbury, Canonbury, Highbury and Holloway for repairs, bathrooms and emergency call-outs.",
    intro:
      "Islington is known for its Georgian squares and Victorian terraces, many now split into flats. Space is tight and so are the pipe runs.",
    paragraphs: [
      "In converted houses, the plumbing for several flats often shares one set of stacks and risers. A blocked waste pipe in one flat can show up as a problem in another, so we look at the whole run before deciding where to clear.",
      "Bathrooms in these homes are often small and awkward. Good planning at first fix makes a real difference, and we are used to working with builders and designers to get the best out of a compact room.",
    ],
    commonJobs: ["Bathroom refits in compact rooms", "Waste and soil pipe blockages", "Leaks into flats below", "Replacing worn taps and valves"],
  },
  {
    slug: "kensington-and-chelsea",
    region: "central",
    name: "Kensington and Chelsea",
    postcodes: "SW3, SW5, SW7, SW10, W8, W10, W11",
    metaDescription:
      "Plumber in Kensington and Chelsea. Plumbees covers South Kensington, Earls Court, Notting Hill and Chelsea for repairs and bathroom plumbing.",
    intro:
      "Stucco terraces, mansion blocks and high-specification apartments make up much of Kensington and Chelsea. Many properties have several bathrooms and a lot to protect.",
    paragraphs: [
      "In homes like these, a leak can cause damage to fine finishes and to flats below. That raises the stakes for a quick and careful response, and for a repair that is done properly the first time.",
      "Managing agents are common in the borough's larger buildings. We are happy to coordinate with them, provide the paperwork they need and keep everyone informed about access.",
    ],
    commonJobs: ["Leak investigation", "Multi-bathroom plumbing work", "Concealed cisterns and wall-hung toilets", "Work coordinated with managing agents"],
  },
  {
    slug: "hackney",
    region: "east",
    name: "Hackney",
    postcodes: "E2, E5, E8, E9, N16",
    metaDescription:
      "Plumber in Hackney. Plumbees covers Dalston, Shoreditch, Clapton, Stoke Newington and Hackney Wick for repairs, landlords and emergencies.",
    intro:
      "Hackney has Victorian terraces, converted warehouses, new apartment blocks and one of the largest rented sectors in London.",
    paragraphs: [
      "That makes landlord and letting agent work a big part of the borough's plumbing needs. Repairs have to be quick, tenants need to be kept informed and landlords need clear records of the work.",
      "Warehouse conversions and newer flats have their own quirks, such as shared risers and pressurised systems. We ask about the building at the outset so that we arrive prepared.",
    ],
    commonJobs: ["Landlord and agent call-outs", "Leaks in converted buildings", "Blocked kitchen and bathroom waste", "Commercial units and studios"],
  },
  {
    slug: "lambeth",
    region: "south",
    name: "Lambeth",
    postcodes: "SW2, SW4, SW8, SE1, SE11, SE24, SE27",
    metaDescription:
      "Plumber in Lambeth. Plumbees covers Brixton, Clapham, Vauxhall, Kennington and Herne Hill for plumbing repairs, emergencies and bathrooms.",
    intro:
      "Lambeth covers a wide range of homes, from Victorian terraces in Brixton and Herne Hill to purpose-built blocks and riverside developments.",
    paragraphs: [
      "Terraced houses often have old pipework that has been patched and extended over the decades, while purpose-built blocks bring shared drainage and communal supply issues.",
      "We ask a few simple questions about the property when you request a quote, so we can bring the right parts and set aside enough time for the visit.",
    ],
    commonJobs: ["Leaks and burst pipes", "Blocked toilets and drains", "Bathroom plumbing", "Landlord repairs"],
  },
  {
    slug: "barking-and-dagenham",
    region: "east",
    name: "Barking and Dagenham",
    postcodes: "IG11, RM6, RM8, RM9, RM10",
    metaDescription:
      "Plumber in Barking and Dagenham. Plumbees covers Barking, Dagenham, Becontree and Chadwell Heath for repairs, blocked drains, landlords and emergencies.",
    intro:
      "Barking and Dagenham combines the huge Becontree estate, older streets around Barking town centre and a growing number of new-build flats along the riverside.",
    paragraphs: [
      "Much of the borough is made up of homes built in the 1920s and 1930s. After nearly a century, original pipework, old stopcocks and worn fittings are common, and small leaks are often found only once a stain appears on a ceiling.",
      "Newer developments bring a different set of questions. Shared risers, communal water supplies and building warranties all affect who should be called and what can be repaired. We ask about the building at the outset so that we arrive prepared, and we can liaise with managing agents where needed.",
    ],
    commonJobs: ["Leaks from older pipework", "Blocked drains and toilets", "Landlord repairs and tenant call-outs", "Plumbing in new-build flats"],
  },
  {
    slug: "romford",
    region: "east",
    name: "Romford",
    postcodes: "RM1, RM2, RM3, RM4, RM5, RM7",
    metaDescription:
      "Plumber in Romford. Plumbees covers Romford town centre, Gidea Park, Collier Row and Harold Wood for repairs, bathrooms, emergencies and commercial plumbing.",
    intro:
      "Romford is a busy market town with a lively town centre, a mix of Victorian and 1930s housing and a steady stream of new flats close to the station.",
    paragraphs: [
      "Around the town centre there are shops, restaurants, salons and offices, so commercial plumbing sits alongside household work. We plan visits around opening hours where we can to keep disruption low.",
      "Further out, the housing is a mix of terraces, interwar semis and the Arts and Crafts houses of Gidea Park. Older homes often need worn taps, valves and cisterns replaced, and bathrooms that have not been touched in decades are a frequent request.",
    ],
    commonJobs: ["Shop, cafe and salon plumbing", "Bathroom plumbing and refits", "Taps, toilets and valves", "Blocked kitchen and bathroom waste"],
  },
  {
    slug: "hornchurch",
    region: "east",
    name: "Hornchurch",
    postcodes: "RM11, RM12",
    metaDescription:
      "Plumber in Hornchurch. Plumbees covers Hornchurch, Emerson Park, Elm Park and Upminster Bridge for leaks, blocked drains, bathrooms and emergency call-outs.",
    intro:
      "Hornchurch is mostly residential, with a mix of 1930s semis, older cottages near the centre and larger detached homes in Emerson Park.",
    paragraphs: [
      "Family homes dominate here, and the jobs reflect that: dripping taps, slow drains, toilets that will not stop running and bathrooms that have reached the end of their life. We aim to fix the problem in one visit where we can.",
      "Larger houses often have more than one bathroom and more pipework to keep track of. When a leak appears, finding the source before opening anything up saves time and mess, and that is how we approach it.",
    ],
    commonJobs: ["Family home repairs", "Multi-bathroom houses", "Leaks and burst pipes", "Replacing taps, toilets and showers"],
  },
  {
    slug: "chigwell",
    region: "east",
    name: "Chigwell",
    postcodes: "IG7",
    metaDescription:
      "Plumber in Chigwell. Plumbees covers Chigwell, Grange Hill and Hainault for plumbing repairs, bathroom installations, leaks and emergency call-outs.",
    intro:
      "Chigwell sits on the edge of London, on the Essex border, and is known for large detached houses with several bathrooms.",
    paragraphs: [
      "Bigger homes mean more plumbing: multiple bathrooms, utility rooms, outside taps and long pipe runs. When something fails, it can take longer to find, and the damage can spread through more of the house.",
      "Many owners here upgrade or extend, so bathroom plumbing and installation work is common, including concealed cisterns, wall-hung toilets and walk-in showers. We work with builders and designers, or directly with homeowners.",
    ],
    commonJobs: ["Plumbing for multiple bathrooms", "Bathroom refits and extensions", "Leak investigation", "Outside taps and utility rooms"],
  },
  {
    slug: "havering",
    region: "east",
    name: "Havering",
    postcodes: "RM1 to RM7, RM11 to RM14",
    metaDescription:
      "Plumber in the London Borough of Havering. Plumbees covers Romford, Hornchurch, Upminster, Rainham and Harold Hill for repairs, bathrooms and emergencies.",
    intro:
      "Havering is London's easternmost borough. It spreads from the town centre of Romford out to Upminster, Harold Hill and the Thames at Rainham.",
    paragraphs: [
      "The housing varies a great deal. There are interwar semis, post-war estates, garden suburb houses at Gidea Park and larger family homes around Upminster. Each age of property has its own typical plumbing faults.",
      "If you know your town, you may prefer our pages for Romford, Hornchurch and Rainham. If you are somewhere else in the borough, such as Upminster, Collier Row or Harold Hill, send us your postcode and we will confirm that we cover you.",
    ],
    commonJobs: ["Leaks and burst pipes", "Blocked drains and toilets", "Bathroom plumbing", "Landlord and commercial repairs"],
  },
  {
    slug: "rainham",
    region: "east",
    name: "Rainham",
    postcodes: "RM13",
    metaDescription:
      "Plumber in Rainham. Plumbees covers Rainham, Wennington and Beam Park for plumbing repairs, new-build flats, commercial units and emergency call-outs.",
    intro:
      "Rainham combines an older village centre with fast-growing new housing at Beam Park and a large number of commercial and industrial units nearby.",
    paragraphs: [
      "New-build flats and houses are a big part of the local picture. Shared systems and warranty periods can affect who is responsible for a fault, so we ask for details of the building before we quote.",
      "There are also workshops, warehouses and trade units in and around the area. Washroom faults, leaks and blocked waste in commercial premises need a quick answer, and we work around your trading hours where possible.",
    ],
    commonJobs: ["Plumbing in new-build homes", "Commercial and industrial unit repairs", "Blocked drains and toilets", "Leak investigation"],
  },
  {
    slug: "barnet",
    region: "north",
    name: "Barnet",
    postcodes: "EN4, EN5, N2, N3, N11, N12, N14, N20, NW4, NW7, NW9, NW11",
    metaDescription:
      "Plumber in Barnet. Plumbees covers Finchley, Mill Hill, Edgware, Colindale and Hendon for leaks, blocked drains, bathrooms and emergency call-outs.",
    intro:
      "Barnet is one of London's largest boroughs, stretching from Finchley and Golders Green up to the edge of Hertfordshire.",
    paragraphs: [
      "Much of the housing is interwar and Edwardian, with family semis in Finchley, Mill Hill and Edgware and the Arts and Crafts homes of Hampstead Garden Suburb. Original pipework in houses of this age is often patched and extended, and isolation valves are frequently missing.",
      "The borough has also seen large new-build developments, particularly around Colindale. Flats in these blocks often share risers and have managing agents, so we ask about the building before we visit. If you are in Hendon, see our [Hendon page](/areas/hendon).",
    ],
    commonJobs: ["Leaks in older family homes", "Bathroom refits", "Plumbing in new-build flats", "Taps, toilets and showers"],
  },
  {
    slug: "hendon",
    region: "north",
    name: "Hendon",
    postcodes: "NW4, NW9",
    metaDescription:
      "Plumber in Hendon. Plumbees covers Hendon, West Hendon and Colindale for plumbing repairs, blocked drains, landlord work and emergency call-outs.",
    intro:
      "Hendon combines interwar suburban streets with a large student and rented population around the university and fast-changing areas near Brent Cross.",
    paragraphs: [
      "Rented homes and shared houses put plumbing under more strain. Bathrooms and kitchens used by several people need reliable taps, toilets and drains, and landlords need repairs handled quickly and recorded properly.",
      "Family homes here are mostly semis and terraces from the 1920s and 1930s. Ageing fittings, worn stopcocks and slow drains are common, and they are straightforward to put right.",
    ],
    commonJobs: ["Landlord and shared house repairs", "Blocked toilets and drains", "Leaking taps and valves", "Bathroom plumbing"],
  },
  {
    slug: "tower-hamlets",
    region: "east",
    name: "Tower Hamlets",
    postcodes: "E1, E1W, E2, E3, E14",
    metaDescription:
      "Plumber in Tower Hamlets. Plumbees covers Canary Wharf, Wapping, Bow, Whitechapel and Poplar for leaks, blockages and emergency plumbing.",
    intro:
      "Tower Hamlets runs from the City fringe to Canary Wharf, taking in Victorian terraces, warehouse conversions, estates and some of London's tallest residential towers.",
    paragraphs: [
      "In high-rise flats, plumbing is shared. Water arrives through boosted risers and waste leaves through common stacks, so a leak or blockage in one flat can quickly affect others. We work with building managers and concierge teams to arrange access and isolate the problem.",
      "In Bow, Stepney and Whitechapel, older terraces and conversions bring their own issues, such as tight pipe runs and patched pipework. We ask about the building at the outset so that we arrive prepared.",
    ],
    commonJobs: ["Leaks in high-rise flats", "Work with building managers", "Blocked waste and soil stacks", "Landlord repairs"],
  },
  {
    slug: "newham",
    region: "east",
    name: "Newham",
    postcodes: "E6, E7, E12, E13, E15, E16, E20",
    metaDescription:
      "Plumber in Newham. Plumbees covers Stratford, Forest Gate, East Ham, Plaistow and the Royal Docks for repairs, landlords and emergency plumbing.",
    intro:
      "Newham mixes long Victorian terraces in Forest Gate and East Ham with new neighbourhoods around Stratford, the Olympic Park and the Royal Docks.",
    paragraphs: [
      "A large share of homes in the borough are rented, so much of our work here is for landlords and letting agents. Quick, clear repairs and a written summary help keep tenants happy and properties in good order.",
      "Older terraces often have mixed pipework from decades of repairs, while new-build flats have shared systems and warranties to consider. Either way, we find the cause before we fix the symptom.",
    ],
    commonJobs: ["Landlord and agent call-outs", "Leaks in older terraces", "New-build flat plumbing", "Blocked kitchen and bathroom waste"],
  },
  {
    slug: "enfield",
    region: "north",
    name: "Enfield",
    postcodes: "EN1, EN2, EN3, N9, N13, N18, N21",
    metaDescription:
      "Plumber in Enfield. Plumbees covers Enfield Town, Edmonton, Palmers Green, Winchmore Hill and Ponders End for repairs, bathrooms and emergencies.",
    intro:
      "Enfield is London's northernmost borough, with Victorian terraces in Edmonton, interwar semis across Palmers Green and larger homes around Winchmore Hill.",
    paragraphs: [
      "Family homes make up most of our work here: leaking taps, running toilets, slow drains and bathrooms ready for a refit. Many houses still have original stopcocks and valves that are worth checking before they fail.",
      "There are also busy industrial and trade areas in the east of the borough. We help businesses with washroom faults, leaks and blocked waste, and plan visits around working hours.",
    ],
    commonJobs: ["Family home repairs", "Bathroom refits", "Industrial and trade unit plumbing", "Leaks and burst pipes"],
  },
  {
    slug: "haringey",
    region: "north",
    name: "Haringey",
    postcodes: "N4, N8, N10, N15, N17, N22",
    metaDescription:
      "Plumber in the London Borough of Haringey, covering Harringay, Crouch End, Muswell Hill, Tottenham and Wood Green for repairs and emergencies.",
    intro:
      "The London Borough of Haringey covers Crouch End, Muswell Hill, Harringay and the Harringay Ladder, Wood Green and Tottenham. Much of it is Victorian and Edwardian terraced housing.",
    paragraphs: [
      "Many of these houses have been converted into flats, with bathrooms stacked above each other and waste pipes shared between floors. A leak or blockage upstairs often shows up downstairs first, so we look at the whole run before deciding where to work.",
      "Period homes in Muswell Hill and Crouch End are often being renovated, and good planning at first fix makes a real difference to a new bathroom. We work with your builder or directly with you.",
    ],
    commonJobs: ["Leaks between converted flats", "Bathroom refits in period homes", "Shared waste pipe blockages", "Landlord repairs"],
  },
  {
    slug: "chingford",
    region: "east",
    name: "Chingford",
    postcodes: "E4",
    metaDescription:
      "Plumber in Chingford. Plumbees covers Chingford, Chingford Mount, Highams Park and North Chingford for plumbing repairs and emergency call-outs.",
    intro:
      "Chingford sits at the northern tip of Waltham Forest, on the edge of Epping Forest, with streets of 1930s semis and family homes.",
    paragraphs: [
      "Houses of this age often have original pipework in lofts and under floors, which is more exposed in cold weather. Insulating pipes and knowing where your stopcock is can prevent a lot of trouble in winter.",
      "Most of our work here is for families: dripping taps, running toilets, blocked sinks and bathrooms that need updating. We aim to fix things properly in one visit.",
    ],
    commonJobs: ["Taps, toilets and showers", "Leaks and burst pipes", "Bathroom plumbing", "Blocked sinks and toilets"],
  },
  {
    slug: "bromley",
    region: "south",
    name: "Bromley",
    postcodes: "BR1, BR2, BR3, BR4, BR5, BR6, BR7, SE20, TN16",
    metaDescription:
      "Plumber in Bromley. Plumbees covers Bromley, Beckenham, Orpington, Chislehurst, Penge and Biggin Hill for repairs, bathrooms and emergencies.",
    intro:
      "Bromley is London's largest borough by area, running from Victorian streets in Penge and Beckenham to the countryside around Biggin Hill.",
    paragraphs: [
      "Housing is mostly suburban, with large detached and semi-detached family homes in Bromley, Chislehurst and Orpington. Bigger houses usually mean more bathrooms, longer pipe runs and more places for a leak to hide.",
      "In Penge and Beckenham, older terraces and conversions are common. If you are in the south of the borough, see our [Biggin Hill page](/areas/biggin-hill).",
    ],
    commonJobs: ["Multi-bathroom family homes", "Bathroom refits", "Leak investigation", "Taps, toilets and showers"],
  },
  {
    slug: "biggin-hill",
    region: "south",
    name: "Biggin Hill",
    postcodes: "TN16",
    metaDescription:
      "Plumber in Biggin Hill. Plumbees covers Biggin Hill and the surrounding villages for leaks, frozen pipes, blocked drains and bathroom plumbing.",
    intro:
      "Biggin Hill sits high on the North Downs at the southern edge of Bromley, with a mix of detached houses, bungalows and newer estates.",
    paragraphs: [
      "Its height means winters can bite harder than in central London, so pipes in lofts, garages and outbuildings are more at risk of freezing. Good insulation and a working stopcock go a long way.",
      "Homes here tend to be larger and more spread out, with outside taps and longer pipe runs. We plan visits so that we arrive with the right parts and enough time to finish the job.",
    ],
    commonJobs: ["Frozen and burst pipes", "Outside taps", "Bathroom plumbing", "Leak investigation"],
  },
  {
    slug: "lewisham",
    region: "south",
    name: "Lewisham",
    postcodes: "SE4, SE6, SE8, SE12, SE13, SE14, SE23, SE26",
    metaDescription:
      "Plumber in Lewisham. Plumbees covers Brockley, Catford, Deptford, Forest Hill, Sydenham and Lee for leaks, blockages, bathrooms and emergencies.",
    intro:
      "Lewisham is full of Victorian and Edwardian terraces, from Brockley and Ladywell to Forest Hill and Sydenham, alongside new developments in Deptford and Lewisham town centre.",
    paragraphs: [
      "Many period houses have been split into flats, which means shared pipework and leaks that travel between floors. We trace the source before opening anything up, and we can provide a written account for neighbours, freeholders or insurers.",
      "Newer flats near the town centre and the river have their own shared systems. Tell us about the building when you request a quote and we will plan accordingly.",
    ],
    commonJobs: ["Leaks in converted flats", "Bathroom refits", "Blocked toilets and drains", "Landlord repairs"],
  },
  {
    slug: "thurrock",
    region: "east",
    name: "Thurrock",
    postcodes: "RM15, RM16, RM17, RM18, RM19, RM20, SS17",
    metaDescription:
      "Plumber in Thurrock. Plumbees covers Grays, Purfleet, South Ockendon, Tilbury and Stanford-le-Hope for plumbing repairs and emergency call-outs.",
    intro:
      "Thurrock sits just beyond London's eastern edge in Essex, taking in Grays, Purfleet, South Ockendon, Tilbury and Stanford-le-Hope.",
    paragraphs: [
      "Homes range from older terraces in Grays to post-war estates and newer developments. Whatever the age of the property, the common jobs are the same: leaks, blockages and fittings that need repairing or replacing.",
      "Thurrock is also a major centre for logistics, retail and trade. We help businesses with washroom faults, leaks and blocked drains, and work around opening and shift patterns where we can.",
    ],
    commonJobs: ["Leaks and burst pipes", "Blocked drains and toilets", "Commercial and trade premises", "Bathroom plumbing"],
  },
  {
    slug: "chessington",
    region: "south",
    name: "Chessington",
    postcodes: "KT9",
    metaDescription:
      "Plumber in Chessington. Plumbees covers Chessington and Hook for leaking taps, blocked drains, bathroom plumbing and emergency call-outs.",
    intro:
      "Chessington, in the Royal Borough of Kingston upon Thames, is a quiet residential area of interwar semis, bungalows and family homes.",
    paragraphs: [
      "Many houses here date from the 1930s, so original fittings and pipework are reaching the end of their life. Replacing worn valves and stopcocks before they fail is often a sensible, low-cost step.",
      "Bathrooms in homes of this age are frequently due for a refit. We handle the plumbing from first fix to final connection, working with your builder or directly with you.",
    ],
    commonJobs: ["Bathroom refits", "Taps, toilets and showers", "Leaks from older pipework", "Blocked drains"],
  },
];

export const REGIONS = [
  ["north", "North London"],
  ["east", "East London and Essex"],
  ["south", "South London"],
  ["central", "Central and West London"],
] as const;

export const getArea = (slug: string) => areas.find((a) => a.slug === slug);
