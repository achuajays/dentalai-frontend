
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { SaveForLater } from "@/components/SaveForLater";

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

interface ReportResultsCardProps {
  analysisResult: ReportAnalysisResponse | null;
}

export function ReportResultsCard({ analysisResult }: ReportResultsCardProps) {
  // Format summary text with improved readability
  const formatSummary = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n([0-9]+\.)/g, '<br/>$1');
  };

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-700"></div>
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
            <FileText className="text-amber-600" size={24} />
          </div>
          <h2 className="text-2xl font-semibold text-amber-700">Report Summary</h2>
        </div>
        
        {analysisResult ? (
          <div className="bg-white rounded-lg">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Analysis for: {analysisResult.metadata.original_filename}
              </h3>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="p-2 bg-amber-50 border-b border-amber-100">
                  <p className="text-xs text-amber-700">
                    <span className="font-medium">Upload time:</span> {analysisResult.metadata.upload_time} | 
                    <span className="font-medium ml-2">Size:</span> {Math.round(analysisResult.metadata.size_bytes / 1024)} KB
                  </p>
                </div>
                <div 
                  className="p-4 text-sm text-gray-700 font-sans whitespace-pre-wrap bg-gray-50 max-h-[400px] overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: formatSummary(analysisResult.metadata.summary) }}
                />
              </div>
              <div className="flex justify-end">
                <SaveForLater 
                  text={analysisResult.metadata.summary}
                  type="Xray"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <FileText className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-400 mb-2">No Analysis Yet</h3>
            <p className="text-gray-500">
              Upload a medical report and click "Analyze Report" to see results
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
