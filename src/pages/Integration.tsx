
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/Footer";
import { APIDocumentation } from "@/components/integration/APIDocumentation";
import { IntegrationHero } from "@/components/integration/IntegrationHero";

export default function Integration() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <IntegrationHero />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Seamless Integration Guide</h2>
            <p className="text-gray-700 mb-4">
              Our platform provides easy integration with any existing EMR system or dental practice management software. 
              Use our well-documented APIs to connect your systems and leverage the power of our AI tools within your workflow.
            </p>
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-700 mb-2">Getting Started</h3>
              <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                <li>Create an API key in your account dashboard</li>
                <li>Include the API key in your request headers</li>
                <li>Use the endpoints below to access and manage your data</li>
                <li>Review our documentation for detailed request and response formats</li>
              </ol>
            </div>
          </div>
          <APIDocumentation />
        </div>
      </main>
      <Footer />
    </div>
  );
}
