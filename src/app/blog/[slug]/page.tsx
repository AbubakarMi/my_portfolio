
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/blog-data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { format } from 'date-fns';
import { Calendar, User } from 'lucide-react';

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
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <article className="pb-24 pt-12 sm:pb-32 sm:pt-16">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <header className="mb-12 space-y-4">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
                  {post.title}
              </h1>
              <p className="text-xl text-foreground/70">{post.excerpt}</p>
              <div className="flex items-center space-x-6 text-sm text-foreground/60">
                 <div className="flex items-center gap-2">
                   <User className="h-4 w-4" />
                   <span>Muhammad Idris Abubakar</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
                 </div>
              </div>
            </header>

            {post.image && (
              <div className="mb-12 overflow-hidden rounded-2xl shadow-xl">
                 <Image
                    src={post.image.imageUrl}
                    alt={post.title}
                    width={1200}
                    height={675}
                    className="aspect-video w-full object-cover"
                    priority
                  />
              </div>
            )}
            
            <div
              className="prose prose-lg mx-auto max-w-none text-foreground/90 prose-headings:font-headline prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-accent prose-strong:font-semibold prose-strong:text-foreground prose-ul:list-disc prose-ul:pl-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
