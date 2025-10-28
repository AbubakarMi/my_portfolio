'use server';

/**
 * @fileOverview Provides AI-powered personalized feedback based on user interactions on the portfolio.
 *
 * - analyzeUserInteraction - Analyzes user interactions and provides personalized content recommendations.
 * - AnalyzeUserInteractionInput - The input type for the analyzeUserInteraction function.
 * - AnalyzeUserInteractionOutput - The return type for the analyzeUserInteraction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeUserInteractionInputSchema = z.object({
  interactionType: z
    .string()
    .describe(
      'The type of user interaction, e.g., page visit, button click, form submission.'
    ),
  interactionDetails: z
    .string()
    .describe('Details about the interaction, e.g., page URL, button ID, form data.'),
  userHistory: z
    .string()
    .optional()
    .describe(
      'A summary of the user history on the website so far to provide context.'
    ),
});
export type AnalyzeUserInteractionInput = z.infer<
  typeof AnalyzeUserInteractionInputSchema
>;

const AnalyzeUserInteractionOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'Personalized content recommendations based on the user interaction.'
    ),
  adjustments: z
    .string()
    .describe(
      'Suggestions for dynamically adjusting the website content or layout.'
    ),
});
export type AnalyzeUserInteractionOutput = z.infer<
  typeof AnalyzeUserInteractionOutputSchema
>;

export async function analyzeUserInteraction(
  input: AnalyzeUserInteractionInput
): Promise<AnalyzeUserInteractionOutput> {
  return analyzeUserInteractionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeUserInteractionPrompt',
  input: {schema: AnalyzeUserInteractionInputSchema},
  output: {schema: AnalyzeUserInteractionOutputSchema},
  prompt: `You are an AI assistant that analyzes user interactions on a personal portfolio website and provides personalized content recommendations and website adjustments.

  Analyze the following user interaction:
  Type: {{{interactionType}}}
  Details: {{{interactionDetails}}}
  User History: {{{userHistory}}}

  Provide personalized content recommendations and suggestions for dynamically adjusting the website content or layout to improve user engagement and exploration.
  Consider what the user might be interested in based on their actions.
  Make sure the output is suitable for someone viewing a portfolio website for a software engineer.
  Format the output as follows:
  Recommendations: [personalized content recommendations]
  Adjustments: [suggestions for dynamically adjusting the website content or layout]`,
});

const analyzeUserInteractionFlow = ai.defineFlow(
  {
    name: 'analyzeUserInteractionFlow',
    inputSchema: AnalyzeUserInteractionInputSchema,
    outputSchema: AnalyzeUserInteractionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
