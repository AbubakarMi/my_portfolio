'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, User, Play, Volume2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Message, AgentAction } from './types';
import { useAgent } from './agent-context';
import { cn } from '@/lib/utils';

interface AgentMessageProps {
  message: Message;
}

export function AssistantMessage({ message }: AgentMessageProps) {
  const { generateAudio, executeAction } = useAgent();
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
      await audioRef.current.play().catch(e => console.error('Audio playback failed:', e));
      return;
    }

    setIsGeneratingAudio(true);
    try {
      const uri = await generateAudio(message.id, message.content);
      if (uri) {
        setAudioDataUri(uri);
      }
    } catch (error) {
      console.error('TTS generation failed:', error);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  useEffect(() => {
    if (audioDataUri && audioRef.current) {
      audioRef.current.src = audioDataUri;
      audioRef.current.play().catch(e => console.error('Audio playback failed:', e));
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

  const handleActionClick = (action: AgentAction) => {
    executeAction(action);
  };

  return (
    <div className="flex items-start gap-3">
      <audio ref={audioRef} className="hidden" />
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className="bg-primary/10 text-primary">
          <Bot size={18} />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2 min-w-0">
        <div className="bg-muted rounded-2xl px-4 py-2.5 text-sm rounded-bl-none">
          {message.content}
        </div>

        {/* Action buttons */}
        {message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {message.actions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => handleActionClick(action)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}

        {/* Audio control */}
        <div className="flex items-center">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={handlePlayAudio}
            disabled={isGeneratingAudio}
            aria-label={isPlaying ? 'Stop audio' : 'Play audio'}
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
}

export function UserMessage({ message }: AgentMessageProps) {
  return (
    <div className="flex items-start gap-3 justify-end">
      <div className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm bg-primary text-primary-foreground rounded-br-none">
        {message.content}
      </div>
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className="bg-secondary/10">
          <User size={18} />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

export function LoadingMessage() {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className="bg-primary/10 text-primary">
          <Bot size={18} />
        </AvatarFallback>
      </Avatar>
      <div className="bg-muted rounded-2xl px-4 py-2.5 text-sm rounded-bl-none">
        <span className="inline-flex gap-1">
          <span className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </span>
      </div>
    </div>
  );
}

interface QuickActionsProps {
  actions: Array<{ id: string; label: string; prompt: string }>;
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

export function QuickActions({ actions, onSelect, disabled }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-3 border-t bg-muted/30">
      {actions.map((action) => (
        <Button
          key={action.id}
          variant="outline"
          size="sm"
          className={cn(
            "h-8 text-xs bg-background hover:bg-primary hover:text-primary-foreground transition-colors",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => onSelect(action.prompt)}
          disabled={disabled}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
