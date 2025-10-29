
'use server';

/**
 * @fileOverview A flow to generate audio summaries for all portfolio projects in a single batch.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { summarizeProject } from './summarize-project-flow';
import { textToSpeech } from './tts-flow';

const ProjectDetailSchema = z.object({
  title: z.string(),
  description: z.string(),
  tech: z.array(z.string()),
});

const GenerateAllProjectSummariesInputSchema = z.object({
  projects: z.array(ProjectDetailSchema),
});
export type GenerateAllProjectSummariesInput = z.infer<typeof GenerateAllProjectSummariesInputSchema>;

const ProjectSummaryOutputSchema = z.object({
  title: z.string(),
  audioDataUri: z.string(),
});

const GenerateAllProjectSummariesOutputSchema = z.array(ProjectSummaryOutputSchema);
export type GenerateAllProjectSummariesOutput = z.infer<typeof GenerateAllProjectSummariesOutputSchema>;

export async function generateAllProjectSummaries(
  input: GenerateAllProjectSummariesInput
): Promise<GenerateAllProjectSummariesOutput> {
  return generateAllProjectSummariesFlow(input);
}

const generateAllProjectSummariesFlow = ai.defineFlow(
  {
    name: 'generateAllProjectSummariesFlow',
    inputSchema: GenerateAllProjectSummariesInputSchema,
    outputSchema: GenerateAllProjectSummariesOutputSchema,
  },
  async ({ projects }) => {
    const summaryPromises = projects.map(project => 
      summarizeProject({
        title: project.title,
        description: project.description,
        tech: project.tech,
      }).then(summaryResult => ({...project, summaryScript: summaryResult.summaryScript}))
    );

    const projectsWithSummaries = await Promise.all(summaryPromises);

    const audioPromises = projectsWithSummaries.map(project => 
      textToSpeech({ text: project.summaryScript })
        .then(ttsResult => ({
          title: project.title,
          audioDataUri: ttsResult.audioDataUri,
        }))
    );

    const results = await Promise.all(audioPromises);
    return results;
  }
);
