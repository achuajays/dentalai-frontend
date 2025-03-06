
import React from "react";
import { CardContent } from "@/components/ui/card";
import { TranscriptLine } from "@/types/AIScribe";
import TranscriptViewer from "@/components/AIScribe/TranscriptViewer";
import TranscriptActions from "@/components/AIScribe/TranscriptActions";

interface TranscriptSectionProps {
  transcript: TranscriptLine[];
  saveTranscript: () => void;
  clearTranscript: () => void;
}

const TranscriptSection: React.FC<TranscriptSectionProps> = ({
  transcript,
  saveTranscript,
  clearTranscript,
}) => {
  return (
    <CardContent>
      <div className="mt-2">
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
        
        <div className="bg-gray-50 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto border border-gray-200 shadow-inner">
          <TranscriptViewer transcript={transcript} />
        </div>
      </div>
    </CardContent>
  );
};

export default TranscriptSection;
