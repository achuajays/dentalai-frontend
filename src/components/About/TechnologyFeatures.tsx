
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, FileText, Search, ClipboardList, Shield } from "lucide-react";

type TechFeatureProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const techFeatures: TechFeatureProps[] = [
  {
    title: "Real-time Transcription",
    description: "Advanced speech-to-text algorithms capture patient consultations with high accuracy.",
    icon: <MessageSquare size={24} />
  }, 
  {
    title: "SOAP Note Generation",
    description: "AI that structures patient information into comprehensive clinical documentation.",
    icon: <FileText size={24} />
  }, 
  {
    title: "X-ray Analysis",
    description: "Computer vision technology that assists in identifying potential issues in dental X-rays.",
    icon: <Search size={24} />
  }, 
  {
    title: "Treatment Planning",
    description: "AI-assisted tools for developing comprehensive treatment plans based on patient data.",
    icon: <ClipboardList size={24} />
  }
];

export const TechnologyFeatures: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl mb-16 p-8 md:p-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">The Technology Behind DentalCare+</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">AI-Powered Solutions</h3>
          <p className="text-gray-700">
            Our suite of AI tools represents the cutting edge of dental technology. From automated SOAP note generation 
            with AI Scribe to advanced X-ray analysis, our AI assistants help dentists deliver faster, more accurate care.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-gray-700">HIPAA-compliant data processing for all patient information</span>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-gray-700">Advanced encryption for secure data transmission and storage</span>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-gray-700">Regular security audits and compliance checks</span>
            </li>
          </ul>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          {techFeatures.map((feature, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-5">
                <div className="text-blue-600 mb-3">{feature.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
