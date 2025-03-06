
import { Card, CardContent } from "@/components/ui/card";
import { FileImage } from "lucide-react";
import { SaveForLater } from "@/components/SaveForLater";

interface XrayResultsCardProps {
  analysisResult: { filename: string; analysis: string } | null;
}

export function XrayResultsCard({ analysisResult }: XrayResultsCardProps) {
  // Format analysis text with improved readability
  const formatAnalysis = (text: string) => {
    // Replace asterisks with bullet points and add line breaks
    return text
      .replace(/\*/g, '•')
      .replace(/\.\s+/g, '.\n\n')
      .replace(/:\s+/g, ':\n');
  };

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="h-2 bg-gradient-to-r from-green-500 to-green-700"></div>
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
            <FileImage className="text-green-600" size={24} />
          </div>
          <h2 className="text-2xl font-semibold text-green-700">Analysis Results</h2>
        </div>
        
        {analysisResult ? (
          <div className="bg-white rounded-lg">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Analysis for: {analysisResult.filename}
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg max-h-[500px] overflow-y-auto">
                <pre className="text-sm whitespace-pre-wrap font-sans text-gray-700">
                  {formatAnalysis(analysisResult.analysis)}
                </pre>
              </div>
              <div className="flex justify-end">
                <SaveForLater 
                  text={analysisResult.analysis}
                  type="Xray"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <FileImage className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-400 mb-2">No Analysis Yet</h3>
            <p className="text-gray-500">
              Upload an X-ray image and click "Analyze X-ray" to see results
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
