
import React from "react";
import { CardContent } from "@/components/ui/card";
import { TranscriptLine } from "@/types/AIScribe";
import TranscriptViewer from "@/components/AIScribe/TranscriptViewer";
import TranscriptActions from "@/components/AIScribe/TranscriptActions";

interface TranscriptSectionProps {
  transcript: TranscriptLine[];
  saveTranscript: () => void;
  clearTranscript: () => void;
  exportPdf: () => void;
}

const TranscriptSection: React.FC<TranscriptSectionProps> = ({
  transcript,
  saveTranscript,
  clearTranscript,
  exportPdf,
}) => {
  // Check if this is a SOAP note by looking for specific prefixes
  const isSoapNote = transcript.some(line => 
    line.text.startsWith("Subjective:") || 
    line.text.startsWith("Objective:") || 
    line.text.startsWith("Assessment:") || 
    line.text.startsWith("Plan:")
  );
  
  return (
    <CardContent>
      <div className="mt-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {isSoapNote ? "SOAP Note" : "Transcript"}
          </h3>
          <TranscriptActions 
            onSave={saveTranscript}
            onClear={clearTranscript}
            onExportPdf={exportPdf}
            disabled={transcript.length === 0}
            isSoapNote={isSoapNote}
          />
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto border border-gray-200 shadow-inner">
          <TranscriptViewer transcript={transcript} />
        </div>
      </div>
    </CardContent>
  );
};

export default TranscriptSection;
