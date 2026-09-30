"use client"
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, User, Clock, Tag, Sparkles } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/section-heading';

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
    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Separate featured post from regular posts
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section id="blog" ref={sectionRef} className="relative py-20 sm:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          eyebrow="Blog"
          title="Insights & reflections"
          description="Sharing my thoughts on technology, software development, and entrepreneurship."
        />

        {/* Featured Post */}
        {featuredPost && (
          <div className={cn(
            "mb-12 transition-all duration-1000 ease-out delay-100",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <Card className="overflow-hidden rounded-2xl border-border/70 bg-card shadow-sm transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-xl">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  {featuredPost.image && (
                    <div className="relative overflow-hidden">
                      <Image
                        src={featuredPost.image.imageUrl}
                        alt={`Thumbnail for ${featuredPost.title}`}
                        width={800}
                        height={600}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 aspect-video md:aspect-auto md:min-h-[400px]"
                        data-ai-hint={featuredPost.image.imageHint}
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Featured badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground shadow-lg">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-col justify-center p-6 md:p-10">
                    {/* Category & Reading time */}
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="secondary" className="rounded-full">
                        <Tag className="h-3 w-3 mr-1" />
                        {featuredPost.category}
                      </Badge>
                      <span className="flex items-center gap-1.5 text-xs text-foreground/50">
                        <Clock className="h-3 w-3" />
                        {featuredPost.readingTime} min read
                      </span>
                    </div>

                    <CardTitle className="text-2xl md:text-3xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors duration-300 mb-4">
                      {featuredPost.title}
                    </CardTitle>

                    <p className="text-foreground/60 leading-relaxed mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta info */}
                    <div className="flex items-center justify-between pt-6 border-t border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">M.I. Abubakar</p>
                          <div className="flex items-center gap-1.5 text-xs text-foreground/50">
                            <Calendar className="h-3 w-3" />
                            <time dateTime={featuredPost.date}>{format(new Date(featuredPost.date), "MMM d, yyyy")}</time>
                          </div>
                        </div>
                      </div>
                      <span className="inline-flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform duration-300">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className={cn(
          "grid grid-cols-1 gap-6 md:grid-cols-2 transition-all duration-1000 ease-out delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          {regularPosts.map((post, index) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="group block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="flex h-full flex-col overflow-hidden rounded-2xl border-border/70 bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-xl">
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

                    {/* Category & Reading time badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <Badge variant="secondary" className="rounded-full bg-background/90 backdrop-blur-sm shadow-sm">
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-foreground shadow-sm">
                        <Clock className="h-3 w-3" />
                        <span>{post.readingTime} min</span>
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

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
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
