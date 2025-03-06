
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/AIScribe/StatusBadge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AIScribeHeaderProps {
  status: string;
}

const AIScribeHeader: React.FC<AIScribeHeaderProps> = ({ status }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack} 
            className="mr-2 p-1 h-8 w-8"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <CardTitle>Voice Recorder</CardTitle>
        </div>
        <StatusBadge status={status} />
      </div>
    </CardHeader>
  );
};

export default AIScribeHeader;
