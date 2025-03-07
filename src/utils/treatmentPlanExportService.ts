
import { jsPDF } from "jspdf";
import { toast } from "@/hooks/use-toast";

interface TreatmentPlanResponse {
  condition: string;
  treatment_plan: string;
  generated_at: string;
}

// Function to clean markdown syntax from text
export const cleanMarkdownSyntax = (text: string): string => {
  let cleanedText = text;
  
  // Remove headers (# Header)
  cleanedText = cleanedText.replace(/#+\s+/g, '');
  
  // Remove bold/italic markers (* or **)
  cleanedText = cleanedText.replace(/\*{1,2}(.*?)\*{1,2}/g, '$1');
  
  // Remove line breaks, but preserve paragraphs
  cleanedText = cleanedText.replace(/\n{3,}/g, '\n\n'); // Keep paragraph breaks (double newlines)
  
  // Remove code blocks
  cleanedText = cleanedText.replace(/```[\s\S]*?```/g, '');
  
  // Remove inline code
  cleanedText = cleanedText.replace(/`(.*?)`/g, '$1');
  
  // Remove bullet points and numbered lists
  cleanedText = cleanedText.replace(/^\s*[-*+]\s+/gm, '');
  cleanedText = cleanedText.replace(/^\s*\d+\.\s+/gm, '');
  
  return cleanedText.trim();
};

export const exportTreatmentPlanToPdf = (treatmentPlan: TreatmentPlanResponse) => {
  if (!treatmentPlan) return;
  
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    doc.setFontSize(18);
    doc.setTextColor(0, 100, 0);
    doc.text("Treatment Plan", pageWidth / 2, 20, { align: "center" });
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Condition: ${treatmentPlan.condition}`, 20, 40);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date(treatmentPlan.generated_at).toLocaleString()}`, 20, 50);
    
    // Clean the markdown from the treatment plan before adding to PDF
    const cleanedTreatmentPlan = cleanMarkdownSyntax(treatmentPlan.treatment_plan);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const splitText = doc.splitTextToSize(cleanedTreatmentPlan, pageWidth - 40);
    doc.text(splitText, 20, 70);
    
    doc.save("Treatment_Plan.pdf");
    
    toast({
      title: "PDF Exported",
      description: "Your treatment plan has been successfully exported as a PDF.",
    });
    
  } catch (error) {
    console.error("Error exporting PDF:", error);
    toast({
      title: "Export Failed",
      description: "Failed to export the treatment plan as PDF. Please try again.",
      variant: "destructive"
    });
  }
};
