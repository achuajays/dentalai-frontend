
import { useState } from "react";
import { XrayUploadCard } from "./xray/XrayUploadCard";
import { XrayResultsCard } from "./xray/XrayResultsCard";

interface XrayAnalysisResponse {
  filename: string;
  analysis: string;
}

export function XrayAnalysisSection() {
  const [analysisResult, setAnalysisResult] = useState<XrayAnalysisResponse | null>(null);
  
  const handleAnalysisComplete = (result: XrayAnalysisResponse) => {
    setAnalysisResult(result);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
      {/* Upload Section */}
      <XrayUploadCard onAnalysisComplete={handleAnalysisComplete} />
      
      {/* Results Section */}
      <XrayResultsCard analysisResult={analysisResult} />
    </div>
  );
}
