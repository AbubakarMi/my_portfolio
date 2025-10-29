
'use server';

/**
 * @fileOverview A flow to generate a concise, professional summary of a portfolio project.
 *
 * - summarizeProject - Generates a summary script for a given project.
 * - SummarizeProjectInput - The input type for the summarizeProject function.
 * - SummarizeProjectOutput - The return type for the summarizeProject function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const SummarizeProjectInputSchema = z.object({
  title: z.string().describe('The title of the project.'),
  description: z.string().describe('A detailed description of the project.'),
  tech: z
    .array(z.string())
    .describe('The list of technologies used in the project.'),
});
export type SummarizeProjectInput = z.infer<typeof SummarizeProjectInputSchema>;

const SummarizeProjectOutputSchema = z.object({
  summaryScript: z
    .string()
    .describe('A concise, professional, engaging script summarizing the project.'),
});
export type SummarizeProjectOutput = z.infer<
  typeof SummarizeProjectOutputSchema
>;

export async function summarizeProject(
  input: SummarizeProjectInput
): Promise<SummarizeProjectOutput> {
  return summarizeProjectFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeProjectPrompt',
  input: {schema: SummarizeProjectInputSchema},
  output: {schema: SummarizeProjectOutputSchema},
  prompt: `You are an expert technical project manager and communicator. Your task is to generate a short, engaging, and professional audio script (around 45-60 seconds) summarizing a software project for a portfolio.

The audience is a potential recruiter, hiring manager, or senior engineer. The tone should be confident and clear.

**Project Details:**
- **Title:** {{{title}}}
- **Description:** {{{description}}}
- **Technologies:** {{#each tech}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

**Instructions:**
1.  Start by introducing the project by its name.
2.  Briefly explain the problem it solves or its main purpose.
3.  Highlight 1-2 key features or technical achievements from the description.
4.  Mention some of the core technologies used to showcase technical skill.
5.  Conclude with the project's impact or outcome.

Do not use conversational language like "Hello" or "Thanks for listening". Just provide the script.
`,
});

const summarizeProjectFlow = ai.defineFlow(
  {
    name: 'summarizeProjectFlow',
    inputSchema: SummarizeProjectInputSchema,
    outputSchema: SummarizeProjectOutputSchema,
  },
  async (input) => {
    const maxRetries = 2;
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        const {output} = await prompt(input);
        if (!output) throw new Error('No output from AI');
        return output;
      } catch (error: any) {
        attempt++;
        if (attempt >= maxRetries) {
          console.error(`Failed to summarize project "${input.title}" after ${maxRetries} attempts.`, error);
          // Re-throw a user-friendly error on the final attempt.
          throw new Error(
            `I'm currently experiencing high demand and couldn't generate the summary. Please try again in a moment.`
          );
        }
        // Wait for a short period before retrying
        await new Promise(resolve => setTimeout(resolve, 500 * attempt));
      }
    }
     throw new Error(
      `I'm currently experiencing high demand and couldn't generate the summary. Please try again in a moment.`
    );
  }
);
