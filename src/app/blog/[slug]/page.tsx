
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/blog-data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Muhammad Idris Abubakar`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <article>
          <header className="relative py-24 sm:py-32 bg-primary/5">
            {post.image && (
              <Image
                src={post.image.imageUrl}
                alt={post.title}
                fill
                className="object-cover object-center opacity-10"
              />
            )}
             <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    {post.title}
                </h1>
                <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/80">
                    {post.excerpt}
                </p>
             </div>
          </header>
          <div className="container mx-auto px-4 md:px-6 py-16 sm:py-24">
            <div
              className="prose prose-lg mx-auto max-w-4xl text-foreground/90 prose-headings:font-headline prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-accent prose-strong:font-semibold prose-strong:text-foreground prose-ul:list-disc prose-ul:pl-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
