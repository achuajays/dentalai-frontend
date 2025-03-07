
import { useState } from "react";
import { ScanUploadCard } from "./scan/ScanUploadCard";
import { ScanResultsCard } from "./scan/ScanResultsCard";

interface ScanAnalysisResponse {
  message: string;
  metadata: {
    filename: string;
    original_filename: string;
    size_bytes: number;
    upload_time: string;
    analysis: string;
  };
}

export function MedicalImagingSection() {
  const [analysisResult, setAnalysisResult] = useState<ScanAnalysisResponse | null>(null);
  
  const handleAnalysisComplete = (result: ScanAnalysisResponse) => {
    setAnalysisResult(result);
  };

  const handleAnalysisUpdate = (updatedAnalysis: string) => {
    if (analysisResult) {
      setAnalysisResult({
        ...analysisResult,
        metadata: {
          ...analysisResult.metadata,
          analysis: updatedAnalysis
        }
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
      {/* Upload Section */}
      <ScanUploadCard onAnalysisComplete={handleAnalysisComplete} />
      
      {/* Results Section */}
      <ScanResultsCard 
        analysisResult={analysisResult} 
        onAnalysisUpdate={handleAnalysisUpdate}
      />
    </div>
  );
}
