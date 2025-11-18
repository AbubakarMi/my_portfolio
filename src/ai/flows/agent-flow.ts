'use server';

import { processMessage } from '@/ai/custom-agent';

// Type definitions
interface AgentAction {
  type: string;
  payload?: Record<string, string>;
  label: string;
}

interface AgentInput {
  message: string;
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
  context?: {
    currentSection?: string;
    viewedProjects?: string[];
  };
}

interface AgentOutput {
  response: string;
  actions?: AgentAction[];
  suggestions?: string[];
}

// Main export function for the agent
export async function agentChat(input: AgentInput): Promise<AgentOutput> {
  try {
    // Use custom AI engine - no external API needed
    const result = processMessage({
      message: input.message,
      history: input.history,
      context: input.context,
    });

    // Map actions to the correct format
    const actions: AgentAction[] | undefined = result.actions?.map(action => ({
      type: action.type as AgentAction['type'],
      payload: action.payload,
      label: action.label,
    }));

    return {
      response: result.response,
      actions: actions && actions.length > 0 ? actions : undefined,
      suggestions: result.suggestions,
    };
  } catch (error) {
    console.error('Agent error:', error);

    // Fallback response
    return {
      response: "I can help you learn about Muhammad's skills, projects, and experience. What would you like to know?",
      suggestions: ['What are his skills?', 'Show me projects', 'Is he available for hire?'],
    };
  }
}
