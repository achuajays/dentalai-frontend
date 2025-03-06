import { useState, useRef, useEffect } from "react";
import { TranscriptLine } from "@/types/AIScribe";
import { useToast } from "@/hooks/use-toast";

type MessageType = "local" | "remote";

export default function useAudioRecording() {
  const [status, setStatus] = useState<string>("Ready to connect");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [messageType, setMessageType] = useState<MessageType>("local");
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const keepAliveIntervalRef = useRef<number | null>(null);
  const { toast } = useToast();

  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  const formatTime = (): string => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleAudioData = (event: BlobEvent) => {
    if (event.data.size > 0 && socketRef.current?.readyState === WebSocket.OPEN) {
      const reader = new FileReader();
      reader.onload = () => {
        const audioBase64 = reader.result?.toString().split(',')[1];
        if (audioBase64) {
          const message = {
            audio: audioBase64,
          };
          socketRef.current?.send(JSON.stringify(message));
        }
      };
      reader.readAsDataURL(event.data);
    }
  };

  const startRecording = async () => {
    try {
      // Get audio stream
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = audioStream;

      // Check browser support
      if (!MediaRecorder.isTypeSupported('audio/webm')) {
        toast({
          title: "Browser Not Supported",
          description: "Your browser doesn't support the required audio format.",
          variant: "destructive"
        });
        return;
      }

      // Create media recorder
      mediaRecorderRef.current = new MediaRecorder(audioStream, {
        mimeType: 'audio/webm',
      });

      // Connect to WebSocket
      socketRef.current = new WebSocket('wss://dentalai-production.up.railway.app/ws');

      socketRef.current.onopen = () => {
        setStatus("Connected");
        setIsRecording(true);
        
        // Start recording
        mediaRecorderRef.current?.start(500);
        
        // Handle audio data
        mediaRecorderRef.current?.addEventListener('dataavailable', handleAudioData);
      };

      socketRef.current.onmessage = (message) => {
        const received = JSON.parse(message.data);
        if (received.transcription) {
          // Add new transcript line with current message type
          setTranscript(prev => [
            ...prev, 
            { 
              text: received.transcription,
              type: messageType,
              timestamp: formatTime()
            }
          ]);
          
          // Toggle message type between local and remote
          setMessageType(messageType === 'local' ? 'remote' : 'local');
        }
      };

      socketRef.current.onclose = () => {
        setStatus("Connection closed");
        clearKeepAliveInterval();
        resetRecordingState();
      };

      socketRef.current.onerror = (error) => {
        setStatus("Error occurred");
        console.error('WebSocket error:', error);
        toast({
          title: "Connection Error",
          description: "Failed to connect to the transcription service.",
          variant: "destructive"
        });
        clearKeepAliveInterval();
        resetRecordingState();
      };
    } catch (err) {
      setStatus("Failed to access microphone");
      console.error('Microphone error:', err);
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to use the AI Scribe.",
        variant: "destructive"
      });
      resetRecordingState();
    }
  };

  const togglePause = () => {
    if (!mediaRecorderRef.current) return;

    if (mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setStatus("Paused");
      setIsPaused(true);
      
      // Start sending keep-alive messages every second
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        keepAliveIntervalRef.current = window.setInterval(() => {
          const keepAliveMessage = {
            type: "KeepAlive"
          };
          socketRef.current?.send(JSON.stringify(keepAliveMessage));
        }, 1000);
      }
    } else if (mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setStatus("Recording");
      setIsPaused(false);
      
      // Stop sending keep-alive messages
      clearKeepAliveInterval();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      streamRef.current?.getTracks().forEach(track => track.stop());
    }
    
    if (socketRef.current) {
      socketRef.current.close();
    }
    
    setStatus("Stopped");
    clearKeepAliveInterval();
    resetRecordingState();
    
    if (transcript.length > 0) {
      toast({
        title: "Transcription Complete",
        description: "Your recording has been successfully transcribed.",
      });
    }
  };

  const clearKeepAliveInterval = () => {
    if (keepAliveIntervalRef.current) {
      clearInterval(keepAliveIntervalRef.current);
      keepAliveIntervalRef.current = null;
    }
  };

  const resetRecordingState = () => {
    setIsRecording(false);
    setIsPaused(false);
  };

  const saveTranscript = () => {
    if (transcript.length === 0) {
      toast({
        title: "Nothing to save",
        description: "Start recording to create a transcript first.",
        variant: "destructive"
      });
      return;
    }

    // Convert transcript to text
    const textContent = transcript
      .map(line => `[${line.timestamp}] ${line.type === 'local' ? 'You' : 'Patient'}: ${line.text}`)
      .join('\n');
    
    // Create downloadable file
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Transcript Saved",
      description: "Your transcript has been downloaded as a text file.",
    });
  };

  const clearTranscript = () => {
    if (transcript.length > 0) {
      setTranscript([]);
      toast({
        title: "Transcript Cleared",
        description: "Your transcript has been cleared.",
      });
    }
  };

  return {
    status,
    isRecording,
    isPaused,
    transcript,
    startRecording,
    togglePause,
    stopRecording,
    saveTranscript,
    clearTranscript
  };
}
