
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, Pause, Play, StopCircle } from "lucide-react";

interface RecordingControlsProps {
  isRecording: boolean;
  isPaused: boolean;
  onStart: () => void;
  onTogglePause: () => void;
  onStop: () => void;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({
  isRecording,
  isPaused,
  onStart,
  onTogglePause,
  onStop,
}) => {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      <Button
        size="lg"
        onClick={onStart}
        disabled={isRecording}
        className="bg-green-600 hover:bg-green-700 shadow transition-all"
      >
        <Mic className="mr-2 h-5 w-5" />
        Start
      </Button>

      <Button
        size="lg"
        onClick={onTogglePause}
        disabled={!isRecording}
        className="bg-yellow-600 hover:bg-yellow-700 shadow transition-all"
      >
        {isPaused ? <Play className="mr-2 h-5 w-5" /> : <Pause className="mr-2 h-5 w-5" />}
        {isPaused ? "Resume" : "Pause"}
      </Button>

      <Button
        size="lg"
        onClick={onStop}
        disabled={!isRecording}
        className="bg-red-600 hover:bg-red-700 shadow transition-all"
      >
        <StopCircle className="mr-2 h-5 w-5" />
        Stop
      </Button>
    </div>
  );
};

export default RecordingControls;
