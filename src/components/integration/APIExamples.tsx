
import React from "react";
import { CodeBlock } from "@/components/ui/code-block";

export function APIExamples() {
  return (
    <div className="prose max-w-none">
      <h3 className="text-xl font-semibold text-gray-800">Integration Examples</h3>
      
      <h4 className="text-lg font-semibold text-gray-800 mt-6">JavaScript/Node.js Example</h4>
      <CodeBlock 
        code={`async function fetchSoapNotes() {
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
}`}
        language="javascript"
        className="my-4"
      />
      
      <h4 className="text-lg font-semibold text-gray-800 mt-6">Python Example</h4>
      <CodeBlock 
        code={`import requests

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
    return response.json()['appointments']`}
        language="python"
        className="my-4"
      />
      
      <h4 className="text-lg font-semibold text-gray-800 mt-6">Webhooks</h4>
      <p>
        You can also set up webhooks to receive real-time notifications when new data is created or updated:
      </p>
      <CodeBlock 
        code={`// Example webhook payload for a new appointment
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
}`}
        language="json"
        className="my-4"
      />
    </div>
  );
}
