"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Github, Linkedin, Mail, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Your message should be at least 10 characters long."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function Contact() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(data: ContactFormValues) {
    console.log(data);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you shortly.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="bg-sky-50/50 dark:bg-sky-900/10 py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Let’s Build Something Great Together
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
            Open to collaborations, software projects, and partnerships. Have a question or a proposal?
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
             <h3 className="font-headline text-2xl font-semibold text-foreground">Contact Information</h3>
              <a href="mailto:abubakarmi131@gmail.com" className="flex items-center gap-4 text-lg text-foreground transition-colors hover:text-primary">
                <Mail className="h-6 w-6 text-primary" />
                <span>abubakarmi131@gmail.com</span>
              </a>
              <a href="tel:+2347042526971" className="flex items-center gap-4 text-lg text-foreground transition-colors hover:text-primary">
                <Phone className="h-6 w-6 text-primary" />
                <span>+234 704 252 6971</span>
              </a>
              <div className="flex space-x-4 pt-4">
                  <Button asChild variant="outline" size="icon" className="rounded-full">
                    <Link href="https://github.com/idris-131" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="icon" className="rounded-full">
                    <Link href="https://www.linkedin.com/in/muhammad-idris-abubakar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="icon" className="rounded-full">
                    <Link href="https://twitter.com/Abubakar_MI131" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <Twitter className="h-5 w-5" />
                    </Link>
                  </Button>
              </div>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="rounded-2xl shadow-lg">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} className="rounded-lg py-6" />
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
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} className="rounded-lg py-6" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="How can I help you?" {...field} className="min-h-[150px] rounded-lg" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full rounded-full">
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
