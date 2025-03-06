
import { useState, useEffect } from "react";
import { FileText, Bot } from "lucide-react";
import ReactMarkdown from 'react-markdown';

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
    <div className="rounded-lg bg-white p-4 shadow-md border border-amber-200 mb-3">
      <div className="flex items-start mb-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center mr-3 flex-shrink-0 shadow-sm">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <div className="font-medium text-amber-800">Medical Assistant</div>
          <div className="text-xs text-gray-500">AI-powered insights</div>
        </div>
      </div>
      
      <div className="pl-12">
        <div className="flex items-start">
          <FileText className="h-4 w-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
          <div className="bg-amber-50 p-3 rounded-md border border-amber-100 w-full">
            {isComplete ? (
              <ReactMarkdown className="text-sm text-gray-700 prose prose-sm prose-headings:text-amber-800 prose-a:text-amber-600 max-w-none">
                {displayText}
              </ReactMarkdown>
            ) : (
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {displayText}
                <span className="inline-block w-2 h-4 bg-amber-500 ml-1 animate-pulse"></span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
