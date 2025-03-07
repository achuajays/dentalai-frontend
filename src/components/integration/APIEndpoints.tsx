
import React from "react";
import { APIEndpoint } from "@/components/integration/APIEndpoint";
import { Separator } from "@/components/ui/separator";
import { endpoints } from "@/data/api-endpoints";

export function APIEndpoints() {
  return (
    <>
      <div className="prose max-w-none mb-6">
        <h3 className="text-xl font-semibold text-gray-800">API Endpoints</h3>
        <p>
          The following endpoints are available for integrating with your EMR system:
        </p>
      </div>
      
      {endpoints.map((endpoint, index) => (
        <div key={endpoint.id}>
          {index > 0 && <Separator className="my-8" />}
          <APIEndpoint endpoint={endpoint} />
        </div>
      ))}
    </>
  );
}
