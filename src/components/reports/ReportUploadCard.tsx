
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Loader2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportUploadCardProps {
  onAnalysisComplete: (result: ReportAnalysisResponse) => void;
}

export function ReportUploadCard({ onAnalysisComplete }: ReportUploadCardProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };
  
  const analyzeReport = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please upload a medical report to analyze.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const response = await fetch('https://dentalai-production.up.railway.app/reports/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      onAnalysisComplete(data);
      
      toast({
        title: "Analysis complete",
        description: "Your medical report has been successfully analyzed.",
      });
    } catch (error) {
      console.error('Error analyzing report:', error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-700"></div>
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
            <FileText className="text-amber-600" size={24} />
          </div>
          <h2 className="text-2xl font-semibold text-amber-700">Upload Medical Report</h2>
        </div>
        
        <div className="mb-6">
          <label 
            htmlFor="report-upload" 
            className="block w-full cursor-pointer border-2 border-dashed border-amber-300 rounded-lg p-8 text-center hover:border-amber-500 transition-colors"
          >
            <div className="flex flex-col items-center">
              <FileText className="h-16 w-16 text-amber-400 mb-2" />
              <p className="text-lg font-medium text-amber-600 mb-1">Upload your medical report</p>
              <p className="text-sm text-gray-500">Click to browse files</p>
              <p className="text-xs text-gray-400 mt-2">Supported formats: JPG, PNG, PDF</p>
            </div>
          </label>
          <Input 
            id="report-upload" 
            type="file" 
            accept="image/jpeg,image/png,application/pdf" 
            className="hidden" 
            onChange={handleFileChange}
          />
          {selectedFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected file: {selectedFile.name}
            </p>
          )}
        </div>
        
        <Button 
          onClick={analyzeReport} 
          className="w-full bg-amber-600 hover:bg-amber-700" 
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Analyze Report
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
