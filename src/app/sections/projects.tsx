
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
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
    link: "https://invotrek.netlify.app",
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
    tech: [".NET", "MVC", "PostgreSQL"],
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
    tech: ["Node.js", "React", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "project-rental"),
    link: "#",
    role: "Software Engineer"
  },
  {
    title: "Online Management System",
    description: "A general-purpose online management system for small businesses to track inventory, sales, and customer data.",
    tech: ["Node.js", "React", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "blog-scaling-systems"),
    link: "#",
    role: "Web Developer"
  }
];


const ProjectItem = ({ project, reverse = false }: { project: typeof projects[0], reverse?: boolean }) => {
    const [isVisible, setIsVisible] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);

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

        if (itemRef.current) {
            observer.observe(itemRef.current);
        }

        return () => {
            if (itemRef.current) {
                observer.unobserve(itemRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={itemRef}
            className={cn(
                "grid grid-cols-1 items-center gap-8 transition-all duration-1000 lg:grid-cols-2 lg:gap-16",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}
        >
            <div className={cn("relative", reverse && "lg:order-last")}>
                <Card className="overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    {project.image && (
                        <Image
                            src={project.image.imageUrl}
                            alt={project.image.description}
                            width={1200}
                            height={900}
                            className="aspect-[4/3] w-full object-cover"
                            data-ai-hint={project.image.imageHint}
                        />
                    )}
                </Card>
            </div>
            <div className="space-y-6">
                <div className="space-y-4">
                    <h3 className="font-headline text-3xl font-bold text-foreground">{project.title}</h3>
                    <p className="font-semibold text-primary text-lg">{project.role}</p>
                    <p className="text-foreground/80 leading-relaxed text-base">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                        <Badge key={t} variant="secondary" className="text-sm py-1 px-3">{t}</Badge>
                    ))}
                </div>
                <div className="pt-2">
                    <Button asChild>
                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                           <ExternalLink className="mr-2 h-4 w-4" /> View Project
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};


export function Projects() {
  return (
    <section id="projects" className="bg-primary/5 py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
            A selection of projects that showcase my skills in AI, SaaS development, and system architecture.
          </p>
        </div>

        <div className="mt-24 space-y-24">
          {projects.map((project, index) => (
            <ProjectItem key={project.title} project={project} reverse={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
