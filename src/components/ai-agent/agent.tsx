'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  X,
  Mic,
  MicOff,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useAgent } from './agent-context';
import { AssistantMessage, UserMessage, LoadingMessage, QuickActions } from './agent-message';
import { agentConfig } from '@/lib/agent-config';

export function Agent() {
  const {
    state,
    openAgent,
    closeAgent,
    sendMessage,
    startListening,
    stopListening,
    transcript,
    setTranscript,
    speechSupported,
  } = useAgent();

  const [input, setInput] = useState('');
  const viewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update input with speech transcript
  useEffect(() => {
    if (transcript) {
      setInput(prev => prev + transcript);
      setTranscript('');
    }
  }, [transcript, setTranscript]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [state.messages]);

  // Focus input when opened
  useEffect(() => {
    if (state.isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [state.isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const message = input.trim();
    setInput('');
    await sendMessage(message);
  };

  const handleQuickAction = async (prompt: string) => {
    setInput('');
    await sendMessage(prompt);
  };

  const handleMicClick = () => {
    if (state.isListening) {
      stopListening();
    } else {
      setInput('');
      startListening();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out",
          state.isOpen ? 'translate-x-[calc(100%+2rem)] opacity-0' : 'translate-x-0 opacity-100'
        )}
      >
        {/* Proactive message bubble */}
        {state.showProactive && !state.isOpen && (
          <div className="absolute bottom-full right-0 mb-3 w-64 animate-fade-in-up">
            <div className="bg-background border rounded-lg shadow-lg p-3 text-sm relative">
              <button
                onClick={() => openAgent()}
                className="text-left w-full"
              >
                <p className="text-muted-foreground mb-1">
                  <Sparkles className="inline h-3 w-3 mr-1 text-primary" />
                  Need help?
                </p>
                <p className="text-xs text-muted-foreground/80">
                  Click to chat with my AI assistant
                </p>
              </button>
              <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-2 h-2 bg-background border-r border-b" />
            </div>
          </div>
        )}

        <Button
          onClick={openAgent}
          className="rounded-full h-14 w-14 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-105 transition-all flex items-center justify-center"
          aria-label="Open AI Assistant"
        >
          <MessageCircle size={28} />
        </Button>
      </div>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-0 right-0 top-0 z-[100] h-full w-full transform transition-transform duration-300 ease-in-out",
          "md:bottom-6 md:right-6 md:top-auto md:h-[min(85vh,700px)] md:w-[420px] md:rounded-xl",
          state.isOpen ? 'translate-x-0' : 'translate-x-[calc(100%+24px)]'
        )}
      >
        <Card className="flex h-full flex-col rounded-none md:rounded-xl shadow-2xl border-0 md:border">
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between border-b px-4 py-3 bg-background">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot size={20} />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base font-semibold">AI Assistant</CardTitle>
                <p className="text-xs text-muted-foreground">Ask me anything</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeAgent}
              aria-label="Close chat"
              className="h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full" viewportRef={viewportRef}>
              <div className="p-4 space-y-4">
                {state.messages.map((message) =>
                  message.role === 'assistant' ? (
                    <AssistantMessage key={message.id} message={message} />
                  ) : (
                    <UserMessage key={message.id} message={message} />
                  )
                )}

                {state.isLoading && <LoadingMessage />}
              </div>
            </ScrollArea>
          </CardContent>

          {/* Quick Actions - show only if few messages */}
          {state.messages.length <= 2 && (
            <QuickActions
              actions={agentConfig.quickActions}
              onSelect={handleQuickAction}
              disabled={state.isLoading}
            />
          )}

          {/* Input */}
          <div className="border-t p-3 bg-background">
            <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={state.isListening ? 'Listening...' : 'Type your message...'}
                className={cn(
                  "rounded-full pr-20 h-11 text-sm",
                  state.isListening && "border-red-500 ring-1 ring-red-500"
                )}
                disabled={state.isLoading}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {speechSupported && (
                  <Button
                    type="button"
                    size="icon"
                    variant={state.isListening ? 'destructive' : 'ghost'}
                    className="rounded-full h-8 w-8"
                    onClick={handleMicClick}
                    disabled={state.isLoading}
                    aria-label={state.isListening ? 'Stop listening' : 'Start voice input'}
                  >
                    {state.isListening ? (
                      <MicOff className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </Button>
                )}
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full h-8 w-8"
                  disabled={state.isLoading || !input.trim()}
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
            <p className="text-[10px] text-center text-muted-foreground mt-2">
              Press Enter to send
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}
