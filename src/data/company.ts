/**
 * Company facts, taken from the SAV Construction company profile deck and the
 * director's corrections of 18 October 2026. Every theme reads from here, so
 * copy only ever has to be corrected once.
 */

export const company = {
  name: 'SAV Construction',
  legalName: 'Solid Assured Valued Construction Pvt. Ltd.',
  tagline: 'Solid · Assured · Valued',
  taglineWords: ['Solid', 'Assured', 'Valued'] as const,
  backedBy: 'Backed by UPCL',
  established: 1995,
  reEstablished: 2025,
  description:
    'Industrial and infrastructure contractor based in Indore, delivering pharmaceutical plants, industrial sheds and site development across India.',
  /** Sectors in the director's order; industrial work is the large majority. */
  sectors: ['Industrial', 'Pharmaceutical', 'Commercial', 'Institutional', 'Infrastructure', 'Residential'],
} as const;

/**
 * Clients know the company as UPCL, so the old name sits beside the SAV logo
 * wherever the brand appears.
 */
export const upcl = {
  name: 'United Project Construction Ltd.',
  short: 'UPCL',
  formerly: 'Formerly',
} as const;

export const contact = {
  phone: '+91 7970022422',
  phoneHref: 'tel:+917970022422',
  email: 'info@sav.construction',
  emailHref: 'mailto:info@sav.construction',
  offices: [
    {
      label: 'Registered office',
      lines: ['63, Amitesh Nagar, Scheme no. 59', 'Indore – 452012 (M.P.)'],
    },
    {
      label: 'Head office',
      lines: ['79/2/3, Sukhniwas Gram, Cat Road', 'Indore – 452013 (M.P.)'],
    },
  ],
} as const;

export const mission =
  'To deliver exceptional construction services that surpass client expectations through meticulous planning, timely execution, and unwavering integrity. We aim to create lasting value for our clients and community by leveraging our extensive resources, skilled workforce, and in-house capabilities in shuttering and scaffolding.';

export const vision =
  'To be a respected construction company known for our unwavering commitment to client satisfaction, ethical practices, and innovative solutions.';

export const pillars = [
  {
    title: 'Client-centric excellence',
    body: 'Ensuring every project is completed on time and exceeds client expectations, leaving no room for regret.',
  },
  {
    title: 'Strong community & resources',
    body: 'Using extensive resources and in-house capabilities, while fostering a family-like staff environment.',
  },
] as const;

/** A run of text inside a paragraph; `strong` runs are set in bold. */
export interface TextRun {
  readonly text: string;
  readonly strong?: boolean;
}

export const about = {
  lead: 'A multidisciplinary construction firm with expertise across the industrial, commercial, institutional, infrastructure and residential sectors.',
  /** Rendered as one paragraph; the `strong` runs are set in bold. */
  strength: [
    { text: 'Originally ' },
    { text: 'established in 1995', strong: true },
    { text: ' and re-established under its new identity in 2025, SAV continues to operate with the same ' },
    { text: 'trusted team, staff, machinery and equipment', strong: true },
    { text: ' that have built its strong reputation over the decades.' },
  ] satisfies readonly TextRun[],
  pullQuote:
    'Headquartered in Indore, the business capital of Central India, SAV is recognised for its commitment to quality, timely delivery and client satisfaction. Through innovative construction practices, precise design execution and efficient cost management, the company consistently transforms client visions into reality.',
} as const;

export interface Stat {
  readonly value: string;
  readonly label: string;
  readonly detail: string;
}

export const stats: readonly Stat[] = [
  { value: '$120M+', label: 'Revenue', detail: 'Reflecting our steady growth and stability in the industry' },
  { value: '70+', label: 'Successful global projects', detail: 'Delivered with our expertise' },
  { value: '30+', label: 'Years legacy', detail: 'Of excellence in various sectors' },
  { value: '100+', label: 'Community', detail: 'Of satisfied clients' },
];

