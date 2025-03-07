
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APIOverview } from "@/components/integration/APIOverview";
import { APIAuthentication } from "@/components/integration/APIAuthentication";
import { APIEndpoints } from "@/components/integration/APIEndpoints";
import { APIExamples } from "@/components/integration/APIExamples";

export function APIDocumentation() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">API Documentation</h2>
        <p className="text-gray-600 mb-6">
          Our RESTful APIs provide easy access to your dental practice data. Use these endpoints to integrate 
          DentalCare+ with your existing EMR systems.
        </p>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <APIOverview />
          </TabsContent>
          
          <TabsContent value="authentication" className="space-y-6">
            <APIAuthentication />
          </TabsContent>
          
          <TabsContent value="endpoints" className="space-y-8">
            <APIEndpoints />
          </TabsContent>
          
          <TabsContent value="examples" className="space-y-6">
            <APIExamples />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
