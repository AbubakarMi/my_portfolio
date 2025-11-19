'use server';

import { sendChatTranscript, type ChatMessage } from '@/lib/email-service';

export interface SendTranscriptActionInput {
  messages: {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }[];
  sessionId?: string;
  userInfo?: {
    name?: string;
    email?: string;
  };
}

export async function sendTranscriptAction(input: SendTranscriptActionInput) {
  // Convert timestamp strings back to Date objects
  const messages: ChatMessage[] = input.messages.map(msg => ({
    role: msg.role,
    content: msg.content,
    timestamp: new Date(msg.timestamp),
  }));

  const result = await sendChatTranscript({
    messages,
    sessionId: input.sessionId,
    userInfo: input.userInfo,
  });

  return result;
}
