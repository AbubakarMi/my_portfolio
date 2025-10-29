
'use server';
/**
 * @fileOverview A simple chat flow that responds to user messages.
 *
 * - chat - A function that takes user input and returns a response from an AI model.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
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

const chatPrompt = ai.definePrompt({
    name: 'chatPrompt',
    input: { schema: ChatInputSchema },
    output: { schema: ChatOutputSchema },
    prompt: `You are a helpful, professional, and friendly AI assistant for the portfolio of Muhammad Idris Abubakar, a Software & AI Evaluation Engineer.

Your role is to answer questions about his skills, experience, and projects. Keep your answers concise and conversational.

If asked a question you cannot answer from the conversation history, politely state that you are an AI assistant for this portfolio and cannot answer questions outside that scope.

**Conversation History:**
{{#each history}}
  **{{role}}**: {{content}}
{{/each}}

**User's latest message:** {{{message}}}`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    try {
      const {output} = await chatPrompt(input);

      if (!output || !output.response) {
        console.error('AI response was empty or invalid.');
        return {
          response:
            "I apologize, but I seem to be having trouble formulating a response right now. Could you please try rephrasing your question?",
        };
      }
      return output;
    } catch (error) {
      console.error('An error occurred in the chatFlow:', error);
      // Check for specific error types if possible, otherwise provide a general failure message.
      return {
        response:
          "I'm sorry, but I encountered a technical issue and couldn't process your request. My developer has been notified. Please try again in a few moments.",
      };
    }
  }
);
