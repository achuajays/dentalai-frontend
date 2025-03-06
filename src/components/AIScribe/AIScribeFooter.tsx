
import React from "react";
import { CardFooter } from "@/components/ui/card";

const AIScribeFooter: React.FC = () => {
  return (
    <CardFooter className="bg-gray-50 border-t px-6 py-4">
      <div className="w-full text-center text-sm text-gray-500">
        <p>
          For best results, speak clearly and ensure you are in a quiet environment.
          The AI will automatically transcribe your conversation.
        </p>
      </div>
    </CardFooter>
  );
};

export default AIScribeFooter;
