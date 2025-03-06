
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
    <div className="p-1">
      <p className="text-gray-800">
        {transcript.map((line, index) => line.text).join(" ")}
      </p>
    </div>
  );
};

export default TranscriptViewer;
