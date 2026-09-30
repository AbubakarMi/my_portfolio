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

/**
 * Page title. Kept under ~580px (~55 chars) so Google shows it in full rather
 * than truncating. BizScan360 is carried by META_DESCRIPTION instead — there
 * is not room for both company names inside the pixel budget.
 */
export const PAGE_TITLE = 'Muhammad Idris Abubakar | Lead Developer at Kredinou';

/**
 * Longer prose form. Used in JSON-LD `description`, where length is not
 * penalised. Do NOT use this as the meta description — see META_DESCRIPTION.
 */
export const SHORT_BIO =
  'Muhammad Idris Abubakar is a Lead Developer at Kredinou and BizScan360, and a software engineer and mobile app developer with 5+ years building secure, scalable systems across fintech, healthcare, government and SaaS. He is currently a Software Engineer at Book Direct and the founder of Forge.';

/**
 * Meta description. Google truncates snippets at roughly 160 characters, so
 * this is deliberately shorter than SHORT_BIO and front-loads the full name —
 * the term people actually search for.
 */
export const META_DESCRIPTION =
  'Muhammad Idris Abubakar — Lead Developer at Kredinou and BizScan360, building secure fintech, AI healthcare and SaaS systems.';

/**
 * Profiles that belong to the same person. This array is the single most
 * important SEO signal on the site: it is what fuses the portfolio, GitHub,
 * LinkedIn and X into one entity in Google's Knowledge Graph.
 */
export const GITHUB_URL = 'https://github.com/AbubakarMi';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/muhammad-idris-abubakar-1853752a5';
export const X_URL = 'https://x.com/AbubakarM93064';

export const SAME_AS = [GITHUB_URL, LINKEDIN_URL, X_URL];

/** The downloadable CV served from /public. */
export const RESUME_PATH = '/Muhammad_Idris_Abubakar_CV.pdf';

export const EMPLOYERS = [
  { name: 'Kredinou', url: 'https://www.kredinou.com' },
  { name: 'BizScan360', url: 'https://bizscan360.com' },
  { name: 'Book Direct', url: 'https://bookdirect.ng' },
  { name: 'Forge', url: 'https://forgeapis.xyz' },
];

/**
 * Note: Google ignores the `keywords` meta tag entirely ("Google Search doesn't
 * use the keywords meta tag" — Google SEO Starter Guide). This is kept only
 * because Bing gives it minor weight. Do not expect it to affect Google rank.
 */
export const KEYWORDS = [
  'Muhammad Idris Abubakar',
  'Muhammad Idris Abubakar developer',
  'Muhammad Idris Abubakar Kredinou',
  'Muhammad Idris Abubakar BizScan360',
  'Abubakar Mi',
  'Lead Developer Kredinou',
  'Lead Developer BizScan360',
  'Nigerian software engineer',
  'software engineer Nigeria',
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
    'Web Development',
    'C# .NET',
    'ASP.NET Core',
    'Python',
    'Django',
    'Node.js',
    'Next.js',
    'React',
    'Flutter',
    'Laravel',
    'Mobile App Development',
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
