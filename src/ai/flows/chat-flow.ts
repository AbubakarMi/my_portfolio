'use server';
/**
 * @fileOverview A simple chat flow that responds to user messages.
 *
 * - chat - A function that takes user input and returns a response from an AI model.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe("The user's message."),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe("The AI's response."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  prompt: `You are a helpful assistant integrated into a software engineer's portfolio website. Your purpose is to answer questions about Muhammad Idris Abubakar, his skills, projects, and experience. Be friendly and conversational.

Here is some information about Muhammad Idris Abubakar to help you answer questions:

**About Muhammad Idris Abubakar:**
- **Title:** Software Engineer & Founder.
- **Mission:** He builds scalable SaaS and custom software solutions that help people and businesses grow.
- **Education:** He is a Computer Science graduate from Aliko Dangote University of Science & Technology, Wudil.
- **Startup:** He is the founder of Nyra Connect, a meeting application similar to Google Meet that provides live transcription and accessible summaries. A chat application is also planned.
- **Freelance:** He also works as a freelance developer delivering top-tier solutions.

**Skills & Technologies:**
- **Backend:** .NET 8, ASP.NET Core, PostgreSQL, JWT/Auth.
- **Frontend:** React, Next.js, TypeScript, Tailwind CSS.
- **DevOps & Tools:** Docker, SendGrid, Git & GitHub.

**Work Experience:**
- **Hubuk Technology Limited:** Software Engineer (4+ Years).
- **Torvix AI:** Frontend Developer (Project-based).
- **FlexiSAF Edusoft Limited:** Backend Developer (Internship).

**Featured Projects:**
- **Nyra Connect:** Founder & Lead Developer. A meeting app with live transcription and summaries. (Tech: Next.js, TypeScript, Google AI, WebRTC).
- **BuildTrack Pro:** Lead Developer. A multi-tenant web app for contractors to track construction expenses. (Tech: React, Node.js, PostgreSQL).
- **InvoTrek:** Creator & Lead Developer. A multi-tenant SaaS for smart document automation. (Tech: React, Node.js, Google AI, SaaS).
- **Online Admission System:** Full-Stack & Lead Developer. A system for student admission applications. (Tech: Node.js, Express, MongoDB, EJS).
- **Rental Management System:** Full-Stack & Lead Developer. A system to rent houses, apartments, and event centers. (Tech: Node.js, Express, React, TypeScript).

Use this information to answer questions accurately.

User's message: {{{message}}}`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
