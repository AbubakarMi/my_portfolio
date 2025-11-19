"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, User, Minimize2, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateResponse } from '@/lib/portfolio-ai-knowledge';
import { sendTranscriptAction } from '@/actions/send-transcript';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isSendingTranscript, setIsSendingTranscript] = useState(false);
  const [transcriptSent, setTranscriptSent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionIdRef = useRef<string>(`chat-${Date.now()}`);

  // Initial greeting message
  const initialMessage: ChatMessage = {
    id: 'welcome',
    role: 'assistant',
    content: "Hi! Great to have you here. I'm Muhammad's AI assistant. Whether you're curious about his tech stack, want to see his projects, or thinking about working together - I've got you covered. What would you like to explore?",
    timestamp: new Date()
  };

  // Initialize with greeting when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, [isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Send transcript when closing - prevent duplicates
  const handleClose = async () => {
    // Only send if there was interaction and transcript hasn't been sent yet
    if (hasInteracted && messages.length > 1 && !transcriptSent && !isSendingTranscript) {
      setIsSendingTranscript(true);

      try {
        await sendTranscriptAction({
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp.toISOString()
          })),
          sessionId: sessionIdRef.current
        });
        setTranscriptSent(true);
      } catch (error) {
        console.error('Failed to send transcript:', error);
      } finally {
        setIsSendingTranscript(false);
      }
    }

    setIsOpen(false);
    setIsMinimized(false);
    // Reset for next session
    setMessages([]);
    setHasInteracted(false);
    setTranscriptSent(false);
    // Generate new session ID for next conversation
    sessionIdRef.current = `chat-${Date.now()}`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setHasInteracted(true);
    setIsTyping(true);

    // Simulate typing delay for natural feel
    setTimeout(() => {
      const response = generateResponse(userMessage.content);

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 500 + Math.random() * 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Quick action buttons
  const quickActions = [
    { label: "Projects", query: "Tell me about his projects" },
    { label: "Skills", query: "What are his skills?" },
    { label: "Contact", query: "How can I contact him?" },
    { label: "Experience", query: "What's his experience?" }
  ];

  const handleQuickAction = (query: string) => {
    setInputValue(query);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {/* Pulse ring animation */}
        <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
        <Button
          onClick={() => setIsOpen(true)}
          className="relative h-14 w-14 rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-110 transition-all duration-300 bg-gradient-to-br from-primary to-primary/80"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chat</span>
          {/* Notification dot */}
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background">
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping" />
          </span>
        </Button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <Card className="fixed bottom-6 right-6 z-50 w-72 shadow-2xl rounded-2xl overflow-hidden">
        <div
          className="flex items-center justify-between p-4 bg-primary text-primary-foreground cursor-pointer"
          onClick={() => setIsMinimized(false)}
        >
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <span className="font-medium">AI Assistant</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] shadow-2xl rounded-3xl overflow-hidden flex flex-col border-0 ring-1 ring-border/50">
      {/* Header with gradient */}
      <div className="relative flex items-center justify-between p-4 bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground">
        {/* Decorative glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0" />

        <div className="relative flex items-center gap-3">
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm shadow-inner">
              <Zap className="h-5 w-5" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-primary shadow-lg shadow-green-400/50">
              <span className="absolute inset-0 rounded-full bg-green-400 animate-pulse" />
            </span>
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-tight">Muhammad's AI</h3>
            <p className="text-xs text-primary-foreground/80">Online - Ask me anything</p>
          </div>
        </div>
        <div className="relative flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:bg-white/20 rounded-lg transition-colors"
            onClick={() => setIsMinimized(true)}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:bg-white/20 rounded-lg transition-colors"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                message.role === 'user'
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}>
                {message.role === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
              </div>
              <div className={cn(
                "rounded-2xl px-4 py-2.5 max-w-[75%] text-sm",
                message.role === 'user'
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-muted text-foreground rounded-tl-sm"
              )}>
                <div className="whitespace-pre-wrap leading-relaxed">
                  {message.content.split('\n').map((line, i) => {
                    // Handle bold text
                    const parts = line.split(/(\*\*[^*]+\*\*)/g);
                    return (
                      <div key={i}>
                        {parts.map((part, j) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={j}>{part.slice(2, -2)}</strong>;
                          }
                          return part;
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick actions - show only if few messages */}
        {messages.length <= 2 && !isTyping && (
          <div className="mt-4 flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                className="rounded-full text-xs h-7 hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => handleQuickAction(action.query)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-gradient-to-t from-muted/50 to-background">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 h-11 rounded-xl border-border/50 bg-background shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            size="icon"
            className="h-11 w-11 rounded-xl shrink-0 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" />
          <span>Powered by Muhammad's Custom AI</span>
        </div>
      </div>
    </Card>
  );
}
