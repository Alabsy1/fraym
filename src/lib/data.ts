export type AccentColor =
  | "frame"
  | "tape"
  | "signal"
  | "moss"
  | "terracotta"
  | "plum";

export interface Service {
  slug: string;
  system: string;
  number: string;
  verb: string;
  short: string;
  tagline: string;
  color: AccentColor;
  position: string;
  description: string;
  deliverables: string[];
  process: { step: string; detail: string }[];
  metrics: { value: string; label: string }[];
  seoDescription: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  year: string;
  summary: string;
  services: Service["slug"][];
  status: "closed" | "in-progress";
  featured: boolean;
  personality: "eccentric" | "incline" | "casualist";
  accent: AccentColor;
  coverImage?: string;
  galleryImages?: { src: string; caption: string }[];
  videos?: {
    src: string;
    caption: string;
    format: string;
    orientation: "landscape" | "portrait";
  }[];
  brief: string;
  observe: string;
  impact: string;
  quote: { text: string; author: string; role: string };
  metrics: { value: string; label: string }[];
  tags: string[];
}

export const services: Service[] = [
  {
    slug: "frame",
    system: "Frame System",
    number: "01",
    verb: "We frame.",
    short: "Frame",
    tagline: "The still that holds the argument.",
    color: "frame",
    position: "Frame is the lens. Photography, art direction and still craft that decide exactly what the world is allowed to see — and how it feels when it sees it.",
    description:
      "The Frame System is where a brand's visible world is composed. Not just a photograph — a decision about the edges of the frame, the light inside it, the object left out of it. We build campaign imagery, product worlds and brand systems with the patience of a painter and the discipline of a proofreader.",
    deliverables: [
      "Campaign & hero photography",
      "Art direction & set design",
      "Product & packaging worlds",
      "Brand image systems",
      "Editorial layouts & grids",
    ],
    process: [
      { step: "Observe the room", detail: "We study the category, the shelf, the feed. We note what everyone else frames, so we can frame otherwise." },
      { step: "Draw the frame", detail: "Moodboards, reference walls, and honest conversations about what deserves to be seen." },
      { step: "Direct the light", detail: "Casting, locations, sets and lighting diagrams — the furniture of the frame." },
      { step: "Print the decision", detail: "Select, grade, refine. Deliver the frame with the argument intact." },
    ],
    metrics: [
      { value: "+31%", label: "add-to-cart intent" },
      { value: "3×", label: "organic reach, launch imagery" },
      { value: "94%", label: "on-brand delivery" },
    ],
    seoDescription:
      "FRAYM's Frame System: campaign photography, art direction and image systems that decide what the world is allowed to see.",
  },
  {
    slug: "direct",
    system: "Direct System",
    number: "02",
    verb: "We direct.",
    short: "Direct",
    tagline: "The scene, the timing, the temperature.",
    color: "tape",
    position: "Direct is the method. Film, motion and storytelling directed with intent — where every cut, beat and silence has already been rehearsed.",
    description:
      "The Direct System is the studio's motion arm. Direction isn't shouting action — it is knowing the story before anyone arrives on set, then making room for the accident worth keeping. From brand films to campaign motion systems, we direct the scene until it means what we intend.",
    deliverables: [
      "Brand & campaign films",
      "Director-led commercial shoots",
      "Motion & short-form systems",
      "Casting & performance direction",
      "Post-production supervision",
    ],
    process: [
      { step: "Find the spine", detail: "We locate the one line of truth the film must hold, and build everything around it." },
      { step: "Rehearse the scene", detail: "Treatments, shot lists and boards. We direct on paper before we direct on set." },
      { step: "Run the room", detail: "On-set direction that keeps the idea loud and the ego quiet." },
      { step: "Cut to the bone", detail: "Edit, grade and sound — until every frame still answers the brief." },
    ],
    metrics: [
      { value: "#1", label: "category, launch week" },
      { value: "11 days", label: "first run sold out" },
      { value: "4.2M", label: "launch film views" },
    ],
    seoDescription:
      "FRAYM's Direct System: brand films, commercial direction and motion systems directed with intent and rehearsed on paper.",
  },
  {
    slug: "signal",
    system: "Signal System",
    number: "03",
    verb: "We observe.",
    short: "Signal",
    tagline: "The observation that becomes advantage.",
    color: "signal",
    position: "Signal is the reading. Research, cultural observation and positioning that turn noise in the market into a clear, usable direction.",
    description:
      "The Signal System is where observation becomes an asset. We read the room the way a good detective reads a scene — quietly, patiently, and with an eye for the detail everyone else walked past. Out of that reading comes positioning, messaging and creative strategy that feel obvious only in hindsight.",
    deliverables: [
      "Cultural & category observation",
      "Audience reading & insight",
      "Positioning & messaging",
      "Creative & content strategy",
      "Perception audits",
    ],
    process: [
      { step: "Read the room", detail: "Interviews, shelf studies, comment sections and stats. We go where the attention actually lives." },
      { step: "Name the pattern", detail: "We compress noise into a pattern, and the pattern into a usable idea." },
      { step: "Stress the idea", detail: "We argue against our own finding before it ever meets the client." },
      { step: "Hand over the direction", detail: "A clear, defensible position the whole studio can build from." },
    ],
    metrics: [
      { value: "+22%", label: "message comprehension" },
      { value: "9/10", label: "positions survived the stress test" },
      { value: "42→1", label: "signals, distilled to one direction" },
    ],
    seoDescription:
      "FRAYM's Signal System: cultural observation, positioning and strategy that turn market noise into a clear, defensible direction.",
  },
  {
    slug: "full-frame",
    system: "Full Frame",
    number: "04",
    verb: "We frame.",
    short: "Full Frame",
    tagline: "The whole case, end to end.",
    color: "moss",
    position: "Full Frame is the entire case. Observation, direction and framing delivered as one continuous motion — from first signal to final frame.",
    description:
      "Full Frame is the studio's complete engagement. One case file, one team, one through-line. We observe the room, direct the story and frame the work so it lands together. For brands that want the perception handled as a single, coherent system rather than a series of hand-offs.",
    deliverables: [
      "Perception & brand strategy",
      "Campaign ideation & architecture",
      "Photography, film & direction",
      "Image, motion & identity systems",
      "Launch & rollout support",
    ],
    process: [
      { step: "Open the case", detail: "We convene the full team around the brief and agree what winning looks like." },
      { step: "Observe", detail: "Signal System readings shape the ground truth of the work." },
      { step: "Direct", detail: "The story gets a spine, a cast and a plan for production." },
      { step: "Frame & deliver", detail: "Every deliverable ships in one voice, one grade, one standard." },
    ],
    metrics: [
      { value: "1", label: "through-line, end to end" },
      { value: "+22%", label: "comprehension uplift" },
      { value: "6/6", label: "deliverables, one voice" },
    ],
    seoDescription:
      "FRAYM's Full Frame: end-to-end observation, direction and framing as one continuous engagement — from first signal to final frame.",
  },
];

