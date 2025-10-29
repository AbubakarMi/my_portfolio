
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const projects = [
   {
    title: "Nubenta Care",
    description: "An AI-driven health management system designed to digitize hospital operations. It connects admin, doctors, pharmacy, lab, and finance into one intelligent platform. Features AI-assisted documentation, prescription suggestions, and predictive analytics.",
    tech: ["Node.js", "PostgreSQL", "AI/NLP", "SendGrid"],
    image: PlaceHolderImages.find(p => p.id === "project-nubenta"),
    link: "#",
    role: "Founder & Lead Developer"
  },
  {
    title: "Nyra Connect",
    description: "A scalable modular system for an AI-powered productivity app. Features include journals, AI insights, focus sessions, and notifications, all built on a foundation of Clean Architecture.",
    tech: [".NET 8", "React", "PostgreSQL", "Clean Architecture"],
    image: PlaceHolderImages.find(p => p.id === "project-nyra"),
    link: "#",
    role: "Founder & Lead Developer"
  },
  {
    title: "InvoTrek",
    description: "A multi-tenant SaaS for smart document automation. Upload templates, fill client data, and auto-generate professional Word or PDF files. Features AI-assisted field detection and inventory tracking.",
    tech: ["Node.js", "PostgreSQL", "Google AI", "SaaS"],
    image: PlaceHolderImages.find(p => p.id === "project-invotrek"),
    link: "#",
    role: "Creator & Lead Developer"
  },
  {
    title: "BuildTrack Pro",
    description: "A multi-tenant web app for contractors to track construction expenses, material usage, and worker payments. Monitor daily spending and manage budgets via live dashboards.",
    tech: ["React", "Node.js", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "project-buildtrack"),
    link: "#",
    role: "Lead Developer"
  },
  {
    title: "SmartEd ERP",
    description: "A comprehensive school ERP for managing attendance, grades, and payments. Features role-based security and a modular design for scalability.",
    tech: ["ASP.NET Core 8", "PostgreSQL", "MVC"],
    image: PlaceHolderImages.find(p => p.id === "project-smarterp"),
    link: "#",
    role: "Lead Developer"
  },
   {
    title: "BulkPay",
    description: "An automated salary payment system designed for companies to manage and disburse salaries to employees and contractors efficiently. Features multi-bank integration and automated compliance.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "REST APIs"],
    image: PlaceHolderImages.find(p => p.id === "project-bulkpay"),
    link: "#",
    role: "Backend Developer"
  },
  {
    title: "Adustech Bus Tracker",
    description: "A real-time bus booking and tracking platform designed for university students and administrators to manage transportation efficiently.",
    tech: ["Node.js", "Firebase"],
    image: PlaceHolderImages.find(p => p.id === "project-admission"),
    link: "#",
    role: "Full-Stack Developer"
  },
  {
    title: "Rewardify",
    description: "A gamification platform that helps businesses increase user engagement and retention by integrating a points-based reward system into their applications.",
    tech: ["Node.js", "PostgreSQL", "React", "Gamification"],
    image: PlaceHolderImages.find(p => p.id === "project-rewardify"),
    link: "#",
    role: "Full-Stack Developer"
  },
  {
    title: "Rental Management System",
    description: "A system for property owners to manage rental properties, track payments, handle maintenance requests, and communicate with tenants.",
    tech: ["C#", ".NET", "SQL Server"],
    image: PlaceHolderImages.find(p => p.id === "project-rental"),
    link: "#",
    role: "Software Engineer"
  },
  {
    title: "Online Management System",
    description: "A general-purpose online management system for small businesses to track inventory, sales, and customer data.",
    tech: ["PHP", "MySQL", "jQuery"],
    image: PlaceHolderImages.find(p => p.id === "blog-scaling-systems"),
    link: "#",
    role: "Web Developer"
  }
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <Dialog>
            <Card
                ref={cardRef}
                className={cn(
                    "group flex flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-500",
                    isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0',
                    "hover:shadow-2xl hover:-translate-y-2"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
            >
                <div className="relative overflow-hidden">
                    {project.image && (
                        <Image
                            src={project.image.imageUrl}
                            alt={project.image.description}
                            width={800}
                            height={600}
                            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            data-ai-hint={project.image.imageHint}
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:backdrop-blur-sm">
                        <DialogTrigger asChild>
                           <Button variant="secondary" className="rounded-full">
                             View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                           </Button>
                        </DialogTrigger>
                    </div>
                </div>
                <CardHeader className="flex-grow bg-card p-6">
                    <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                    <CardDescription className="font-medium text-primary">
                        {project.role}
                    </CardDescription>
                </CardHeader>
                <div className="bg-card p-6 pt-0">
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                            <Badge key={t} variant="secondary">{t}</Badge>
                        ))}
                    </div>
                </div>
            </Card>
            <DialogContent className="max-w-4xl p-0">
                 <div className="relative">
                    {project.image && (
                        <div className="overflow-hidden rounded-t-lg max-h-[400px]">
                            <Image
                                src={project.image.imageUrl}
                                alt={project.image.description}
                                width={1200}
                                height={675}
                                className="w-full object-cover"
                                data-ai-hint={project.image.imageHint}
                            />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        </div>
                    )}
                    <DialogHeader className="absolute bottom-0 left-0 p-8 text-white">
                        <DialogTitle className="text-4xl font-bold tracking-tight shadow-black [text-shadow:0_2px_4px_var(--tw-shadow-color)]">{project.title}</DialogTitle>
                        <p className="text-xl font-medium text-white/90 shadow-black [text-shadow:0_1px_2px_var(--tw-shadow-color)]">{project.role}</p>
                    </DialogHeader>
                </div>
                <div className="px-8 pb-8 pt-6 space-y-6">
                    <p className="text-foreground/80 text-base leading-relaxed">{project.description}</p>
                    <div>
                        <h4 className="font-semibold mb-3 text-foreground">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                                <Badge key={t} variant="secondary" className="text-sm py-1 px-3">{t}</Badge>
                            ))}
                        </div>
                    </div>
                     <div className="pt-4">
                        <Button asChild size="lg" className="rounded-full">
                            <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-5 w-5" />
                                Live Demo
                            </Link>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};


export function Projects() {
  return (
    <section id="projects" className="bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
            A selection of projects that showcase my skills in AI, SaaS development, and system architecture.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

    