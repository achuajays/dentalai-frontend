
import React from "react";
import { Card } from "@/components/ui/card";
import useAudioRecording from "@/hooks/useAudioRecording";
import AIScribeHeader from "@/components/AIScribe/AIScribeHeader";
import RecordingSection from "@/components/AIScribe/RecordingSection";
import TranscriptSection from "@/components/AIScribe/TranscriptSection";
import AIScribeFooter from "@/components/AIScribe/AIScribeFooter";
import { exportSoapNoteToPdf } from "@/utils/pdfExportService";
import { toast } from "@/hooks/use-toast";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/Footer";
import { AIScribeExplanation } from "@/components/AIScribe/AIScribeExplanation";

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto py-8 px-4 max-w-5xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-4">
              AI Scribe
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Record and transcribe patient conversations in real-time, generating comprehensive SOAP notes for efficient documentation.
            </p>
          </div>

          <AIScribeExplanation />

          <div className="grid grid-cols-1 gap-8 mt-10">
            <Card className="shadow-lg border-t-4 border-t-blue-500">
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
      </main>
      <Footer />
    </div>
  );
};

export default AIScribe;
