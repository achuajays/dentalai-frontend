
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileImage, Loader2, Radiation, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface XrayUploadCardProps {
  onAnalysisComplete: (result: { filename: string; analysis: string }) => void;
}

export function XrayUploadCard({ onAnalysisComplete }: XrayUploadCardProps) {
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
  
  const analyzeXray = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please upload an X-ray image to analyze.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const response = await fetch('https://dentalai-production.up.railway.app/xray/analyze', {
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
        description: "Your X-ray has been successfully analyzed.",
      });
    } catch (error) {
      console.error('Error analyzing X-ray:', error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your X-ray. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <Radiation className="text-blue-600" size={24} />
          </div>
          <h2 className="text-2xl font-semibold text-blue-700">Upload X-ray</h2>
        </div>
        
        <div className="mb-6">
          <label 
            htmlFor="x-ray-upload" 
            className="block w-full cursor-pointer border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
          >
            {imagePreview ? (
              <div className="flex flex-col items-center">
                <img 
                  src={imagePreview} 
                  alt="X-ray preview" 
                  className="max-h-64 object-contain mb-4"
                />
                <p className="text-sm text-gray-500">Click to change image</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <FileImage className="h-16 w-16 text-blue-400 mb-2" />
                <p className="text-lg font-medium text-blue-600 mb-1">Upload your X-ray image</p>
                <p className="text-sm text-gray-500">Click to browse files</p>
                <p className="text-xs text-gray-400 mt-2">Supported formats: JPG, PNG</p>
              </div>
            )}
          </label>
          <Input 
            id="x-ray-upload" 
            type="file" 
            accept="image/jpeg,image/png" 
            className="hidden" 
            onChange={handleFileChange}
          />
        </div>
        
        <Button 
          onClick={analyzeXray} 
          className="w-full bg-blue-600 hover:bg-blue-700" 
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
              Analyze X-ray
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
