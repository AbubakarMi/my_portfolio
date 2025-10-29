
'use server';

/**
 * @fileOverview Provides an AI flow to analyze and explain a technical skill.
 *
 * - analyzeSkill - Analyzes a skill and provides an explanation and its importance.
 * - AnalyzeSkillInput - The input type for the analyzeSkill function.
 * - AnalyzeSkillOutput - The return type for the analyzeSkill function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  return analyzeSkillFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSkillPrompt',
  input: {schema: AnalyzeSkillInputSchema},
  output: {schema: AnalyzeSkillOutputSchema},
  prompt: `You are an expert tech analyst providing insights for a software engineer's portfolio.
  A user has requested an analysis of the skill: {{{skill}}}.

  Your task is to provide two things:
  1. A clear, concise explanation of what this skill/technology is.
  2. A brief summary of why this skill is important and relevant in the modern tech industry.

  Keep your tone professional and informative. The audience might be a recruiter or a fellow engineer. Do not mention the user or the request. Just provide the analysis.
  `,
});

const analyzeSkillFlow = ai.defineFlow(
  {
    name: 'analyzeSkillFlow',
    inputSchema: AnalyzeSkillInputSchema,
    outputSchema: AnalyzeSkillOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
