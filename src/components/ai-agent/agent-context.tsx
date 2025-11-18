'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { Message, AgentAction, AgentState, ConversationContext } from './types';
import { agentConfig } from '@/lib/agent-config';
import { agentChat } from '@/ai/flows/agent-flow';
import { sendChatTranscriptEmail } from '@/ai/flows/send-email-flow';
import { textToSpeech } from '@/ai/flows/tts-flow';

interface AgentContextType {
  state: AgentState;
  conversationContext: ConversationContext;
  openAgent: () => void;
  closeAgent: () => void;
  sendMessage: (message: string) => Promise<void>;
  executeAction: (action: AgentAction) => void;
  generateAudio: (messageId: string, text: string) => Promise<string | undefined>;
  startListening: () => void;
  stopListening: () => void;
  setTranscript: (transcript: string) => void;
  transcript: string;
  speechSupported: boolean;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function useAgent() {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
}

interface AgentProviderProps {
  children: React.ReactNode;
  onAction?: (action: AgentAction) => void;
}

export function AgentProvider({ children, onAction }: AgentProviderProps) {
  // Initial message
  const initialMessage: Message = {
    id: 'init-1',
    role: 'assistant',
    content: agentConfig.greeting,
    timestamp: new Date(),
  };

  const [state, setState] = useState<AgentState>({
    isOpen: false,
    messages: [initialMessage],
    isLoading: false,
    isListening: false,
    hasEngaged: false,
    showProactive: false,
  });

  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    history: [],
    viewedProjects: [],
    interests: [],
  });

  const [transcript, setTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const proactiveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check for speech recognition support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognitionAPI) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) {
            setTranscript(prev => prev + finalTranscript);
          }
        };

        recognition.onend = () => {
          setState(prev => ({ ...prev, isListening: false }));
        };

        recognition.onerror = () => {
          setState(prev => ({ ...prev, isListening: false }));
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Proactive engagement timer
  useEffect(() => {
    if (!state.hasEngaged && !state.isOpen) {
      proactiveTimerRef.current = setTimeout(() => {
        setState(prev => ({ ...prev, showProactive: true }));
      }, agentConfig.proactiveDelay);
    }

    return () => {
      if (proactiveTimerRef.current) {
        clearTimeout(proactiveTimerRef.current);
      }
    };
  }, [state.hasEngaged, state.isOpen]);

  const openAgent = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: true,
      hasEngaged: true,
      showProactive: false,
    }));

    if (proactiveTimerRef.current) {
      clearTimeout(proactiveTimerRef.current);
    }
  }, []);

  const closeAgent = useCallback(() => {
    // Send transcript if there was interaction before clearing
    if (state.messages.length > 1) {
      const transcriptText = state.messages
        .map(m => `${m.role === 'user' ? 'User' : 'AI Assistant'}: ${m.content}`)
        .join('\n\n');

      sendChatTranscriptEmail({ transcript: transcriptText })
        .then(response => {
          if (response.success) {
            console.log('Chat transcript sent successfully.');
          }
        })
        .catch(error => console.error('Error sending chat transcript:', error));
    }

    // Reset chat to initial state with fresh greeting
    const freshMessage: Message = {
      id: `init-${Date.now()}`,
      role: 'assistant',
      content: agentConfig.greeting,
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      isOpen: false,
      messages: [freshMessage],
      isLoading: false,
      isListening: false,
    }));

    // Reset conversation context
    setConversationContext({
      history: [],
      viewedProjects: [],
      interests: [],
    });
  }, [state.messages]);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim() || state.isLoading) return;

    // Stop listening if active
    if (recognitionRef.current && state.isListening) {
      recognitionRef.current.stop();
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      isListening: false,
    }));

    // Update conversation context
    const newHistory: Array<{ role: 'user' | 'assistant'; content: string }> = [
      ...conversationContext.history,
      { role: 'user', content: message },
    ];

    try {
      const result = await agentChat({
        message,
        history: newHistory,
        context: {
          currentSection: conversationContext.currentSection,
          viewedProjects: conversationContext.viewedProjects,
        },
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.response,
        timestamp: new Date(),
        actions: result.actions,
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));

      setConversationContext(prev => ({
        ...prev,
        history: [
          ...newHistory,
          { role: 'assistant' as const, content: result.response },
        ],
      }));
    } catch (error) {
      console.error('Error in agent chat:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again or use the contact form.",
        timestamp: new Date(),
        actions: [{
          type: 'open_contact',
          label: 'Open Contact Form',
        }],
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false,
      }));
    }

    setTranscript('');
  }, [state.isLoading, state.isListening, conversationContext]);

  const executeAction = useCallback((action: AgentAction) => {
    // Track viewed projects
    if (action.type === 'show_project' && action.payload?.projectId) {
      setConversationContext(prev => ({
        ...prev,
        viewedProjects: [...new Set([...prev.viewedProjects, action.payload!.projectId])],
      }));
    }

    // Track current section
    if (action.type === 'scroll_to_section' && action.payload?.section) {
      setConversationContext(prev => ({
        ...prev,
        currentSection: action.payload!.section,
      }));
    }

    // Call external action handler
    if (onAction) {
      onAction(action);
    }
  }, [onAction]);

  const generateAudio = useCallback(async (messageId: string, text: string): Promise<string | undefined> => {
    try {
      const result = await textToSpeech({ text });
      return result.audioDataUri;
    } catch (error) {
      console.error('TTS generation failed:', error);
      return undefined;
    }
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !state.isListening) {
      setTranscript('');
      recognitionRef.current.start();
      setState(prev => ({ ...prev, isListening: true }));
    }
  }, [state.isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && state.isListening) {
      recognitionRef.current.stop();
      setState(prev => ({ ...prev, isListening: false }));
    }
  }, [state.isListening]);

  const value: AgentContextType = {
    state,
    conversationContext,
    openAgent,
    closeAgent,
    sendMessage,
    executeAction,
    generateAudio,
    startListening,
    stopListening,
    setTranscript,
    transcript,
    speechSupported,
  };

  return (
    <AgentContext.Provider value={value}>
      {children}
    </AgentContext.Provider>
  );
}
