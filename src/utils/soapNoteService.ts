
import { SoapNote } from "@/types/AIScribe";
import { toast } from "@/hooks/use-toast";

export const generateSoapNote = async (patientInfo: string): Promise<SoapNote | null> => {
  if (!patientInfo.trim()) {
    toast({
      title: "Nothing to generate",
      description: "Start recording to create a transcript first.",
      variant: "destructive"
    });
    return null;
  }

  try {
    const url = `https://dentalai-production.up.railway.app/soap/generate?patient_id=1&patient_info=${encodeURIComponent(patientInfo)}`;
    
    toast({
      title: "Generating SOAP Note",
      description: "Please wait while we generate your SOAP note...",
    });
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate SOAP note');
    }
    
    const result = await response.json();
    return result.data.soap_note;
  } catch (error) {
    console.error('Error generating SOAP note:', error);
    toast({
      title: "Generation Failed",
      description: "Failed to generate SOAP note. Please try again.",
      variant: "destructive"
    });
    return null;
  }
};

export const formatSoapNote = (soapNote: SoapNote, formatTime: () => string) => {
  return [
    { text: `Subjective: ${soapNote.subjective}`, type: 'local' as const, timestamp: formatTime() },
    { text: `Objective: ${soapNote.objective}`, type: 'local' as const, timestamp: formatTime() },
    { text: `Assessment: ${soapNote.assessment}`, type: 'local' as const, timestamp: formatTime() },
    { text: `Plan: ${soapNote.plan}`, type: 'local' as const, timestamp: formatTime() },
    { text: `Summary: ${soapNote.summary}`, type: 'local' as const, timestamp: formatTime() }
  ];
};
