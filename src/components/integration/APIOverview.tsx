
import React from "react";
import { CodeBlock } from "@/components/ui/code-block";

export function APIOverview() {
  return (
    <div className="prose max-w-none">
      <h3 className="text-xl font-semibold text-gray-800">API Overview</h3>
      <p>
        The DentalCare+ API is organized around REST principles. All API endpoints return JSON-encoded responses
        and use standard HTTP response codes to indicate API success or errors.
      </p>
      
      <h4 className="text-lg font-semibold text-gray-800 mt-6">Base URL</h4>
      <CodeBlock 
        code="https://dentalai-production.up.railway.app"
        className="my-4"
      />
      
      <h4 className="text-lg font-semibold text-gray-800 mt-6">Rate Limits</h4>
      <p>
        The API is rate limited to 100 requests per minute per API key. If you exceed this limit, 
        you'll receive a 429 Too Many Requests response.
      </p>
      
      <h4 className="text-lg font-semibold text-gray-800 mt-6">Versioning</h4>
      <p>
        The current version of the API is v1. We recommend specifying the version in the URL:
      </p>
      <CodeBlock 
        code="https://dentalai-production.up.railway.app/v1/integration/..."
        className="my-4"
      />
    </div>
  );
}
