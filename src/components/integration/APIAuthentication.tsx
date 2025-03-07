
import React from "react";
import { CodeBlock } from "@/components/ui/code-block";

export function APIAuthentication() {
  return (
    <div className="prose max-w-none">
      <h3 className="text-xl font-semibold text-gray-800">Authentication</h3>
      <p>
        The DentalCare+ API uses API keys for authentication. You can obtain an API key by contacting our 
        support team or through your account dashboard.
      </p>
      
      <h4 className="text-lg font-semibold text-gray-800 mt-6">API Key Authentication</h4>
      <p>
        Include your API key in the request header:
      </p>
      <CodeBlock 
        code="Authorization: Bearer YOUR_API_KEY"
        className="my-4"
      />
      
      <h4 className="text-lg font-semibold text-gray-800 mt-6">Example Request</h4>
      <CodeBlock 
        code={`curl -X GET https://dentalai-production.up.railway.app/integration/soap_notes \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
        language="bash"
        className="my-4"
      />
    </div>
  );
}
