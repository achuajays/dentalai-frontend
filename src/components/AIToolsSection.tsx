
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Radiation, Image, ClipboardCheck, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export function AIToolsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
      {aiTools.map((tool, index) => (
        <Card 
          key={index} 
          className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>
          <CardHeader className="pb-2">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white ${tool.bgColor} mb-4`}>
              {tool.icon}
            </div>
            <CardTitle className="text-xl text-blue-700">{tool.title}</CardTitle>
            <CardDescription className="text-blue-500 font-medium">{tool.shortDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              {tool.description}
            </p>
            <div className="mt-4 space-y-2">
              {tool.features.map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <p className="text-sm text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 hover-scale"
                asChild
              >
                <Link to={tool.link}>
                  Try {tool.title}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const aiTools = [
  {
    title: "X-ray Analysis",
    shortDescription: "AI-powered dental radiograph analysis",
    description: "Our advanced AI algorithms analyze dental x-rays to identify cavities, bone loss, and other abnormalities with high precision, allowing for early detection and improved treatment outcomes.",
    icon: <Radiation size={28} color="white" />,
    bgColor: "bg-blue-600",
    features: [
      "Instant cavity and fracture detection",
      "Periodontal disease assessment",
      "Implant planning assistance",
      "Automatic measurement tools"
    ],
    link: "/ai-xray"
  },
  {
    title: "Medical Imaging",
    shortDescription: "Enhanced 3D imaging for treatment",
    description: "Transform 2D scans into detailed 3D models for comprehensive visualization, helping dentists plan complex procedures and communicate treatment plans more effectively to patients.",
    icon: <Image size={28} color="white" />,
    bgColor: "bg-purple-600",
    features: [
      "3D reconstruction from 2D images",
      "Interactive digital models",
      "Cross-sectional analysis",
      "Virtual treatment simulation"
    ],
    link: "/ai-imaging"
  },
  {
    title: "Treatment Planning",
    shortDescription: "AI-assisted treatment recommendations",
    description: "Leverage AI to generate personalized treatment plans based on patient history, current conditions, and evidence-based protocols, ensuring optimal care and improved outcomes.",
    icon: <ClipboardCheck size={28} color="white" />,
    bgColor: "bg-green-600",
    features: [
      "Personalized care recommendations",
      "Alternative treatment comparisons",
      "Treatment sequence optimization",
      "Cost and insurance estimation"
    ],
    link: "/ai-treatment"
  },
  {
    title: "Medical Report Analysis",
    shortDescription: "Automated report interpretation",
    description: "Our AI analyzes dental and medical reports to extract key information, identify patterns, and highlight critical findings that may impact dental treatment decisions.",
    icon: <FileText size={28} color="white" />,
    bgColor: "bg-amber-600",
    features: [
      "Medical history summarization",
      "Medication interaction alerts",
      "Risk factor identification",
      "Simplified report generation"
    ],
    link: "/ai-reports"
  }
];
