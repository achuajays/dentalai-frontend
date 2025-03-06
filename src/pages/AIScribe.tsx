
import React from "react";
import { Card } from "@/components/ui/card";
import useAudioRecording from "@/hooks/useAudioRecording";
import AIScribeHeader from "@/components/AIScribe/AIScribeHeader";
import RecordingSection from "@/components/AIScribe/RecordingSection";
import TranscriptSection from "@/components/AIScribe/TranscriptSection";
import AIScribeFooter from "@/components/AIScribe/AIScribeFooter";
import { exportSoapNoteToPdf } from "@/utils/pdfExportService";
import { toast } from "@/hooks/use-toast";

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
  
  const handleExportPdf = () => {
    // Check if transcript contains SOAP note
    const hasSoapNote = transcript.some(line => 
      line.text.startsWith("Subjective:") || 
      line.text.startsWith("Objective:") || 
      line.text.startsWith("Assessment:") || 
      line.text.startsWith("Plan:")
    );
    
    if (!hasSoapNote) {
      toast({
        title: "No SOAP Note Available",
        description: "Generate a SOAP note first before exporting to PDF.",
        variant: "destructive"
      });
      return;
    }
    
    // Extract SOAP note data from transcript
    const subjective = transcript.find(line => line.text.startsWith("Subjective:"))?.text.replace("Subjective:", "").trim() || "";
    const objective = transcript.find(line => line.text.startsWith("Objective:"))?.text.replace("Objective:", "").trim() || "";
    const assessment = transcript.find(line => line.text.startsWith("Assessment:"))?.text.replace("Assessment:", "").trim() || "";
    const plan = transcript.find(line => line.text.startsWith("Plan:"))?.text.replace("Plan:", "").trim() || "";
    const summary = transcript.find(line => line.text.startsWith("Summary:"))?.text.replace("Summary:", "").trim() || "";
    
    // Create SOAP note object
    const soapNote = {
      subjective,
      objective,
      assessment,
      plan,
      summary
    };
    
    // Export to PDF
    exportSoapNoteToPdf(soapNote);
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
            exportPdf={handleExportPdf}
          />
          
          <AIScribeFooter />
        </Card>
      </div>
    </div>
  );
};

export default AIScribe;
