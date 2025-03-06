
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Headphones, FileText, Clock, Zap, Download, Shield } from "lucide-react";

export function AIScribeExplanation() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
              <Headphones className="mr-2 h-6 w-6 text-blue-600" />
              How AI Scribe Works
            </h2>
            <p className="text-gray-700 mb-4">
              AI Scribe transforms your spoken words into accurate, well-formatted text in real-time. 
              Simply start recording during patient conversations, and our advanced AI will transcribe 
              everything while filtering out background noise.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                <span>Start recording during your patient consultation</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                <span>Our AI transcribes the conversation in real-time</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                <span>Generate a comprehensive SOAP note with a single click</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                <span>Export the note to PDF for your records</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
              <FileText className="mr-2 h-6 w-6 text-purple-600" />
              SOAP Note Generation
            </h2>
            <p className="text-gray-700 mb-4">
              Our AI analyzes transcribed conversations using advanced natural language processing to create 
              complete SOAP notes. Each section is populated with relevant information extracted from your 
              consultation.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-3 rounded-lg border border-purple-100 shadow-sm">
                <h3 className="font-medium text-purple-700 mb-1">Subjective</h3>
                <p className="text-gray-600 text-sm">Patient complaints, symptoms, and medical history</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-100 shadow-sm">
                <h3 className="font-medium text-purple-700 mb-1">Objective</h3>
                <p className="text-gray-600 text-sm">Clinical observations and examination findings</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-100 shadow-sm">
                <h3 className="font-medium text-purple-700 mb-1">Assessment</h3>
                <p className="text-gray-600 text-sm">Diagnostic conclusions and clinical evaluations</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-100 shadow-sm">
                <h3 className="font-medium text-purple-700 mb-1">Plan</h3>
                <p className="text-gray-600 text-sm">Treatment recommendations and follow-up actions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg border border-blue-200 shadow-sm flex flex-col items-center text-center">
          <Clock className="h-12 w-12 text-blue-600 mb-3" />
          <h3 className="font-semibold text-blue-800 mb-2">Save Time</h3>
          <p className="text-gray-700 text-sm">
            Reduce documentation time by up to 70% with automated transcription and SOAP note generation
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg border border-green-200 shadow-sm flex flex-col items-center text-center">
          <Zap className="h-12 w-12 text-green-600 mb-3" />
          <h3 className="font-semibold text-green-800 mb-2">Improve Accuracy</h3>
          <p className="text-gray-700 text-sm">
            Ensure comprehensive documentation with AI that captures all relevant details without human error
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg border border-purple-200 shadow-sm flex flex-col items-center text-center">
          <Shield className="h-12 w-12 text-purple-600 mb-3" />
          <h3 className="font-semibold text-purple-800 mb-2">Secure & Private</h3>
          <p className="text-gray-700 text-sm">
            All transcriptions are processed with HIPAA-compliant encryption and security measures
          </p>
        </div>
      </div>
    </div>
  );
}
