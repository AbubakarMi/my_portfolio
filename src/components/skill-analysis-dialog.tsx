
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
import { Loader2, ServerCrash, Sparkles, BrainCircuit, BookOpen } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SkillAnalysisDialogProps {
  skillName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SkillAnalysisDialog({ skillName, open, onOpenChange }: SkillAnalysisDialogProps) {
  const [analysis, setAnalysis] = useState<SummarizeSkillOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      setAnalysis(null);
      setError(null);
      
      summarizeSkill({ skill: skillName })
        .then(setAnalysis)
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
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Analysis: {skillName}
          </DialogTitle>
        </DialogHeader>
        <div className="my-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-lg text-muted-foreground">Analyzing skill...</p>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <ServerCrash className="h-5 w-5" />
              <AlertTitle>Analysis Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : analysis ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="flex items-center gap-3 font-headline text-xl font-bold text-foreground">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                  What It Is
                </h3>
                <p className="text-base text-foreground/80">{analysis.explanation}</p>
              </div>
              <div className="space-y-2">
                <h3 className="flex items-center gap-3 font-headline text-xl font-bold text-foreground">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Why It's Important
                </h3>
                <p className="text-base text-foreground/80">{analysis.importance}</p>
              </div>
            </div>
          ) : null}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
