
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/Footer";
import { MedicalReportSection } from "@/components/MedicalReportSection";
import { BackButton } from "@/components/BackButton";

export default function AIReports() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-6">
            <BackButton to="/ai-tools" label="Back to AI Tools" />
          </div>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-amber-700 mb-4">
              Medical Report Analysis
            </h1>
            <p className="text-lg text-gray-600">
              Upload medical reports and get AI-powered summaries and insights to improve patient care and streamline documentation.
            </p>
          </div>
          <MedicalReportSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
