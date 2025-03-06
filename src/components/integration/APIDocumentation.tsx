
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APIEndpoint } from "@/components/integration/APIEndpoint";
import { Separator } from "@/components/ui/separator";

export function APIDocumentation() {
  const [activeTab, setActiveTab] = useState("overview");
  
  const endpoints = [
    {
      id: "soap_notes",
      method: "GET",
      path: "/integration/soap_notes",
      description: "Get all SOAP notes for your practice",
      responseExample: `{
  "soap_notes": [
    {
      "id": 1,
      "patient_id": 123,
      "provider_id": 456,
      "date": "2025-03-01",
      "subjective": "Patient reports tooth pain in the upper right quadrant...",
      "objective": "Examination reveals inflammation around tooth #3...",
      "assessment": "Acute periapical periodontitis on tooth #3...",
      "plan": "Recommend root canal treatment on tooth #3...",
      "summary": "Patient experiencing periapical periodontitis requiring root canal..."
    }
  ]
}`,
      parameters: [
        { name: "patient_id", type: "number", required: false, description: "Filter notes by patient ID" },
        { name: "date_from", type: "string (YYYY-MM-DD)", required: false, description: "Filter notes by start date" },
        { name: "date_to", type: "string (YYYY-MM-DD)", required: false, description: "Filter notes by end date" }
      ]
    },
    {
      id: "users",
      method: "GET",
      path: "/integration/users",
      description: "Get all users in your practice",
      responseExample: `{
  "users": [
    {
      "id": 1,
      "name": "Dr. Jane Smith",
      "email": "jsmith@dentalcare.com",
      "role": "dentist",
      "specialization": "orthodontics",
      "created_at": "2025-01-01T00:00:00Z"
    }
  ]
}`,
      parameters: [
        { name: "role", type: "string", required: false, description: "Filter users by role (dentist, assistant, patient)" },
        { name: "search", type: "string", required: false, description: "Search users by name or email" }
      ]
    },
    {
      id: "appointments",
      method: "GET",
      path: "/integration/appointments",
      description: "Get all appointments",
      responseExample: `{
  "appointments": [
    {
      "id": 1,
      "patient_id": 123,
      "provider_id": 456,
      "date": "2025-03-15",
      "time": "14:30:00",
      "duration": 60,
      "status": "confirmed",
      "reason": "Root canal treatment",
      "notes": "Follow-up appointment after initial assessment"
    }
  ]
}`,
      parameters: [
        { name: "patient_id", type: "number", required: false, description: "Filter appointments by patient ID" },
        { name: "provider_id", type: "number", required: false, description: "Filter appointments by provider ID" },
        { name: "date_from", type: "string (YYYY-MM-DD)", required: false, description: "Filter appointments by start date" },
        { name: "date_to", type: "string (YYYY-MM-DD)", required: false, description: "Filter appointments by end date" },
        { name: "status", type: "string", required: false, description: "Filter appointments by status (confirmed, cancelled, completed)" }
      ]
    },
    {
      id: "evaluations",
      method: "GET",
      path: "/integration/evaluations",
      description: "Get all evaluations and assessments",
      responseExample: `{
  "evaluations": [
    {
      "id": 1,
      "patient_id": 123,
      "provider_id": 456,
      "date": "2025-03-10",
      "type": "xray_analysis",
      "findings": "Evidence of bone loss in region of tooth #30...",
      "recommendations": "Periodontal therapy recommended...",
      "attachments": [
        {
          "id": 789,
          "type": "xray_image",
          "url": "https://api.dentalcare.com/attachments/789",
          "created_at": "2025-03-10T10:30:00Z"
        }
      ]
    }
  ]
}`,
      parameters: [
        { name: "patient_id", type: "number", required: false, description: "Filter evaluations by patient ID" },
        { name: "type", type: "string", required: false, description: "Filter evaluations by type (xray_analysis, periodontal, orthodontic)" },
        { name: "date_from", type: "string (YYYY-MM-DD)", required: false, description: "Filter evaluations by start date" },
        { name: "date_to", type: "string (YYYY-MM-DD)", required: false, description: "Filter evaluations by end date" }
      ]
    }
  ];

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
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-gray-800">API Overview</h3>
              <p>
                The DentalCare+ API is organized around REST principles. All API endpoints return JSON-encoded responses
                and use standard HTTP response codes to indicate API success or errors.
              </p>
              
              <h4 className="text-lg font-semibold text-gray-800 mt-6">Base URL</h4>
              <div className="bg-gray-800 text-gray-100 p-3 rounded font-mono text-sm">
                https://dentalai-production.up.railway.app
              </div>
              
              <h4 className="text-lg font-semibold text-gray-800 mt-6">Rate Limits</h4>
              <p>
                The API is rate limited to 100 requests per minute per API key. If you exceed this limit, 
                you'll receive a 429 Too Many Requests response.
              </p>
              
              <h4 className="text-lg font-semibold text-gray-800 mt-6">Versioning</h4>
              <p>
                The current version of the API is v1. We recommend specifying the version in the URL:
              </p>
              <div className="bg-gray-800 text-gray-100 p-3 rounded font-mono text-sm">
                https://dentalai-production.up.railway.app/v1/integration/...
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="authentication" className="space-y-6">
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
              <div className="bg-gray-800 text-gray-100 p-3 rounded font-mono text-sm">
                Authorization: Bearer YOUR_API_KEY
              </div>
              
              <h4 className="text-lg font-semibold text-gray-800 mt-6">Example Request</h4>
              <div className="bg-gray-800 text-gray-100 p-3 rounded font-mono text-sm">
                curl -X GET https://dentalai-production.up.railway.app/integration/soap_notes \<br />
                &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY" \<br />
                &nbsp;&nbsp;-H "Content-Type: application/json"
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="endpoints" className="space-y-8">
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
          </TabsContent>
          
          <TabsContent value="examples" className="space-y-6">
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-gray-800">Integration Examples</h3>
              
              <h4 className="text-lg font-semibold text-gray-800 mt-6">JavaScript/Node.js Example</h4>
              <div className="bg-gray-800 text-gray-100 p-3 rounded font-mono text-sm">
                {`
async function fetchSoapNotes() {
  const response = await fetch(
    'https://dentalai-production.up.railway.app/integration/soap_notes',
    {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    }
  );
  
  const data = await response.json();
  return data.soap_notes;
}
                `.trim()}
              </div>
              
              <h4 className="text-lg font-semibold text-gray-800 mt-6">Python Example</h4>
              <div className="bg-gray-800 text-gray-100 p-3 rounded font-mono text-sm">
                {`
import requests

def fetch_appointments(patient_id=None):
    url = 'https://dentalai-production.up.railway.app/integration/appointments'
    
    params = {}
    if patient_id:
        params['patient_id'] = patient_id
    
    headers = {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
    
    response = requests.get(url, headers=headers, params=params)
    return response.json()['appointments']
                `.trim()}
              </div>
              
              <h4 className="text-lg font-semibold text-gray-800 mt-6">Webhooks</h4>
              <p>
                You can also set up webhooks to receive real-time notifications when new data is created or updated:
              </p>
              <div className="bg-gray-800 text-gray-100 p-3 rounded font-mono text-sm">
                {`
// Example webhook payload for a new appointment
{
  "event": "appointment.created",
  "data": {
    "id": 1,
    "patient_id": 123,
    "provider_id": 456,
    "date": "2025-03-15",
    "time": "14:30:00",
    "duration": 60,
    "status": "confirmed",
    "reason": "Root canal treatment"
  }
}
                `.trim()}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
