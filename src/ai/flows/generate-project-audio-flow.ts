
'use server';

/**
 * @fileOverview A flow to generate a project summary and convert it to speech.
 *
 * - generateProjectAudio - Generates an audio summary for a project.
 * - GenerateProjectAudioInput - Input type.
 * - GenerateProjectAudioOutput - Output type.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/google-genai';
import wav from 'wav';


// Define Input Schemas
const SummarizeProjectInputSchema = z.object({
  title: z.string().describe('The title of the project.'),
  description: z.string().describe('A detailed description of the project.'),
  tech: z.array(z.string()).describe('The list of technologies used in the project.'),
});

const TextToSpeechInputSchema = z.object({
  text: z.string().describe('The text to be converted to speech.'),
});

export type GenerateProjectAudioInput = z.infer<typeof SummarizeProjectInputSchema>;


// Define Output Schemas
const SummarizeProjectOutputSchema = z.object({
  summaryScript: z.string().describe('A concise, professional, engaging script summarizing the project.'),
});

const TextToSpeechOutputSchema = z.object({
  audioDataUri: z.string().describe('The generated audio as a WAV file encoded in a data URI.'),
});

export type GenerateProjectAudioOutput = z.infer<typeof TextToSpeechOutputSchema>;


// Create Prompts & TTS models
const summaryPrompt = ai.definePrompt({
  name: 'summarizeProjectForAudioPrompt',
  input: { schema: SummarizeProjectInputSchema },
  output: { schema: SummarizeProjectOutputSchema },
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

const ttsModel = googleAI.model('gemini-2.5-flash-preview-tts');


// Main exported function
export async function generateProjectAudio(
  input: GenerateProjectAudioInput
): Promise<GenerateProjectAudioOutput> {
  return generateProjectAudioFlow(input);
}


// Helper to convert PCM to WAV
async function toWav(pcmData: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels: 1,
      sampleRate: 24000,
      bitDepth: 16,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => bufs.push(d));
    writer.on('end', () => resolve(Buffer.concat(bufs).toString('base64')));

    writer.write(pcmData);
    writer.end();
  });
}


// The main Genkit Flow
const generateProjectAudioFlow = ai.defineFlow(
  {
    name: 'generateProjectAudioFlow',
    inputSchema: SummarizeProjectInputSchema,
    outputSchema: TextToSpeechOutputSchema,
  },
  async (input) => {
    const maxRetries = 2;
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            // Step 1: Generate the summary script
            const { output: summaryOutput } = await summaryPrompt(input);
            if (!summaryOutput?.summaryScript) {
                throw new Error('Failed to generate summary script.');
            }

            // Step 2: Convert the script to speech
            const { media } = await ai.generate({
                model: ttsModel,
                config: {
                    responseModalities: ['AUDIO'],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: { voiceName: 'Algenib' },
                        },
                    },
                },
                prompt: summaryOutput.summaryScript,
            });

            if (!media?.url) {
                throw new Error('No audio was generated from the text.');
            }

            const audioBuffer = Buffer.from(
                media.url.substring(media.url.indexOf(',') + 1),
                'base64'
            );

            // Step 3: Convert PCM audio to WAV format
            const wavBase64 = await toWav(audioBuffer);

            return {
                audioDataUri: `data:audio/wav;base64,${wavBase64}`,
            };
        } catch (error: any) {
            attempt++;
            console.error(`Attempt ${attempt}: Failed to generate project audio for "${input.title}".`, error);

            if (attempt >= maxRetries) {
                 throw new Error(
                    `I'm currently experiencing high demand and couldn't generate the summary. Please try again in a moment.`
                );
            }
            await new Promise(resolve => setTimeout(resolve, 500 * attempt));
        }
    }

    // This should not be reachable, but is a fallback.
    throw new Error(`Failed to generate audio for "${input.title}" after all retries.`);
  }
);

    