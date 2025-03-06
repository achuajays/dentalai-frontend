
import React from "react";
import { Heart, GraduationCap } from "lucide-react";

export const MissionVision: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl mb-16 p-8 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Our Mission</h2>
          <p className="text-gray-700 text-lg mb-6">
            At DentalCare+, we are committed to revolutionizing dental healthcare by seamlessly integrating 
            cutting-edge AI technology with compassionate, patient-centered care. Our mission is to make 
            high-quality dental care more accessible, efficient, and personalized for everyone.
          </p>
          <div className="flex items-center">
            <Heart className="h-12 w-12 text-blue-600 mr-4" />
            <p className="text-blue-700 font-medium">
              Putting patients first with technology that enhances the human touch
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-indigo-800 mb-6">Our Vision</h2>
          <p className="text-gray-700 text-lg mb-6">
            We envision a future where AI-powered dental care is the standard, not the exception. A world where 
            dentists have powerful digital assistants that enhance their clinical expertise, reduce administrative 
            burden, and allow them to focus on what matters most: providing exceptional care to their patients.
          </p>
          <div className="flex items-center">
            <GraduationCap className="h-12 w-12 text-indigo-600 mr-4" />
            <p className="text-indigo-700 font-medium">
              Continuous innovation and education for better oral health outcomes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
