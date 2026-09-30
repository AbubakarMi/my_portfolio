"use client";

import React, { useState } from 'react';
import { Code2, Server, MonitorSmartphone, Database, ShieldCheck, Users, Sparkles } from 'lucide-react';
import { SkillAnalysisDialog } from '@/components/skill-analysis-dialog';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';

const skillGroups = [
  {
    title: "Languages",
    icon: Code2,
    description: "What I write every day",
    skills: ['C#', 'Python', 'JavaScript', 'PHP', 'Java', 'SQL'],
  },
  {
    title: "Backend",
    icon: Server,
    description: "APIs and services that scale",
    skills: ['ASP.NET Core', 'Node.js / Express', 'Django', 'Laravel', 'EF Core', 'Spring'],
  },
  {
    title: "Frontend & Mobile",
    icon: MonitorSmartphone,
    description: "Interfaces for web and mobile",
    skills: ['React', 'Next.js', 'Flutter', 'Tailwind CSS'],
  },
  {
    title: "Data & Tooling",
    icon: Database,
    description: "Storage, delivery, and workflow",
    skills: ['PostgreSQL', 'Firebase', 'Docker', 'Git & GitHub'],
  },
  {
    title: "Architecture & Security",
    icon: ShieldCheck,
    description: "How the pieces fit together",
    skills: ['REST API Design', 'JWT Auth & RBAC', 'System Design', 'AI Model Integration'],
  },
  {
    title: "Ways of Working",
    icon: Users,
    description: "How I deliver with teams",
    skills: ['Agile / Scrum', 'Technical Writing', 'Clean Code', 'Client Engagement'],
  },
];

export function Skills() {
  const [analyzingSkill, setAnalyzingSkill] = useState<string | null>(null);

  return (
    <>
      <section id="skills" className="relative border-y border-border/70 bg-muted/40 py-20 sm:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            eyebrow="Skills"
            title="The toolkit behind the work"
            description="Tap any skill for an AI-powered breakdown of how I use it."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 60}>
                <div className="surface surface-glow h-full p-5 transition-colors duration-300 hover:border-primary/50 sm:p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <group.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground">{group.title}</h3>
                      <p className="text-xs text-muted-foreground">{group.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => setAnalyzingSkill(skill)}
                        aria-label={`AI analysis of ${skill}`}
                        className="group/skill inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background px-3.5 py-2 text-sm font-medium text-foreground/90 transition-colors duration-200 hover:border-primary hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {skill}
                        <Sparkles className="h-3 w-3 text-muted-foreground transition-colors duration-200 group-hover/skill:text-primary" />
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {analyzingSkill && (
        <SkillAnalysisDialog
          skillName={analyzingSkill}
          open={!!analyzingSkill}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setAnalyzingSkill(null);
            }
          }}
        />
      )}
    </>
  );
}
