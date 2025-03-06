
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
            <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
              AI-Powered Dental Tools
            </h1>
            <p className="text-lg text-gray-600">
              Leverage the power of artificial intelligence to enhance diagnosis, treatment planning, and patient care.
            </p>
          </div>
          <AIToolsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
