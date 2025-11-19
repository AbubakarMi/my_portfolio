
"use client";

import { useEffect, useState } from "react";
import { summarizeSkill, type SummarizeSkillOutput } from "@/ai/flows/summarize-project-flow";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, ServerCrash, Sparkles, BrainCircuit, BookOpen, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface SkillAnalysisDialogProps {
  skillName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SkillAnalysisDialog({ skillName, open, onOpenChange }: SkillAnalysisDialogProps) {
  const [analysis, setAnalysis] = useState<SummarizeSkillOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      setAnalysis(null);
      setError(null);
      setShowContent(false);

      summarizeSkill({ skill: skillName })
        .then((result) => {
          setAnalysis(result);
          setTimeout(() => setShowContent(true), 100);
        })
        .catch((e) => {
          console.error(`Analysis failed for skill "${skillName}":`, e);
          setError("Sorry, I couldn't generate an analysis for this skill at the moment. It might be due to high demand or a temporary issue. Please try again later.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [open, skillName]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl overflow-hidden border-0 bg-card shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />

        <DialogHeader className="relative">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sparkles className="h-6 w-6" />
          </div>
          <DialogTitle className="font-headline text-2xl font-bold tracking-tight">
            AI Analysis
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Analyzing <span className="font-semibold text-primary">{skillName}</span>
          </p>
        </DialogHeader>

        <div className="relative my-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-12">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">Analyzing skill...</p>
                <p className="text-sm text-muted-foreground">This may take a moment</p>
              </div>
            </div>
          ) : error ? (
            <Alert variant="destructive" className="border-destructive/50">
              <ServerCrash className="h-5 w-5" />
              <AlertTitle>Analysis Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : analysis ? (
            <div className="space-y-6">
              <div
                className={cn(
                  "rounded-xl bg-muted/50 p-5 ring-1 ring-border/50 transition-all duration-500",
                  showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BrainCircuit className="h-4 w-4" />
                  </div>
                  <h3 className="font-headline text-lg font-bold text-foreground">
                    What It Is
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">{analysis.explanation}</p>
              </div>

              <div
                className={cn(
                  "rounded-xl bg-muted/50 p-5 ring-1 ring-border/50 transition-all duration-500 delay-150",
                  showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <h3 className="font-headline text-lg font-bold text-foreground">
                    Why It's Important
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">{analysis.importance}</p>
              </div>
            </div>
          ) : null}
        </div>

        <DialogFooter className="relative">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl px-6 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
