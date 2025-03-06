
import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/Footer";
import { XrayAnalysisSection } from "@/components/XrayAnalysisSection";

export default function AIXray() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
              AI X-ray Analysis
            </h1>
            <p className="text-lg text-gray-600">
              Upload your dental X-ray images for instant AI-powered analysis and insights.
            </p>
          </div>
          <XrayAnalysisSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
