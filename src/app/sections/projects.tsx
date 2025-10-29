
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ExternalLink, Play, Square, Loader2 } from 'lucide-react';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { summarizeProject } from '@/ai/flows/summarize-project-flow';
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
  }, [audioRef.current]);

  return (
    <>
      <audio ref={audioRef} className="hidden" />
      <Button
        size="lg"
        variant="outline"
        className="rounded-full px-8"
        onClick={handleAudioPlayback}
        disabled={audioState === 'loading'}
      >
        {audioState === 'loading' && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        {audioState === 'playing' ? <Square className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
        {audioState === 'playing' ? 'Stop' : 'Listen to Summary'}
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
            { threshold: 0.2, once: true }
        );

        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, []);
    
    return (
        <div ref={ref} className={cn("grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 transition-all duration-1000", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div className={cn("group relative", isReversed && "lg:order-last")}>
                <Card className="overflow-hidden rounded-2xl shadow-lg transition-shadow duration-300 group-hover:shadow-2xl">
                    {project.image && (
                         <Image
                            src={project.image.imageUrl}
                            alt={project.title}
                            width={1200}
                            height={900}
                            className="aspect-video w-full object-cover"
                            data-ai-hint={project.image.imageHint}
                        />
                    )}
                </Card>
            </div>
            <div className="space-y-6">
                <div>
                   <p className="font-semibold text-primary">{project.role}</p>
                    <h3 className="mt-2 font-headline text-3xl font-bold text-foreground">{project.title}</h3>
                </div>
                <p className="text-lg text-foreground/80">{project.description}</p>
                <div className="flex flex-wrap gap-3">
                    {project.tech.map((t) => (
                        <Badge key={t} variant="secondary" className="px-3 py-1 text-sm">{t}</Badge>
                    ))}
                </div>
                <div className="flex flex-wrap gap-4">
                     <Button asChild size="lg" className="rounded-full px-8">
                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                            View Project <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <ProjectAudioPlayer project={project} />
                </div>
            </div>
        </div>
    )
}

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
                        <ProjectItem key={project.title} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

    

    