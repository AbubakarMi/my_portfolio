"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, User, Send, X, CornerDownLeft } from 'lucide-react';
import { chat } from '@/ai/flows/chat-flow';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { sendChatTranscriptEmail } from '@/ai/flows/send-email-flow';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat({ message: input });
      const assistantMessage: Message = { role: 'assistant', content: result.response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling chat flow:", error);
      const errorMessage: Message = { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    if (messages.length > 0) {
      const transcript = messages
        .map(m => `${m.role === 'user' ? 'User' : 'AI Assistant'}: ${m.content}`)
        .join('\n');
      
      sendChatTranscriptEmail({ transcript })
        .then(() => {
          console.log('Chat transcript sent.');
        })
        .catch(error => {
          console.error('Failed to send chat transcript:', error);
        });
      
      // Reset messages for the next session
      setMessages([]);
    }
  };
  

  useEffect(() => {
    if (scrollAreaRef.current) {
        // Use `setTimeout` to allow the DOM to update before scrolling
        setTimeout(() => {
            const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }, 0);
    }
  }, [messages]);
  
  return (
    <>
      <div className={cn(
        "fixed bottom-6 right-6 z-50 transition-transform duration-300 ease-in-out",
        isOpen ? 'translate-x-[100vw]' : 'translate-x-0'
      )}>
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-16 w-16 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 flex items-center justify-center"
          aria-label="Open chat"
        >
          <Bot size={32} />
        </Button>
      </div>

      <div
        className={cn(
          "fixed bottom-0 right-0 top-0 z-[100] h-full w-full transform transition-transform duration-300 ease-in-out md:bottom-6 md:right-6 md:top-auto md:h-[min(80vh,700px)] md:w-[440px]",
          isOpen ? 'translate-x-0' : 'translate-x-[calc(100%+24px)]'
        )}
      >
        <Card className="flex h-full flex-col rounded-none md:rounded-xl shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCloseChat} aria-label="Close chat">
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0">
             <ScrollArea className="h-full" ref={scrollAreaRef}>
              <div className="p-6 space-y-6">
                {messages.length === 0 && (
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><Bot size={18} /></AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-2xl px-4 py-2.5 text-sm rounded-bl-none">
                      Hi there! I'm an assistant for Muhammad Idris Abubakar. Ask me anything about his skills, projects, or experience.
                    </div>
                  </div>
                )}
                {messages.map((message, index) => (
                  <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : '')}>
                    {message.role === 'assistant' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback><Bot size={18} /></AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-muted rounded-bl-none'
                      )}
                    >
                      {message.content}
                    </div>
                     {message.role === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback><User size={18}/></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3">
                     <Avatar className="h-8 w-8">
                        <AvatarFallback><Bot size={18} /></AvatarFallback>
                      </Avatar>
                    <div className="bg-muted rounded-2xl px-4 py-3 rounded-bl-none">
                        <div className="flex items-center gap-2">
                           <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse delay-0"></span>
                           <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse delay-200"></span>
                           <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse delay-400"></span>
                        </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="relative">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="rounded-full pr-12 h-12"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-9 w-9"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
             <p className="text-xs text-center text-muted-foreground mt-2">
              Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">
                    <CornerDownLeft size={10}/>
                </span>Enter
              </kbd> to send.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}
