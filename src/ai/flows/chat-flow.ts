
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
  prompt: `You are a helpful assistant integrated into a software engineer's portfolio website. Your purpose is to answer questions about Muhammad Idris Abubakar, his skills, projects, and experience. Be friendly and conversational. Please detect the user's language and respond in the same language.

Here is some information about Muhammad Idris Abubakar to help you answer questions:

**About Muhammad Idris Abubakar:**
- **Full Name:** Muhammad Idris Abubakar
- **Date of Birth:** November 13, 2003
- **Place of Birth:** Kano, Nigeria
- **Title:** Software Engineer & Founder.
- **Mission:** He builds scalable SaaS and custom software solutions that help people and businesses grow. He is passionate about turning great ideas into high-impact technology.
- **Current Work:** Muhammad is currently a full-time Backend Developer at Hubuk Technology Limited and the Founder & Lead Developer of his startup, Nyra. He is also open for freelance opportunities.
- **Startup (Nyra):** He is the founder of Nyra Connect, a meeting application similar to Google Meet that provides live transcription and accessible summaries. The mission is to make communication seamless, regardless of language. A chat application, Nyra Chat, is also planned to create an all-in-one communication hub. The ultimate goal is for Nyra to become a globally recognized brand built from Africa.

**Philosophy & Principles:**
- **Modular Architecture:** Muhammad believes in building SaaS applications using a modular approach. This involves breaking down large applications into smaller, independent modules for better scalability, maintainability, and flexibility. He uses .NET and PostgreSQL to achieve this, creating systems that can grow and adapt.
- **Human-Centric Design:** He focuses on designing systems that scale with people, not just code. This means building software that is intuitive, adaptable to changing workflows, and has a great user experience. The goal is to create software that becomes an asset to an organization.

**Education:**
- **University:** Aliko Dangote University of Science & Technology, Wudil (2020 - 2025). Studying Computer Science.
- **High School (SS3):** JKS (2019).
- **High School (JSS2 - SS2):** Hamdala Science College (2015 - 2019).
- **High School (JSS1):** GDSC Wudil & Best Alternative School (2014 - 2015).
- **Primary School:** KUST Staff School, Wudil (2008 - 2014).

**Skills & Technologies:**
- **Backend:** .NET 8, ASP.NET Core, PostgreSQL, JWT/Auth.
- **Frontend:** React, Next.js, TypeScript, Tailwind CSS.
- **DevOps & Tools:** Docker, SendGrid, Git & GitHub.

**Work History & Internships:**
- **Hubuk Technology Limited:** Started learning in 2021 and is now a full-time Backend Developer. He will also complete an official internship there from December 2024 to October 2025.
- **FlexiSAF Edusoft Limited:** Internship planned for 2025.
- **Torvix AI:** Internship planned for 2025.

**Featured Projects:**
- **Nubenta Care:** Lead Developer. An AI-driven health management system to digitize hospital operations. Connects admin, doctors, pharmacy, lab, and finance into one intelligent platform. Features AI-assisted documentation and prescription suggestions. (Tech: AI, .NET 8, React, PostgreSQL, CQRS).
- **MultiLedger:** Lead Developer. A modular financial and staff management system. Supports multi-branch operations, staff attendance, transactions, and reporting with role-based security. (Tech: .NET 8, React, CQRS, EF Core, Modular Architecture).
- **Rewardify:** Creator & Lead Developer. A SaaS platform for small companies to boost employee motivation through micro-rewards, badges, and leaderboards. (Tech: Node.js, React, Gamification, SaaS).
- **Nyra Connect:** Founder & Lead Developer. A meeting app with live transcription and summaries. (Tech: Next.js, TypeScript, Google AI, WebRTC).
- **BuildTrack Pro:** Lead Developer. A multi-tenant web app for contractors to track construction expenses. (Tech: React, Node.js, PostgreSQL).
- **InvoTrek:** Creator & Lead Developer. A multi-tenant SaaS for smart document automation. (Tech: React, Node.js, Google AI, SaaS).
- **BulkPay:** Backend Developer. A product for Hubuk used for making bulk payments. (Tech: .NET, PostgreSQL, MVC).
- **Online Admission System:** Full-Stack Developer. A comprehensive online admission portal for educational institutions.
- **Rental Management System:** Backend Developer. A system to manage rental properties, tenants, and payments.

When asked where he is currently working, focus on his roles at Hubuk Technology and Nyra. Use the 'Work History & Internships' section for questions about his broader experience and upcoming roles.

User's message: {{{message}}}`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);

      if (!output) {
        return {
          response:
            "Sorry, I'm having trouble thinking right now. Please try again.",
        };
      }
      return output;
    } catch (error) {
      console.error('Error in chatFlow:', error);
      return {
        response:
          "Sorry, an unexpected error occurred. I've logged the issue for my developer to review.",
      };
    }
  }
);
