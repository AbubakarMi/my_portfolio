
'use server';

/**
 * @fileOverview Provides an AI flow to analyze and explain a technical skill.
 *
 * - analyzeSkill - Analyzes a skill and provides an explanation and its importance.
 * - AnalyzeSkillInput - The input type for the analyzeSkill function.
 * - AnalyzeSkillOutput - The return type for the analyzeSkill function.
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
  async (input, streamingCallback) => {
    const maxRetries = 2;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const {output} = await prompt(input);
        if (!output) throw new Error('No output from AI');
        return output; // On success, return the output and exit the function.
      } catch (error: any) {
        attempt++;
        if (attempt >= maxRetries) {
          console.error(`Failed to analyze skill "${input.skill}" after ${maxRetries} attempts.`, error);
          // Re-throw a user-friendly error on the final attempt.
          throw new Error(
            `I'm currently experiencing high demand and couldn't generate the analysis. Please try again in a moment.`
          );
        }
        // Wait for a short period before retrying
        await new Promise(resolve => setTimeout(resolve, 500 * attempt));
      }
    }
     // This should not be reached if the loop logic is correct, but it's a safe fallback.
     throw new Error(
      `I'm currently experiencing high demand and couldn't generate the analysis. Please try again in a moment.`
    );
  }
);
