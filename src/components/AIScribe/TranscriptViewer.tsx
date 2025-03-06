
import React from "react";
import { TranscriptLine } from "@/types/AIScribe";
import { cn } from "@/lib/utils";

interface TranscriptViewerProps {
  transcript: TranscriptLine[];
}

const TranscriptViewer: React.FC<TranscriptViewerProps> = ({ transcript }) => {
  if (transcript.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        <p>Start recording to see the transcript</p>
      </div>
    );
  }

  // Check if this is a SOAP note by looking for specific prefixes
  const isSoapNote = transcript.some(line => 
    line.text.startsWith("Subjective:") || 
    line.text.startsWith("Objective:") || 
    line.text.startsWith("Assessment:") || 
    line.text.startsWith("Plan:") || 
    line.text.startsWith("Summary:")
  );

  if (isSoapNote) {
    // Find each SOAP note section
    const subjective = transcript.find(line => line.text.startsWith("Subjective:"))?.text.replace("Subjective:", "").trim();
    const objective = transcript.find(line => line.text.startsWith("Objective:"))?.text.replace("Objective:", "").trim();
    const assessment = transcript.find(line => line.text.startsWith("Assessment:"))?.text.replace("Assessment:", "").trim();
    const plan = transcript.find(line => line.text.startsWith("Plan:"))?.text.replace("Plan:", "").trim();
    const summary = transcript.find(line => line.text.startsWith("Summary:"))?.text.replace("Summary:", "").trim();

    return (
      <div className="space-y-4 animate-fade-in">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-blue-600">SOAP Note</h3>
        </div>
        
        <div className="bg-soft-yellow p-4 rounded-lg border border-yellow-200 shadow-sm">
          <h4 className="font-bold text-yellow-800 mb-2">Subjective</h4>
          <p className="text-gray-800">{subjective}</p>
        </div>
        
        <div className="bg-soft-blue p-4 rounded-lg border border-blue-200 shadow-sm">
          <h4 className="font-bold text-blue-800 mb-2">Objective</h4>
          <p className="text-gray-800">{objective}</p>
        </div>
        
        <div className="bg-soft-purple p-4 rounded-lg border border-purple-200 shadow-sm">
          <h4 className="font-bold text-purple-800 mb-2">Assessment</h4>
          <p className="text-gray-800">{assessment}</p>
        </div>
        
        <div className="bg-soft-green p-4 rounded-lg border border-green-200 shadow-sm">
          <h4 className="font-bold text-green-800 mb-2">Plan</h4>
          <p className="text-gray-800">{plan}</p>
        </div>
        
        <div className="bg-soft-peach p-4 rounded-lg border border-orange-200 shadow-sm">
          <h4 className="font-bold text-orange-800 mb-2">Summary</h4>
          <p className="text-gray-800">{summary}</p>
        </div>
      </div>
    );
  }

  // Regular transcript display as continuous text
  return (
    <div className="p-1">
      <p className="text-gray-800">
        {transcript.map((line) => line.text).join(" ")}
      </p>
    </div>
  );
};

export default TranscriptViewer;
