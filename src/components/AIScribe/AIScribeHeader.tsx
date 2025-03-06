
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/AIScribe/StatusBadge";

interface AIScribeHeaderProps {
  status: string;
}

const AIScribeHeader: React.FC<AIScribeHeaderProps> = ({ status }) => {
  return (
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <CardTitle>Voice Recorder</CardTitle>
        <StatusBadge status={status} />
      </div>
    </CardHeader>
  );
};

export default AIScribeHeader;
