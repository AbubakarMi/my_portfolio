// Agent Types and Interfaces

export type MessageRole = 'user' | 'assistant' | 'system';

export type ActionType =
  | 'navigate'
  | 'scroll_to_section'
  | 'show_project'
  | 'open_contact'
  | 'download_resume'
  | 'book_meeting'
  | 'filter_projects'
  | 'highlight_skill';

export interface AgentAction {
  type: ActionType;
  payload?: Record<string, string>;
  label: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  actions?: AgentAction[];
  audioDataUri?: string;
  isGeneratingAudio?: boolean;
}

export interface QuickAction {
  id: string;
  label: string;
  prompt: string;
  icon?: string;
}

export interface AgentConfig {
  name: string;
  greeting: string;
  proactiveGreeting: string;
  proactiveDelay: number;
  personality: string;
  quickActions: QuickAction[];
}

export interface AgentState {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  isListening: boolean;
  hasEngaged: boolean;
  showProactive: boolean;
}

export interface ConversationContext {
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
  currentSection?: string;
  viewedProjects: string[];
  interests: string[];
}

export interface AgentFlowInput {
  message: string;
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
  context?: {
    currentSection?: string;
    viewedProjects?: string[];
  };
}

export interface AgentFlowOutput {
  response: string;
  actions?: AgentAction[];
  suggestions?: string[];
}
