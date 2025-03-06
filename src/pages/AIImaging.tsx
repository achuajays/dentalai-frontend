
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/Footer";
import { MedicalImagingSection } from "@/components/MedicalImagingSection";

export default function AIImaging() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">
              AI Medical Imaging Analysis
            </h1>
            <p className="text-lg text-gray-600">
              Upload your dental scans for instant AI-powered analysis and comprehensive insights.
            </p>
          </div>
          <MedicalImagingSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
