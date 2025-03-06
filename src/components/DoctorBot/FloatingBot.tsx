
import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Minimize, Maximize, Info, Activity, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { BotResponse } from "./BotResponse";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export function FloatingBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<{type: 'query' | 'response', text: string}[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    // Scroll to bottom when conversation updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversationHistory]);

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

    // Add user query to conversation
    const userQuery = query.trim();
    setConversationHistory(prev => [...prev, {type: 'query', text: userQuery}]);
    setQuery("");
    setIsLoading(true);
    
    try {
      const encodedText = encodeURIComponent(userQuery);
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
      
      // Add bot response to conversation
      setConversationHistory(prev => [...prev, {type: 'response', text: data.Response}]);
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
        <Card className="mb-2 w-96 overflow-hidden border-amber-200 shadow-xl animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-700 px-4 py-3 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-white/20 p-1.5 rounded-full mr-2">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg font-medium">Medical Assistant</CardTitle>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:bg-amber-600"
                  onClick={toggleMinimize}
                  title="Minimize"
                >
                  <Minimize className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:bg-amber-600"
                  onClick={toggleOpen}
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div 
              ref={chatContainerRef}
              className="h-80 overflow-y-auto p-3 bg-gradient-to-b from-amber-50 to-white"
            >
              {conversationHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6">
                  <Activity className="h-12 w-12 text-amber-400 mb-4" />
                  <h3 className="text-center text-lg font-medium text-amber-800 mb-2">
                    Medical Assistant
                  </h3>
                  <p className="text-center text-sm mb-4">
                    Ask me any medical questions, and I'll provide assistance based on available data.
                  </p>
                  <div className="bg-amber-100/50 p-3 rounded-lg border border-amber-200 w-full">
                    <div className="flex items-start mb-2">
                      <Info className="h-4 w-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-xs text-amber-700">
                        I can analyze patient reports, explain medical conditions, and suggest potential treatments.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {conversationHistory.map((item, index) => (
                    item.type === 'query' ? (
                      <div key={index} className="flex justify-end mb-2">
                        <div className="max-w-[85%] bg-blue-600 text-white p-3 rounded-lg shadow-sm">
                          <p className="text-sm">{item.text}</p>
                        </div>
                      </div>
                    ) : (
                      <BotResponse key={index} text={item.text} />
                    )
                  ))}
                  {isLoading && (
                    <div className="flex items-center space-x-2 p-3">
                      <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse delay-75"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse delay-150"></div>
                      <span className="text-xs text-gray-500">Analyzing...</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="border-t border-gray-100 p-3 bg-white">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask a medical question..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-grow mr-2 border-amber-200 focus-visible:ring-amber-500 text-sm"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="sm"
                  disabled={isLoading}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-white border-opacity-50 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>
          </CardFooter>
        </Card>
      )}
      
      {isOpen && isMinimized && (
        <div 
          className="mb-2 bg-white rounded-lg shadow-xl border border-amber-200 p-2 cursor-pointer animate-fade-in"
          onClick={toggleMinimize}
        >
          <div className="bg-gradient-to-r from-amber-500 to-amber-700 p-2 rounded-md text-white font-medium flex items-center justify-between">
            <div className="flex items-center">
              <Stethoscope className="h-4 w-4 mr-2" />
              <span>Medical Assistant</span>
            </div>
            <Maximize className="h-3 w-3 ml-2" />
          </div>
        </div>
      )}
      
      <Button
        onClick={toggleOpen}
        size="icon"
        className={`h-14 w-14 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white shadow-lg ${
          isOpen ? "rotate-90 transform" : ""
        } transition-transform duration-300`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
}
