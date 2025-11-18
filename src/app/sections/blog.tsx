"use client"
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="blog" ref={sectionRef} className="relative bg-background py-24 sm:py-32">
      {/* Background decoration */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Blog
          </p>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Insights & Reflections
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/60">
            Sharing my thoughts on technology, software development, and entrepreneurship.
          </p>
        </div>

        {/* Blog Grid */}
        <div className={cn(
          "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 transition-all duration-1000 ease-out delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          {blogPosts.map((post, index) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="group block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border/50 transition-all duration-500 group-hover:shadow-2xl group-hover:ring-primary/30 group-hover:-translate-y-3 group-hover:scale-[1.02]" style={{ transformStyle: 'preserve-3d' }}>
                {/* Image */}
                {post.image && (
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.image.imageUrl}
                      alt={`Thumbnail for ${post.title}`}
                      width={800}
                      height={500}
                      className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint={post.image.imageHint}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/5" />

                    {/* Reading time badge */}
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-foreground shadow-sm">
                        <Clock className="h-3 w-3" />
                        <span>5 min read</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <CardHeader className="p-0">
                    <CardTitle className="text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1 p-0 pt-3">
                    <p className="text-sm text-foreground/60 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>

                  <CardFooter className="flex-col items-start p-0 pt-6 mt-auto">
                    {/* Meta info */}
                    <div className="flex w-full items-center justify-between text-xs text-foreground/50">
                      <div className="flex items-center gap-1.5">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-3 w-3 text-primary" />
                        </div>
                        <span className="font-medium">M.I. Abubakar</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={post.date}>{format(new Date(post.date), "MMM d, yyyy")}</time>
                      </div>
                    </div>

                    {/* Read more link */}
                    <div className="pt-4 w-full border-t border-border/50 mt-4">
                      <span className="inline-flex items-center text-sm font-medium text-primary group-hover:text-primary transition-colors">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </CardFooter>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
