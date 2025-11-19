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
    <Card className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] shadow-2xl rounded-3xl overflow-hidden flex flex-col border-0 ring-1 ring-white/10 animate-in slide-in-from-bottom-5 duration-300">
      {/* Header with premium gradient */}
      <div className="relative flex items-center justify-between p-5 bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative flex items-center gap-4">
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
              <Zap className="h-6 w-6" />
            </div>
            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-400 border-2 border-primary shadow-lg shadow-green-400/50">
              <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
            </span>
          </div>
          <div>
            <h3 className="font-bold text-base tracking-tight">Muhammad's AI</h3>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              <p className="text-xs text-primary-foreground/80">Online now</p>
            </div>
          </div>
        </div>
        <div className="relative flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-primary-foreground hover:bg-white/20 rounded-xl transition-all hover:scale-105"
            onClick={() => setIsMinimized(true)}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-primary-foreground hover:bg-white/20 rounded-xl transition-all hover:scale-105"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-background to-muted/20" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
                message.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-sm",
                message.role === 'user'
                  ? "bg-primary text-primary-foreground"
                  : "bg-gradient-to-br from-primary/10 to-primary/5 text-primary ring-1 ring-primary/20"
              )}>
                {message.role === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
              </div>
              <div className={cn(
                "rounded-2xl px-4 py-3 max-w-[80%] text-sm shadow-sm",
                message.role === 'user'
                  ? "bg-primary text-primary-foreground rounded-tr-md"
                  : "bg-card text-foreground rounded-tl-md ring-1 ring-border/50"
              )}>
                <div className="whitespace-pre-wrap leading-relaxed">
                  {message.content.split('\n').map((line, i) => {
                    // Handle bold text
                    const parts = line.split(/(\*\*[^*]+\*\*)/g);
                    return (
                      <div key={i} className={i > 0 ? "mt-1" : ""}>
                        {parts.map((part, j) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>;
                          }
                          return part;
                        })}
                      </div>
                    );
                  })}
                </div>
                <div className={cn(
                  "mt-1 text-[10px]",
                  message.role === 'user' ? "text-primary-foreground/60" : "text-muted-foreground"
                )}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary ring-1 ring-primary/20">
                <Sparkles className="h-4 w-4 animate-pulse" />
              </div>
              <div className="rounded-2xl rounded-tl-md bg-card px-4 py-3 ring-1 ring-border/50 shadow-sm">
                <div className="flex gap-1.5 items-center">
                  <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick actions - show only if few messages */}
        {messages.length <= 2 && !isTyping && (
          <div className="mt-6 space-y-3">
            <p className="text-xs text-muted-foreground text-center font-medium">Quick questions</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs h-8 px-4 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all hover:scale-105 shadow-sm"
                  onClick={() => handleQuickAction(action.query)}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border/50 bg-card">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 h-12 rounded-2xl border-border/50 bg-muted/30 pl-4 pr-4 shadow-inner focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-background transition-all"
              disabled={isTyping}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            size="icon"
            className="h-12 w-12 rounded-2xl shrink-0 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Powered by Muhammad</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
