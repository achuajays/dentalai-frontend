import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileImage, Save, Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { SaveForLater } from "@/components/SaveForLater";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown';

interface XrayResultsCardProps {
  analysisResult: { filename: string; analysis: string } | null;
}

export function XrayResultsCard({ analysisResult }: XrayResultsCardProps) {
  const [editMode, setEditMode] = useState(false);
  const [editedAnalysis, setEditedAnalysis] = useState("");
  const { toast } = useToast();

  const handleEditClick = () => {
    if (analysisResult) {
      setEditedAnalysis(analysisResult.analysis);
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
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-800">
                  Analysis for: {analysisResult.filename}
                </h3>
                {!editMode && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleEditClick}
                    className="border-green-300 hover:bg-green-50 hover:text-green-700 text-green-600"
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Analysis
                  </Button>
                )}
              </div>
              
              {editMode ? (
                <div className="bg-gray-50 rounded-lg">
                  <Textarea
                    value={editedAnalysis}
                    onChange={(e) => setEditedAnalysis(e.target.value)}
                    className="w-full h-[400px] p-4 border-0 text-sm text-gray-700 font-sans bg-gray-50 focus-visible:ring-green-500"
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
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg max-h-[500px] overflow-y-auto">
                  <ReactMarkdown className="text-sm prose prose-sm max-w-none prose-headings:text-green-800 prose-a:text-green-600">
                    {analysisResult.analysis}
                  </ReactMarkdown>
                </div>
              )}
              
              <div className="flex justify-end">
                <SaveForLater 
                  text={editMode ? editedAnalysis : analysisResult.analysis}
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