export const serviceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

export const cases: CaseStudy[] = [
  {
    slug: "buono-tours",
    client: "Buono Tours",
    industry: "Tourism & DMCs",
    year: "2026",
    summary: "One sign. Three worlds. One meaning — building a cohesive digital identity for Red Sea experiences.",
    services: ["signal", "frame"],
    status: "closed",
    featured: true,
    personality: "incline",
    accent: "tape",
    coverImage: "/buono/hero-buono.png",
    galleryImages: [
      { src: "/buono/hero-buono.png", caption: "BUONO_001 — brand identity" },
      { src: "/buono/Beige Elegant Grid Coming Soon Promotion Instagram Post.png", caption: "BUONO_002 — digital presence" },
      { src: "/buono/ChatGPT Image Aug 2, 2026, 01_22_17 PM.png", caption: "BUONO_003 — red sea moments" },
      { src: "/buono/ChatGPT Image Aug 2, 2026, 01_48_29 PM.png", caption: "BUONO_004 — destination storytelling" },
      { src: "/buono/2.png", caption: "BUONO_005 — three worlds" },
    ],
    brief:
      "Created specifically for Italian travelers who want far more than standard sightseeing. Buono Tours delivers authentic Red Sea adventures — from diving and snorkeling to immersive desert safaris. What it lacked was a cohesive digital presence that could make local expertise fully visible, recognizable, and trusted long before arrival in Egypt.",
    observe:
      "Travelers wanting to discover and book excursions online faced fragmented information and generic operators. Buono Tours possessed deep local knowledge of the Red Sea but needed to translate that trust into digital touchpoints. The core question: How do we make travelers feel a sense of familiarity and local belonging before they even land in Egypt? Looking far beyond the destinations themselves to uncover the full spectrum of destination storytelling — spontaneous activities, shared meals, laughter by the campfire, and personal connections with local guides.",
    impact:
      "Built around the unifying concept: 'One Sign. Three Worlds. One Meaning.' A powerful symbol that brings together universal signals across different languages, bridging the gap between foreign visitors and local hospitality. Photography became candid, warm, and documentary-style, highlighting human relationships and real moments.",
    quote: {
      text: "Live the moments. Tell stories for years.",
      author: "Buono Tours",
      role: "Hurghada & Red Sea Experiences",
    },
    metrics: [
      { value: "3", label: "worlds united under one sign" },
      { value: "100%", label: "local expertise made visible" },
      { value: "1", label: "cohesive digital identity" },
    ],
    tags: ["Brand Identity", "Destination Storytelling", "Digital Presence"],
  },
  {
    slug: "sea-soul",
    client: "Sea Soul",
    industry: "Travel & Tourism",
    year: "2025 – 2026",
    summary: "A local soul for those who travel further.",
    services: ["signal", "frame"],
    status: "closed",
    featured: true,
    personality: "incline",
    accent: "tape",
    coverImage: "/sea-soul/hero-sea-soul.png",
    galleryImages: [
      { src: "/sea-soul/hero-sea-soul.png", caption: "SEASOUL_001 — logo system" },
      { src: "/sea-soul/ChatGPT Image Jun 19, 2026, 12_05_57 PM.png", caption: "SEASOUL_002 — brand identity" },
      { src: "/sea-soul/ChatGPT Image Jun 21, 2026, 05_05_32 AM.png", caption: "SEASOUL_003 — service architecture" },
      { src: "/sea-soul/ChatGPT Image Jun 21, 2026, 10_06_14 AM.png", caption: "SEASOUL_004 — digital applications" },
      { src: "/sea-soul/ChatGPT Image Jun 21, 2026, 10_01_04 AM.png", caption: "SEASOUL_005 — stationery & brand in use" },
      { src: "/sea-soul/Sunny Boat Memories in Hurghada.png", caption: "SEASOUL_006 — one boat, countless memories" },
    ],
    videos: [
      {
        src: "/sea-soul/sea-soul-reel-01.mov",
        caption: "SEASOUL_REEL_01 — landscape cut",
        format: "1920×1080 · 16:9",
        orientation: "landscape",
      },
      {
        src: "/sea-soul/sea-soul-reel-02.mov",
        caption: "SEASOUL_REEL_02 — vertical cut",
        format: "1080×1920 · 9:16",
        orientation: "portrait",
      },
    ],
    brief:
      "Sea Soul is the person you wish you knew before arriving. A trusted, German-speaking partner on the Red Sea—from airport arrival and hotel transfers to private boat excursions, diving adventures, desert safaris, and everything in between. Client Brief & Operational Background: The client was already operating a full-scale ground operation in Hurghada and across the Red Sea region. Their daily capabilities encompassed managing seamless private airport transfers, comprehensive hotel coordination, curated desert and sea excursions, and professional private guided tours.",
    observe:
      "While the operational machinery existed and performed reliably, the business possessed virtually no public-facing brand presence. Absence of DACH-Specific Presence: No localized, German-language touchpoints or curated communication channels existed to welcome travelers prior to departure. Discovery & Trust Barrier: No clear, credible route existed for prospective independent travelers to discover, evaluate, and trust the operator before landing. Concierge Dependency: Most bookings were vulnerable to on-the-ground concierge gatekeeping and third-party hotel commission structures rather than direct relationship equity. Invisibility in the Market: Despite high-caliber private services, the company remained practically invisible in a crowded marketplace dominated by mass tour brokers. Strategic Core Question: “How do we make a traveler feel like they already have a trusted, insider contact on the ground before they even board their flight?”",
    impact:
      "Strategic Pillars & Brand Tenets. Trust & Native Language: Direct German-speaking coordination (DACH standard) delivering immediate clarity, precision, and confidence. Authenticity vs. Mass Packaging: Moving beyond one-size-fits-all excursion buses into genuine local connection and tailored private experiences. Restraint vs. Noise: Clean, calm, premium communication replacing loud, aggressive street-vendor marketing. Arrive & Belong: Transforming the client journey from a transactional tour purchase into an organic feeling of arriving to meet a local friend. Strategic Outcome: From Operator to Brand. The engagement successfully translated operational ground excellence into a defined, cohesive lifestyle travel brand. By establishing distinct brand principles and customer touchpoints, Sea Soul evolved from an unbranded local supplier into a sought-after boutique travel companion for discerning European visitors.",
    quote: {
      text: "We show you the Red Sea as it really is.",
      author: "Sea Soul",
      role: "Hurghada · Red Sea · Egypt",
    },
    metrics: [
      { value: "6", label: "service lines, one idea" },
      { value: "1", label: "local contact, entire journey" },
      { value: "DACH", label: "Germany · Austria · Switzerland" },
    ],
    tags: [
      "Brand Strategy",
      "Positioning",
      "Visual Identity & Creative Direction",
      "Service Architecture",
      "Go-to-Market Strategy",
    ],
  },
  {
    slug: "ruff",
    client: "RUFF",
    industry: "Streetwear",
    year: "2026",
    summary: "A pack mentality, built into a mark — streetwear identity for a brand that doesn't follow the culture.",
    services: ["signal", "frame"],
    status: "in-progress",
    featured: true,
    personality: "eccentric",
    accent: "signal",
    coverImage: "/ruff/ChatGPT Image Mar 11, 2026 at 01_44_10 AM.png",
    galleryImages: [
      { src: "/ruff/ChatGPT Image Mar 11, 2026 at 01_44_10 AM.png", caption: "RUFF_001 — lookbook, apparel on body" },
      { src: "/ruff/1016F5F8-C91D-4332-A568-09138A5A4B3B.PNG", caption: "RUFF_002 — brand guidelines, v1" },
      { src: "/ruff/60E44CE5-B0A5-4A84-8161-2E7CA8FA9BB6.PNG", caption: "RUFF_003 — brand guidelines, v1.0" },
      { src: "/ruff/B273492C-CAB3-4387-883F-33B432CB1229.PNG", caption: "RUFF_004 — brand guidelines, v2.0" },
      { src: "/ruff/ChatGPT Image Mar 11, 2026, 01_38_31 AM.png", caption: "RUFF_005 — campaign, social grid" },
      { src: "/ruff/Artboard 34.png", caption: "RUFF_006 — logomark" },
      { src: "/ruff/Artboard 4.png", caption: "RUFF_007 — colour palette" },
    ],
    brief:
      "RUFF is a streetwear brand built on bold attitude, raw energy and a pack mentality. The brief: an identity that doesn't follow the culture — it sets the tone. 'We don't follow the culture. We are the culture.'",
    observe:
      "The mark had to carry the attitude on its own, at logo size, before a single hoodie shipped. We built the logomark by fusing the letter R with a dog in profile — loyalty, instinct and quiet strength collapsed into one abstract shape — then locked it to a high-contrast palette (pink, electric blue, black) and a bold display face built to survive a chest print, a tag and a storefront sign at the same weight.",
    impact:
      "One system now runs across tees, hoodies, caps and bags, packaging, web and social — raw, high-contrast campaign photography carrying the same mark whether it's on a hoodie back, a shipping box or a phone screen. Still pre-launch: the campaign is running under 'Launching Soon.'",
    quote: {
      text: "We don't follow the culture. We are the culture.",
      author: "RUFF",
      role: "Streetwear",
    },
    metrics: [
      { value: "9", label: "sections, one brand system" },
      { value: "4", label: "product lines — tees, hoodies, caps, bags" },
      { value: "6", label: "core brand colours" },
    ],
    tags: ["Brand Identity", "Streetwear", "Campaign Photography"],
  },
  {
    slug: "dooh",
    client: "EL DOOH",
    industry: "Furniture",
    year: "2026",
    summary: "A third generation, translated for today.",
    services: ["frame"],
    status: "closed",
    featured: false,
    personality: "casualist",
    accent: "moss",
    coverImage: "/dooh/Artboard 5.png",
    galleryImages: [
      { src: "/dooh/hero-dooh.png", caption: "DOOH_001 — furniture for generations" },
      { src: "/dooh/Artboard 5.png", caption: "DOOH_002 — logo, dark" },
      { src: "/dooh/Artboard 6.png", caption: "DOOH_003 — logo, light" },
      { src: "/dooh/ChatGPT Image Jul 1, 2026, 09_30_21 PM.png", caption: "DOOH_004 — three generations. one legacy." },
      { src: "/dooh/ChatGPT Image Jul 1, 2026, 11_50_58 PM.png", caption: "DOOH_005 — from hand to hand, the story remains" },
      { src: "/dooh/j.dooh.png", caption: "DOOH_006 — market read" },
      { src: "/dooh/002538f20531a4dd7480db3fc4556fe3.jpg", caption: "DOOH_007 — visual reference" },
      { src: "/dooh/30afc4807ef01805feae55ba39114859.jpg", caption: "DOOH_008 — visual reference" },
      { src: "/dooh/40a34de25251ad1b693c7003b706657f.jpg", caption: "DOOH_009 — visual reference" },
    ],
    brief:
      "El Dooh continues a family workshop built by hand — carrying forward the craft, permanence and care that made it last, while adapting it for a generation that moves between apartments, cities and chapters of life. El Dooh is not a new furniture brand built around heritage. It is a continuation. A granddaughter picking up her grandfather's actual workshop and asking what is worth keeping — and what needs to change. The answer isn't nostalgia. It is craftsmanship that moves. The Client: A third-generation furniture workshop, with pieces from the previous generation still standing in Egyptian homes decades later. The Situation: Furniture used to be built to outlive the people who bought it. Today, people move more — between apartments, cities and chapters of life. The challenge was to carry the durability and craftsmanship of the original workshop into that reality. The Brief: Build a contemporary brand without losing what made the original workshop matter. Keep the craft. Lose the weight. The Question: “How do you carry a legacy forward without living in the past?”",
    observe:
      "We looked at what actually made the legacy valuable: Three generations. One workshop. Furniture that lasts. But the market was divided between heavy ornamental heritage and contemporary furniture with little story behind it. El Dooh had another possibility: a real family history translated through a restrained, contemporary lens. Find: The furniture had already outlived its owners. Grandfather's pieces were still standing in homes across Egypt, holding years of ordinary life — mornings, arguments, weddings, families growing up. The opportunity wasn't to recreate the past. It was to make something that could last into the future. Keywords: Legacy · Craft · Adaptability · Permanence. Contrasts: Past / Present · Heritage / Contemporary · Permanence / Movement · Furniture / Life.",
    impact:
      "Frame — A Third Generation, Translated for Today. The brand doesn't say: “Things were better before.” It says: Homes change. People change. Good craftsmanship doesn't have to. And that becomes the central shift: From Heritage → To Continuation. Direct: The brand is built around four pillars. Legacy, Continued: The three-generation story as the spine. Craftsmanship That Moves: Durability adapted for a generation that moves. Furniture as Witness: The product isn't the hero. The life around it is. Quiet Editorial Confidence: A visual and verbal world closer to publishing and archives than traditional furniture showrooms. Outcome: From Furniture → What Stays. El Dooh becomes a brand about continuing something worth keeping — without freezing it in time. A workshop passed forward. A craft translated. Furniture built for lives that move. From hand to hand, the story remains. And the ambition is simple: to build the piece of furniture an Egyptian family is still living with thirty years from now.",
    quote: {
      text: "From hand to hand, the story remains.",
      author: "EL DOOH",
      role: "Egypt",
    },
    metrics: [
      { value: "3", label: "generations, one workshop" },
      { value: "4", label: "brand pillars" },
      { value: "4", label: "keywords, one legacy" },
    ],
    tags: ["Positioning", "Brand Strategy", "Identity", "Art Direction"],
  },
  {
    slug: "gomam",
    client: "Gomam Hostel",
    industry: "Hospitality / Hostel",
    year: "2026",
    summary: "Gomam is more than a hostel. It is the place between where you came from and where you're going — where travelers pause, connect, and somehow end up staying longer than they planned.",
    services: ["full-frame"],
    status: "closed",
    featured: false,
    personality: "incline",
    accent: "moss",
    coverImage: "/gomam/hero-gomam.png",
    galleryImages: [
      { src: "/gomam/hero-gomam.png", caption: "GOMAM_001 — logo" },
      { src: "/gomam/Artboard 10.png", caption: "GOMAM_002 — arabic & english wordmark" },
      { src: "/gomam/Artboard 11.png", caption: "GOMAM_003 — you'll never know how long you are staying" },
      { src: "/gomam/Artboard 4.png", caption: "GOMAM_004 — colour palette" },
      { src: "/gomam/ChatGPT Image Jun 5, 2026, 02_24_41 PM.png", caption: "GOMAM_005 — brand identity board" },
      { src: "/gomam/ChatGPT Image Jun 16, 2026, 01_33_59 AM.png", caption: "GOMAM_006 — social media" },
      { src: "/gomam/ChatGPT Image Jun 5, 2026, 02_26_10 PM.png", caption: "GOMAM_007 — mascot system" },
      { src: "/gomam/ChatGPT Image Jun 2, 2026, 06_06_26 AM.png", caption: "GOMAM_008 — mascot studies" },
      { src: "/gomam/Screenshot 2026-06-05 at 11.08.22 AM.png", caption: "GOMAM_009 — identity exploration" },
    ],
    videos: [
      {
        src: "/gomam/gomam-reel-01.mov",
        caption: "GOMAM_REEL_01 — vertical cut",
        format: "1080×1920 · 9:16",
        orientation: "portrait",
      },
      {
        src: "/gomam/gomam-reel-02.mp4",
        caption: "GOMAM_REEL_02 — vertical cut",
        format: "720×1280 · 9:16",
        orientation: "portrait",
      },
      {
        src: "/gomam/gomam-reel-03.mp4",
        caption: "GOMAM_REEL_03 — vertical cut",
        format: "720×1280 · 9:16",
        orientation: "portrait",
      },
      {
        src: "/gomam/gomam-reel-04.mp4",
        caption: "GOMAM_REEL_04 — vertical cut",
        format: "576×1024 · 9:16",
        orientation: "portrait",
      },
      {
        src: "/gomam/gomam-reel-05.mp4",
        caption: "GOMAM_REEL_05 — vertical cut",
        format: "576×1024 · 9:16",
        orientation: "portrait",
      },
      {
        src: "/gomam/gomam-reel-06.mp4",
        caption: "GOMAM_REEL_06 — vertical cut",
        format: "480×848 · 9:16",
        orientation: "portrait",
      },
    ],
    brief:
      "Gomam is a passion project born from actually living inside the place. The identity wasn't designed from a brief alone. Every decision came from experiencing the hostel — its people, routines, conversations, activities and the relationships that continued long after guests left. What started as a place to stay became something much harder to define: a community people return to. The Client: A soulful hostel in Dahab built around travelers, shared experiences and the feeling of strangers becoming family. The Situation: The hostel was already offering more than a bed. People shared meals. Went hiking. Gathered around bonfires. Listened to live music. Played games. Celebrated birthdays. There was always something happening — and guests could even suggest what came next. The challenge was to make that feeling visible through the brand. The Brief: Create an identity around the real experience of Gomam — not as accommodation, but as a place where travelers connect, belong, and often find themselves coming back. The Question: “What if a hostel wasn't somewhere you stayed, but somewhere you became part of?”",
    observe:
      "The strongest part of Gomam wasn't the room. It was everything happening outside it. Shared meals. Stories. Hikes. Music. Bonfires. Spontaneous plans. People coming back. And eventually, some guests didn't just return as guests. They came back as volunteers. Find: Gomam wasn't creating stays. It was creating belonging. The “in-between” became more than a physical idea. It was the space between strangers and friends, guest and family, arriving and belonging. Keywords: Belonging · Community · Connection · Spontaneity. Contrasts: Stranger / Family · Guest / Local · Arrival / Return · Stay / Belong.",
    impact:
      "Frame — The In-Between: Gomam is the pause in the journey. The place where you don't know how long you're going to stay — because the experience keeps giving you reasons to stay another night, join another hike, share another meal, meet another person. You arrive as a traveler. You leave knowing you'll come back. Direct: The identity was built from the experience itself. Not polished hospitality. Not a generic backpacker aesthetic. But the warmth, imperfection and spontaneity of a place where people are the identity. The brand becomes a reflection of the community: People → Stories → Activities → Rituals → Belonging. Outcome: From Hostel → Community. Gomam becomes positioned around something accommodation alone can't offer: a place you can belong to, even when you're only passing through. The result isn't simply a visual identity for a hostel. It's a brand built around the behaviour already happening there: People arrive. People connect. People leave. People come back. Some even return as part of the place itself.",
    quote: {
      text: "You'll never know how long you are staying.",
      author: "Gomam Hostel",
      role: "Dahab, South Sinai",
    },
    metrics: [
      { value: "4", label: "keywords, one belonging" },
      { value: "4", label: "contrasts, stranger → family" },
      { value: "5", label: "steps, people → belonging" },
    ],
    tags: ["Brand Strategy", "Concept", "Identity", "Art Direction"],
  },
  {
    slug: "taidup",
    client: "TAIDUP",
    industry: "Travel & Experiences",
    year: "2026",
    summary: "The Red Sea, your way.",
    services: ["full-frame"],
    status: "in-progress",
    featured: false,
    personality: "eccentric",
    accent: "plum",
    coverImage: "/taidup/hero-tidup.png",
    galleryImages: [
      { src: "/taidup/hero-tidup.png", caption: "TAIDUP_001 — brand system" },
      { src: "/taidup/26FBF85C-70B0-4FFB-993A-9ADFA5B2D5B6.PNG", caption: "TAIDUP_002 — your perfect day at sea starts here" },
      { src: "/taidup/B525B255-EEAA-4AE4-952B-20AECA8F9CD1.PNG", caption: "TAIDUP_003 — good days, salty hair, clear mind" },
      { src: "/taidup/9EB02F65-55F9-44A1-BCD6-8913F8A6E4B3.PNG", caption: "TAIDUP_004 — sunset hits different here" },
      { src: "/taidup/57BEBF5D-BA33-4EEF-A340-A37649636692.PNG", caption: "TAIDUP_005 — sunset hits different" },
      { src: "/taidup/DC66D157-60E5-4087-BB46-1CB23C3EA5B6.PNG", caption: "TAIDUP_006 — sunsets are better here" },
      { src: "/taidup/D62EA65F-7A13-4836-930D-2C96616BE91C.PNG", caption: "TAIDUP_007 — here for the fruit, staying for the view" },
      { src: "/taidup/aac52e20-6c9c-44ac-bea3-f24b233bb607.JPG", caption: "TAIDUP_008 — the boat" },
      { src: "/taidup/4c7d1004-bc07-465f-9f34-f59eb6f92862.JPG", caption: "TAIDUP_009 — red sea, from above" },
      { src: "/taidup/6f58d12e-eeaa-45ea-873b-2152b5e2a25d.JPG", caption: "TAIDUP_010 — private charter" },
    ],
    videos: [
      {
        src: "/taidup/tidup-reel-01.mov",
        caption: "TAIDUP_REEL_01 — vertical cut",
        format: "1080×1920 · 9:16",
        orientation: "portrait",
      },
      {
        src: "/taidup/tidup-reel-02.mov",
        caption: "TAIDUP_REEL_02 — tai'd up",
        format: "1080×1920 · 9:16",
        orientation: "portrait",
      },
      {
        src: "/taidup/tidup-reel-03.mov",
        caption: "TAIDUP_REEL_03 — hey, hey",
        format: "1080×1920 · 9:16",
        orientation: "portrait",
      },
      {
        src: "/taidup/tidup-reel-04.mov",
        caption: "TAIDUP_REEL_04 — love birds",
        format: "1080×1920 · 9:16",
        orientation: "portrait",
      },
      {
        src: "/taidup/tidup-reel-05.mov",
        caption: "TAIDUP_REEL_05 — details, close ups",
        format: "1080×1920 · 9:16",
        orientation: "portrait",
      },
    ],
    brief:
      "It is more than the boat. It is the day built around it. A distinctive private speedboat experience grounded in quality, privacy, and community across the Red Sea. Client Brief: The client operated a private marine excursion and speedboat service with a vessel and product offering that already stood apart visually from standard charters in the category. The brief: refine the existing identity without losing its character, then build a stronger brand and content direction around what already made TAIDUP different.",
    observe:
      "While the physical vessel and on-water product possessed high craft and genuine character, the brand's digital presence and positioning needed to catch up. The Red Sea excursion market was crowded with homogeneous operators using identical language, mass-broker templates, and aggressive street/online sales tactics. The challenge was to translate the raw physical product into a distinctive brand without diluting its innate personality, giving it a commanding voice and elevating it into a category of one. Observation Areas: competitor offerings and mass package saturation; private guest behaviour and desire for autonomy; local marine culture and maritime authenticity. Insight: Having a point of view is rare in this market—living by one makes you unmistakable. We found brand opportunity in every single detail of how the day unfolds. Guiding Strategic Question: “How do we make the experience feel as elevated and memorable online as it is in real life out on the water?”",
    impact:
      "Core Keywords & Pillars. Day, Not Product: focusing on the complete day-long ritual. People: the crew, the guests, and personal service. Red Sea Experience: authentic connection to the marine environment. Memory / Character: unique brand voice vs. generic boat rental. Private / Personal: custom freedom vs. crowded package excursions. Outcome: From Story to System. Transitioned the business from selling an individual asset (a boat rental) to stewarding an end-to-end curated day on the water. Defined brand guidelines shaping how Taidup shoots, writes, schedules, and presents across every channel. Implemented an art-directed content calendar: “See You Out There.”",
    quote: {
      text: "See you out there.",
      author: "TAIDUP",
      role: "Hurghada, Egypt",
    },
    metrics: [
      { value: "5", label: "core keywords & pillars" },
      { value: "6", label: "observation areas read" },
      { value: "1", label: "curated day, end to end" },
    ],
    tags: [
      "Brand Strategy & Narrative",
      "Visual Identity Refinement",
      "Content Strategy & Art Direction",
      "Creative Campaign Direction",
      "Social Media & Community Architecture",
    ],
  },
  {
    slug: "vele",
    client: "VELE",
    industry: "Food & Hospitality",
    year: "2026",
    summary: "The warmth of solitude, in every cup — a coastal coffee shop identity built on lingering moments and heritage.",
    services: ["signal", "frame"],
    status: "closed",
    featured: false,
    personality: "casualist",
    accent: "terracotta",
    coverImage: "/vele/ChatGPT Image Jun 16, 2026, 01_45_37 AM.png",
    galleryImages: [
      { src: "/vele/ChatGPT Image Jun 16, 2026, 01_45_37 AM.png", caption: "VELE_001 — packaging & applications" },
      { src: "/vele/a098f6aa-66cc-4520-9ae8-676cff1f4f37.png", caption: "VELE_002 — brand board & mascot" },
      { src: "/vele/4992025a-4e54-4701-930b-dbf2e8f79a65.png", caption: "VELE_003 — brand board & identity" },
      { src: "/vele/ChatGPT Image Jun 13, 2026, 12_40_14 AM.png", caption: "VELE_004 — coastal photography, moodboard" },
      { src: "/vele/ChatGPT Image Jun 13, 2026, 12_52_07 AM.png", caption: "VELE_005 — coastal photography, moodboard" },
      { src: "/vele/Artboard 4.png", caption: "VELE_006 — colour palette" },
      { src: "/vele/Artboard 14.png", caption: "VELE_007 — wordmark" },
    ],
    brief:
      "vēle vēle asked for an identity built around one idea: the warmth of solitude. A coastal coffee shop experience inspired by the in-between — where summer lingers and winter fades. Not a menu of specialty-coffee credentials, but a quiet tribute to heritage, memory and the beauty of being alone with a cup.",
    observe:
      "The brand essence was already named before we arrived: solitude, warmth, lingering moments, heritage, coastal, nostalgia, subtle luxury, simplicity, aftertaste. We read that list the way we read a brief — as a set of signals to build a mark from, not a mood to decorate around. The reference point wasn't another coffee shop; it was the melancholic beauty of Fairouz' songs, 'Rajat Shitwi' and 'Akhir Iam Sayfi' — heritage and memory, not caffeine culture.",
    impact:
      "A handwritten, looping wordmark drawn for warmth rather than polish, paired with an earthy coastal palette — terracotta, slate blue, deep maroon, cream. The identity carries across bags, cups, a tote, business cards, coasters and the menu, all in one restrained, tactile system. 'Everyday is a coffee day, wherever life takes you.'",
    quote: {
      text: "Everyday is a coffee day, wherever life takes you.",
      author: "VELE",
      role: "Dahab, Sinai",
    },
    metrics: [
      { value: "9", label: "brand keywords, one idea" },
      { value: "7+", label: "applications, one identity" },
      { value: "2", label: "typefaces — Recoleta & Minya" },
    ],
    tags: ["Brand Identity", "Packaging Design", "Art Direction"],
  },
  {
    slug: "rockstar",
    client: "ROCKSTAR",
    industry: "Real Estate Marketing",
    year: "2024",
    summary: "A mark built from three moves — star, R, forward arrow — for a lead-generation agency that refuses to just look good.",
    services: ["signal", "frame"],
    status: "closed",
    featured: false,
    personality: "eccentric",
    accent: "frame",
    coverImage: "/rockstar/Artboard 8-80.jpg",
    galleryImages: [
      { src: "/rockstar/Artboard 8-80.jpg", caption: "ROCKSTAR_001 — final wordmark & lockup" },
      { src: "/rockstar/F520095C-1A44-4995-A94D-0A29A0684EE4.PNG", caption: "ROCKSTAR_002 — mark evolution & brand attributes" },
      { src: "/rockstar/ChatGPT Image Jul 11, 2026, 01_45_54 PM.png", caption: "ROCKSTAR_003 — identity guidelines, cover" },
      { src: "/rockstar/ChatGPT Image Jul 11, 2026, 02_04_52 PM.png", caption: "ROCKSTAR_004 — logo construction & geometry" },
      { src: "/rockstar/ChatGPT Image Jul 4, 2026, 04_44_55 PM.png", caption: "ROCKSTAR_005 — full brand system & applications" },
      { src: "/rockstar/ChatGPT Image Jul 9, 2026, 07_15_40 AM.png", caption: "ROCKSTAR_006 — vision & mission" },
      { src: "/rockstar/ChatGPT Image Jul 9, 2026, 07_28_56 AM.png", caption: "ROCKSTAR_007 — vision & mission, detail" },
      { src: "/rockstar/IMG_1259.jpg", caption: "ROCKSTAR_008 — icon mark study" },
    ],
    brief:
      "ROCKSTAR is a real estate lead-generation agency, not a real estate brand — creative for developers, brokers and social campaigns designed to be measured on leads, not likes. The brief: a mark that could carry that claim. 'We don't just create appealing visuals. We attract qualified leads.'",
    observe:
      "Real estate marketing decks all reach for the same shorthand — a skyline, a key, a handshake. We looked instead at what the agency actually sells: standing out (a star), the name (an R), and momentum (a forward arrow). Three shapes, one mark, built on a strict modular grid so it would hold up from a favicon to a 3-metre office sign.",
    impact:
      "The R, star and negative-space arrow lock into a single geometric mark with a full construction system — grid, optical corrections, minimum sizes, clear space and incorrect-usage rules — so the identity stays consistent whether it's on a business card, a proposal cover, a LinkedIn banner or office signage. Deep Violet carries authority and strategy; white carries clarity; the accent carries attention and action.",
    quote: {
      text: "We don't just create appealing visuals. We attract qualified leads.",
      author: "ROCKSTAR",
      role: "Real Estate Marketing Agency",
    },
    metrics: [
      { value: "3", label: "shapes, one mark — star, R, arrow" },
      { value: "24X", label: "logo built on a fixed modular grid" },
      { value: "6+", label: "applications, one system" },
    ],
    tags: ["Brand Identity", "Logo Design", "Visual Identity System"],
  },
];

