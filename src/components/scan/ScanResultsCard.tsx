
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileImage, Save, Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { SaveForLater } from "@/components/SaveForLater";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown';

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
  const [editMode, setEditMode] = useState(false);
  const [editedAnalysis, setEditedAnalysis] = useState("");
  const { toast } = useToast();

  const handleEditClick = () => {
    if (analysisResult) {
      setEditedAnalysis(analysisResult.metadata.analysis);
      setEditMode(true);
    }
  };

  const handleSaveEdit = () => {
    setEditMode(false);
    toast({
      title: "Changes saved",
      description: "Your edits to the analysis have been saved.",
    });
  };

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
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-800">
                  Analysis for: {analysisResult.metadata.original_filename}
                </h3>
                {!editMode && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleEditClick}
                    className="border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 text-indigo-600"
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Analysis
                  </Button>
                )}
              </div>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="p-2 bg-indigo-50 border-b border-indigo-100">
                  <p className="text-xs text-indigo-700">
                    <span className="font-medium">Upload time:</span> {analysisResult.metadata.upload_time} | 
                    <span className="font-medium ml-2">Size:</span> {Math.round(analysisResult.metadata.size_bytes / 1024)} KB
                  </p>
                </div>
                {editMode ? (
                  <>
                    <Textarea
                      value={editedAnalysis}
                      onChange={(e) => setEditedAnalysis(e.target.value)}
                      className="w-full h-[400px] p-4 border-0 text-sm text-gray-700 font-sans bg-gray-50 focus-visible:ring-indigo-500"
                    />
                    <div className="flex justify-end p-2 bg-gray-100">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditMode(false)} 
                        className="mr-2"
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleSaveEdit}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="p-4 bg-gray-50 max-h-[400px] overflow-y-auto">
                    <ReactMarkdown className="text-sm prose prose-sm max-w-none prose-headings:text-indigo-800 prose-a:text-indigo-600">
                      {analysisResult.metadata.analysis}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <SaveForLater 
                  text={editMode ? editedAnalysis : analysisResult.metadata.analysis}
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
