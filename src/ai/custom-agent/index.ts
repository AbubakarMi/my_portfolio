// Custom AI Agent Engine
// A self-contained AI agent that doesn't require external APIs

import { recognizeIntent, IntentResult } from './intent-engine';
import { generateResponse, GeneratedResponse } from './response-generator';

export interface AgentMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface CustomAgentInput {
  message: string;
  history?: AgentMessage[];
  context?: {
    currentSection?: string;
    viewedProjects?: string[];
  };
}

export interface CustomAgentOutput {
  response: string;
  actions?: Array<{
    type: string;
    payload?: Record<string, string>;
    label: string;
  }>;
  suggestions?: string[];
  intent: string;
  confidence: number;
}

// Main agent function
export function processMessage(input: CustomAgentInput): CustomAgentOutput {
  const { message, history = [], context } = input;

  // Recognize intent from the message
  const intentResult = recognizeIntent(message);

  // Check conversation history for context
  const enhancedIntent = enhanceWithHistory(intentResult, history);

  // Generate response
  const response = generateResponse(enhancedIntent, message);

  // Add contextual actions based on context
  const finalActions = addContextualActions(response.actions || [], context);

  return {
    response: response.text,
    actions: finalActions.length > 0 ? finalActions : undefined,
    suggestions: response.suggestions,
    intent: enhancedIntent.intent,
    confidence: enhancedIntent.confidence,
  };
}

// Enhance intent recognition with conversation history
function enhanceWithHistory(intent: IntentResult, history: AgentMessage[]): IntentResult {
  if (history.length === 0) return intent;

  // If confidence is low, check if it's a follow-up question
  if (intent.confidence < 30 && history.length > 0) {
    const lastAssistantMessage = [...history].reverse().find(m => m.role === 'assistant');
    const lastUserMessage = [...history].reverse().find(m => m.role === 'user');

    if (lastAssistantMessage && lastUserMessage) {
      // Check for follow-up patterns
      const message = intent.entities;
      const lastContent = lastAssistantMessage.content.toLowerCase();

      // If last response was about projects and user says "yes" or "tell me more"
      if (lastContent.includes('project') && /\b(yes|sure|tell me|more|details)\b/i.test(lastUserMessage.content)) {
        return { ...intent, intent: 'projects', confidence: 60 };
      }

      // If last response was about skills
      if (lastContent.includes('skill') && /\b(yes|sure|show|list)\b/i.test(lastUserMessage.content)) {
        return { ...intent, intent: 'skills', confidence: 60 };
      }
    }
  }

  return intent;
}

// Add contextual actions based on what the user has viewed
function addContextualActions(
  actions: GeneratedResponse['actions'],
  context?: CustomAgentInput['context']
): NonNullable<GeneratedResponse['actions']> {
  const finalActions = [...(actions || [])];

  // If user hasn't viewed projects and we're not already showing project action
  if (context && context.viewedProjects && context.viewedProjects.length === 0) {
    if (!finalActions.some(a => a.type === 'scroll_to_section' && a.payload?.section === 'projects')) {
      // Don't add - let the response handle it naturally
    }
  }

  return finalActions;
}

// Utility function to format response for display
export function formatResponse(output: CustomAgentOutput): string {
  return output.response;
}

// Export for testing
export { recognizeIntent } from './intent-engine';
export { generateResponse } from './response-generator';
export * from './knowledge-base';
