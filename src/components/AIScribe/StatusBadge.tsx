
import React from "react";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getVariant = () => {
    if (status === "Connected" || status === "Recording") return "success";
    if (status === "Paused") return "warning";
    if (status === "Stopped" || status === "Ready to connect") return "secondary";
    return "destructive";
  };

  const getColorClass = () => {
    if (status === "Connected" || status === "Recording") return "bg-green-500";
    if (status === "Paused") return "bg-yellow-500";
    if (status === "Stopped" || status === "Ready to connect") return "bg-gray-500";
    return "bg-red-500";
  };

  return (
    <Badge 
      variant={getVariant()}
      className={`px-3 py-1 ${getColorClass()} text-white`}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
