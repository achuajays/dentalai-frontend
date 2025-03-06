
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CloudOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <Card className="max-w-md w-full shadow-lg border-none overflow-hidden animate-scale-in">
        <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <CardContent className="pt-8 pb-10 px-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center justify-center animate-pulse opacity-20">
                <CloudOff size={120} strokeWidth={1} className="text-blue-800" />
              </div>
              <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
                404
              </h1>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 animate-fade-in" style={{ animationDelay: "100ms" }}>
              Page Not Found
            </h2>
            
            <p className="text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
              The page you're looking for doesn't exist or has been moved.
              Let's get you back on track.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Button 
                asChild 
                size="lg" 
                className="w-full hover-scale bg-gradient-to-r from-blue-600 to-blue-700 shadow-md"
              >
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft size={18} />
                  Return Home
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
