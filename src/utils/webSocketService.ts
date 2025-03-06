
import { toast } from "@/hooks/use-toast";

type WebSocketStatusCallback = (status: string) => void;
type TranscriptionCallback = (text: string, type: "local" | "remote", timestamp: string) => void;
type ConnectionCallback = () => void;

export const setupWebSocketConnection = (
  setStatus: WebSocketStatusCallback,
  onTranscription: TranscriptionCallback,
  onClose: ConnectionCallback,
  formatTime: () => string
): WebSocket => {
  const socket = new WebSocket('wss://dentalai-production.up.railway.app/ws');
  
  let messageType: "local" | "remote" = "local";

  socket.onopen = () => {
    setStatus("Connected");
  };

  socket.onmessage = (message) => {
    const received = JSON.parse(message.data);
    if (received.transcription) {
      onTranscription(
        received.transcription,
        messageType,
        formatTime()
      );
      
      // Toggle message type for next message
      messageType = messageType === 'local' ? 'remote' : 'local';
    }
  };

  socket.onclose = () => {
    setStatus("Connection closed");
    onClose();
  };

  socket.onerror = (error) => {
    setStatus("Error occurred");
    console.error('WebSocket error:', error);
    toast({
      title: "Connection Error",
      description: "Failed to connect to the transcription service.",
      variant: "destructive"
    });
    onClose();
  };

  return socket;
};

export const sendAudioData = (socket: WebSocket | null, audioBase64: string) => {
  if (socket?.readyState === WebSocket.OPEN) {
    const message = {
      audio: audioBase64,
    };
    socket.send(JSON.stringify(message));
  }
};

export const sendKeepAlive = (socket: WebSocket | null) => {
  if (socket?.readyState === WebSocket.OPEN) {
    const keepAliveMessage = {
      type: "KeepAlive"
    };
    socket.send(JSON.stringify(keepAliveMessage));
  }
};
