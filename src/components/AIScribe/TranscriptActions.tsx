
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, File } from "lucide-react";

interface TranscriptActionsProps {
  onSave: () => void;
  onClear: () => void;
  onExportPdf: () => void;
  disabled: boolean;
  isSoapNote: boolean;
}

const TranscriptActions: React.FC<TranscriptActionsProps> = ({
  onSave,
  onClear,
  onExportPdf,
  disabled,
  isSoapNote
}) => {
  return <div className="flex space-x-2">
      {!isSoapNote && (
        <Button variant="outline" size="sm" onClick={onSave} disabled={disabled} className="border-green-600 text-green-600 hover:bg-green-50">
          <FileText className="mr-2 h-4 w-4" />
          Generate SOAP Note
        </Button>
      )}
      
      {isSoapNote && (
        <Button variant="outline" size="sm" onClick={onExportPdf} disabled={disabled} className="border-blue-600 text-blue-600 hover:bg-blue-50">
          <File className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      )}
      
      <Button variant="outline" size="sm" onClick={onClear} disabled={disabled} className="border-gray-500 text-gray-500 hover:bg-gray-50">
        Clear
      </Button>
    </div>;
};

export default TranscriptActions;
