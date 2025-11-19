"use client";

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { format } from 'date-fns';
import { Calendar, User, Clock, ArrowLeft, Share2, Twitter, Linkedin, Facebook, Copy, Tag, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Reading progress indicator
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  if (!post) {
    notFound();
  }

  // Get related posts (same category or shared tags)
  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug)
    .filter(p => p.category === post.category || p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 2);

  // Share functions
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post.title;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link');
    }
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Reading progress bar - vertical on left side */}
      <div className="fixed left-0 top-0 bottom-0 z-50 w-1 bg-muted hidden md:block">
        <div
          className="w-full bg-gradient-to-b from-primary to-primary/80 transition-all duration-150 ease-out"
          style={{ height: `${readingProgress}%` }}
        />
      </div>
      {/* Mobile: horizontal progress bar at top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted md:hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <Header />
      <main className="flex-1">
        <article className="pb-24 pt-12 sm:pb-32">
          {/* Hero Image */}
          {post.image && (
            <div className="relative mb-12 h-[40vh] w-full md:mb-16 md:h-[50vh] overflow-hidden">
              <Image
                src={post.image.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

              {/* Back button */}
              <div className="absolute top-6 left-6">
                <Link href="/#blog">
                  <Button variant="secondary" size="sm" className="rounded-full shadow-lg backdrop-blur-sm bg-background/80 hover:bg-background">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blog
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <div className="container mx-auto -mt-24 max-w-4xl px-4 md:-mt-32 md:px-6">
            {/* Article Header */}
            <header className="mb-12 space-y-6">
              {/* Category and tags */}
              <div className="flex flex-wrap items-center gap-3 justify-center">
                <Badge className="rounded-full bg-primary text-primary-foreground">
                  <Tag className="h-3 w-3 mr-1" />
                  {post.category}
                </Badge>
                {post.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="font-headline text-3xl font-extrabold tracking-tight text-foreground text-center sm:text-4xl lg:text-5xl leading-tight">
                {post.title}
              </h1>

              {/* Meta info */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">Muhammad Idris Abubakar</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>

              {/* Share buttons */}
              <div className="flex items-center justify-center gap-2 pt-4">
                <span className="text-sm text-foreground/50 mr-2">Share:</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={shareOnTwitter}
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={shareOnLinkedIn}
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={shareOnFacebook}
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-9 w-9 rounded-full transition-colors",
                    copied ? "bg-green-500 text-white hover:bg-green-500" : "hover:bg-primary hover:text-primary-foreground"
                  )}
                  onClick={handleCopyLink}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </header>

            {/* Article Content */}
            <div
              className="prose prose-lg mx-auto max-w-none text-foreground/90
                prose-headings:font-headline prose-headings:text-foreground prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-strong:font-semibold prose-strong:text-foreground
                prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
                prose-li:text-foreground/80
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-foreground/70
                prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-muted prose-pre:rounded-xl prose-pre:p-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author Card */}
            <div className="mt-16 p-8 rounded-2xl bg-muted/50 ring-1 ring-border/50">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-headline text-lg font-bold text-foreground">Muhammad Idris Abubakar</h3>
                  <p className="text-sm text-foreground/60 mt-1">
                    Software & AI Evaluation Engineer | Founder of Nyra
                  </p>
                  <p className="text-sm text-foreground/70 mt-3 leading-relaxed">
                    I'm passionate about building scalable software and sharing insights on technology, entrepreneurship, and AI.
                  </p>
                </div>
              </div>
            </div>

            {/* Share CTA */}
            <div className="mt-12 p-6 rounded-2xl bg-primary/5 ring-1 ring-primary/20 text-center">
              <h3 className="font-headline text-lg font-bold text-foreground mb-2">Enjoyed this article?</h3>
              <p className="text-sm text-foreground/60 mb-4">Share it with your network and help others learn!</p>
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground"
                  onClick={shareOnTwitter}
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Tweet
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground"
                  onClick={shareOnLinkedIn}
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "rounded-full",
                    copied ? "bg-green-500 text-white hover:bg-green-500" : "hover:bg-primary hover:text-primary-foreground"
                  )}
                  onClick={handleCopyLink}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? 'Copied!' : 'Copy Link'}
                </Button>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="container mx-auto max-w-4xl px-4 md:px-6 mt-20">
              <div className="border-t border-border/50 pt-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-headline text-2xl font-bold text-foreground">Related Articles</h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="group block"
                    >
                      <Card className="h-full overflow-hidden rounded-xl bg-card shadow-sm ring-1 ring-border/50 transition-all duration-300 group-hover:shadow-lg group-hover:ring-primary/30 group-hover:-translate-y-1">
                        {relatedPost.image && (
                          <div className="relative overflow-hidden">
                            <Image
                              src={relatedPost.image.imageUrl}
                              alt={relatedPost.title}
                              width={400}
                              height={200}
                              className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3">
                              <Badge variant="secondary" className="rounded-full bg-background/90 backdrop-blur-sm text-xs">
                                {relatedPost.category}
                              </Badge>
                            </div>
                          </div>
                        )}
                        <div className="p-5">
                          <CardTitle className="text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors mb-2">
                            {relatedPost.title}
                          </CardTitle>
                          <p className="text-sm text-foreground/60 line-clamp-2 mb-4">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-foreground/50">
                            <span>{relatedPost.readingTime} min read</span>
                            <span className="inline-flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                              Read
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
