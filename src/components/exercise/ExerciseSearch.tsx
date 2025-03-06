
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Loader2 } from "lucide-react";

interface ExerciseSearchProps {
  onSearch: (bodyPart: string) => void;
  isLoading: boolean;
}

const commonBodyParts = [
  "back", "chest", "shoulders", "upper arms", "lower arms", 
  "upper legs", "lower legs", "waist", "cardio", "neck"
];

export function ExerciseSearch({ onSearch, isLoading }: ExerciseSearchProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
    }
  };

  const handleQuickSearch = (bodyPart: string) => {
    setSearchInput(bodyPart);
    onSearch(bodyPart);
  };

  return (
    <Card className="mb-8 shadow-md border-blue-100">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="bodyPartSearch" className="text-blue-700 text-lg mb-2 block">
              Enter body part to find exercises
            </Label>
            <div className="flex gap-2">
              <Input
                id="bodyPartSearch"
                placeholder="e.g., back, chest, legs"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !searchInput.trim()} className="bg-blue-600">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                Search
              </Button>
            </div>
          </div>
        </form>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Quick search:</h3>
          <div className="flex flex-wrap gap-2">
            {commonBodyParts.map((part) => (
              <Button
                key={part}
                variant="outline"
                size="sm"
                className="text-xs border-blue-200 hover:bg-blue-50"
                onClick={() => handleQuickSearch(part)}
                disabled={isLoading}
              >
                {part}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
