
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/Footer";
import { AIToolsSection } from "@/components/AIToolsSection";

export default function AITools() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-6">
              AI-Powered Dental Tools
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Leverage the power of artificial intelligence to enhance diagnosis, treatment planning, and patient care.
              Our suite of specialized tools helps you deliver better outcomes with greater efficiency.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center px-4 py-2 bg-blue-50 rounded-full">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-blue-700 font-medium">Evidence-based analysis</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-blue-50 rounded-full">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                <span className="text-blue-700 font-medium">Time-saving automation</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-blue-50 rounded-full">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span className="text-blue-700 font-medium">Enhanced patient outcomes</span>
              </div>
            </div>
          </div>
          <AIToolsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
