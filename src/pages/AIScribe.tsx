import { useState, useRef, useEffect } from "react";
import { Mic, Pause, Play, StopCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Define message type for transcript formatting
type MessageType = "local" | "remote";

interface TranscriptLine {
  text: string;
  type: MessageType;
  timestamp: string;
}

const AIScribe = () => {
  const [status, setStatus] = useState<string>("Ready to connect");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const keepAliveIntervalRef = useRef<number | null>(null);
  const { toast } = useToast();
  
  // For toggling between local and remote in the UI
  const [messageType, setMessageType] = useState<MessageType>("local");

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
      // In production, use wss:// for secure connections
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

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">AI Scribe</h1>
        <p className="text-gray-600">
          Record and transcribe patient conversations in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Voice Recorder</CardTitle>
              <Badge 
                variant={
                  status === "Connected" || status === "Recording" ? "success" : 
                  status === "Paused" ? "warning" : 
                  status === "Stopped" || status === "Ready to connect" ? "secondary" : 
                  "destructive"
                }
                className={`px-3 py-1 ${
                  status === "Connected" || status === "Recording" ? "bg-green-500" : 
                  status === "Paused" ? "bg-yellow-500" : 
                  status === "Stopped" || status === "Ready to connect" ? "bg-gray-500" : 
                  "bg-red-500"
                } text-white`}
              >
                {status}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="flex justify-center space-x-4 mb-6">
              <Button
                size="lg"
                onClick={startRecording}
                disabled={isRecording}
                className="bg-green-600 hover:bg-green-700 shadow transition-all"
              >
                <Mic className="mr-2 h-5 w-5" />
                Start
              </Button>
              
              <Button
                size="lg"
                onClick={togglePause}
                disabled={!isRecording}
                className="bg-yellow-600 hover:bg-yellow-700 shadow transition-all"
              >
                {isPaused ? <Play className="mr-2 h-5 w-5" /> : <Pause className="mr-2 h-5 w-5" />}
                {isPaused ? "Resume" : "Pause"}
              </Button>
              
              <Button
                size="lg"
                onClick={stopRecording}
                disabled={!isRecording}
                className="bg-red-600 hover:bg-red-700 shadow transition-all"
              >
                <StopCircle className="mr-2 h-5 w-5" />
                Stop
              </Button>
            </div>
            
            <Separator className="my-4" />
            
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Transcript</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={saveTranscript}
                    disabled={transcript.length === 0}
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearTranscript}
                    disabled={transcript.length === 0}
                    className="border-gray-500 text-gray-500 hover:bg-gray-50"
                  >
                    Clear
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 min-h-[300px] max-h-[400px] overflow-y-auto border border-gray-200">
                {transcript.length > 0 ? (
                  <div className="space-y-2">
                    {transcript.map((line, index) => (
                      <div key={index} className="text-gray-800">
                        <span className="text-xs text-gray-500">[{line.timestamp}]</span> {line.text}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <p>Start recording to see the transcript</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-50 border-t px-6 py-4">
            <div className="w-full text-center text-sm text-gray-500">
              <p>
                For best results, speak clearly and ensure you are in a quiet environment.
                The AI will automatically transcribe your conversation.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AIScribe;
