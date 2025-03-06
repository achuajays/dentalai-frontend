
import { useState, useRef, useEffect } from "react";
import { TranscriptLine } from "@/types/AIScribe";
import { useToast } from "@/hooks/use-toast";
import { generateSoapNote, formatSoapNote } from "@/utils/soapNoteService";
import { setupWebSocketConnection, sendKeepAlive } from "@/utils/webSocketService";
import { initializeMediaRecorder, attachDataAvailableListener } from "@/utils/mediaRecorderService";
import { formatTime } from "@/utils/timeFormatUtils";

export default function useAudioRecording() {
  const [status, setStatus] = useState<string>("Ready to connect");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const keepAliveIntervalRef = useRef<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  const addTranscriptLine = (text: string, type: "local" | "remote", timestamp: string) => {
    setTranscript(prev => [
      ...prev, 
      { text, type, timestamp }
    ]);
  };

  const startRecording = async () => {
    await initializeMediaRecorder(
      (recorder, stream) => {
        mediaRecorderRef.current = recorder;
        streamRef.current = stream;
        
        socketRef.current = setupWebSocketConnection(
          setStatus,
          addTranscriptLine,
          () => {
            clearKeepAliveInterval();
            resetRecordingState();
          },
          formatTime
        );
        
        recorder.onstart = () => {
          setIsRecording(true);
          setStatus("Recording");
        };
        
        attachDataAvailableListener(recorder, socketRef.current);
        
        // Start recording once WebSocket is connected
        socketRef.current.onopen = () => {
          setStatus("Connected");
          setIsRecording(true);
          
          recorder.start(500);
        };
      },
      (errorMessage) => {
        setStatus(errorMessage);
        resetRecordingState();
      }
    );
  };

  const togglePause = () => {
    if (!mediaRecorderRef.current) return;

    if (mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setStatus("Paused");
      setIsPaused(true);
      
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        keepAliveIntervalRef.current = window.setInterval(() => {
          sendKeepAlive(socketRef.current);
        }, 1000);
      }
    } else if (mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setStatus("Recording");
      setIsPaused(false);
      
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

  const saveTranscript = async () => {
    const patientInfo = transcript
      .map(line => line.text)
      .join(" ");
      
    const soapNote = await generateSoapNote(patientInfo);
    
    if (soapNote) {
      const formattedNote = formatSoapNote(soapNote, formatTime);
      setTranscript(formattedNote);
      
      toast({
        title: "SOAP Note Generated",
        description: "Your SOAP note has been displayed below.",
      });
    }
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
