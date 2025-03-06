
import React from "react";
import { Card } from "@/components/ui/card";
import useAudioRecording from "@/hooks/useAudioRecording";
import AIScribeHeader from "@/components/AIScribe/AIScribeHeader";
import RecordingSection from "@/components/AIScribe/RecordingSection";
import TranscriptSection from "@/components/AIScribe/TranscriptSection";
import AIScribeFooter from "@/components/AIScribe/AIScribeFooter";

const AIScribe = () => {
  const {
    status,
    isRecording,
    isPaused,
    transcript,
    startRecording,
    togglePause,
    stopRecording,
    saveTranscript,
    clearTranscript
  } = useAudioRecording();
  
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
          <AIScribeHeader status={status} />
          
          <RecordingSection 
            isRecording={isRecording}
            isPaused={isPaused}
            startRecording={startRecording}
            togglePause={togglePause}
            stopRecording={stopRecording}
          />
          
          <TranscriptSection 
            transcript={transcript}
            saveTranscript={saveTranscript}
            clearTranscript={clearTranscript}
          />
          
          <AIScribeFooter />
        </Card>
      </div>
    </div>
  );
};

export default AIScribe;
