
'use server';

/**
 * @fileOverview This file is deprecated. The functionality has been moved to summarize-project-flow.ts
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AnalyzeSkillInputSchema = z.object({
  skill: z.string().describe('The technical skill or technology to be analyzed.'),
});
export type AnalyzeSkillInput = z.infer<typeof AnalyzeSkillInputSchema>;

const AnalyzeSkillOutputSchema = z.object({
  explanation: z
    .string()
    .describe('A concise explanation of what the skill or technology is.'),
  importance: z
    .string()
    .describe('A brief on why this skill is important in modern software/AI development.'),
});
export type AnalyzeSkillOutput = z.infer<typeof AnalyzeSkillOutputSchema>;

export async function analyzeSkill(
  input: AnalyzeSkillInput
): Promise<AnalyzeSkillOutput> {
  // This is a deprecated function. Return a soft error.
  return {
    explanation: "This feature has been updated.",
    importance: "Please refresh the page to use the new version of the skill analyzer."
  }
}
