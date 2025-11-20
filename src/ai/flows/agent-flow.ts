'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/google-genai';
import { systemPrompt } from '@/lib/agent-config';

// Schema definitions
const ActionSchema = z.object({
  type: z.enum([
    'navigate',
    'scroll_to_section',
    'show_project',
    'open_contact',
    'download_resume',
    'book_meeting',
    'filter_projects',
    'highlight_skill',
  ]),
  payload: z.record(z.string()).optional(),
  label: z.string(),
});

const AgentInputSchema = z.object({
  message: z.string().describe("The user's message"),
  history: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string(),
    })
  ).describe('Conversation history'),
  context: z.object({
    currentSection: z.string().optional(),
    viewedProjects: z.array(z.string()).optional(),
  }).optional(),
});

const AgentOutputSchema = z.object({
  response: z.string().describe('The agent response text'),
  actions: z.array(ActionSchema).optional().describe('Suggested actions for the user'),
  suggestions: z.array(z.string()).optional().describe('Follow-up question suggestions'),
});

export type AgentInput = z.infer<typeof AgentInputSchema>;
export type AgentOutput = z.infer<typeof AgentOutputSchema>;

// Action detection patterns
const actionPatterns = {
  navigate: {
    about: /\b(about|background|who|introduce)\b/i,
    skills: /\b(skills?|technologies?|tech stack|programming|languages?)\b/i,
    experience: /\b(experience|work|career|jobs?|employment)\b/i,
    projects: /\b(projects?|portfolio|work samples?|examples?)\b/i,
    blog: /\b(blog|articles?|posts?|writing)\b/i,
    contact: /\b(contact|reach|email|message|hire|work with)\b/i,
  },
  projects: {
    'nyra-connect': /\b(nyra|translation|productivity|startup)\b/i,
    'invotrek': /\b(invotrek|invoice|document|automation)\b/i,
    'buildtrack-pro': /\b(buildtrack|construction|expense|contractor)\b/i,
    'nubenta-care': /\b(nubenta|health|hospital|medical)\b/i,
    'adustech-bus-tracker': /\b(bus|tracker|booking|transport)\b/i,
    'smarted-erp': /\b(smarted|school|erp|education)\b/i,
  },
};

type ActionType = z.infer<typeof ActionSchema>['type'];

interface DetectedAction {
  type: ActionType;
  payload?: Record<string, string>;
  label: string;
}

