
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to?: string;
  label?: string;
}

export function BackButton({ to = "/ai-tools", label = "Back to AI Tools" }: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(to);
  };

  return (
    <Button 
      variant="ghost" 
      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 mb-4"
      onClick={handleBack}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  );
}
