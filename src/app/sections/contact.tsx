"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Github, Linkedin, Mail, Phone, Twitter, Send, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { sendContactFormEmail } from '@/ai/flows/send-email-flow';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Your message should be at least 10 characters long."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function Contact() {
  const { toast } = useToast();
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-portrait');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

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

  async function onSubmit(data: ContactFormValues) {
    toast({
      description: (
        <div className="flex items-center gap-4">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt="Muhammad Idris Abubakar"
              width={64}
              height={64}
              className="rounded-full object-cover aspect-square"
            />
          )}
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Thank you, {data.name}!
            </p>
            <p className="text-sm text-muted-foreground">
              I've received your message and will reach out as soon as possible.
            </p>
          </div>
        </div>
      ),
    });
    form.reset();

    try {
      await sendContactFormEmail(data);
    } catch (error) {
      console.error("Failed to send email", error);
      toast({
        variant: "destructive",
        title: "Message failed to send",
        description: "There was a problem in the background. Please try again later.",
      });
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="relative bg-background py-24 sm:py-32">
      {/* Background decoration */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Get in Touch
          </p>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Let's Build Something Great
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/60">
            Have a project in mind, a question, or just want to connect? I'd love to hear from you.
          </p>
        </div>

        <Card className={cn(
          "overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border/50 transition-all duration-1000 ease-out delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="grid lg:grid-cols-5">
            {/* Left Side - Contact Info */}
            <div className="lg:col-span-2 bg-secondary p-8 md:p-10 lg:p-12 text-secondary-foreground">
              <div className="h-full flex flex-col">
                <div className="space-y-4 mb-8">
                  <h3 className="font-headline text-2xl font-bold sm:text-3xl">Contact Information</h3>
                  <p className="text-secondary-foreground/70 text-sm leading-relaxed">
                    Fill out the form, or get in touch using the details below. I look forward to connecting with you!
                  </p>
                </div>

                <div className="space-y-5 mb-8">
                  <a href="tel:+2347042526971" className="group flex items-center gap-4 text-sm transition-colors hover:text-primary">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Phone className="h-4 w-4" />
                    </div>
                    <span>+234 704 252 6971</span>
                  </a>
                  <a href="tel:+2347069163505" className="group flex items-center gap-4 text-sm transition-colors hover:text-primary">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Phone className="h-4 w-4" />
                    </div>
                    <span>+234 706 916 3505</span>
                  </a>
                  <a href="mailto:abubakarmi131@gmail.com" className="group flex items-center gap-4 text-sm transition-colors hover:text-primary">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span>abubakarmi131@gmail.com</span>
                  </a>
                  <div className="flex items-center gap-4 text-sm text-secondary-foreground/70">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span>Kano State, Nigeria</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-secondary-foreground/70">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Clock className="h-4 w-4" />
                    </div>
                    <span>Response within 24-48 hours</span>
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-white/10">
                  <p className="text-xs font-medium uppercase tracking-wider text-secondary-foreground/50 mb-4">Connect with me</p>
                  <div className="flex gap-3">
                    <Button asChild variant="outline" size="icon" className="h-10 w-10 rounded-xl bg-white/10 border-none hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                      <Link href="https://github.com/AbubakarMi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="icon" className="h-10 w-10 rounded-xl bg-white/10 border-none hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                      <Link href="https://www.linkedin.com/in/muhammad-idris-abubakar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <Linkedin className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="icon" className="h-10 w-10 rounded-xl bg-white/10 border-none hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                      <Link href="https://x.com/AbubakarM93064" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <Twitter className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-3 p-8 md:p-10 lg:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Name"
                              {...field}
                              className="h-12 rounded-xl border-border/50 bg-muted/50 focus:bg-background transition-colors"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Email Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your.email@example.com"
                              {...field}
                              className="h-12 rounded-xl border-border/50 bg-muted/50 focus:bg-background transition-colors"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project, question, or just say hello..."
                            {...field}
                            className="min-h-[160px] rounded-xl border-border/50 bg-muted/50 focus:bg-background transition-colors resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="group w-full rounded-xl py-6 text-base font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
