
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Microscope,
  Activity,
  Zap,
  BarChart3,
  Dumbbell,
  BookOpenText,
  GraduationCap
} from "lucide-react";

export function AIToolsSection() {
  const aiTools = [
    {
      title: "AI X-Ray Analysis",
      description: "Automated detection of dental conditions from X-rays with high accuracy and detailed reporting.",
      icon: <Microscope className="w-12 h-12 text-blue-600" />,
      link: "/ai-xray",
      color: "soft-blue"
    },
    {
      title: "AI Treatment Planning",
      description: "Generate personalized, evidence-based treatment plans based on comprehensive patient data analysis.",
      icon: <Activity className="w-12 h-12 text-purple-600" />,
      link: "/ai-treatment",
      color: "soft-purple"
    },
    {
      title: "AI Medical Imaging",
      description: "Enhanced imaging techniques using advanced algorithms for more accurate dental diagnostics and visualization.",
      icon: <Zap className="w-12 h-12 text-green-600" />,
      link: "/ai-imaging",
      color: "soft-green"
    },
    {
      title: "AI Medical Reports",
      description: "Generate comprehensive, well-structured medical reports from clinical data with customizable templates.",
      icon: <BarChart3 className="w-12 h-12 text-amber-600" />,
      link: "/ai-reports",
      color: "soft-yellow"
    },
    {
      title: "Exercise Finder",
      description: "Find targeted exercises for specific body parts to support rehabilitation, recovery, and overall patient wellness.",
      icon: <Dumbbell className="w-12 h-12 text-red-500" />,
      link: "/ai-exercise",
      color: "soft-peach"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
        <div className="flex items-center space-x-4 mb-4">
          <GraduationCap className="w-10 h-10 text-blue-700" />
          <h2 className="text-2xl font-bold text-blue-800">How Our AI Tools Work</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Our suite of AI-powered tools leverages advanced algorithms and machine learning to enhance your dental practice. 
          Each tool is designed to streamline workflows, improve diagnostic accuracy, and provide better patient outcomes.
        </p>
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-blue-100">
          <BookOpenText className="w-8 h-8 text-blue-600 flex-shrink-0" />
          <p className="text-gray-600 text-sm">
            Simply select a tool below to get started. Upload your data or enter your query, and our AI will process 
            it to provide you with valuable insights, analysis, and recommendations in seconds.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiTools.map((tool, index) => (
          <Card 
            key={index} 
            className={`border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-${tool.color}`}
          >
            <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <CardHeader className="pt-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-white/80 shadow-sm">
                  {tool.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">{tool.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 min-h-[80px]">{tool.description}</p>
            </CardContent>
            <CardFooter className="pb-6">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                <Link to={tool.link} className="flex items-center justify-center">
                  Launch Tool
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
