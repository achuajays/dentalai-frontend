
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import RecordingControls from "@/components/AIScribe/RecordingControls";
import TranscriptViewer from "@/components/AIScribe/TranscriptViewer";
import TranscriptActions from "@/components/AIScribe/TranscriptActions";
import StatusBadge from "@/components/AIScribe/StatusBadge";
import useAudioRecording from "@/hooks/useAudioRecording";

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
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Voice Recorder</CardTitle>
              <StatusBadge status={status} />
            </div>
          </CardHeader>
          
          <CardContent>
            <RecordingControls 
              isRecording={isRecording}
              isPaused={isPaused}
              onStart={startRecording}
              onTogglePause={togglePause}
              onStop={stopRecording}
            />
            
            <Separator className="my-4" />
            
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {transcript.some(line => line.text.startsWith("Subjective:")) ? "SOAP Note" : "Transcript"}
                </h3>
                <TranscriptActions 
                  onSave={saveTranscript}
                  onClear={clearTranscript}
                  disabled={transcript.length === 0}
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto border border-gray-200">
                <TranscriptViewer transcript={transcript} />
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
