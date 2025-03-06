
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/Footer";
import { TreatmentPlanningSection } from "@/components/TreatmentPlanningSection";
import { BackButton } from "@/components/BackButton";

export default function AITreatment() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <BackButton />
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
              AI Treatment Planning
            </h1>
            <p className="text-lg text-gray-600">
              Generate comprehensive dental treatment plans using our AI-powered system.
            </p>
          </div>
          <TreatmentPlanningSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
