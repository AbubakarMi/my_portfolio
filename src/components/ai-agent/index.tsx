'use client';

import { AgentProvider } from './agent-context';
import { Agent } from './agent';
import { AgentAction } from './types';

interface AIAgentProps {
  onAction?: (action: AgentAction) => void;
}

export function AIAgent({ onAction }: AIAgentProps) {
  return (
    <AgentProvider onAction={onAction}>
      <Agent />
    </AgentProvider>
  );
}

export { AgentProvider, useAgent } from './agent-context';
export type { AgentAction, Message, AgentState } from './types';
