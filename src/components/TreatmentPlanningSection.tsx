import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardCheck, Loader2, FilePlus2, FileText, Pencil, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown';
import { exportTreatmentPlanToPdf } from "@/utils/treatmentPlanExportService";

interface TreatmentPlanResponse {
  condition: string;
  treatment_plan: string;
  generated_at: string;
}

export function TreatmentPlanningSection() {
  const [condition, setCondition] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlanResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedPlan, setEditedPlan] = useState("");
  const { toast } = useToast();
  
  const generateTreatmentPlan = async () => {
    if (!condition.trim()) {
      toast({
        title: "No condition specified",
        description: "Please enter a dental condition to generate a treatment plan.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const encodedCondition = encodeURIComponent(condition);
      const response = await fetch(`https://dentalai-production.up.railway.app/treatment/generate-plan?condition=${encodedCondition}`, {
        method: 'POST',
        headers: {
          'accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data: TreatmentPlanResponse = await response.json();
      setTreatmentPlan(data);
      
      toast({
        title: "Treatment plan generated",
        description: "Your AI treatment plan has been successfully created.",
      });
    } catch (error) {
      console.error('Error generating treatment plan:', error);
      toast({
        title: "Generation failed",
        description: "There was an error generating your treatment plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    if (treatmentPlan) {
      setEditedPlan(treatmentPlan.treatment_plan);
      setEditMode(true);
    }
  };

  const handleSaveEdit = () => {
    if (treatmentPlan) {
      setTreatmentPlan({
        ...treatmentPlan,
        treatment_plan: editedPlan
      });
      setEditMode(false);
      
      toast({
        title: "Changes saved",
        description: "Your edits to the treatment plan have been saved.",
      });
    }
  };

  const exportToPdf = () => {
    if (treatmentPlan) {
      exportTreatmentPlanToPdf(treatmentPlan);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <FilePlus2 className="text-blue-600" size={24} />
            </div>
            <h2 className="text-2xl font-semibold text-blue-700">Enter Dental Condition</h2>
          </div>
          
          <div className="mb-6">
            <Label htmlFor="condition" className="text-base font-medium text-gray-700 mb-2 block">
              Describe the dental condition
            </Label>
            <Textarea 
              id="condition" 
              placeholder="E.g., Moderate caries in upper right molar #3 with potential pulpal involvement"
              className="min-h-[120px] text-base"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-2">
              For best results, be specific about tooth number, location, and symptoms
            </p>
          </div>
          
          <Button 
            onClick={generateTreatmentPlan} 
            className="w-full bg-blue-600 hover:bg-blue-700" 
            disabled={!condition.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating plan...
              </>
            ) : (
              <>
                <ClipboardCheck className="mr-2 h-4 w-4" />
                Generate Treatment Plan
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="h-2 bg-gradient-to-r from-green-500 to-green-700"></div>
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <ClipboardCheck className="text-green-600" size={24} />
            </div>
            <h2 className="text-2xl font-semibold text-green-700">Treatment Plan</h2>
          </div>
          
          {treatmentPlan ? (
            <div className="bg-white rounded-lg">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-800">
                    Plan for: {treatmentPlan.condition}
                  </h3>
                  <div className="flex space-x-2">
                    {!editMode && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleEditClick}
                          className="border-green-300 hover:bg-green-50 hover:text-green-700 text-green-600"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Plan
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={exportToPdf}
                          className="border-green-300 hover:bg-green-50 hover:text-green-700 text-green-600"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Export PDF
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  Generated on: {new Date(treatmentPlan.generated_at).toLocaleString()}
                </p>
                
                {editMode ? (
                  <div className="bg-gray-50 rounded-lg">
                    <Textarea
                      value={editedPlan}
                      onChange={(e) => setEditedPlan(e.target.value)}
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
                    <ReactMarkdown className="text-sm prose prose-sm max-w-none prose-headings:text-green-800 prose-a:text-green-600 prose-li:marker:text-green-500">
                      {treatmentPlan.treatment_plan}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ClipboardCheck className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-400 mb-2">No Treatment Plan Yet</h3>
              <p className="text-gray-500">
                Enter a dental condition and click "Generate Treatment Plan" to see results
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
