
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Microscope,
  Activity,
  Zap,
  BarChart3,
  Dumbbell,
  Globe
} from "lucide-react";

export function AIToolsSection() {
  const aiTools = [
    {
      title: "AI Scribe",
      description: "Convert patient conversations into structured SOAP notes",
      icon: <FileText className="w-10 h-10 text-blue-600" />,
      link: "/ai-scribe"
    },
    {
      title: "AI X-Ray Analysis",
      description: "Automated detection of dental conditions from X-rays",
      icon: <Microscope className="w-10 h-10 text-blue-600" />,
      link: "/ai-xray"
    },
    {
      title: "AI Treatment Planning",
      description: "Generate personalized treatment plans based on patient data",
      icon: <Activity className="w-10 h-10 text-blue-600" />,
      link: "/ai-treatment"
    },
    {
      title: "AI Medical Imaging",
      description: "Enhanced imaging for accurate dental diagnostics",
      icon: <Zap className="w-10 h-10 text-blue-600" />,
      link: "/ai-imaging"
    },
    {
      title: "AI Medical Reports",
      description: "Generate comprehensive medical reports from your data",
      icon: <BarChart3 className="w-10 h-10 text-blue-600" />,
      link: "/ai-reports"
    },
    {
      title: "Exercise Finder",
      description: "Find targeted exercises for rehabilitation and recovery",
      icon: <Dumbbell className="w-10 h-10 text-blue-600" />,
      link: "/ai-exercise"
    },
    {
      title: "EMR Integration",
      description: "Seamlessly connect with any EMR system",
      icon: <Globe className="w-10 h-10 text-blue-600" />,
      link: "/integrations"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {aiTools.map((tool, index) => (
        <Card key={index} className="border-2 border-blue-100 hover:border-blue-300 transition-colors duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">{tool.title}</CardTitle>
            {tool.icon}
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{tool.description}</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to={tool.link}>Launch Tool</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
