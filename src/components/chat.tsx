"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bot,
  User,
  Send,
  X,
  CornerDownLeft,
  Mic,
  Volume2,
  Loader2,
  Play
} from 'lucide-react';
import { chat } from '@/ai/flows/chat-flow';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { sendChatTranscriptEmail } from '@/ai/flows/send-email-flow';
import { textToSpeech } from '@/ai/flows/tts-flow';

// ---------------------
// Type Definition
// ---------------------
type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  audioDataUri?: string;
  isGeneratingAudio?: boolean;
};

// ---------------------
// Initial Bot Message
// ---------------------
const initialMessage: Message = {
  id: 'init-1',
  role: 'assistant',
  content:
    "Hi there! I'm an assistant for Muhammad Idris Abubakar. You can ask me anything about his skills, projects, or experience—or use the mic to speak your question.",
};

// ---------------------
// Assistant Message Component
// ---------------------
const AssistantMessage = ({ message }: { message: Message }) => {
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioDataUri, setAudioDataUri] = useState<string | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = async () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    if (audioDataUri && audioRef.current) {
      await audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      return;
    }

    setIsGeneratingAudio(true);
    try {
      const audioResult = await textToSpeech({ text: message.content });
      setAudioDataUri(audioResult.audioDataUri);
    } catch (error) {
      console.error("TTS generation failed:", error);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  useEffect(() => {
    if (audioDataUri && audioRef.current) {
      audioRef.current.src = audioDataUri;
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [audioDataUri]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      const onEnded = () => setIsPlaying(false);

      audioElement.addEventListener('play', onPlay);
      audioElement.addEventListener('pause', onPause);
      audioElement.addEventListener('ended', onEnded);

      return () => {
        audioElement.removeEventListener('play', onPlay);
        audioElement.removeEventListener('pause', onPause);
        audioElement.removeEventListener('ended', onEnded);
      };
    }
  }, []);

  return (
    <div className="flex items-start gap-3">
      <audio ref={audioRef} className="hidden" />
      <Avatar className="h-8 w-8">
        <AvatarFallback><Bot size={18} /></AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="bg-muted rounded-2xl px-4 py-2.5 text-sm rounded-bl-none">
          {message.content}
        </div>
        <div className="flex items-center">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-muted-foreground"
            onClick={handlePlayAudio}
            disabled={isGeneratingAudio}
            aria-label={isPlaying ? "Stop audio" : "Play audio"}
          >
            {isGeneratingAudio ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isPlaying ? (
              <Volume2 className="h-4 w-4 text-primary" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

// ---------------------
// Chat Component
// ---------------------
export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [speechApi, setSpeechApi] = useState<any>(null);

  // ---------------------
  // Speech Recognition Setup
  // ---------------------
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechApi(() => SpeechRecognition);
      }
    }
  }, []);

  useEffect(() => {
    if (speechApi) {
      const recognition = new speechApi();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
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

      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;

      return () => recognition.stop();
    }
  }, [speechApi]);

  // ---------------------
  // Handle Mic Click
  // ---------------------
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

  // ---------------------
  // Handle Send Message
  // ---------------------
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat({
        history: messages.map(m => ({ role: m.role, content: m.content })),
        message: input,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.response,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error in chat flow:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------------
  // Auto Scroll
  // ---------------------
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);

  // ---------------------
  // Close Chat & Send Transcript
  // ---------------------
  const handleCloseChat = () => {
    setIsOpen(false);

    // Only send transcript if user interacted
    if (messages.length > 1) {
      const transcript = messages
        .map(m => `${m.role === 'user' ? 'User' : 'AI Assistant'}: ${m.content}`)
        .join('\n\n');

      sendChatTranscriptEmail({ transcript })
        .then(response => {
          if (response.success) {
            console.log('Chat transcript sent successfully.');
          } else {
            console.error('Failed to send chat transcript.');
          }
        })
        .catch(error => console.error('Error sending chat transcript:', error));
    }
  };

  // ---------------------
  // UI
  // ---------------------
  return (
    <>
      {/* Floating Bot Button */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 transition-transform duration-300 ease-in-out",
          isOpen ? 'translate-x-[calc(100%_+_2rem)]' : 'translate-x-0'
        )}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-16 w-16 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 flex items-center justify-center"
          aria-label="Open chat"
        >
          <Bot size={32} />
        </Button>
      </div>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-0 right-0 top-0 z-[100] h-full w-full transform transition-transform duration-300 ease-in-out md:bottom-6 md:right-6 md:top-auto md:h-[min(80vh,700px)] md:w-[440px]",
          isOpen ? 'translate-x-0' : 'translate-x-[calc(100%+24px)]'
        )}
      >
        <Card className="flex h-full flex-col rounded-none md:rounded-xl shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <Avatar><AvatarFallback>AI</AvatarFallback></Avatar>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCloseChat} aria-label="Close chat">
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full" viewportRef={viewportRef}>
              <div className="p-6 space-y-6">
                {messages.map((message) =>
                  message.role === 'assistant' ? (
                    <AssistantMessage key={message.id} message={message} />
                  ) : (
                    <div key={message.id} className="flex items-start gap-3 justify-end">
                      <div className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm bg-primary text-primary-foreground rounded-br-none">
                        {message.content}
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback><User size={18} /></AvatarFallback>
                      </Avatar>
                    </div>
                  )
                )}

                {isLoading && (
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><Bot size={18} /></AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-2xl px-4 py-2.5 text-sm rounded-bl-none">
                      <span className="inline-block w-2 h-4 bg-foreground ml-1 animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          {/* Input */}
          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={isListening ? "Listening..." : "Ask me anything..."}
                className="rounded-full pr-24 h-12"
                disabled={isLoading}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {speechApi && (
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
              Press{" "}
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-card px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <CornerDownLeft size={10} />
              </kbd>{" "}
              to send.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}
