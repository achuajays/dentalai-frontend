
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Radiation, Upload, FileImage, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface XrayAnalysisResponse {
  filename: string;
  analysis: string;
}

export function XrayAnalysisSection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<XrayAnalysisResponse | null>(null);
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
      
      // Reset analysis result when new file is selected
      setAnalysisResult(null);
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
      
      const data: XrayAnalysisResponse = await response.json();
      setAnalysisResult(data);
      
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
  
  // Format analysis text with improved readability
  const formatAnalysis = (text: string) => {
    // Replace asterisks with bullet points and add line breaks
    return text
      .replace(/\*/g, '•')
      .replace(/\.\s+/g, '.\n\n')
      .replace(/:\s+/g, ':\n');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
      {/* Upload Section */}
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
      
      {/* Results Section */}
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
    </div>
  );
}
