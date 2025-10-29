
'use server';
/**
 * @fileOverview A simple chat flow that responds to user messages.
 *
 * - chat - A function that takes user input and returns a response from an AI model.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {type Message, type Role} from 'genkit';
import {z} from 'zod';

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
      content: [{text: h.content}],
    }));

    const response = await ai.generate({
      model: 'gemini-1.5-flash',
      history: history,
      prompt: input.message,
      system: systemPrompt,
    });

    const responseText = response.text;
    if (!responseText) {
       return {
        response:
          "I'm sorry, I couldn't generate a response. Please try again.",
      };
    }

    return {
      response: responseText,
    };
  }
);
