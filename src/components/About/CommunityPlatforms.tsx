import React from "react";
import { MessageSquare, Users, QrCode, ExternalLink, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
export const CommunityPlatforms: React.FC = () => {
  return <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl mb-16 p-8 md:p-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Connect with Our AI Dental Communities</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Telegram Bot */}
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-center mb-6">
            <MessageSquare className="h-12 w-12 text-blue-600 mr-4" />
            <h3 className="text-2xl font-bold text-blue-800">Private AI Dental Assistant</h3>
          </div>
          <p className="text-gray-700 mb-6 text-center">
            Get personalized dental advice through our secure Telegram bot. 
            Scan the QR code below to start a private conversation with our AI dental expert.
          </p>
          <div className="flex flex-col items-center">
            <div className="border border-gray-200 p-3 rounded-lg mb-4 bg-white">
              <img src="/lovable-uploads/4ba67f77-f50a-44b9-8c92-af7a1bf3e4b7.png" alt="Telegram Bot QR Code" className="w-48 h-48 object-contain" />
            </div>
            <Button className="flex items-center gap-2 rounded-full bg-blue-500 hover:bg-blue-600">
              <QrCode size={16} />
              <span>Open Telegram Bot</span>
              <ExternalLink size={16} />
            </Button>
          </div>
        </div>
        
        {/* Discord Community */}
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-center mb-6">
            <Users className="h-12 w-12 text-indigo-600 mr-4" />
            <h3 className="text-2xl font-bold text-indigo-800">Community Support</h3>
          </div>
          <p className="text-gray-700 mb-6 text-center">
            Join our vibrant Discord community where you can interact with other patients, ask questions, 
            and get support from our team of dental professionals.
          </p>
          <div className="flex flex-col items-center">
            <div className="border border-gray-200 p-3 rounded-lg mb-4 bg-white">
              <img src="/lovable-uploads/cf3c7f6e-bfe0-46ca-8e11-e76d6c33a884.png" alt="Discord Community QR Code" className="w-48 h-48 object-contain" />
            </div>
            <Button className="flex items-center gap-2 rounded-full bg-indigo-500 hover:bg-indigo-600">
              <QrCode size={16} />
              <span>Join Discord  Community</span>
              <ExternalLink size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <h4 className="text-xl font-semibold text-gray-900 mb-4">Why Join Our Communities?</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 mb-4 mx-auto">
              <MessageSquare size={24} />
            </div>
            <h5 className="font-semibold mb-2 text-center">24/7 Support</h5>
            <p className="text-gray-600 text-center text-sm">Get answers to your dental questions anytime, anywhere</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 mb-4 mx-auto">
              <Shield size={24} />
            </div>
            <h5 className="font-semibold mb-2 text-center">Privacy-Focused</h5>
            <p className="text-gray-600 text-center text-sm">Your dental concerns are addressed with complete confidentiality</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 mb-4 mx-auto">
              <Users size={24} />
            </div>
            <h5 className="font-semibold mb-2 text-center">Community Knowledge</h5>
            <p className="text-gray-600 text-center text-sm">Learn from shared experiences and expert advice</p>
          </div>
        </div>
      </div>
    </section>;
};