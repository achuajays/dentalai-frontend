
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/Footer";
import { DrugSearch } from "@/components/drug/DrugSearch";
import { Pill, Info } from "lucide-react";

export default function AIDrugInfo() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
                <Pill className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                AI Drug Information
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get detailed information about medications, their ingredients, dosages, and more
              </p>
            </div>

            <div className="mb-8 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">How to use this tool</p>
                <p>Enter the name of a medication to retrieve detailed information about it. You can search by either generic name or brand name. The results will show active ingredients, dosage forms, manufacturer details, and other important information.</p>
              </div>
            </div>

            <DrugSearch />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
