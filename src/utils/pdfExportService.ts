
import { SoapNote } from "@/types/AIScribe";
import { jsPDF } from "jspdf";
import { toast } from "@/hooks/use-toast";

export const exportSoapNoteToPdf = (soapNote: SoapNote) => {
  try {
    // Create new jsPDF instance
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 255);
    doc.text("SOAP Note", pageWidth / 2, 20, { align: "center" });
    
    // Add current date
    const date = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${date}`, pageWidth / 2, 30, { align: "center" });
    
    // Reset text color
    doc.setTextColor(0, 0, 0);
    
    // Set content font
    doc.setFontSize(12);
    
    // Line position tracker
    let y = 45;
    const lineHeight = 7;
    
    // Subjective
    doc.setFontSize(14);
    doc.setTextColor(150, 75, 0);
    doc.text("Subjective:", 20, y);
    y += lineHeight;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    // Split text to fit page width
    const splitSubjective = doc.splitTextToSize(soapNote.subjective, pageWidth - 40);
    doc.text(splitSubjective, 20, y);
    y += splitSubjective.length * lineHeight + 5;
    
    // Objective
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 150);
    doc.text("Objective:", 20, y);
    y += lineHeight;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    const splitObjective = doc.splitTextToSize(soapNote.objective, pageWidth - 40);
    doc.text(splitObjective, 20, y);
    y += splitObjective.length * lineHeight + 5;
    
    // Assessment
    doc.setFontSize(14);
    doc.setTextColor(100, 0, 100);
    doc.text("Assessment:", 20, y);
    y += lineHeight;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    const splitAssessment = doc.splitTextToSize(soapNote.assessment, pageWidth - 40);
    doc.text(splitAssessment, 20, y);
    y += splitAssessment.length * lineHeight + 5;
    
    // Plan
    doc.setFontSize(14);
    doc.setTextColor(0, 100, 0);
    doc.text("Plan:", 20, y);
    y += lineHeight;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    const splitPlan = doc.splitTextToSize(soapNote.plan, pageWidth - 40);
    doc.text(splitPlan, 20, y);
    y += splitPlan.length * lineHeight + 5;
    
    // Summary
    doc.setFontSize(14);
    doc.setTextColor(200, 100, 0);
    doc.text("Summary:", 20, y);
    y += lineHeight;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    const splitSummary = doc.splitTextToSize(soapNote.summary, pageWidth - 40);
    doc.text(splitSummary, 20, y);
    
    // Save PDF
    doc.save("SOAP_Note.pdf");
    
    toast({
      title: "PDF Exported",
      description: "Your SOAP note has been successfully exported as a PDF.",
    });
    
  } catch (error) {
    console.error("Error exporting PDF:", error);
    toast({
      title: "Export Failed",
      description: "Failed to export the SOAP note as PDF. Please try again.",
      variant: "destructive"
    });
  }
};
