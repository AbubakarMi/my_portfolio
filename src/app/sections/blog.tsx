
"use client"
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';
import { format } from 'date-fns';

export function Blog() {
  return (
    <section id="blog" className="bg-primary/5 py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Insights &amp; Reflections
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
            Sharing my thoughts on technology, software development, and entrepreneurship.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group block">
                <Card className="flex h-full flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
                  {post.image && (
                      <div className="overflow-hidden">
                        <Image
                            src={post.image.imageUrl}
                            alt={`Thumbnail for ${post.title}`}
                            width={800}
                            height={500}
                            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            data-ai-hint={post.image.imageHint}
                        />
                      </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <CardHeader className="p-0">
                      <CardTitle className="text-xl font-semibold leading-snug">
                         {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 pt-4">
                      <p className="text-foreground/80 line-clamp-3">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex-col items-start p-0 pt-6">
                        <div className="flex w-full items-center justify-between text-sm text-foreground/60">
                           <div className="flex items-center gap-2">
                             <User className="h-4 w-4" />
                             <span>M.I. Abubakar</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <time dateTime={post.date}>{format(new Date(post.date), "MMM d, yyyy")}</time>
                           </div>
                        </div>
                        <div className="pt-4 font-semibold text-primary transition-colors group-hover:text-accent">
                          Read More <ArrowRight className="ml-1 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
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
