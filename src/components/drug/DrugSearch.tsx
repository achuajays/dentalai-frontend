
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DrugResultsCard } from "./DrugResultsCard";
import { useToast } from "@/components/ui/use-toast";

type DrugInfo = {
  product_ndc: string;
  generic_name: string;
  labeler_name: string;
  active_ingredients: { name: string; strength: string }[];
  dosage_form: string;
  product_type: string;
  brand_name_base: string | null;
  marketing_start_date: string;
  packaging: { description: string; marketing_start_date: string }[];
  marketing_category: string;
  listing_expiration_date: string;
};

const fetchDrugInfo = async (drugName: string): Promise<DrugInfo[]> => {
  if (!drugName.trim()) return [];
  
  const response = await fetch(`https://dentalai-production.up.railway.app/drug_info?drug=${encodeURIComponent(drugName)}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch drug information');
  }
  
  return response.json();
};

export function DrugSearch() {
  const [drugName, setDrugName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['drugInfo', searchTerm],
    queryFn: () => fetchDrugInfo(searchTerm),
    enabled: !!searchTerm,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!drugName.trim()) {
      toast({
        title: "Search field is empty",
        description: "Please enter a drug name to search",
        variant: "destructive",
      });
      return;
    }
    setSearchTerm(drugName);
  };

  return (
    <div className="w-full space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Search for Drug Information</h2>
        <form onSubmit={handleSearch} className="flex space-x-2">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Enter drug name (e.g., Paracetamol, Ibuprofen)"
              value={drugName}
              onChange={(e) => setDrugName(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </form>
        
        <div className="mt-2 text-sm text-gray-500">
          Search by generic or brand name to get detailed medication information
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
          Error fetching drug information. Please try again.
        </div>
      )}

      {data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map((drug, index) => (
            <DrugResultsCard key={index} drug={drug} />
          ))}
        </div>
      ) : searchTerm && !isLoading && !error ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-6 text-center">
          <p className="text-yellow-700 font-medium mb-2">No results found</p>
          <p className="text-yellow-600">
            Try searching with a different drug name or check your spelling
          </p>
        </div>
      ) : null}
    </div>
  );
}
