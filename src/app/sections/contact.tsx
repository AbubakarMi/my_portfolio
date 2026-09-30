"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Github, Linkedin, Mail, Phone, Twitter, Send, MapPin, Clock, ArrowUpRight, CalendarDays } from 'lucide-react';
import { sendContactFormEmail } from '@/ai/flows/send-email-flow';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { GITHUB_URL, LINKEDIN_URL, X_URL, MEETING_URL, WHATSAPP_URL } from '@/lib/seo';

const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Your message should be at least 10 characters long."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <FontAwesomeIcon icon={faWhatsapp} className={className} />
);

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'abubakarmi131@gmail.com', href: 'mailto:abubakarmi131@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+234 704 252 6971', href: 'tel:+2347042526971' },
  { icon: WhatsAppIcon, label: 'WhatsApp', value: '+234 704 252 6971', href: WHATSAPP_URL },
  { icon: Linkedin, label: 'LinkedIn', value: 'Muhammad Idris Abubakar', href: LINKEDIN_URL },
  { icon: MapPin, label: 'Location', value: 'Kano, Nigeria · Remote-friendly', href: undefined },
];

const socialLinks = [
  { name: 'GitHub', href: GITHUB_URL, icon: Github },
  { name: 'LinkedIn', href: LINKEDIN_URL, icon: Linkedin },
  { name: 'X (Twitter)', href: X_URL, icon: Twitter },
];

export function Contact() {
  const { toast } = useToast();
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-portrait');
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

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
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great"
          description="Have a project in mind, a role to fill, or just want to connect? I'd love to hear from you."
        />

        <Reveal className="mb-6">
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-card p-6 sm:p-8">
            <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_left,black,transparent_70%)]" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Available for work
                </p>
                <p className="mt-2 font-headline text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  Open to freelance projects and full-time roles, remote worldwide.
                </p>
              </div>
              <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button asChild size="lg" className="h-12 rounded-full px-7 text-base">
                  <a href={MEETING_URL} target="_blank" rel="noopener noreferrer">
                    <CalendarDays className="h-4 w-4" />
                    Book a call
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-full bg-card/60 px-7 text-base hover:bg-muted hover:text-foreground">
                  <a href="mailto:abubakarmi131@gmail.com">
                    <Mail className="h-4 w-4" />
                    Email me
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Contact details */}
            <div className="space-y-3 lg:col-span-2">
              {contactDetails.map((detail) => {
                const content = (
                  <>
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                      <detail.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{detail.label}</p>
                      <p className="truncate text-sm font-medium text-foreground sm:text-base">{detail.value}</p>
                    </div>
                  </>
                );
                return detail.href ? (
                  <a
                    key={detail.value}
                    href={detail.href}
                    target={detail.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="surface group flex items-center gap-4 p-4 transition-colors duration-200 hover:border-primary/50"
                  >
                    {content}
                    <ArrowUpRight className="ml-auto h-4 w-4 flex-shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
                  </a>
                ) : (
                  <div key={detail.value} className="surface flex items-center gap-4 p-4">
                    {content}
                  </div>
                );
              })}

              <div className="surface flex items-center justify-between gap-4 p-4">
                <p className="text-sm text-muted-foreground">Find me on</p>
                <div className="flex gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="surface p-5 sm:p-8 lg:col-span-3">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              autoComplete="name"
                              {...field}
                              className="h-12 rounded-xl bg-background text-base"
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
                              type="email"
                              placeholder="you@example.com"
                              autoComplete="email"
                              {...field}
                              className="h-12 rounded-xl bg-background text-base"
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
                            className="min-h-[170px] resize-none rounded-xl bg-background text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      I usually reply within 24-48 hours
                    </p>
                    <Button
                      type="submit"
                      size="lg"
                      className="group h-12 w-full rounded-full px-8 text-base sm:w-auto"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
