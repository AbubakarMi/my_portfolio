'use server';
import { ai } from '@/ai/genkit';
import { type Message, type Role } from 'genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/google-genai';

// Force correct API version (optional but safe)
googleAI.configure({
  baseUrl: "https://generativelanguage.googleapis.com/v1",
});

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
    const systemPrompt = `You are a helpful, professional, and friendly AI assistant for the portfolio of Muhammad Idris Abubakar, a Software & AI Evaluation Engineer. Your role is to answer questions about his skills, experience, and projects. Keep your answers concise and conversational. If asked a question you cannot answer from the conversation history, politely state that you are an AI assistant for this portfolio and cannot answer questions outside that scope.`;

    const history: Message[] = input.history.map(h => ({
      role: h.role as Role,
      content: [{ text: h.content }],
    }));

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
  }
);
