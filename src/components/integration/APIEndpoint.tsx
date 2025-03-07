
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Code } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface EndpointProps {
  endpoint: {
    id: string;
    method: string;
    path: string;
    description: string;
    responseExample: string;
    parameters: Parameter[];
  };
}

export function APIEndpoint({ endpoint }: EndpointProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-800';
      case 'POST':
        return 'bg-blue-100 text-blue-800';
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div 
        className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <span className={`px-2 py-1 rounded text-xs font-bold ${getMethodColor(endpoint.method)}`}>
            {endpoint.method}
          </span>
          <span className="font-mono text-gray-900">{endpoint.path}</span>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="sm">
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          <p className="text-gray-600 mb-4">{endpoint.description}</p>
          
          <Tabs defaultValue="parameters">
            <TabsList className="mb-4">
              <TabsTrigger value="parameters">Parameters</TabsTrigger>
              <TabsTrigger value="response">Response</TabsTrigger>
              <TabsTrigger value="example">Example</TabsTrigger>
            </TabsList>
            
            <TabsContent value="parameters">
              {endpoint.parameters.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {endpoint.parameters.map((param) => (
                        <tr key={param.name}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{param.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{param.type}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{param.required ? 'Yes' : 'No'}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No parameters required</p>
              )}
            </TabsContent>
            
            <TabsContent value="response">
              <CodeBlock code={endpoint.responseExample} language="json" />
            </TabsContent>
            
            <TabsContent value="example">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">cURL</h4>
                <CodeBlock 
                  code={`curl -X ${endpoint.method} https://dentalai-production.up.railway.app${endpoint.path} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Accept: application/json"`}
                  language="bash"
                />
                
                <h4 className="font-medium text-gray-700">JavaScript</h4>
                <CodeBlock 
                  code={`const fetchData = async () => {
  const response = await fetch('https://dentalai-production.up.railway.app${endpoint.path}', {
    method: '${endpoint.method}',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Accept': 'application/json'
    }
  });
  
  return await response.json();
};`}
                  language="javascript"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
