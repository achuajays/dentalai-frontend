
import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Minimize, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { BotResponse } from "./BotResponse";

export function FloatingBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const encodedText = encodeURIComponent(query);
      const response = await fetch(
        `https://dentalai-production.up.railway.app/ReportRag/analyze?text=${encodedText}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data.Response);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen && !isMinimized && (
        <div className="mb-2 w-80 bg-white rounded-lg shadow-xl border border-amber-200 overflow-hidden transition-all duration-300 animate-fade-in">
          <div className="bg-gradient-to-r from-amber-500 to-amber-700 p-3 text-white font-medium flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              <span>Medical Assistant</span>
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-amber-600"
                onClick={toggleMinimize}
              >
                <Minimize className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-amber-600"
                onClick={toggleOpen}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="h-72 overflow-y-auto p-3 bg-amber-50">
            {response ? (
              <BotResponse text={response} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <p className="text-center text-sm">
                  Ask me any medical question, and I'll provide assistance based on available data.
                </p>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="p-2 bg-white border-t border-gray-100">
            <div className="flex">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Ask a medical question..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow mr-2 text-sm focus-visible:ring-amber-500"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="sm"
                disabled={isLoading}
                className="bg-amber-600 hover:bg-amber-700"
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-white border-opacity-50 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </div>
      )}
      
      {isOpen && isMinimized && (
        <div 
          className="mb-2 bg-white rounded-lg shadow-xl border border-amber-200 p-2 cursor-pointer animate-fade-in"
          onClick={toggleMinimize}
        >
          <div className="bg-gradient-to-r from-amber-500 to-amber-700 p-2 rounded-md text-white font-medium flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            <span>Medical Assistant (Minimized)</span>
            <Maximize className="h-4 w-4 ml-2" />
          </div>
        </div>
      )}
      
      <Button
        onClick={toggleOpen}
        size="icon"
        className={`h-12 w-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white shadow-lg ${
          isOpen ? "rotate-90 transform" : ""
        } transition-transform duration-300`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
}
