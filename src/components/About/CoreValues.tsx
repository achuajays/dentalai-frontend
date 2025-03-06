
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Shield, Award, Heart, Users, MessageSquare } from "lucide-react";

type CoreValueProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const coreValues: CoreValueProps[] = [
  {
    title: "Innovation",
    description: "We constantly push the boundaries of what's possible in dental technology to improve patient care and clinical outcomes.",
    icon: <GraduationCap size={32} />
  }, 
  {
    title: "Excellence",
    description: "We are committed to delivering the highest standard of technology and support to our dental partners.",
    icon: <Award size={32} />
  }, 
  {
    title: "Compassion",
    description: "We believe technology should enhance the human touch, not replace it. Our tools are designed to support compassionate care.",
    icon: <Heart size={32} />
  }, 
  {
    title: "Accessibility",
    description: "We're dedicated to making advanced dental technology accessible to practices of all sizes and their diverse patient populations.",
    icon: <Users size={32} />
  }, 
  {
    title: "Integrity",
    description: "We uphold the highest ethical standards in data security, privacy, and responsible AI development.",
    icon: <Shield size={32} />
  }, 
  {
    title: "Collaboration",
    description: "We work closely with dental professionals to develop solutions that address real clinical needs and challenges.",
    icon: <MessageSquare size={32} />
  }
];

export const CoreValues: React.FC = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {coreValues.map((value, index) => (
          <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <CardContent className="pt-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 mb-6 mx-auto">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 text-center">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