export interface WhyPoint {
  readonly number: string;
  readonly title: string;
  readonly body: string;
  /** The point the director wants singled out on the page. */
  readonly highlight?: boolean;
}

/**
 * The director's seven differentiators, in the order set in the edit notes of
 * 21 Oct 2026: track record first, the in-house workshop second and
 * highlighted, the stock held in-house third.
 */
export const whySav: readonly WhyPoint[] = [
  {
    number: '01',
    title: 'Proven track record',
    body: 'Leading clients such as Alembic Pharmaceuticals, Gufic Biosciences, Dabur India and Welspun Industries have trusted us with their plants, and many come back to us for the next one.',
  },
  {
    number: '02',
    title: 'Our own formwork solutions',
    body: 'A continuous focus on innovation in construction practices, with high-quality formwork (shuttering) solutions made in our own in-house shuttering workshop.',
    highlight: true,
  },
  {
    number: '03',
    title: 'Materials held in-house',
    body: 'Large quantities of staging, shuttering and formwork materials in-house distinguish us from competitors and let us maintain progress without delays.',
  },
  {
    number: '04',
    title: 'Skilled technical team',
    body: 'A highly skilled technical team ensuring on-time, on-budget project delivery.',
  },
  {
    number: '05',
    title: 'Zero accidents',
    body: 'A zero-accident safety record across our major project sites.',
  },
  {
    number: '06',
    title: 'Reliable network',
    body: 'A dependable network of subcontractors, vendors and suppliers, ensuring smooth execution on every site.',
  },
  {
    number: '07',
    title: 'Ownership mindset',
    body: 'Known for a strong ownership mindset, our team consistently delivers with responsibility and commitment.',
  },
];

export const services = {
  intro:
    'Delivering comprehensive construction solutions tailored to diverse industrial and commercial needs, we specialise in high-quality infrastructure projects backed by expertise and innovation.',
  items: [
    'Textile, Pharma, Steel industries',
    'Industrial sheds & refineries',
    'Roads & development work',
    'Silos & storage structures',
    'Effluent & waste treatment plants',
    'Heavy machine foundations',
    'Power plants',
    'Flexible & rigid pavements',
    'Water retaining structures',
    'High rise, Residential, Commercial & Institutional buildings',
    'Testing, research & development laboratories',
  ],
} as const;

export const safety = {
  headlineValue: '0',
  headlineLabel: 'Accidents recorded across our major project sites.',
  compliance:
    'We ensure full compliance with legal requirements, including labour laws such as the Building & Other Construction Act, Minimum Wages Act, Child Labour Act and Equal Remuneration Act.',
  standards:
    'Following Standards on Occupational Safety & Health in the Construction Industry, India.',
  policy: [
    'Implementing and enforcing the use of Personal Protective Equipment (P.P.E.).',
    'Ensuring adequate safety measures for the installation, use, and removal of shuttering and scaffolding.',
    'Implementing proper barricading and delineation of construction sites.',
    'Enforcing adherence to safety protocols throughout construction operations.',
    'Providing safe access and work platforms for workers and supervisors.',
    'Offering accommodation for workers according to regulations.',
    'Ensuring proper arrangements for potable water supply for all workers.',
    'Providing separate sanitation facilities for male and female workers.',
    'Offering first aid and emergency response provisions.',
  ],
  environment: {
    scope: 'Land, water and air',
    items: [
      'Proper segregation, storage, and disposal of waste materials, including toxic and hazardous wastes, are ensured.',
      'Guarantee the proper and secure storage and stacking of construction materials.',
    ],
  },
} as const;

