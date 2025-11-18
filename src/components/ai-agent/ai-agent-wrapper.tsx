'use client';

import { AIAgent } from './index';
import { createActionHandler } from './agent-actions';

export function AIAgentWrapper() {
  const handleAction = createActionHandler();

  return <AIAgent onAction={handleAction} />;
}
