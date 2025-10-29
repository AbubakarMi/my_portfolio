
'use server';
import { ai } from '@/ai/genkit';
import { type Message, type Role } from 'genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/google-genai';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  message: z.string().describe("The user's latest message."),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe("The AI's response."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const portfolioContext = `
      Professional Summary:
      Analytical and detail-driven Software & AI Evaluation Engineer with 4+ years of experience building scalable systems, conducting AI evaluation workflows, and designing SaaS applications. Proficient in Python, Java, JavaScript, C#, and React, with strong knowledge of QA testing, NLP annotation, and LLM prompt evaluation. Founder of Nyra Startup.

      About Nyra Startup:
      Nyra is an AI-powered communication and productivity platform designed to break language barriers and make collaboration effortless. It enables live translation, transcription, and generates summaries and action points after meetings. The vision is to become a global, all-in-one productivity platform for chat, meetings, and collaboration, built from Africa. The future roadmap includes Nyra Chat, an integrated hub for messaging, groups, and meetings with real-time translation.

      Core Competencies:
      - LLM Evaluation & Prompt Testing
      - QA Scenario Design & Reproducibility
      - NLP Annotation & Data Labeling
      - JSON/YAML Scenario Modeling
      - Full-Stack Development (React, Node.js, .NET, Java)
      - Clean Architecture & API Design
      - PostgreSQL Optimization

      Work Experience:
      - Software Engineer at Hubuk Technology Limited (June 2022 – Present): Designed modular REST APIs with ASP.NET Core 8 & PostgreSQL, improving efficiency by 25%. Developed automated QA scripts for AI models.
      - Freelance AI/QA Contributor (2024 – Present): Evaluated LLM outputs, authored test cases using JSON/YAML, and applied metrics like precision and recall.

      Internship Experience:
      - Backend Engineering Intern at FlexiSAF Solutions Limited (Sept 2025 – Dec 2025): Assisted in backend development with Java and Spring.
      - Frontend Developer Intern at Torvix AI (Nov 2025 – Dec 2025): Built responsive UIs and integrated APIs for AI model visualization.

      Key Projects:
      - Nyra Connect: AI productivity app with journals and insights. (.NET 8, React, PostgreSQL)
      - InvoTrek: Multi-tenant SaaS for smart document automation with AI-assisted field detection. (Node.js, PostgreSQL)
      - BuildTrack Pro: Construction expense tracking platform for contractors. (React, Node.js)
      - Nubenta Care: AI-driven health management system for hospitals, featuring smart consultations and prescription suggestions. (Node.js, PostgreSQL, AI/NLP)
      - Adustech Bus Tracker: Real-time bus booking and tracking platform. (Node.js, Firebase)
      - SmartEd ERP: Comprehensive school management system. (ASP.NET Core 8, PostgreSQL)

      Education:
      - B.Sc. (Hons) Computer Science from Aliko Dangote University of Science and Technology (2020 – 2025).

      Technical Skills:
      - Languages: Python, Java, JavaScript, C#, SQL, TypeScript
      - Frameworks: ASP.NET Core, Node.js, Express, React, Next.js
      - Databases: PostgreSQL, MongoDB, Firebase Firestore
      - AI/Testing: LLM Evaluation, QA Design, Precision/Recall Metrics
    `;

    const systemPrompt = `You are a helpful, professional, and friendly AI assistant for the portfolio of Muhammad Idris Abubakar. Your role is to answer questions about his skills, experience, and projects based on the context provided below.

      Your responses MUST be plain text only. Do NOT use any markdown formatting, such as asterisks for bolding or lists.

      Keep your answers concise and conversational. If asked a question you cannot answer from the provided context or the conversation history, politely state that you are an AI assistant for this portfolio and cannot answer questions outside that scope.

      **CRITICAL PRIVACY RULE:** If a user asks for Muhammad's contact information (like his email or phone number), you MUST NOT provide it. Instead, you MUST politely inform the user that you cannot share his personal details, but they can leave their own contact information in the chat, and he will get back to them.

      CONTEXT:
      ${portfolioContext}
    `;

    const history: Message[] = input.history.map(h => ({
      role: h.role as Role,
      content: [{ text: h.content }],
    }));

    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const response = await ai.generate({
          model: googleAI.model('gemini-1.5-flash'),
          history,
          prompt: input.message,
          system: systemPrompt,
        });

        const responseText = response.text;
        return {
          response: responseText ?? "I'm sorry, I couldn't generate a response. Please try again.",
        };
      } catch (error: any) {
        attempt++;
        if (attempt >= maxRetries) {
          console.error(`Chat flow failed after ${maxRetries} attempts:`, error);
          throw new Error("I'm currently experiencing high demand and can't respond. Please try again in a moment.");
        }
        // Exponential backoff: 1s, 2s
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
    
    // This should not be reached, but as a fallback:
    throw new Error("I'm currently experiencing high demand and can't respond. Please try again in a moment.");
  }
);
