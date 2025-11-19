"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ExternalLink, Play, Square, Loader2, ArrowUpRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { textToSpeech } from '@/ai/flows/tts-flow';

const projects = [
  {
    title: "Nubenta Care",
    description: "An AI-driven health management system designed to digitize hospital operations. It connects admin, doctors, pharmacy, lab, and finance into one intelligent platform.",
    tech: ["Node.js", "PostgreSQL", "AI/NLP", "SendGrid"],
    image: PlaceHolderImages.find(p => p.id === "project-nubenta"),
    link: "#",
    role: "Founder & Lead Developer",
    summaryScript: "Nubenta Care is an AI-powered health management system that digitizes and connects all hospital departments. By integrating administration, doctors, and labs, it streamlines operations and improves patient care through smart, automated workflows."
  },
  {
    title: "Nyra Connect",
    description: "A scalable modular system for an AI-powered productivity app. Features include journals, AI insights, focus sessions, and notifications.",
    tech: [".NET 8", "React", "PostgreSQL", "Clean Architecture"],
    image: PlaceHolderImages.find(p => p.id === "project-nyra"),
    link: "#",
    role: "Founder & Lead Developer",
    summaryScript: "Nyra Connect is an AI-driven productivity application built on a scalable, modular architecture using .NET and React. It enhances focus and organization through intelligent journals, AI-powered insights, and integrated notification systems."
  },
  {
    title: "InvoTrek",
    description: "A multi-tenant SaaS for smart document automation. Features AI-assisted field detection and inventory tracking.",
    tech: ["Node.js", "PostgreSQL", "Google AI", "SaaS"],
    image: PlaceHolderImages.find(p => p.id === "project-invotrek"),
    link: "https://invotrek.netlify.app",
    role: "Creator & Lead Developer",
    summaryScript: "InvoTrek is a multi-tenant SaaS platform designed for intelligent document automation. Using Node.js and Google AI, it offers features like AI-assisted field detection and inventory management to streamline business workflows."
  },
  {
    title: "BuildTrack Pro",
    description: "A multi-tenant web app for contractors to track construction expenses, material usage, and worker payments.",
    tech: ["React", "Node.js", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "project-buildtrack"),
    link: "#",
    role: "Lead Developer",
    summaryScript: "BuildTrack Pro is a web platform for construction management. Built with React and Node.js, it empowers contractors to track expenses, monitor material usage, and manage worker payments through an intuitive, real-time dashboard."
  },
  {
    title: "SmartEd ERP",
    description: "A comprehensive school ERP for managing attendance, grades, and payments, featuring role-based security.",
    tech: ["ASP.NET Core 8", "PostgreSQL", "MVC"],
    image: PlaceHolderImages.find(p => p.id === "project-smarterp"),
    link: "#",
    role: "Lead Developer",
    summaryScript: "SmartEd ERP is a comprehensive school management system built with ASP.NET Core. It simplifies administrative tasks by managing attendance, grades, and payments, all secured with a robust, role-based access control system."
  },
  {
    title: "BulkPay",
    description: "An automated salary payment system designed for companies to manage and disburse salaries to employees efficiently.",
    tech: [".NET", "MVC", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "project-bulkpay"),
    link: "#",
    role: "Backend Developer",
    summaryScript: "BulkPay is an automated salary payment system developed with .NET. It streamlines payroll for companies, enabling efficient management and disbursement of employee salaries through a secure and reliable platform."
  },
  {
    title: "Adustech Bus Tracker",
    description: "A real-time bus booking and tracking platform designed for university students to manage transportation.",
    tech: ["Node.js", "Firebase"],
    image: PlaceHolderImages.find(p => p.id === "project-admission"),
    link: "https://bus-tracker-i4dn.vercel.app/",
    role: "Full-Stack Developer",
    summaryScript: "The Adustech Bus Tracker is a real-time booking and tracking platform for university transportation. Using Node.js and Firebase, it provides students and administrators with a seamless way to manage campus transit."
  },
  {
    title: "Rewardify",
    description: "A gamification platform that helps businesses increase user engagement by integrating a points-based reward system.",
    tech: ["Node.js", "PostgreSQL", "React", "Gamification"],
    image: PlaceHolderImages.find(p => p.id === "project-rewardify"),
    link: "#",
    role: "Full-Stack Developer",
    summaryScript: "Rewardify is a gamification platform that boosts user engagement. By integrating a points-based reward system using React and Node.js, it helps businesses incentivize and retain their users effectively."
  },
  {
    title: "Rental Management System",
    description: "A system for property owners to manage rental properties, track payments, and handle maintenance requests.",
    tech: ["Node.js", "React", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "project-rental"),
    link: "#",
    role: "Software Engineer",
    summaryScript: "This Rental Management System allows property owners to efficiently manage their rental properties. Built with React and Node.js, it features payment tracking, maintenance request handling, and tenant management."
  },
  {
    title: "Online Management System",
    description: "A general-purpose system for small businesses to track inventory, sales, and customer data.",
    tech: ["Node.js", "React", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "blog-scaling-systems"),
    link: "#",
    role: "Web Developer",
    summaryScript: "This Online Management System is a versatile tool for small businesses. It helps track inventory, monitor sales, and manage customer data through a clean and simple interface built with React and Node.js."
  }
];

