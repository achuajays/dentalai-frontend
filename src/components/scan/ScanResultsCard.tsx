
import { Card, CardContent } from "@/components/ui/card";
import { FileImage } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { SaveForLater } from "@/components/SaveForLater";

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

interface ScanResultsCardProps {
  analysisResult: ScanAnalysisResponse | null;
}

export function ScanResultsCard({ analysisResult }: ScanResultsCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="h-2 bg-gradient-to-r from-indigo-500 to-indigo-700"></div>
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
            <FileImage className="text-indigo-600" size={24} />
          </div>
          <h2 className="text-2xl font-semibold text-indigo-700">Analysis Results</h2>
        </div>
        
        {analysisResult ? (
          <div className="bg-white rounded-lg">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Analysis for: {analysisResult.metadata.original_filename}
              </h3>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="p-2 bg-indigo-50 border-b border-indigo-100">
                  <p className="text-xs text-indigo-700">
                    <span className="font-medium">Upload time:</span> {analysisResult.metadata.upload_time} | 
                    <span className="font-medium ml-2">Size:</span> {Math.round(analysisResult.metadata.size_bytes / 1024)} KB
                  </p>
                </div>
                <Textarea
                  value={analysisResult.metadata.analysis}
                  readOnly
                  className="w-full h-[400px] p-4 border-0 text-sm text-gray-700 font-sans whitespace-pre-wrap bg-gray-50"
                />
              </div>
              <div className="flex justify-end">
                <SaveForLater 
                  text={analysisResult.metadata.analysis}
                  type="Scan"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <FileImage className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-400 mb-2">No Analysis Yet</h3>
            <p className="text-gray-500">
              Upload a scan image and click "Analyze Scan" to see results
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
