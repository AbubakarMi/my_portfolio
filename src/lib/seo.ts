/**
 * Single source of truth for identity and SEO strings.
 *
 * Search engines resolve a person into a single "entity" by finding the same
 * name, title and profile links repeated consistently across the web. Every
 * place that states who Muhammad is — page copy, metadata, JSON-LD — reads from
 * here so the signals never drift apart.
 */

export const SITE_URL = 'https://abubakarmi.netlify.app';

export const FULL_NAME = 'Muhammad Idris Abubakar';

/** Primary job title. Kept short — this is what shows in search result titles. */
export const JOB_TITLE = 'Lead Developer';

/** The one-line identity used under the h1 and in metadata. */
export const HEADLINE = 'Lead Developer at Kredinou & BizScan360 · Software Engineer';

export const SHORT_BIO =
  'Muhammad Idris Abubakar is a Lead Developer at Kredinou and BizScan360, and a software engineer with 4+ years building secure, scalable systems across fintech, AI healthcare and SaaS.';

/**
 * Profiles that belong to the same person. This array is the single most
 * important SEO signal on the site: it is what fuses the portfolio, GitHub,
 * LinkedIn and X into one entity in Google's Knowledge Graph.
 */
export const SAME_AS = [
  'https://github.com/AbubakarMi',
  'https://www.linkedin.com/in/muhammad-idris-abubakar',
  'https://x.com/AbubakarM93064',
];

export const EMPLOYERS = [
  { name: 'Kredinou', url: 'https://www.kredinou.com' },
  { name: 'BizScan360', url: 'https://bizscan360.com' },
];

export const KEYWORDS = [
  'Muhammad Idris Abubakar',
  'Muhammad Idris Abubakar developer',
  'Muhammad Idris Abubakar Kredinou',
  'Muhammad Idris Abubakar BizScan360',
  'Abubakar Mi',
  'Lead Developer Kredinou',
  'Lead Developer BizScan360',
  'Nigerian software engineer',
  'full-stack developer Nigeria',
  'backend developer .NET',
  'fintech developer Africa',
];

/** Absolute URL helper — required for canonicals and OG tags. */
export function absoluteUrl(path = ''): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * schema.org Person. Rendered as JSON-LD on every page.
 * `@id` is stable so other schema blocks can reference this same entity.
 */
export const personSchema = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: FULL_NAME,
  alternateName: ['Abubakar Mi', 'Muhammad Abubakar', 'M.I. Abubakar'],
  url: SITE_URL,
  image: absoluteUrl('/images/Muhammad.JPG'),
  jobTitle: JOB_TITLE,
  description: SHORT_BIO,
  email: 'mailto:abubakarmi131@gmail.com',
  nationality: { '@type': 'Country', name: 'Nigeria' },
  worksFor: EMPLOYERS.map((e) => ({
    '@type': 'Organization',
    name: e.name,
    url: e.url,
  })),
  knowsAbout: [
    'Software Engineering',
    'Backend Development',
    'Full-Stack Development',
    'C# .NET',
    'ASP.NET Core',
    'Python',
    'Django',
    'Node.js',
    'Next.js',
    'React',
    'TypeScript',
    'PostgreSQL',
    'Entity Framework Core',
    'REST API Design',
    'Fintech',
    'AI Healthcare Systems',
    'SaaS Architecture',
  ],
  sameAs: SAME_AS,
};