type Project = (typeof projects)[0];

const ProjectAudioPlayer = ({ project }: { project: Project }) => {
  const [audioState, setAudioState] = useState<'idle' | 'loading' | 'playing' | 'error'>('idle');
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleAudioPlayback = async () => {
    if (audioState === 'playing' && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAudioState('idle');
      return;
    }

    if (audioDataUri && audioRef.current) {
      audioRef.current.play().catch(e => {
        console.error("Audio playback failed:", e);
        setAudioState('error');
      });
      return;
    }

    setAudioState('loading');
    try {
      if (!project.summaryScript) {
        throw new Error("No summary script available for this project.");
      }
      const ttsResult = await textToSpeech({ text: project.summaryScript });
      setAudioDataUri(ttsResult.audioDataUri);
    } catch (error) {
      console.error("Failed to generate audio summary:", error);
      setAudioState('error');
      toast({
        variant: "destructive",
        title: "Audio Summary Failed",
        description: "Couldn't generate an audio summary for this project. Please try again later.",
      });
    }
  };

  useEffect(() => {
    if (audioDataUri && audioRef.current) {
      audioRef.current.src = audioDataUri;
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [audioDataUri]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const onPlay = () => setAudioState('playing');
      const onPause = () => setAudioState('idle');
      const onEnded = () => setAudioState('idle');

      audioElement.addEventListener('play', onPlay);
      audioElement.addEventListener('pause', onPause);
      audioElement.addEventListener('ended', onEnded);

      return () => {
        audioElement.removeEventListener('play', onPlay);
        audioElement.removeEventListener('pause', onPause);
        audioElement.removeEventListener('ended', onEnded);
      }
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} className="hidden" />
      <Button
        size="sm"
        variant="ghost"
        className="rounded-full text-foreground/60 hover:text-primary"
        onClick={handleAudioPlayback}
        disabled={audioState === 'loading'}
      >
        {audioState === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {audioState === 'playing' ? <Square className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
        {audioState === 'playing' ? 'Stop' : 'Listen'}
      </Button>
    </>
  );
};



const ProjectItem = ({ project, index }: { project: Project, index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isReversed = index % 2 !== 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
    >
      {/* Image */}
      <div className={cn("group relative", isReversed && "lg:order-last")}>
        <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-border/50 transition-all duration-500 group-hover:shadow-2xl group-hover:ring-primary/20">
          {project.image && (
            <Image
              src={project.image.imageUrl}
              alt={project.title}
              width={1200}
              height={900}
              className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
              data-ai-hint={project.image.imageHint}
            />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/5" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5">
        <div>
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {project.role}
          </span>
          <h3 className="mt-3 font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {project.title}
          </h3>
        </div>

        <p className="text-foreground/70 leading-relaxed">{project.description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="rounded-lg px-2.5 py-1 text-xs font-medium"
            >
              {t}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          {project.link !== "#" ? (
            <Button asChild size="sm" className="group/btn rounded-full px-6 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
                <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </Button>
          ) : (
            <Button size="sm" variant="secondary" className="rounded-full px-6" disabled>
              Coming Soon
            </Button>
          )}
          <ProjectAudioPlayer project={project} />
        </div>
      </div>
    </div>
  )
}

export function Projects() {
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
    <section id="projects" ref={sectionRef} className="relative bg-muted/30 py-24 sm:py-32">
      {/* Background decoration */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className={cn(
          "text-center mb-20 transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Portfolio
          </p>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Featured Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/60">
            A selection of projects that showcase my skills in AI, SaaS development, and system architecture.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-20 lg:space-y-32">
          {projects.map((project, index) => (
            <ProjectItem key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