export const caseBySlug = (slug: string): CaseStudy | undefined =>
  cases.find((c) => c.slug === slug);

export const industries = [
  "All Industries",
  "Home & Living",
  "Travel & Tourism",
  "Finance",
  "Furniture",
  "Food & Hospitality",
  "Travel & Experiences",
  "Hospitality / Hostel",
  "Real Estate Marketing",
  "Streetwear",
];

export const clientLogos = [
  "Buono Tours",
  "Sea Soul",
  "RUFF",
  "EL DOOH",
  "Gomam",
  "TAIDUP",
  "VELE",
  "Aurelia",
  "Marlowe",
  "Salon 64",
  "Bluff & Co.",
  "Terzo",
  "ROCKSTAR",
];

export const team = [
  { name: "Ada Mercer", role: "Founding Observer", note: "Sees the room twice." },
  { name: "Jon Bell", role: "Director of Direction", note: "Rehearses on paper." },
  { name: "Lena Okafor", role: "Head of Frame", note: "Kills the retouch." },
  { name: "Theo Marais", role: "Senior Signal Reader", note: "Lives in the comments." },
  { name: "Yuki Sato", role: "Producer of Cases", note: "Holds the spine." },
  { name: "Rafael Nunes", role: "Editor & Frame Finisher", note: "Cuts to the bone." },
];

