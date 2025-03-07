
import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "json", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative group rounded-md overflow-hidden", className)}>
      <pre className="bg-gray-800 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <Button
        size="icon"
        variant="outline"
        className="absolute right-2 top-2 h-8 w-8 bg-gray-800/80 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-gray-200 focus:ring-gray-500 transition-opacity opacity-0 group-hover:opacity-100"
        onClick={handleCopy}
        title="Copy to clipboard"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}
