import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import './globals.css';
import { AnalyticsProvider } from '@/components/analytics-provider';
import { GeistSans, GeistMono } from 'geist/font';
import { ScrollProgress } from '@/components/scroll-progress';
import { PortfolioChatbot } from '@/components/portfolio-chatbot';
import {
  FULL_NAME,
  HEADLINE,
  KEYWORDS,
  META_DESCRIPTION,
  PAGE_TITLE,
  SHORT_BIO,
  SITE_URL,
  SAME_AS,
  personSchema,
} from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGE_TITLE,
    template: `%s | ${FULL_NAME}`,
  },
  description: META_DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,
  applicationName: `${FULL_NAME} — Portfolio`,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'profile',
    siteName: `${FULL_NAME} — Portfolio`,
    title: `${FULL_NAME} | ${HEADLINE}`,
    description: META_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
    firstName: 'Muhammad',
    lastName: 'Abubakar',
    username: 'AbubakarMi',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${FULL_NAME} | ${HEADLINE}`,
    description: META_DESCRIPTION,
    creator: '@AbubakarM93064',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'technology',
};

/**
 * JSON-LD graph describing the site and its author. Kept as one @graph so the
 * Person entity is declared once and referenced by the WebSite/ProfilePage
 * nodes, which is what search engines expect.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    personSchema,
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${FULL_NAME} — Portfolio`,
      description: SHORT_BIO,
      publisher: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en',
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: `${FULL_NAME} — ${HEADLINE}`,
      about: { '@id': `${SITE_URL}/#person` },
      isPartOf: { '@id': `${SITE_URL}/#website` },
      inLanguage: 'en',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable, 'dark scroll-smooth')} suppressHydrationWarning>
      <head>
        {/* Dark is the default; apply a saved light preference before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.remove('dark')}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {SAME_AS.map((url) => (
          <link key={url} rel="me" href={url} />
        ))}
      </head>
      <body className={cn('font-body bg-background text-foreground antialiased overflow-x-hidden')}>
        {/* <AnalyticsProvider /> */}
        <ScrollProgress />
        {children}
        <PortfolioChatbot />
        <Toaster />
      </body>
    </html>
  );
}
