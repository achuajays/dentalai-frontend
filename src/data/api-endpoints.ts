
export interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface Endpoint {
  id: string;
  method: string;
  path: string;
  description: string;
  responseExample: string;
  parameters: Parameter[];
}

export const endpoints: Endpoint[] = [
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
