import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Blog } from '@/app/sections/blog';
import { blogPosts } from '@/lib/blog-data';
import { FULL_NAME, SITE_URL, absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Blog — Engineering, Fintech & Building from Africa',
  description: `Articles by ${FULL_NAME} on software architecture, backend engineering, fintech and building technology products from Africa.`,
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    title: `Blog | ${FULL_NAME}`,
    description: `Articles by ${FULL_NAME} on software architecture, backend engineering, fintech and building technology products from Africa.`,
    url: absoluteUrl('/blog'),
  },
};

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE_URL}/blog#blog`,
  name: `${FULL_NAME} — Blog`,
  url: absoluteUrl('/blog'),
  author: { '@id': `${SITE_URL}/#person` },
  blogPost: blogPosts.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: absoluteUrl(`/blog/${post.slug}`),
    author: { '@id': `${SITE_URL}/#person` },
  })),
};

export default function BlogIndexPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Header />
      <main className="flex-1">
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
