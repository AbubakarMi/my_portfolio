
'use server';

/**
 * @fileOverview A flow to generate a concise, professional summary of a portfolio project or a skill.
 *
 * - summarizeProject - Generates a summary script for a given project.
 * - SummarizeProjectInput - The input type for the summarizeProject function.
 * - SummarizeProjectOutput - The return type for the summarizeProject function.
 * 
 * - summarizeSkill - Generates a summary for a given skill.
 * - SummarizeSkillInput - The input type for the summarizeSkill function.
 * - SummarizeSkillOutput - The return type for the summarizeSkill function.
 */

import {ai} from '@/ai/genkit';
import { googleAI } from '@genkit-ai/google-genai';
import {z} from 'zod';

// For Project Summarization
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

// For Skill Analysis (New)
const SummarizeSkillInputSchema = z.object({
  skill: z.string().describe('The technical skill or technology to be analyzed.'),
});
export type SummarizeSkillInput = z.infer<typeof SummarizeSkillInputSchema>;

const SummarizeSkillOutputSchema = z.object({
  explanation: z
    .string()
    .describe('A concise explanation of what the skill or technology is.'),
  importance: z
    .string()
    .describe('A brief on why this skill is important in modern software/AI development.'),
});
export type SummarizeSkillOutput = z.infer<typeof SummarizeSkillOutputSchema>;


export async function summarizeProject(
  input: SummarizeProjectInput
): Promise<SummarizeProjectOutput> {
  return summarizeProjectFlow(input);
}

export async function summarizeSkill(
  input: SummarizeSkillInput
): Promise<SummarizeSkillOutput> {
  return summarizeSkillFlow(input);
}

const projectPrompt = ai.definePrompt({
  name: 'summarizeProjectPrompt',
  input: {schema: SummarizeProjectInputSchema},
  output: {schema: SummarizeProjectOutputSchema},
  model: googleAI.model('gemini-1.5-flash'),
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

const skillPrompt = ai.definePrompt({
  name: 'summarizeSkillPrompt',
  input: {schema: SummarizeSkillInputSchema},
  output: {schema: SummarizeSkillOutputSchema},
  model: googleAI.model('gemini-1.5-flash'),
  prompt: `You are an expert tech analyst providing insights for a software engineer's portfolio.
  A user has requested an analysis of the skill: {{{skill}}}.

  Your task is to provide two things:
  1. A clear, concise explanation of what this skill/technology is.
  2. A brief summary of why this skill is important and relevant in the modern tech industry.

  Keep your tone professional and informative. The audience might be a recruiter or a fellow engineer. Do not mention the user or the request. Just provide the analysis.
  `,
});


const summarizeProjectFlow = ai.defineFlow(
  {
    name: 'summarizeProjectFlow',
    inputSchema: SummarizeProjectInputSchema,
    outputSchema: SummarizeProjectOutputSchema,
  },
  async (input) => {
    const {output} = await projectPrompt(input);
    if (!output) throw new Error('No output from AI');
    return output;
  }
);

const summarizeSkillFlow = ai.defineFlow(
  {
    name: 'summarizeSkillFlow',
    inputSchema: SummarizeSkillInputSchema,
    outputSchema: SummarizeSkillOutputSchema,
  },
  async (input) => {
     const {output} = await skillPrompt(input);
     if (!output) throw new Error('No output from AI');
     return output;
  }
);