export const beliefs = [
  "Attention is a material. We handle it with the same care as film.",
  "Perception is never accidental. It is designed.",
  "The best frame includes what the client means — and excludes what the market is tired of.",
  "Observation before opinion. Reading before recommendation.",
  "A still is a decision. A film is a sequence of them.",
  "The quiet detail is where perception is actually won.",
];

export const values = [
  { icon: "eye", label: "Observation" },
  { icon: "ruler", label: "Precision" },
  { icon: "compass", label: "Direction" },
  { icon: "grid", label: "Systems" },
  { icon: "hand", label: "Craft" },
  { icon: "spark", label: "Intensity" },
];

export const traits = [
  {
    title: "Observant",
    detail: "You read the room before you read the brief — and then you read the brief twice.",
  },
  {
    title: "Thoughtful",
    detail: "You can say a hard thing kindly and a complex thing simply.",
  },
  {
    title: "Structured",
    detail: "You keep your hands steady on set and your sentences short in the edit.",
  },
  {
    title: "Passionate",
    detail: "You care about the frame nobody will notice — because you will notice it.",
  },
];

export const positions = [
  { title: "Observer, Signal System", team: "Signal", type: "Full-time", location: "Copenhagen / Hybrid", status: "Open" },
  { title: "Director, Direct System", team: "Direct", type: "Full-time", location: "Copenhagen / On-set", status: "Open" },
  { title: "Frame Finisher (Retoucher / Colour)", team: "Frame", type: "Full-time", location: "Remote (EU)", status: "Open" },
  { title: "Producer of Cases", team: "Studio", type: "Full-time", location: "Copenhagen", status: "Paused" },
  { title: "Junior Observer — Internship", team: "Signal", type: "6 months", location: "Copenhagen", status: "Open" },
];

