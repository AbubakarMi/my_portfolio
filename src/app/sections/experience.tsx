"use client";

import Link from 'next/link';
import { Building, Rocket, GraduationCap, Code, ArrowUpRight, Stethoscope, LineChart, Banknote } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const experiences = [
  {
    company: "Techserv Intelligence",
    link: "#",
    role: "Software Engineer",
    duration: "May 2026 – Present",
    icon: Stethoscope,
    description: [
      "Building and maintaining backend services for Clinex and Vitalink, AI-driven healthcare products, using C# .NET, React, and PostgreSQL.",
      "Architecting scalable APIs and implementing secure, role-based access control across platform modules.",
      "Collaborating with cross-functional teams to ship compliant, high-performance health data systems."
    ],
    value: "techserv",
    current: true
  },
  {
    company: "Forge",
    link: "https://forgeapis.xyz",
    role: "Founder & CEO",
    duration: "Jan 2024 – Present",
    icon: Rocket,
    description: [
      "Architected Forge solo, an AI-powered bulk payment and disbursement platform for African businesses, using Python (AI layer), .NET, React, and PostgreSQL.",
      "Engineered intelligent account validation that reduced bulk payment failure rates to near zero across large-scale datasets.",
      "Drove pre-seed fundraising, investor negotiations, and accelerator applications, producing the pitch deck, financial model, and product demo."
    ],
    value: "forge",
    current: true
  },
  {
    company: "Hubuk Technology Limited",
    link: "https://hubuk.ng",
    role: "Backend Developer",
    duration: "Jun 2023 – Present",
    icon: Code,
    description: [
      "Architected and deployed scalable REST APIs with ASP.NET Core, reducing dev cycle time by 25%.",
      "Engineered JWT authentication and RBAC systems securing access across all platform modules.",
      "Delivered budgeting, payments, and analytics dashboards powered by PostgreSQL and EF Core, and drove Agile ceremonies."
    ],
    value: "hubuk",
    current: true
  },
  {
    company: "BizScan360",
    link: "https://bizscan360.com",
    role: "Lead Developer",
    duration: "2024 – 2025",
    icon: LineChart,
    description: [
      "Led full-stack development of a business health evaluation platform now trusted by 2,800+ users.",
      "Built automated KPI analysis, one-click PDF reports, and interactive dashboards with trend charts and anomaly detection.",
      "Architected the platform with Next.js, Node.js, and PostgreSQL behind a clean REST API and multi-tier subscriptions."
    ],
    value: "bizscan360",
    current: false
  },
  {
    company: "Kredinou",
    link: "https://kredinou.com",
    role: "Lead Developer",
    duration: "2024 – Present",
    icon: Banknote,
    description: [
      "Built a cross-border fintech super-app for the Haitian diaspora with multi-currency wallets (USD/HTG/DOP/MXN), instant P2P transfers, and international remittance over live FX corridors, now moving over $46,000 to date.",
      "Engineered an auditable double-entry ledger with atomic, pessimistically-locked money movement and fixed-precision Decimal math to prevent double-spend and race conditions.",
      "Delivered an agent cash network, merchant and marketplace suite, ride-hailing, virtual cards, and micro-loans, secured with NextAuth, RBAC, 2FA/OTP, and escrow protection."
    ],
    value: "kredinou",
    current: false
  },
  {
    company: "Torvix AI",
    link: "#",
    role: "Frontend Developer Intern",
    duration: "Sep – Oct 2025",
    icon: Building,
    description: [
      "Developed reusable React.js components for an AI-powered workflow automation platform.",
      "Optimised component state management and improved performance across key automation modules."
    ],
    value: "torvix",
    current: false
  },
  {
    company: "FlexiSAF Solutions Limited",
    link: "https://flexisaf.com",
    role: "Backend Engineering Intern",
    duration: "Sep – Dec 2025",
    icon: GraduationCap,
    description: [
      "Built backend features in Java and Spring; wrote optimised SQL for enterprise-grade modules.",
      "Collaborated with senior engineers to deliver secure, maintainable internal APIs and tools."
    ],
    value: "flexisaf",
    current: false
  }
];

