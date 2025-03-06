
import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface TranscriptActionsProps {
  onSave: () => void;
  onClear: () => void;
  disabled: boolean;
}

const TranscriptActions: React.FC<TranscriptActionsProps> = ({ 
  onSave, 
  onClear, 
  disabled 
}) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onSave}
        disabled={disabled}
        className="border-blue-600 text-blue-600 hover:bg-blue-50"
      >
        <Save className="mr-2 h-4 w-4" />
        Save
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onClear}
        disabled={disabled}
        className="border-gray-500 text-gray-500 hover:bg-gray-50"
      >
        Clear
      </Button>
    </div>
  );
};

export default TranscriptActions;
