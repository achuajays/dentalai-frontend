
import { useState } from "react";
import { ReportUploadCard } from "./reports/ReportUploadCard";
import { ReportResultsCard } from "./reports/ReportResultsCard";

interface ReportAnalysisResponse {
  message: string;
  metadata: {
    filename: string;
    original_filename: string;
    size_bytes: number;
    upload_time: string;
    summary: string;
  };
}

export function MedicalReportSection() {
  const [analysisResult, setAnalysisResult] = useState<ReportAnalysisResponse | null>(null);
  
  const handleAnalysisComplete = (result: ReportAnalysisResponse) => {
    setAnalysisResult(result);
  };

  const handleSummaryUpdate = (updatedSummary: string) => {
    if (analysisResult) {
      setAnalysisResult({
        ...analysisResult,
        metadata: {
          ...analysisResult.metadata,
          summary: updatedSummary
        }
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
      {/* Upload Section */}
      <ReportUploadCard onAnalysisComplete={handleAnalysisComplete} />
      
      {/* Results Section */}
      <ReportResultsCard 
        analysisResult={analysisResult} 
        onSummaryUpdate={handleSummaryUpdate}
      />
    </div>
  );
}
