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
    title: "Vitalink",
    description: "A smart patient monitoring and vital-signs tracking platform with real-time health data pipelines, clinical alerting, and role-based clinician dashboards. Integrates with Clinex, Techserv Intelligence's AI-driven healthcare ecosystem.",
    tech: ["C# .NET", "React", "PostgreSQL", "Health Data"],
    image: PlaceHolderImages.find(p => p.id === "project-vitalink"),
    video: "/vitalink-demo.mp4",
    link: "https://vitalink.tech",
    role: "Software Engineer @ Techserv Intelligence",
    summaryScript: "Vitalink is a smart patient monitoring platform that tracks vital signs through real-time health data pipelines. It powers clinical alerting systems and role-based dashboards for care teams, and integrates with Clinex, Techserv Intelligence's broader AI-driven healthcare ecosystem. It's built with C# .NET, React, and PostgreSQL for secure, compliant performance."
  },
  {
    title: "Forge",
    description: "An AI-powered bulk payment and disbursement platform for African businesses. The Python AI engine validates and auto-corrects bank account details, including wrong numbers, mismatched names, duplicates, and bank-name normalisation, then disburses clean data with a near-zero failure rate.",
    tech: ["Python", ".NET", "React", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "project-forge"),
    link: "https://forgeapis.xyz",
    role: "Founder & CEO",
    summaryScript: "Forge is an AI-powered bulk payment and disbursement platform for African businesses. Its Python AI engine validates and auto-corrects bank account details, then disburses clean data with a near-zero failure rate. I founded Forge after personally managing a thirty-thousand-beneficiary disbursement that required weeks of manual cleaning, and built it with a Python AI layer, a .NET backend, a React frontend, and PostgreSQL."
  },
  {
    title: "Anvil",
    description: "An augmented-reality land measurement app that lets users measure and map land directly through their phone camera, with no surveyor, no waiting, and no expensive equipment. Built in Flutter for a market where land disputes and inaccessible surveying services are everyday realities.",
    tech: ["Flutter", "Augmented Reality", "Mobile"],
    image: PlaceHolderImages.find(p => p.id === "project-anvil"),
    link: "#",
    role: "Founder & Lead Developer",
    summaryScript: "Anvil is an augmented-reality land measurement app. Using AR, it lets users measure and map land directly through their phone camera, with no surveyor, no waiting, and no expensive equipment. Built in Flutter, it targets the Nigerian market where land disputes and inaccessible surveying services are everyday realities."
  },
  {
    title: "AJ Academy",
    description: "An interactive English learning web app featuring live classes, structured lessons, and progress tracking for students and professionals.",
    tech: ["Web App", "Live Classes", "Education", "Interactive Learning"],
    image: PlaceHolderImages.find(p => p.id === "project-ajacademy"),
    video: "/aj-academy-demo.mp4",
    link: "https://aj-academy.netlify.app",
    role: "Lead Developer",
    summaryScript: "AJ Academy is a specialized English learning platform that connects students and professionals with live interactive classes. It features structured lessons in grammar, vocabulary, and speaking, alongside real-time instructor engagement. The platform offers a seamless web-based experience with progress tracking to help learners reach their language proficiency goals efficiently."
  },
  {
    title: "BizScan360",
    description: "A comprehensive SaaS platform that analyzes complex financial and operational data to provide a 0-100 Business Health Score and actionable insights.",
    tech: ["SaaS", "Data Analysis", "React", "Financial KPIs"],
    image: PlaceHolderImages.find(p => p.id === "project-bizscan360"),
    video: "/bizscan360-demo.mp4",
    link: "https://bizscan360.com",
    role: "Lead Developer",
    summaryScript: "BizScan360 is a business health evaluation platform that helps companies understand their financial and operational performance. It calculates a numerical health score from 0 to 100, identifies risks and opportunities, and provides automated KPI analysis through interactive dashboards. It's built for startups, SMEs, and investors to make data-driven decisions quickly and efficiently."
  },
  {
    title: "KrediNou",
    description: "A multi-currency fintech super-app connecting the Haitian diaspora across North America, the Dominican Republic, and Mexico with families back home. It combines USD/HTG/DOP/MXN wallets, instant P2P transfers, international remittance with live FX corridors, an agent cash-in/cash-out network, a merchant and marketplace suite, ride-hailing, food ordering, virtual cards, and micro-loans, all built on an auditable double-entry ledger with atomic, lock-protected money movement. Live and moving over $46,000 to date.",
    tech: ["Next.js 16", "TypeScript", "PostgreSQL", "Prisma 7", "NextAuth", "Fintech"],
    image: PlaceHolderImages.find(p => p.id === "project-kredinou"),
    video: "/kredinou-demo.mp4",
    link: "https://www.kredinou.com/",
    role: "Lead Developer",
    summaryScript: "KrediNou is a cross-border fintech super-app for the Haitian diaspora. It lets users hold multi-currency wallets in US dollars, Haitian gourdes, Dominican pesos, and Mexican pesos, send instant peer-to-peer transfers, and move money home through live remittance corridors backed by a real agent cash network. It also bundles a merchant and marketplace suite, ride-hailing, food ordering, virtual cards, and micro-loans, all built on an auditable double-entry ledger with atomic, lock-protected money movement. As Lead Developer I built the platform end to end, and it is live and has moved over forty-six thousand dollars to date."
  },
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
    title: "Appointment Booking System",
    description: "A scalable, multi-industry booking platform serving health clinics, beauty salons, and hospitality. Supports multi-role access, dynamic service and slot configuration, real-time availability checks, and automated confirmation emails. Designed for multi-tenancy.",
    tech: ["ASP.NET Core 8", "PostgreSQL", "JWT", "SendGrid"],
    image: PlaceHolderImages.find(p => p.id === "project-booking"),
    link: "#",
    role: "Backend Developer",
    summaryScript: "This Appointment Booking System is a scalable, multi-industry platform serving health clinics, beauty salons, and hospitality businesses. Built with ASP.NET Core 8 and PostgreSQL, it supports multi-role access, dynamic service and slot configuration, real-time availability checks, and automated confirmation emails via SendGrid, all designed for multi-tenancy."
  },
  {
    title: "Hospital Management System",
    description: "A multi-role Hospital Management System digitising core clinical and administrative workflows. Covers patient registration, appointment scheduling with conflict detection, multi-tier billing, pharmacy inventory tracking, and real-time staff dashboards with role-based views.",
    tech: ["Node.js", "PostgreSQL", "Express", "Firebase Auth"],
    image: PlaceHolderImages.find(p => p.id === "project-hospital"),
    link: "#",
    role: "Full-Stack Developer",
    summaryScript: "This Hospital Management System is a multi-role platform that digitises core clinical and administrative workflows. Built with Node.js, Express, and PostgreSQL, it covers patient registration, appointment scheduling with conflict detection, multi-tier billing, pharmacy inventory tracking, and real-time staff dashboards with role-based views."
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
    role: "Lead Developer",
    summaryScript: "This Online Management System is a versatile tool for small businesses. It helps track inventory, monitor sales, and manage customer data through a clean and simple interface built with React and Node.js."
  }
];

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: (typeof PlaceHolderImages)[0] | undefined;
  video?: string;
  link: string;
  role: string;
  summaryScript: string;
}

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
  const [isNear, setIsNear] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isReversed = index % 2 !== 0;

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn("Video autoplay failed:", error);
      });
    }
  }, [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.15 }
    );

    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          nearObserver.disconnect();
        }
      },
      { rootMargin: '400px' }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
      nearObserver.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
        nearObserver.unobserve(currentRef);
      }
    };
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
        {/* Decorative background glow */}
        <div className="absolute -inset-4 rounded-3xl bg-primary/5 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-border/50 transition-all duration-500 group-hover:shadow-2xl group-hover:ring-primary/30 group-hover:scale-[1.02]" style={{ transformStyle: 'preserve-3d' }}>
          {project.video ? (
            <div className="relative aspect-video w-full overflow-hidden">
              <video
                ref={videoRef}
                src={isNear ? project.video : undefined}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={project.image?.imageUrl}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ) : project.image && (
            <Image
              src={project.image.imageUrl}
              alt={project.title}
              width={1200}
              height={900}
              className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-110"
              data-ai-hint={project.image.imageHint}
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Shine effect */}
          <div className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5">
        <div>
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary ring-1 ring-primary/20">
            {project.role}
          </span>
          <h3 className="mt-4 font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl transition-colors duration-300 hover:text-primary">
            {project.title}
          </h3>
        </div>

        <p className="text-foreground/70 leading-relaxed">{project.description}</p>

        {/* Tech Stack with hover effects */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-105 cursor-default"
            >
              {t}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          {project.link !== "#" ? (
            <Button asChild size="sm" className="group/btn rounded-full px-6 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95 transition-all duration-300">
              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
                <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </Button>
          ) : (
            <Button size="sm" variant="secondary" className="rounded-full px-6 opacity-60" disabled>
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
