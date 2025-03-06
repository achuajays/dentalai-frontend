
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileImage, Loader2, Scan, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScanUploadCardProps {
  onAnalysisComplete: (result: {
    message: string;
    metadata: {
      filename: string;
      original_filename: string;
      size_bytes: number;
      upload_time: string;
      analysis: string;
    };
  }) => void;
}

export function ScanUploadCard({ onAnalysisComplete }: ScanUploadCardProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create an image preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const analyzeScan = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please upload a scan image to analyze.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const response = await fetch('https://dentalai-production.up.railway.app/scans/upload', {
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
        description: "Your scan has been successfully analyzed.",
      });
    } catch (error) {
      console.error('Error analyzing scan:', error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your scan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-700"></div>
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
            <Scan className="text-purple-600" size={24} />
          </div>
          <h2 className="text-2xl font-semibold text-purple-700">Upload Scan</h2>
        </div>
        
        <div className="mb-6">
          <label 
            htmlFor="scan-upload" 
            className="block w-full cursor-pointer border-2 border-dashed border-purple-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors"
          >
            {imagePreview ? (
              <div className="flex flex-col items-center">
                <img 
                  src={imagePreview} 
                  alt="Scan preview" 
                  className="max-h-64 object-contain mb-4"
                />
                <p className="text-sm text-gray-500">Click to change image</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <FileImage className="h-16 w-16 text-purple-400 mb-2" />
                <p className="text-lg font-medium text-purple-600 mb-1">Upload your scan image</p>
                <p className="text-sm text-gray-500">Click to browse files</p>
                <p className="text-xs text-gray-400 mt-2">Supported formats: JPG, PNG</p>
              </div>
            )}
          </label>
          <Input 
            id="scan-upload" 
            type="file" 
            accept="image/jpeg,image/png" 
            className="hidden" 
            onChange={handleFileChange}
          />
        </div>
        
        <Button 
          onClick={analyzeScan} 
          className="w-full bg-purple-600 hover:bg-purple-700" 
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
              Analyze Scan
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
