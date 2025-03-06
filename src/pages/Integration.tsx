
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
          <APIDocumentation />
        </div>
      </main>
      <Footer />
    </div>
  );
}
