
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { summarizeSkill } from '@/ai/flows/summarize-project-flow';
import { notFound } from 'next/navigation';
import { Sparkles, BrainCircuit, BookOpen } from 'lucide-react';

export default async function AnalyzePage({ params }: { params: { slug: string } }) {
  const skillName = decodeURIComponent(params.slug);
  let analysis;
  let error = null;

  try {
    analysis = await summarizeSkill({ skill: skillName });
  } catch (e: any) {
    console.error(`Analysis failed for skill "${skillName}":`, e);
    error = "Sorry, I couldn't generate an analysis for this skill at the moment. It might be due to high demand or a temporary issue. Please try again later.";
  }

  if (!analysis && !error) {
    notFound();
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:py-24 md:px-6">
          <div className="space-y-8">
            <header className="space-y-4 text-center">
              <Sparkles className="mx-auto h-12 w-12 text-primary" />
              <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
                AI Analysis: {skillName}
              </h1>
              <p className="text-lg text-foreground/70">
                An AI-generated breakdown of this skill and its relevance in the tech industry.
              </p>
            </header>
            
            <div className="rounded-2xl border bg-card/50 p-8 shadow-lg">
              {error ? (
                <div className="text-center text-destructive">
                  <h3 className="text-xl font-bold">Analysis Failed</h3>
                  <p>{error}</p>
                </div>
              ) : analysis ? (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h2 className="flex items-center gap-3 font-headline text-2xl font-bold text-foreground">
                      <BrainCircuit className="h-7 w-7 text-primary" />
                      What It Is
                    </h2>
                    <p className="text-lg text-foreground/80">{analysis.explanation}</p>
                  </div>
                  <div className="space-y-3">
                    <h2 className="flex items-center gap-3 font-headline text-2xl font-bold text-foreground">
                      <BookOpen className="h-7 w-7 text-primary" />
                      Why It's Important
                    </h2>
                    <p className="text-lg text-foreground/80">{analysis.importance}</p>
                  </div>
                </div>
              ) : (
                 <div className="text-center text-foreground/70">
                  <p>Loading analysis...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