export const quality = {
  certification: 'ISO 9001:2015 (Quality Management System) Certified Firm',
  policy:
    "Quality is paramount in SAV's operations, shaping every facet of our work. Our skilled and dedicated workforce is instrumental in upholding rigorous standards, serving as both subjects of quality control and catalysts for enhancing quality across our operations.",
  measures: [
    'Appointing Quality Control Engineers based on their ability to deliver the required quality of work.',
    'Performing thorough qualification assessments of sub-units to ensure comprehensive quality across technical, managerial, service, and social aspects.',
    'Certifying operating workers, especially those in critical technical and specialised trades, through recognised institutions.',
    "Conducting training, discussions, and exchange activities to enhance staff's quality consciousness.",
    'Enforcing stringent on-site management systems and production discipline, adhering to standard operational technology and management practices.',
  ],
  tests: [
    'Soil investigation',
    'Plate load test',
    'Soil analysis (sampling)',
    'Compression test of concrete',
    'Durability test',
    'Compression test',
    'Fine & coarse aggregate tests',
  ],
  testsNote: 'And more, as specified by the client.',
} as const;

/** Line drawings for the stock ledger, see `components/YardIcon.astro`. */
export type YardIconName = 'shuttering' | 'scaffolding' | 'tools' | 'vehicles';

export const warehouse = {
  note: 'A 5-acre warehouse and yard in Indore',
  acres: '5 acres',
  items: [
    { value: '3.5L sq.ft.', label: 'Of plywood and main steel shuttering', icon: 'shuttering' },
    { value: '1,800+ Mt', label: 'Of scaffolding with cup-lock systems', icon: 'scaffolding' },
    { value: '200+', label: 'Small machinery & tools', icon: 'tools' },
    { value: '60+', label: 'Construction vehicles', icon: 'vehicles' },
  ],
} as const;

/** The in-house workshop, a key point for the director even without a photo. */
export const workshop = {
  title: 'Our own formwork workshop',
  body: 'We have our own workshop in the yard, where we make shuttering material and formwork solutions for our sites.',
} as const;

/**
 * The current-work sheet: what is on site now and the completed work clients
 * ask about first. Listed as the director wrote it.
 */
export const currentWork = {
  ongoing: [
    { name: 'Sava Healthcare', scope: 'Pharmaceutical plant', area: '3,50,000 sq ft + site development', location: 'SIP, Pithampur' },
    { name: 'Worth Wellness Industries', scope: 'Industrial plant', area: '3,00,000 sq ft + site development', location: 'Machal, Indore' },
    { name: 'Lupin Limited', scope: 'Pharmaceutical plant', area: '1,20,000 sq ft + site development', location: 'Mandideep, Bhopal' },
    { name: 'Gufic Biosciences', scope: 'Security building, boundary wall and site development', area: '6,50,000 sq ft site', location: 'SIP, Pithampur' },
    { name: 'Jyothy Labs', scope: 'Warehouse building in a running plant', location: 'Pithampur' },
    { name: 'Welspun Group', scope: 'Research and advanced lab industrial building, and other works', location: 'Anjar, Gujarat' },
  ],
  completed: [
    { name: 'Alembic Pharmaceuticals', location: 'Pithampur, Madhya Pradesh' },
    { name: 'Gufic Pharmaceuticals', location: 'Pithampur, Madhya Pradesh' },
    { name: 'Dabur India Limited', location: 'Industrial project' },
    { name: 'Welspun Industries', location: 'Gujarat' },
    { name: 'Unichem Laboratories', location: 'Pharmaceutical project' },
  ],
} as const;

export const culture = {
  intro:
    "At SAV, we understand the importance of adapting to evolving demands and maintaining professionalism in today's competitive environment. Our work culture reflects our commitment to excellence and collaboration.",
  points: [
    'We believe in the power of teamwork to drive success. By fostering trust and positivity through collective efforts, we create a highly motivated and result-oriented environment.',
    'At SAV, we prioritise unity and respect, treating our staff as a valued part of our extended family. We celebrate our national heritage and traditions, including Vishwakarma Pooja and national holidays, while providing two daily meals to ensure the well-being of our team.',
  ],
} as const;
