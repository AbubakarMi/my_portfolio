
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, User, Send, X, CornerDownLeft, Mic, Speaker, Volume2 } from 'lucide-react';
import { chat } from '@/ai/flows/chat-flow';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { sendChatTranscriptEmail } from '@/ai/flows/send-email-flow';
import { textToSpeech } from '@/ai/flows/tts-flow';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Check for SpeechRecognition API
const SpeechRecognition =
  (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition));

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize SpeechRecognition
  useEffect(() => {
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition API not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setInput(prev => prev + finalTranscript);
      }
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const handleMicClick = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setInput('');
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat({ message: input });
      const assistantMessage: Message = { role: 'assistant', content: result.response };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Convert response to speech
      setIsSpeaking(true);
      const audioResult = await textToSpeech({ text: result.response });
      
      if (audioRef.current) {
        audioRef.current.src = audioResult.audioDataUri;
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
        audioRef.current.onended = () => setIsSpeaking(false);
      } else {
        setIsSpeaking(false);
      }

    } catch (error) {
      console.error("Error in chat flow or TTS flow:", error);
      const errorMessage: Message = { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
      setIsSpeaking(false);
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
      
      setMessages([]);
    }
     if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
     }
  };

  useEffect(() => {
    if (viewportRef.current) {
        viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <>
      <audio ref={audioRef} className="hidden" />
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
            <div className="flex items-center gap-2">
              {isSpeaking && <Volume2 className="h-5 w-5 text-primary animate-pulse" />}
              <Button variant="ghost" size="icon" onClick={handleCloseChat} aria-label="Close chat">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden">
             <ScrollArea className="h-full" viewportRef={viewportRef}>
              <div className="p-6 space-y-6">
                {messages.length === 0 && (
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><Bot size={18} /></AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-2xl px-4 py-2.5 text-sm rounded-bl-none">
                      Hi there! I'm an assistant for Muhammad Idris Abubakar. You can ask me anything about his skills, projects, or experience—or use the mic to speak your question.
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
            <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={isListening ? "Listening..." : "Ask me anything..."}
                className="rounded-full pr-24 h-12"
                disabled={isLoading}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                {SpeechRecognition && (
                  <Button
                    type="button"
                    size="icon"
                    variant={isListening ? "destructive" : "ghost"}
                    className="rounded-full h-9 w-9"
                    onClick={handleMicClick}
                    disabled={isLoading}
                    aria-label={isListening ? "Stop listening" : "Start listening"}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full h-9 w-9"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
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
