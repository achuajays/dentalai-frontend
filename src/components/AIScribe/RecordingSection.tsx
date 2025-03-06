
import React from "react";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import RecordingControls from "@/components/AIScribe/RecordingControls";

interface RecordingSectionProps {
  isRecording: boolean;
  isPaused: boolean;
  startRecording: () => void;
  togglePause: () => void;
  stopRecording: () => void;
}

const RecordingSection: React.FC<RecordingSectionProps> = ({
  isRecording,
  isPaused,
  startRecording,
  togglePause,
  stopRecording,
}) => {
  return (
    <CardContent>
      <RecordingControls 
        isRecording={isRecording}
        isPaused={isPaused}
        onStart={startRecording}
        onTogglePause={togglePause}
        onStop={stopRecording}
      />
      
      <Separator className="my-4" />
    </CardContent>
  );
};

export default RecordingSection;
