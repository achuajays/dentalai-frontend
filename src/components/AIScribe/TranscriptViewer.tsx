
import React from "react";
import { TranscriptLine } from "@/types/AIScribe";

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

  return (
    <div className="space-y-2">
      {transcript.map((line, index) => (
        <div key={index} className="text-gray-800">
          <span className="text-xs text-gray-500">[{line.timestamp}]</span> {line.text}
        </div>
      ))}
    </div>
  );
};

export default TranscriptViewer;
