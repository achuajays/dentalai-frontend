
import { toast } from "@/hooks/use-toast";
import { sendAudioData } from "./webSocketService";

export const initializeMediaRecorder = async (
  onSuccess: (recorder: MediaRecorder, stream: MediaStream) => void,
  onError: (message: string) => void
): Promise<void> => {
  try {
    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    if (!MediaRecorder.isTypeSupported('audio/webm')) {
      toast({
        title: "Browser Not Supported",
        description: "Your browser doesn't support the required audio format.",
        variant: "destructive"
      });
      onError("Browser not supported");
      return;
    }

    const mediaRecorder = new MediaRecorder(audioStream, {
      mimeType: 'audio/webm',
    });
    
    onSuccess(mediaRecorder, audioStream);
  } catch (err) {
    console.error('Microphone error:', err);
    toast({
      title: "Microphone Access Denied",
      description: "Please allow microphone access to use the AI Scribe.",
      variant: "destructive"
    });
    onError("Failed to access microphone");
  }
};

export const attachDataAvailableListener = (
  mediaRecorder: MediaRecorder,
  socket: WebSocket
): void => {
  mediaRecorder.addEventListener('dataavailable', (event: BlobEvent) => {
    if (event.data.size > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const audioBase64 = reader.result?.toString().split(',')[1];
        if (audioBase64) {
          sendAudioData(socket, audioBase64);
        }
      };
      reader.readAsDataURL(event.data);
    }
  });
};
