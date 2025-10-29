
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, Layers, Code, Rocket, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const highlights = [
    {
        icon: <Award className="h-8 w-8 text-primary" />,
        value: "4+ Years",
        label: "Experience"
    },
    {
        icon: <Rocket className="h-8 w-8 text-primary" />,
        value: "6+",
        label: "Major Projects"
    },
    {
        icon: <Layers className="h-8 w-8 text-primary" />,
        label: "Full-Stack Expertise"
    },
    {
        icon: <Code className="h-8 w-8 text-primary" />,
        label: "AI Evaluation"
    }
];

export function About() {
  const aboutImage = PlaceHolderImages.find(p => p.id === "about-profile");

  return (
    <section id="about" className="bg-sky-50/50 dark:bg-sky-900/10 py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-20">
          <div className="lg:col-span-2">
            {aboutImage && (
              <Card className="overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  width={600}
                  height={750}
                  className="aspect-[4/5] w-full object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              </Card>
            )}
          </div>
          <div className="space-y-8 md:col-span-3">
            <div className="space-y-4">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  My Story: From Curiosity to Creator
                </h2>
                <div className="space-y-4 text-lg text-foreground/80">
                  <p>
                    My journey into technology was driven by a passion for building scalable systems and a fascination with artificial intelligence. As a detail-driven Software & AI Evaluation Engineer, I have over four years of experience designing SaaS applications, conducting AI evaluation workflows, and turning complex problems into high-impact technology.
                  </p>
                  <p>
                    This journey led me to found <strong className="font-semibold text-primary">Nyra</strong>, where we deliver AI-assisted and multi-tenant SaaS platforms. I am proficient in a range of technologies including Python, Java, C#, and React, with a deep knowledge of QA testing, NLP annotation, and LLM prompt evaluation. My goal is to design reproducible test scenarios and apply metrics like precision and recall to continuously improve AI model behavior.
                  </p>
                </div>
            </div>
            <Button asChild size="lg" className="mt-4 rounded-full px-8">
              <a href="https://drive.google.com/file/d/1P51URCIY7UCDsIQuxrzlb5FvD4mZxNDp/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
        
        <div className="mt-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {highlights.map((highlight) => (
                    <div key={highlight.label} className="text-center">
                        <div className="flex justify-center items-center h-16 w-16 mx-auto mb-4 rounded-full bg-primary/10">
                           {highlight.icon}
                        </div>
                        {highlight.value && <p className="text-3xl font-bold text-foreground">{highlight.value}</p>}
                        <p className="text-md text-foreground/70 mt-1">{highlight.label}</p>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}
