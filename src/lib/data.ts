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
    slug: "roofline-homeware",
    client: "Roofline",
    industry: "Home & Living",
    year: "2025",
    summary: "Reframing a furniture brand's identity from 'catalog' to 'still life'.",
    services: ["signal", "frame"],
    status: "closed",
    featured: true,
    personality: "casualist",
    accent: "frame",
    brief:
      "Roofline was selling excellent furniture through a catalog that made it look like everybody else's. The brief: make the products feel like the protagonist of a quiet film — not an item on a spreadsheet.",
    observe:
      "We read the category's endless 'clean white room' imagery and noticed something missing: life. People buy furniture to live in it. Every signal pointed to warmth, texture and imperfection as the gap nobody was occupying.",
    impact:
      "The Still Life campaign lifted add-to-cart intent by 31% and repositioned Roofline as a brand people photographed, not just bought from. Organic social reach tripled on launch imagery.",
    quote: {
      text: "FRAYM watched our products the way we never had. The brief came back like a photograph of something we'd always owned but never seen.",
      author: "Mara Klein",
      role: "Brand Director, Roofline",
    },
    metrics: [
      { value: "+31%", label: "add-to-cart intent" },
      { value: "3×", label: "organic reach" },
      { value: "94%", label: "on-brand delivery" },
    ],
    tags: ["Art Direction", "Campaign Photography", "Positioning"],
  },
  {
    slug: "northlight-craft-gin",
    client: "Northlight",
    industry: "Beverage",
    year: "2025",
    summary: "Directing a craft gin launch as a moody northern-noir film.",
    services: ["direct", "signal"],
    status: "closed",
    featured: true,
    personality: "incline",
    accent: "tape",
    brief:
      "Northlight asked for a launch film that made a cold-weather gin feel like a necessary winter ritual — not a seasonal gimmick.",
    observe:
      "The category was flooded with 'sun-drenched botanicals'. Winter was a gap. We observed that the brand's coastal heritage was its true asset, and framed the launch around silence, cold light and ritual.",
    impact:
      "The launch film held the #1 spot in the beverage category on launch week and the first production run sold through in eleven days.",
    quote: {
      text: "Every shot was deliberate. FRAYM directed a launch film like it was a proper film — because to the people it reached, it was.",
      author: "Jonas Reed",
      role: "Founder, Northlight",
    },
    metrics: [
      { value: "#1", label: "category on launch week" },
      { value: "11 days", label: "first run sold out" },
      { value: "4.2M", label: "launch film views" },
    ],
    tags: ["Brand Film", "Direction", "Cultural Insight"],
  },
  {
    slug: "atlas-finance",
    client: "Atlas",
    industry: "Finance",
    year: "2026",
    summary: "Making an investment firm sound human without sounding soft.",
    services: ["signal", "frame", "direct"],
    status: "in-progress",
    featured: true,
    personality: "eccentric",
    accent: "signal",
    brief:
      "Atlas wanted to stop being 'the gray bank'. The brief: a full-frame repositioning that made disciplined investing feel like quiet confidence rather than cold spreadsheet energy.",
    observe:
      "The sector's language was uniform — every firm claimed the same 'trust and growth'. We observed that clients trusted Atlas's people, not its logo, and built the entire case around that human evidence.",
    impact:
      "Campaign is mid-flight. Early observation labs show comprehension scores 22% above the sector benchmark for the new messaging system.",
    quote: {
      text: "FRAYM found the warmth in our numbers. That's not a thing a finance firm usually says about an agency.",
      author: "Priya Anand",
      role: "CMO, Atlas",
    },
    metrics: [
      { value: "+22%", label: "message comprehension" },
      { value: "4", label: "services in motion" },
      { value: "Q3", label: "full launch due" },
    ],
    tags: ["Full Frame", "Repositioning", "Brand Film"],
  },
  {
    slug: "hemera-apparel",
    client: "Hemera",
    industry: "Fashion",
    year: "2024",
    summary: "A casualist image system for a label that rejects gloss.",
    services: ["frame", "direct"],
    status: "closed",
    featured: false,
    personality: "casualist",
    accent: "moss",
    brief:
      "Hemera is deliberately unpolished. The brief was to build an image and motion system that looked 'made by hand, worn in, not Photoshopped'.",
    observe:
      "Luxury fashion was busy polishing itself into sameness. Hemera's audience responds to evidence — seams, sweat, fabric in motion. We directed a system around real texture and real movement.",
    impact:
      "The system's UGC-style brand language is now imitated across the category; Hemera's sell-through rate on campaign pieces ran 18% above average.",
    quote: {
      text: "They treated our roughness as the product, not the problem. That single decision changed the brand.",
      author: "Ida Broek",
      role: "Creative Lead, Hemera",
    },
    metrics: [
      { value: "+18%", label: "sell-through" },
      { value: "120+", label: "assets delivered" },
      { value: "0", label: "retouches on hero line" },
    ],
    tags: ["Image System", "Motion", "Art Direction"],
  },
  {
    slug: "verdant-appetite",
    client: "Verdant",
    industry: "Food & Hospitality",
    year: "2025",
    summary: "A photography system that makes plant-based food look full of appetite.",
    services: ["frame", "signal"],
    status: "closed",
    featured: false,
    personality: "incline",
    accent: "moss",
    brief:
      "Verdant's plant-based range kept getting framed as 'the virtuous option'. The brief: make it the hungry option.",
    observe:
      "The plant-based category photographs food as if apologizing for it. We studied how 'real' food is shot — greedily — and applied the same grammar to plants: char, gloss, steam, chaos.",
    impact:
      "Food imagery engagement rose 47% and the new system now benchmarks in the top tier of the category's appetite indexes.",
    quote: {
      text: "FRAYM shot our food like we'd stolen it. That's the highest compliment a food brand can receive.",
      author: "Tomas Ibarra",
      role: "Marketing Director, Verdant",
    },
    metrics: [
      { value: "+47%", label: "image engagement" },
      { value: "Top 5%", label: "appetite index" },
      { value: "9", label: "SKU launches framed" },
    ],
    tags: ["Campaign Photography", "Food Styling", "Insight"],
  },
  {
    slug: "kestrel-field-recording",
    client: "Kestrel",
    industry: "Technology",
    year: "2026",
    summary: "Turning field-recording hardware into a tool for poets of sound.",
    services: ["direct", "frame"],
    status: "in-progress",
    featured: false,
    personality: "eccentric",
    accent: "plum",
    brief:
      "Kestrel makes studio-grade field recorders used by sound designers, filmmakers and monks who record silence. The brief: a launch film and image set that speaks to all three without diluting any of them.",
    observe:
      "The tech category obsesses over specs. Kestrel's real story is about attention — the device rewards people who listen carefully. We're building the case around listening as a creative act.",
    impact:
      "Production is underway. The first teaser — a single minute of 'loud silence' — posted 180% above the brand's average reach.",
    quote: {
      text: "Our spec sheet was a prison. FRAYM found the door and wrote 'listen' on it.",
      author: "Sofia Lindqvist",
      role: "CEO, Kestrel",
    },
    metrics: [
      { value: "+180%", label: "teaser reach" },
      { value: "3", label: "shoots in production" },
      { value: "2026", label: "launch window" },
    ],
    tags: ["Brand Film", "Art Direction", "Launch"],
  },
  {
    slug: "cinder-coffee",
    client: "Cinder",
    industry: "Food & Hospitality",
    year: "2024",
    summary: "A signal-led identity that frames specialty coffee as a daily ritual, not an event.",
    services: ["signal", "frame"],
    status: "closed",
    featured: false,
    personality: "casualist",
    accent: "terracotta",
    brief:
      "Cinder roasts coffee most people can't afford to make wrong. The brief: a brand language that made specialty coffee feel like a habit, not a performance.",
    observe:
      "Specialty coffee brands sell expertise; Cinder's customers just want the good cup. The signal was obvious once observed: ritual beats credentials.",
    impact:
      "DTC conversion rose 26% and the launch system became the brand's visual shorthand across packaging, cups and countertops.",
    quote: {
      text: "They observed our customers better than we had in five years of sales data.",
      author: "Nadia Rahman",
      role: "Co-founder, Cinder",
    },
    metrics: [
      { value: "+26%", label: "DTC conversion" },
      { value: "5 yrs", label: "of habits studied" },
      { value: "40%", label: "repeat purchase lift" },
    ],
    tags: ["Positioning", "Identity", "Art Direction"],
  },
];

export const caseBySlug = (slug: string): CaseStudy | undefined =>
  cases.find((c) => c.slug === slug);

export const industries = [
  "All Industries",
  "Home & Living",
  "Beverage",
  "Finance",
  "Fashion",
  "Food & Hospitality",
  "Technology",
];

export const clientLogos = [
  "Roofline",
  "Northlight",
  "Atlas",
  "Hemera",
  "Verdant",
  "Kestrel",
  "Cinder",
  "Aurelia",
  "Marlowe",
  "Salon 64",
  "Bluff & Co.",
  "Terzo",
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
  email: "hello@fraym.studio",
  careers: "careers@fraym.studio",
  phone: "+45 20 41 90 00",
  address: ["Aaboulevard 28", "2200 Copenhagen N", "Denmark"],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Vimeo", href: "https://vimeo.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
};
