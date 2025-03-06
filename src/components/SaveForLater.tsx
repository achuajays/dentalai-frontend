
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SaveForLaterProps {
  text: string;
  type: "Xray" | "Scan";
  disabled?: boolean;
}

export function SaveForLater({ text, type, disabled = false }: SaveForLaterProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!text) {
      toast({
        title: "No content to save",
        description: "There is no analysis result to save.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    
    try {
      const response = await fetch('https://dentalai-production.up.railway.app/save-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          type
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      toast({
        title: "Saved successfully",
        description: `Analysis saved for later reference (ID: ${data.id}).`,
      });
    } catch (error) {
      console.error('Error saving analysis:', error);
      toast({
        title: "Save failed",
        description: "There was an error saving your analysis. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Button 
      variant="outline"
      className="mt-4 border-blue-300 hover:bg-blue-50 hover:text-blue-700 text-blue-600"
      onClick={handleSave}
      disabled={disabled || isSaving}
    >
      <Save className="mr-2 h-4 w-4" />
      {isSaving ? "Saving..." : "Save for Later"}
    </Button>
  );
}
