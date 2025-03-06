
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function IntegrationHero() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-700 mb-6">
          Seamless EMR Integration
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          DentalCare+ offers easy integration with any Electronic Medical Record (EMR) system. 
          Our RESTful APIs provide access to all your dental practice data, enabling a unified workflow.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
            Request API Access
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            View Documentation <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-16 p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-center mb-6">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
            <p className="text-sm text-green-700 font-medium">All Systems Operational</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Epic', 'Cerner', 'Athenahealth', 'eClinicalWorks'].map((partner) => (
              <div key={partner} className="p-3 bg-gray-50 rounded border border-gray-200 text-center">
                <p className="text-gray-700 font-medium">{partner}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
