
"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BrainCircuit, TestTube2, FileJson, Sparkles, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { analyzeSkill, AnalyzeSkillOutput } from '@/ai/flows/analyze-skill-flow';


const DockerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.12 6.42c-1.57-2.6-3.77-3.23-3.77-3.23l-3.65.17s-2.48.59-3.9 1.83c-1.3.17-2.58.53-3.82 1.1-1.39-1.2-3.13-1.63-3.13-1.63L.25 8.32s2.07.28 3.53 1.5l.2 4.15c.32.14 2.65.98 3.05 1.13.5.2 1 .3 1.5.4l.2 4.07s1.78 1.13 3.63 1.13c3.95 0 4.28-4.13 4.28-4.13s-.5-2.7-3.93-3.32c.4-.33.78-.73 1.12-1.2.66.02 2.6-.03 2.6-.03s2.2-1.2 2.7-3.04a2.6 2.6 0 0 0-.2-1.9zm-9.15 7.15a.42.42 0 0 1-.41.42h-1.2a.42.42 0 0 1-.42-.42v-1.19c0-.23.19-.42.42-.42h1.19c.23 0 .42.19.42.42v1.19zm2.4 0a.42.42 0 0 1-.42.42h-1.2a.42.42 0 0 1-.41-.42v-1.19c0-.23.18-.42.41-.42h1.2a.42.42 0 0 1 .42.42v1.19zm2.39 0a.42.42 0 0 1-.42.42h-1.19a.42.42 0 0 1-.42-.42v-1.19c0-.23.19-.42.42-.42h1.19a.42.42 0 0 1 .42.42v1.19zm2.4 0a.42.42 0 0 1-.42.42h-1.2a.42.42 0 0 1-.41-.42v-1.19c0-.23.18-.42.41-.42h1.2a.42.42 0 0 1 .42.42v1.19z" fill="#2496ED" />
    </svg>
);


const DotNetIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.53,2.09l-7.2,2.15C3.52,4.48,3,5.2,3,6.05v9.91c0,0.85,0.52,1.57,1.33,1.81l7.2,2.15c0.47,0.14,0.97,0.14,1.44,0l7.2-2.15c0.81-0.24,1.33-0.96,1.33-1.81V6.05c0-0.85-0.52-1.57-1.33-1.81l-7.2-2.15C12.5,1.95,12,1.95,11.53,2.09z M12,13.88c-2.3,0-4.17-1.87-4.17-4.17S9.7,5.54,12,5.54c2.3,0,4.17,1.87,4.17,4.17S14.3,13.88,12,13.88z" fill="#512bd4"/>
  </svg>
);

const PostgresqlIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5c-2 0-3.5-1.5-3.5-3.5S9 9.5 11 9.5V5h2v4.5c2 0 3.5 1.5 3.5 3.5S15 16.5 13 16.5h-2zm0-5c-1.1 0-2 .9-2 2s.9 2 2 2h2c1.1 0 2-.9 2-2s-.9-2-2-2h-2z" fill="#336791"/>
  </svg>
);

const TypeScriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 1.5h21v21h-21z" fill="#3178c6"/>
    <path d="M12.3 10.6c.1-.1.3-.2.5-.2s.4.1.5.2l3.4 3.4c.1.1.2.3.2.5s-.1.4-.2.5l-.9.9c-.1.1-.3.2-.5.2s-.4-.1-.5-.2L12 12.3l-2.9 2.9c-.1.1-.3.2-.5.2s-.4-.1-.5-.2l-.9-.9c-.1-.1-.2-.3-.2-.5s.1-.4.2-.5zm-4-1.7V4.5h11.2v4.4h-4.4v8.9h-2.4V8.9z" fill="#fff"/>
  </svg>
);

const NextjsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="64" fill="black"/>
    <path d="M84.316 43.199V102h11.041V43.199H84.316zM46.732 43.199L83.167 86.41V43.199h-11.12v35.337L46.732 52.345v-9.146z" fill="url(#paint0_linear_1_2)"/>
    <defs>
      <linearGradient id="paint0_linear_1_2" x1="68.868" y1="43.199" x2="68.868" y2="102" gradientUnits="userSpaceOnUse">
        <stop stopColor="white"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

const ReactIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
    </svg>
);

const JavaIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M18.87 19.48c-1.3-2.13-1.63-4.13-1.63-4.13s.32-2 1.63-4.14c.1-.17.03-.38-.13-.48l-1.57-.96c-.16-.1-.36-.06-.47.1l-1.4 2.1c-.1.17-.03.38.13.48l.9.56c.33.2.4.63.2.95l-1.2 1.9c-.2.32-.63.4-.95.2l-1.42-.88c-.16-.1-.36-.06-.47.1l-1.4 2.1c-.1.17-.03.38.13.48l1.42.88c.32.2.4.63.2.95l-1.2 1.9c-.2.32-.63.4-.95.2l-.9-.55c-.16-.1-.36-.06-.47.1l-1.4 2.1c-.1.17-.03.38.13.48l1.57.96c.16.1.36.06.47-.1 1.3-2.14 1.63-4.14 1.63-4.14s-.32-2-1.63-4.13c-.1-.17-.03-.38.13-.48l1.57-.96c.16-.1.36-.06.47.1l1.4 2.1c.1.17.03.38.13.48l-1.8 1.1-.68-1.07c-.2-.32-.64-.4-.96-.2l-1.42.88c-.16.1-.36-.06-.47.1l-1.4 2.1c-.1.17-.03.38.13.48l1.42.88c.32.2.4.63.2.95l-1 1.9c-.2.32-.63.4-.95.2l-1.42-.88c-.16-.1-.36-.06-.47.1l-.8.92c-3.1 3.2-2.1 4.4 0 5.4l2.16-1.32c1.3-2.14 1.63-4.14 1.63-4.14s-.32-2-1.63-4.13a.27.27 0 01.14-.48L9.2 2.52c.16-.1.36-.06.47.1l1.4 2.1c.1.17-.03.38-.13.48l-1.42.88c-.32.2-.4.63-.2.95l1.2 1.9c.2.32.63.4.95.2l1.42-.88c.16-.1.36-.06.47.1l1.4 2.1c.1.17.03.38-.13.48l-1.42.88c-.32.2-.4.63-.2.95l1.2 1.9c.2.32.63.4.95.2l1.42-.88c.16-.1.36-.06.47.1l1.4 2.1c.1.17-.03.38-.13.48l-1.57.96c-.16.1-.36.06-.47-.1-1.3-2.14-1.63-4.14-1.63-4.14s.32-2 1.63-4.13c1.3-2.14 1.63-4.14 1.63-4.14s-.32-2-1.63-4.14c-.1-.17-.03-.38.13-.48l1.57-.96c.16-.1.36-.06.47.1l.6.9a5.2 5.2 0 01-1.5 5.5c-1.3 2.14-1.63 4.14-1.63-4.14s.32 2 1.63 4.14c1.3 2.13 1.63 4.13 1.63-4.13s-.32 2-1.63 4.14a.27.27 0 01.13-.48l1.57-.96c.16-.1.36-.06.47.1l.82 1.25z" fill="#f89820"/><path d="M21.1 9.02c.33 0 .6-.27.6-.6V7.3c0-1.22-1.1-2.2-2.45-2.2H16.5v1.2h2.75c.68 0 1.25.5 1.25 1.1v1.12c0 .33.27.6.6.6z" fill="#5382a1"/></svg>
);

const PythonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5.5c-1.28 0-1.99.35-2.6.83a2.3 2.3 0 00-.9.9c-.48.61-.83 1.32-.83 2.6V12h4.66v-2.1c0-1.04.53-1.67 1.34-1.95.7-.24 1.5-.24 2.2 0 .8.28 1.33.91 1.33 1.95V12h4.67v-2.17c0-1.28-.35-1.99-.83-2.6a2.3 2.3 0 00-.9-.9c-.61-.48-1.32-.83-2.6-.83h-4.34z" fill="#3776ab"/>
        <path d="M12 18.5c1.28 0 1.99-.35 2.6-.83a2.3 2.3 0 00.9-.9c.48-.61.83-1.32.83-2.6V12H11.66v2.1c0 1.04-.53 1.67-1.34 1.95-.7.24-1.5.24-2.2 0-.8-.28-1.33-.91-1.33-1.95V12H2.12v2.17c0 1.28.35 1.99.83 2.6a2.3 2.3 0 00.9.9c.61.48 1.32.83 2.6.83h5.55z" fill="#ffc331"/>
    </svg>
);

const CSharpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 5.5l-4 13m8-11l-4 13m-2-10h-6a1 1 0 00-1 1v4a1 1 0 001 1h6m4-5h-6a1 1 0 00-1 1v4a1 1 0 001 1h6" stroke="#9b4f96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);

const ServerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
);

const WindIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
        <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
        <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
    </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
);

const GitBranchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" x2="6" y1="3" y2="15"></line>
        <circle cx="18" cy="6" r="3"></circle>
        <circle cx="6" cy="18" r="3"></circle>
        <path d="M18 9a9 9 0 0 1-9 9"></path>
    </svg>
);