function detectActions(userMessage: string, response: string): DetectedAction[] {
  const actions: DetectedAction[] = [];
  const combinedText = `${userMessage} ${response}`.toLowerCase();

  // Check for contact intent
  if (/\b(contact|hire|work with|discuss|project|collaborate|reach out)\b/i.test(combinedText)) {
    actions.push({
      type: 'open_contact',
      label: 'Open Contact Form',
    });
  }

  // Check for project mentions
  for (const [projectId, pattern] of Object.entries(actionPatterns.projects)) {
    if (pattern.test(combinedText)) {
      actions.push({
        type: 'show_project',
        payload: { projectId },
        label: `View ${projectId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
      });
      break; // Only suggest one project at a time
    }
  }

  // Check for section navigation
  for (const [section, pattern] of Object.entries(actionPatterns.navigate)) {
    if (pattern.test(userMessage) && !actions.some(a => a.type === 'open_contact' && section === 'contact')) {
      actions.push({
        type: 'scroll_to_section',
        payload: { section },
        label: `Go to ${section.charAt(0).toUpperCase() + section.slice(1)}`,
      });
      break;
    }
  }

  // Limit to 2 actions max
  return actions.slice(0, 2);
}

function generateSuggestions(userMessage: string, response: string): string[] {
  const suggestions: string[] = [];
  const combinedText = `${userMessage} ${response}`.toLowerCase();

  if (combinedText.includes('project') || combinedText.includes('work')) {
    suggestions.push('What technologies were used?');
  }

  if (combinedText.includes('skill') || combinedText.includes('technolog')) {
    suggestions.push('Can you show me a project using this?');
  }

  if (combinedText.includes('experience') || combinedText.includes('work')) {
    suggestions.push('What are you currently working on?');
  }

  if (!combinedText.includes('available') && !combinedText.includes('hire')) {
    suggestions.push('Are you available for hire?');
  }

  return suggestions.slice(0, 2);
}

export async function agentChat(input: AgentInput): Promise<AgentOutput> {
  return agentFlow(input);
}

// Fallback responses for when AI is unavailable
const fallbackResponses: Record<string, string> = {
  greeting: "Hello! I'm Muhammad Idris Abubakar's AI assistant. While I'm having some connection issues, you can still explore the portfolio sections above or use the contact form to reach out directly.",
  skills: "Muhammad specializes in React, Next.js, Node.js, ASP.NET Core, and PostgreSQL. He also has experience with AI/ML evaluation and LLM integration. Feel free to explore the Skills section for more details.",
  projects: "Muhammad has worked on several projects including Nyra Connect (AI productivity app), InvoTrek (document automation), BuildTrack Pro (construction tracking), and more. Check out the Projects section to see them all.",
  experience: "Muhammad has 4+ years of experience as a Software & AI Evaluation Engineer at Hubuk Technology Limited, plus freelance AI/QA work. He's also the founder of Nyra Startup.",
  contact: "You can reach Muhammad through the contact form below. He's currently available for freelance projects and full-time opportunities.",
  availability: "Muhammad is currently available for freelance projects and full-time opportunities. He's open to remote work. Use the contact form to discuss your project needs.",
  default: "Thanks for your interest! While I'm having some technical issues, you can explore the portfolio sections above or use the contact form to reach Muhammad directly. He'll get back to you soon!",
};

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (/\b(hi|hello|hey|greetings)\b/.test(lowerMessage)) {
    return fallbackResponses.greeting;
  }
  if (/\b(skill|tech|stack|programming|language|framework)\b/.test(lowerMessage)) {
    return fallbackResponses.skills;
  }
  if (/\b(project|portfolio|work|built|created)\b/.test(lowerMessage)) {
    return fallbackResponses.projects;
  }
  if (/\b(experience|career|job|work history)\b/.test(lowerMessage)) {
    return fallbackResponses.experience;
  }
  if (/\b(contact|email|reach|message|hire)\b/.test(lowerMessage)) {
    return fallbackResponses.contact;
  }
  if (/\b(available|availability|freelance|hire|open)\b/.test(lowerMessage)) {
    return fallbackResponses.availability;
  }

  return fallbackResponses.default;
}

const agentFlow = ai.defineFlow(
  {
    name: 'agentFlow',
    inputSchema: AgentInputSchema,
    outputSchema: AgentOutputSchema,
  },
  async (input): Promise<AgentOutput> => {
    // Build conversation history for the prompt
    const historyText = input.history
      .map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`)
      .join('\n');

    // Add context to system prompt if available
    let contextualPrompt = systemPrompt;
    if (input.context?.currentSection) {
      contextualPrompt += `\n\nThe visitor is currently viewing the ${input.context.currentSection} section.`;
    }
    if (input.context?.viewedProjects?.length) {
      contextualPrompt += `\n\nThe visitor has already viewed these projects: ${input.context.viewedProjects.join(', ')}.`;
    }

    // Build full prompt with history
    const fullPrompt = historyText
      ? `${contextualPrompt}\n\nConversation so far:\n${historyText}\n\nUser: ${input.message}\n\nAssistant:`
      : `${contextualPrompt}\n\nUser: ${input.message}\n\nAssistant:`;

    const maxRetries = 5;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const result = await ai.generate({
          model: googleAI.model('gemini-2.5-flash'),
          prompt: fullPrompt,
        });

        const responseText = result.text || getFallbackResponse(input.message);

        // Detect relevant actions based on conversation
        const actions = detectActions(input.message, responseText);

        // Generate follow-up suggestions
        const suggestions = generateSuggestions(input.message, responseText);

        return {
          response: responseText,
          actions: actions.length > 0 ? actions : undefined,
          suggestions: suggestions.length > 0 ? suggestions : undefined,
        };
      } catch (error: unknown) {
        attempt++;
        console.error(`Agent flow attempt ${attempt} failed:`, error);

        if (attempt >= maxRetries) {
          // Return intelligent fallback instead of error message
          const fallbackResponse = getFallbackResponse(input.message);
          const actions = detectActions(input.message, fallbackResponse);

          return {
            response: fallbackResponse,
            actions: actions.length > 0 ? actions : [{
              type: 'open_contact',
              label: 'Contact Muhammad',
            }],
          };
        }
        // Exponential backoff with shorter delays
        await new Promise(resolve => setTimeout(resolve, 500 * attempt));
      }
    }

    // This should never be reached, but just in case
    return {
      response: getFallbackResponse(input.message),
      actions: [{
        type: 'open_contact',
        label: 'Contact Muhammad',
      }],
    };
  }
);
