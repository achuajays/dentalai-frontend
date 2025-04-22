
import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { BackButton } from "@/components/BackButton";
import { ExerciseSearch } from "@/components/exercise/ExerciseSearch";
import { ExerciseResults } from "@/components/exercise/ExerciseResults";
import { Exercise } from "@/types/Exercise";
import { API_BASE_URL } from "@/config/constants";

export default function AIExercise() {
  const [bodyPart, setBodyPart] = useState<string>("");
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["exercises", bodyPart],
    queryFn: async () => {
      if (!bodyPart) return null;
      const response = await fetch(
        `${API_BASE_URL}/exercises/bodypart/${bodyPart}?limit=10&offset=0`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch exercises");
      }
      return response.json();
    },
    enabled: isSearchSubmitted && !!bodyPart,
  });

  const handleSearch = (bodyPartInput: string) => {
    setBodyPart(bodyPartInput.toLowerCase());
    setIsSearchSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center mb-6">
              <BackButton to="/ai-tools" />
              <h1 className="text-3xl md:text-4xl font-bold text-blue-700 ml-4">
                Exercise Finder
              </h1>
            </div>
            <p className="text-lg text-gray-600 mb-8">
              Find targeted exercises for specific body parts to help with rehabilitation and recovery.
            </p>
            
            <ExerciseSearch onSearch={handleSearch} isLoading={isLoading} />

            {isSearchSubmitted && (
              <ExerciseResults 
                data={data} 
                isLoading={isLoading} 
                error={error} 
                bodyPart={bodyPart} 
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