const skills = {
  "AI & Testing": [
    { name: 'LLM Evaluation', icon: BrainCircuit },
    { name: 'QA Design', icon: TestTube2 },
    { name: 'NLP Annotation', icon: CodeIcon },
    { name: 'JSON/YAML Modeling', icon: FileJson },
  ],
  "Languages": [
    { name: 'Python', icon: PythonIcon },
    { name: 'Java', icon: JavaIcon },
    { name: 'C#', icon: CSharpIcon },
    { name: 'TypeScript', icon: TypeScriptIcon },
  ],
  "Backend": [
    { name: '.NET 8', icon: DotNetIcon },
    { name: 'Node.js', icon: ServerIcon },
    { name: 'PostgreSQL', icon: PostgresqlIcon },
    { name: 'Clean Architecture', icon: ServerIcon },
  ],
  "Frontend": [
    { name: 'React', icon: ReactIcon },
    { name: 'Next.js', icon: NextjsIcon },
    { name: 'Tailwind CSS', icon: WindIcon },
  ],
   "DevOps & Tools": [
    { name: 'Docker', icon: DockerIcon },
    { name: 'SendGrid', icon: MailIcon },
    { name: 'Git & GitHub', icon: GitBranchIcon },
  ]
};

const analysisCache = new Map<string, AnalyzeSkillOutput>();

const SkillCard = ({ name, icon: Icon, style }: { name: string; icon: React.ElementType; style: React.CSSProperties }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalyzeSkillOutput | null>(null);

  const handleAnalyze = async () => {
    setIsDialogOpen(true);

    if (analysisCache.has(name)) {
      setAnalysis(analysisCache.get(name)!);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const result = await analyzeSkill({ skill: name });
      setAnalysis(result);
      analysisCache.set(name, result);
    } catch (error) {
      console.error("Skill analysis failed:", error);
      setAnalysis({
        explanation: "Sorry, I couldn't analyze this skill at the moment.",
        importance: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Card
        className="group animate-fade-in-up rounded-2xl transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1"
        style={style}
      >
        <div className="flex h-full flex-col items-center justify-between gap-4 p-6 text-center">
          <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-8 w-8" />
              </div>
              <span className="font-semibold text-foreground text-lg">{name}</span>
          </div>

          <div className="h-9 transition-all duration-300 opacity-0 group-hover:opacity-100">
             <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-background/80 backdrop-blur-sm"
                onClick={handleAnalyze}
              >
                <Sparkles className="mr-2 h-4 w-4 text-primary" /> Analyze
              </Button>
          </div>
        </div>
      </Card>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-headline">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Analysis: {name}
          </DialogTitle>
          <DialogDescription>An AI-generated breakdown of this skill and its relevance.</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : analysis ? (
            <>
              <div>
                <h3 className="font-semibold text-foreground mb-2">What it is</h3>
                <p className="text-foreground/80">{analysis.explanation}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Why it's important</h3>
                <p className="text-foreground/80">{analysis.importance}</p>
              </div>
            </>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};


export function Skills() {
  useEffect(() => {
    const allSkills = Object.values(skills).flat();
    allSkills.forEach(skill => {
      if (!analysisCache.has(skill.name)) {
          analyzeSkill({ skill: skill.name })
            .then(result => {
              analysisCache.set(skill.name, result);
            })
            .catch(error => {
              console.error(`Pre-fetching analysis for ${skill.name} failed:`, error);
            });
      }
    });
  }, []);

  return (
    <section id="skills" className="bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Skills &amp; Technologies
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
            A look at the primary tools and technologies in my professional toolkit. Hover over a skill and click "Analyze" for an AI-powered breakdown.
          </p>
        </div>

        <Tabs defaultValue="AI & Testing" className="mt-16 w-full">
            <TabsList className="mx-auto grid h-auto max-w-2xl grid-cols-2 items-center justify-center gap-2 rounded-xl bg-muted p-2 sm:grid-cols-3 md:flex">
                {Object.keys(skills).map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category} 
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-md rounded-lg"
                    >
                      {category}
                    </TabsTrigger>
                ))}
            </TabsList>

            {Object.entries(skills).map(([category, items]) => (
                <TabsContent key={category} value={category} className="mt-10">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {items.map((skill, index) => (
                          <SkillCard 
                            key={skill.name} 
                            name={skill.name} 
                            icon={skill.icon}
                            style={{ animationDelay: `${index * 100}ms`}}
                          />
                        ))}
                    </div>
                </TabsContent>
             ))}
        </Tabs>
      </div>
    </section>
  );
}