export const journalPosts = [
  {
    slug: "perception-is-never-accidental",
    title: "Perception Is Never Accidental. It Is Designed.",
    category: "Manifesto",
    date: "June 2026",
    readTime: "6 min",
    excerpt:
      "Why FRAYM stopped describing itself as an agency and started describing itself as a studio — and why the distinction changes the work.",
  },
  {
    slug: "the-room-reads-back",
    title: "The Room Reads Back: Notes on Observation",
    category: "Method",
    date: "April 2026",
    readTime: "8 min",
    excerpt:
      "Observation is not a phase before the work. It is the work. A field journal from three case files.",
  },
  {
    slug: "on-framing-what-you-omit",
    title: "On Framing What You Omit",
    category: "Craft",
    date: "February 2026",
    readTime: "5 min",
    excerpt:
      "The frame is defined by its edges. What we leave out of the image is often the actual argument.",
  },
  {
    slug: "directing-the-accident",
    title: "Directing the Accident",
    category: "Method",
    date: "December 2025",
    readTime: "7 min",
    excerpt:
      "We rehearse everything so that the happy accident has a place to land. A short essay on prepared spontaneity.",
  },
  {
    slug: "the-shelf-is-a-stage",
    title: "The Shelf Is a Stage",
    category: "Observation",
    date: "October 2025",
    readTime: "4 min",
    excerpt:
      "Field notes from four supermarkets and a perfume counter: how packaging performs when nobody is performing.",
  },
];

export const contact = {
  email: "thisisfraym@gmail.com",
  careers: "thisisfraym@gmail.com",
  phone: "+20 103 294 4616",
  address: ["Hurghada & El Gouna", "Red Sea, Egypt"],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Vimeo", href: "https://vimeo.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
};
