
import { useState, useEffect } from "react";

interface BotResponseProps {
  text: string;
}

export function BotResponse({ text }: BotResponseProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayText("");
    setIsComplete(false);
    
    // Simulate typing effect
    const intervalId = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(intervalId);
        setIsComplete(true);
      }
    }, 20); // Adjust speed of typing
    
    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <div className="rounded-lg bg-white p-3 shadow-sm border border-amber-100">
      <div className="flex items-start mb-2">
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2 flex-shrink-0">
          <span className="text-amber-700 text-sm font-bold">AI</span>
        </div>
        <div className="text-xs text-gray-500">Medical Assistant</div>
      </div>
      
      <div className="pl-10">
        <p className="text-sm text-gray-700 whitespace-pre-wrap">
          {displayText}
          {!isComplete && (
            <span className="inline-block w-2 h-4 bg-amber-500 ml-1 animate-pulse"></span>
          )}
        </p>
      </div>
    </div>
  );
}