const ExperienceCard = ({ experience, index }: { experience: typeof experiences[0], index: number }) => (
  <div className={cn(
    "group relative rounded-2xl bg-card p-6 md:p-8 shadow-sm ring-1 ring-border/50 transition-all duration-500 ease-out",
    "hover:shadow-xl hover:ring-primary/30 hover:-translate-y-2",
    experience.current && "mt-4"
  )}
    style={{
      animationDelay: `${index * 100}ms`,
    }}
  >
    {/* Shine effect */}
    <div className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] transition-transform duration-700 group-hover:translate-x-full overflow-hidden rounded-2xl" />

    {/* Subtle corner accent */}
    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full transition-all duration-500 group-hover:bg-primary/10" />

    {/* Current badge - positioned outside the card overflow */}
    {experience.current && (
      <div className="absolute -top-4 right-6 z-30">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-lg shadow-primary/30">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-foreground" />
          </span>
          Current
        </span>
      </div>
    )}

    {/* Content container */}
    <div className="relative">
      {/* Header with Icon */}
      <div className="mb-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105">
            <experience.icon className="h-5 w-5" />
          </div>

          {/* Title and Company */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="font-headline text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">{experience.role}</h3>
                <div className="mt-1 flex items-center gap-2">
                  {experience.link !== "#" ? (
                    <Link
                      href={experience.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300"
                    >
                      {experience.company}
                      <ArrowUpRight className="h-3 w-3 flex-shrink-0 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </Link>
                  ) : (
                    <span className="text-sm font-medium text-foreground/70">{experience.company}</span>
                  )}
                </div>
              </div>
              <span className="flex-shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary whitespace-nowrap">
                {experience.duration}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <ul className="space-y-2.5 text-sm text-foreground/70 leading-relaxed pl-[60px]">
        {experience.description.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 group/item">
            <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/50 transition-colors duration-300 group-hover/item:bg-primary" />
            <span className="transition-colors duration-300 group-hover/item:text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const TimelineItem = ({ experience, index }: { experience: typeof experiences[0], index: number }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = itemRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={itemRef} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
      <div className={cn(
        "w-full md:w-[calc(50%-3rem)] transition-all duration-700 ease-out",
        isVisible ? "opacity-100" : "opacity-0",
        isLeft ? (isVisible ? 'md:translate-x-0' : 'md:-translate-x-10') : (isVisible ? 'md:translate-x-0' : 'md:translate-x-10')
      )}>
        <ExperienceCard experience={experience} index={index} />
      </div>

      {/* Timeline node */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center">
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl bg-background text-primary ring-4 ring-background shadow-lg transition-all duration-500",
          "group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground",
          isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        )}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary-foreground/10 transition-colors duration-300">
            <experience.icon className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

const DesktopTimeline = () => {
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
    <div ref={sectionRef} className="relative mt-16 hidden md:block">
      {/* Timeline line */}
      <div
        className={cn(
          "absolute left-1/2 top-0 w-0.5 -translate-x-1/2 transition-all duration-1000 ease-out bg-border",
          isVisible ? "h-full" : "h-0"
        )}
        aria-hidden="true"
      />
      <div className="space-y-16">
        {experiences.map((exp, index) => (
          <TimelineItem key={exp.value} experience={exp} index={index} />
        ))}
      </div>
    </div>
  );
};


const MobileTimeline = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={ref} className="mt-12 space-y-6 md:hidden">
      {experiences.map((exp, index) => (
        <div
          key={exp.value}
          className={cn(
            "transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <ExperienceCard experience={exp} index={index} />
        </div>
      ))}
    </div>
  );
};


export function Experience() {
  const isMobile = useIsMobile();
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
    <section id="experience" ref={sectionRef} className="relative bg-muted/30 py-24 sm:py-32">
      {/* Background decoration */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/4 right-0 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className={cn(
          "text-center transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Career
          </p>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Professional Journey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/60">
            A timeline of my key roles and accomplishments in the tech industry.
          </p>
        </div>

        {isMobile ? <MobileTimeline /> : <DesktopTimeline />}
      </div>
    </section>
  );
}
